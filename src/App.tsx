import React, { useState, useMemo } from 'react';
import { Routes, Route, Navigate, useLocation } from 'react-router-dom';
import { Sidebar } from './components/Layout/Sidebar';
import { Header } from './components/Layout/Header';
import { Dashboard } from './components/Dashboard/Dashboard';
import { IssueCard } from './components/Issues/IssueCard';
import { IssueDetail } from './components/Issues/IssueDetail';
import { FilterPanel } from './components/Issues/FilterPanel';
import { BatchActions } from './components/Issues/BatchActions';
import { ProfileView } from './components/Profile/ProfileView';
import { AIAnalysisView } from './components/AIAnalysis/AIAnalysisView';
import { CodeReviewView } from './components/CodeReview/CodeReviewView';
import { mockIssues, mockUserProfile } from './data/mockData';
import { Issue, FilterOptions, UserProfile } from './types';
import { AnimatePresence, motion } from 'framer-motion';
import { Search } from 'lucide-react';

function App() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedIssue, setSelectedIssue] = useState<Issue | null>(null);
  const [selectedIssueIds, setSelectedIssueIds] = useState<string[]>([]);
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [userProfile, setUserProfile] = useState<UserProfile>(mockUserProfile);
  const location = useLocation();

  const [filters, setFilters] = useState<FilterOptions>({
    priority: [],
    tags: [],
    assignee: [],
    state: [],
    repository: []
  });

  const availableOptions = useMemo(() => ({
    priorities: Array.from(new Set(mockIssues.map(i => i.priority))),
    tags: Array.from(new Set(mockIssues.flatMap(i => i.tags))),
    assignees: Array.from(new Set(mockIssues.map(i => i.assignee?.login).filter(Boolean))) as string[],
    states: Array.from(new Set(mockIssues.map(i => i.state))),
    repositories: Array.from(new Set(mockIssues.map(i => i.repository.name)))
  }), []);

  const filteredIssues = useMemo(() => {
    return mockIssues.filter(issue => {
      const matchesSearch = issue.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          issue.body.toLowerCase().includes(searchQuery.toLowerCase());
      
      const matchesPriority = filters.priority.length === 0 || filters.priority.includes(issue.priority);
      const matchesState = filters.state.length === 0 || filters.state.includes(issue.state);
      const matchesRepository = filters.repository.length === 0 || filters.repository.includes(issue.repository.name);
      const matchesAssignee = filters.assignee.length === 0 || (issue.assignee && filters.assignee.includes(issue.assignee.login));
      const matchesTags = filters.tags.length === 0 || issue.tags.some(tag => filters.tags.includes(tag));

      return matchesSearch && matchesPriority && matchesState && matchesRepository && matchesAssignee && matchesTags;
    });
  }, [searchQuery, filters]);

  const handleIssueSelect = (issueId: string) => {
    setSelectedIssueIds(prev => 
      prev.includes(issueId) 
        ? prev.filter(id => id !== issueId)
        : [...prev, issueId]
    );
  };

  const handleProfileUpdate = (newProfile: UserProfile) => {
    setUserProfile(newProfile);
  };

  return (
    <div className="flex min-h-screen bg-background text-foreground transition-colors duration-300">
      <Sidebar />
      
      <main className="flex-1 flex flex-col min-w-0">
        <Header 
          searchQuery={searchQuery} 
          onSearchChange={setSearchQuery} 
        />
        
        <div className="flex-1 overflow-y-auto p-8 relative scroll-smooth">
          <AnimatePresence mode="wait">
            <motion.div
              key={location.pathname}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.3 }}
            >
              <Routes location={location}>
                <Route path="/" element={<Navigate to="/dashboard" replace />} />
                
                <Route path="/dashboard" element={
                  <Dashboard onIssueClick={setSelectedIssue} />
                } />
                
                <Route path="/issues" element={
                  <div className="space-y-8 max-w-[1600px] mx-auto">
                    <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
                      <div>
                        <h1 className="text-4xl font-black tracking-tight">Issue Command</h1>
                        <p className="text-muted-foreground mt-2 font-medium">
                          {filteredIssues.length} issues identified in the current perimeter.
                        </p>
                      </div>
                      <FilterPanel 
                        filters={filters}
                        onFiltersChange={setFilters}
                        availableOptions={availableOptions}
                        isOpen={isFilterOpen}
                        onToggle={() => setIsFilterOpen(!isFilterOpen)}
                      />
                    </div>

                    <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-8">
                      {filteredIssues.map((issue) => (
                        <IssueCard
                          key={issue.id}
                          issue={issue}
                          isSelected={selectedIssueIds.includes(issue.id)}
                          onSelect={handleIssueSelect}
                          onClick={setSelectedIssue}
                        />
                      ))}
                    </div>

                    {filteredIssues.length === 0 && (
                      <div className="flex flex-col items-center justify-center py-20 text-center glass-morphism rounded-[3rem] border">
                        <div className="p-6 bg-muted rounded-[2rem] mb-6">
                          <Search className="w-12 h-12 text-muted-foreground" />
                        </div>
                        <h3 className="text-2xl font-black tracking-tight">No intelligence found</h3>
                        <p className="text-muted-foreground mt-2 max-w-sm">
                          Try adjusting your filters or search parameters to expand the search radius.
                        </p>
                        <button 
                          onClick={() => setFilters({ priority: [], tags: [], assignee: [], state: [], repository: [] })}
                          className="mt-6 px-6 py-3 bg-primary text-primary-foreground font-bold rounded-2xl shadow-lg shadow-primary/20"
                        >
                          Reset Perimeter Scan
                        </button>
                      </div>
                    )}
                  </div>
                } />
                
                <Route path="/ai-analysis" element={<AIAnalysisView />} />
                
                <Route path="/code-review" element={<CodeReviewView />} />
                
                <Route path="/profile" element={
                  <ProfileView 
                    profile={userProfile} 
                    onProfileUpdate={handleProfileUpdate} 
                  />
                } />

                <Route path="*" element={
                  <div className="flex flex-col items-center justify-center min-h-[60vh] text-center">
                    <h1 className="text-9xl font-black text-primary/10">404</h1>
                    <div className="-mt-12 space-y-4">
                      <h2 className="text-3xl font-black tracking-tight">Perimeter Breach</h2>
                      <p className="text-muted-foreground font-medium">The requested node does not exist in this network.</p>
                      <button 
                        onClick={() => window.history.back()}
                        className="px-8 py-3 bg-primary text-primary-foreground font-black rounded-2xl shadow-2xl shadow-primary/20"
                      >
                        Return to Dashboard
                      </button>
                    </div>
                  </div>
                } />
              </Routes>
            </motion.div>
          </AnimatePresence>
        </div>

        <BatchActions 
          selectedIssues={selectedIssueIds}
          onClearSelection={() => setSelectedIssueIds([])}
          availableTags={availableOptions.tags}
          availableAssignees={availableOptions.assignees}
        />
      </main>

      {selectedIssue && (
        <IssueDetail 
          issue={selectedIssue} 
          onClose={() => setSelectedIssue(null)} 
        />
      )}
    </div>
  );
}

export default App;