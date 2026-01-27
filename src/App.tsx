import React, { useState, useMemo } from 'react';
import { Sidebar } from './components/Layout/Sidebar';
import { Header } from './components/Layout/Header';
import { Dashboard } from './components/Dashboard/Dashboard';
import { IssueCard } from './components/Issues/IssueCard';
import { IssueDetail } from './components/Issues/IssueDetail';
import { FilterPanel } from './components/Issues/FilterPanel';
import { BatchActions } from './components/Issues/BatchActions';
import { CodeReviewList } from './components/CodeReview/CodeReviewList';
import { CodeReviewDetail } from './components/CodeReview/CodeReviewDetail';
import { mockIssues } from './data/mockData';
import { fuzzySearch } from './utils/search';
import { applyFilters, getUniqueValues } from './utils/filters';
import { Issue, FilterOptions, CodeReview } from './types';

function App() {
  const [activeView, setActiveView] = useState('dashboard');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedIssue, setSelectedIssue] = useState<Issue | null>(null);
  const [selectedCodeReview, setSelectedCodeReview] = useState<CodeReview | null>(null);
  const [selectedIssues, setSelectedIssues] = useState<string[]>([]);
  const [showFilters, setShowFilters] = useState(false);
  const [filters, setFilters] = useState<FilterOptions>({
    priority: [],
    tags: [],
    assignee: [],
    state: [],
    repository: []
  });

  // Filter and search issues
  const filteredIssues = useMemo(() => {
    let issues = mockIssues;
    
    // Apply filters first
    issues = applyFilters(issues, filters);
    
    // Then apply search
    if (searchQuery.trim()) {
      issues = fuzzySearch(issues, searchQuery);
    }
    
    return issues;
  }, [filters, searchQuery]);

  // Get available filter options
  const availableOptions = useMemo(() => ({
    priorities: getUniqueValues(mockIssues, 'priority'),
    tags: [...new Set([
      ...getUniqueValues(mockIssues, 'tags'),
      ...mockIssues.flatMap(issue => issue.aiTags || [])
    ])].sort(),
    assignees: mockIssues
      .filter(issue => issue.assignee)
      .map(issue => issue.assignee!.login)
      .filter((value, index, self) => self.indexOf(value) === index)
      .sort(),
    states: getUniqueValues(mockIssues, 'state'),
    repositories: getUniqueValues(mockIssues, 'repository').map(repo => 
      typeof repo === 'object' && 'name' in repo ? repo.name : repo
    )
  }), []);

  const handleIssueSelect = (issueId: string) => {
    setSelectedIssues(prev => 
      prev.includes(issueId)
        ? prev.filter(id => id !== issueId)
        : [...prev, issueId]
    );
  };

  const handleClearSelection = () => {
    setSelectedIssues([]);
  };

  const handleIssueClick = (issue: Issue) => {
    setSelectedIssue(issue);
  };

  const handleCodeReviewClick = (review: CodeReview) => {
    setSelectedCodeReview(review);
  };

  const renderMainContent = () => {
    switch (activeView) {
      case 'dashboard':
        return <Dashboard onIssueClick={handleIssueClick} />;
      
      case 'issues':
      case 'ai-analysis':
      case 'filters':
        return (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
                  {activeView === 'ai-analysis' ? 'AI Analysis' : 'All Issues'}
                </h1>
                <p className="text-gray-600 dark:text-gray-400 mt-1">
                  {filteredIssues.length} issue{filteredIssues.length !== 1 ? 's' : ''} found
                </p>
              </div>
              
              <FilterPanel
                filters={filters}
                onFiltersChange={setFilters}
                availableOptions={availableOptions}
                isOpen={showFilters}
                onToggle={() => setShowFilters(!showFilters)}
              />
            </div>

            {showFilters && (
              <FilterPanel
                filters={filters}
                onFiltersChange={setFilters}
                availableOptions={availableOptions}
                isOpen={true}
                onToggle={() => setShowFilters(false)}
              />
            )}

            <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
              {filteredIssues.map((issue) => (
                <IssueCard
                  key={issue.id}
                  issue={issue}
                  isSelected={selectedIssues.includes(issue.id)}
                  onSelect={handleIssueSelect}
                  onClick={handleIssueClick}
                />
              ))}
            </div>

            {filteredIssues.length === 0 && (
              <div className="text-center py-12">
                <div className="max-w-md mx-auto">
                  <div className="w-16 h-16 bg-gray-100 dark:bg-gray-800 rounded-full flex items-center justify-center mx-auto mb-4">
                    <svg className="w-8 h-8 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                    </svg>
                  </div>
                  <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">No issues found</h3>
                  <p className="text-gray-500 dark:text-gray-400">
                    Try adjusting your search or filters to find what you're looking for.
                  </p>
                </div>
              </div>
            )}
          </div>
        );
      
      case 'code-review':
        return <CodeReviewList onReviewClick={handleCodeReviewClick} />;
      
      case 'profile':
        return <ProfileView profile={userProfile} onProfileUpdate={handleProfileUpdate} />;
      
      default:
        return (
          <div className="flex items-center justify-center h-64">
            <div className="text-center">
              <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                Coming Soon
              </h2>
              <p className="text-gray-600 dark:text-gray-400">
                This feature is under development.
              </p>
            </div>
          </div>
        );
    }
  };

  return (
    <div className="flex h-screen bg-gray-50 dark:bg-gray-900">
      {/* Sidebar */}
      <Sidebar activeView={activeView} onViewChange={setActiveView} />
      
      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        <Header searchQuery={searchQuery} onSearchChange={setSearchQuery} />
        
        <main className="flex-1 overflow-y-auto p-6">
          {renderMainContent()}
        </main>
      </div>

      {/* Batch Actions */}
      <BatchActions
        selectedIssues={selectedIssues}
        onClearSelection={handleClearSelection}
        availableTags={availableOptions.tags}
        availableAssignees={availableOptions.assignees}
      />

      {/* Issue Detail Modal */}
      {selectedIssue && (
        <IssueDetail
          issue={selectedIssue}
          onClose={() => setSelectedIssue(null)}
        />
      )}

      {/* Code Review Detail Modal */}
      {selectedCodeReview && (
        <CodeReviewDetail
          review={selectedCodeReview}
          onClose={() => setSelectedCodeReview(null)}
        />
      )}
    </div>
  );
}

export default App;