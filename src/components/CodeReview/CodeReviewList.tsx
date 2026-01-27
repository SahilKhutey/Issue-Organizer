import React, { useState } from 'react';
import { Search, Filter, Plus } from 'lucide-react';
import { CodeReview, CodeAnalysisType } from '../../types';
import { CodeReviewCard } from './CodeReviewCard';
import { CodeEditor } from './CodeEditor';
import { mockCodeReviews, mockUsers } from '../../data/mockData';

interface CodeReviewListProps {
  onReviewClick: (review: CodeReview) => void;
}

export function CodeReviewList({ onReviewClick }: CodeReviewListProps) {
  const [reviews, setReviews] = useState<CodeReview[]>(mockCodeReviews);
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [languageFilter, setLanguageFilter] = useState<string>('all');
  const [showEditor, setShowEditor] = useState(false);
  const [isAnalyzing, setIsAnalyzing] = useState(false);

  const filteredReviews = reviews.filter(review => {
    const matchesSearch = review.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         review.code.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         review.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()));
    
    const matchesStatus = statusFilter === 'all' || review.status === statusFilter;
    const matchesLanguage = languageFilter === 'all' || review.language === languageFilter;
    
    return matchesSearch && matchesStatus && matchesLanguage;
  });

  const uniqueLanguages = [...new Set(reviews.map(r => r.language))];
  const statusOptions = [
    { value: 'all', label: 'All Status' },
    { value: 'pending', label: 'Pending' },
    { value: 'reviewed', label: 'Reviewed' },
    { value: 'approved', label: 'Approved' },
    { value: 'needs-changes', label: 'Needs Changes' }
  ];

  const handleAnalyze = async (code: string, language: string, fileName?: string, analysisType?: CodeAnalysisType) => {
    setIsAnalyzing(true);
    
    // Simulate AI analysis
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    const newReview: CodeReview = {
      id: Date.now().toString(),
      title: fileName ? fileName.replace(/\.[^/.]+$/, "") : `${language} Code Analysis`,
      code,
      language,
      fileName,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      author: mockUsers[0],
      status: 'pending',
      tags: [language, analysisType || 'review'],
      aiSummary: `AI analysis of ${language} code focusing on ${analysisType || 'general review'}. The code appears to be well-structured with some areas for improvement.`,
      aiReview: {
        overallScore: Math.floor(Math.random() * 4) + 6, // Random score between 6-10
        strengths: [
          'Clean code structure and organization',
          'Good use of modern language features',
          'Proper error handling implementation'
        ],
        improvements: [
          'Consider adding more comprehensive comments',
          'Optimize performance for large datasets',
          'Add unit tests for better coverage'
        ],
        bugs: [
          'Potential null pointer exception in line 15',
          'Memory leak possible with unclosed resources'
        ],
        security: [
          'Input validation needed for user data',
          'Consider implementing rate limiting'
        ],
        performance: [
          'Database queries could be optimized',
          'Consider caching frequently accessed data'
        ],
        maintainability: [
          'Extract complex logic into separate functions',
          'Add type definitions for better IDE support'
        ]
      }
    };
    
    setReviews(prev => [newReview, ...prev]);
    setIsAnalyzing(false);
    setShowEditor(false);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Code Reviews</h1>
          <p className="text-gray-600 dark:text-gray-400 mt-1">
            AI-powered code analysis and review
          </p>
        </div>
        
        <button
          onClick={() => setShowEditor(!showEditor)}
          className="flex items-center space-x-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium"
        >
          <Plus className="w-5 h-5" />
          <span>New Review</span>
        </button>
      </div>

      {/* Code Editor */}
      {showEditor && (
        <CodeEditor onAnalyze={handleAnalyze} isAnalyzing={isAnalyzing} />
      )}

      {/* Filters */}
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="flex-1">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 dark:text-gray-500 w-5 h-5" />
            <input
              type="text"
              placeholder="Search reviews by title, code, or tags..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
        </div>
        
        <div className="flex gap-3">
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          >
            {statusOptions.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
          
          <select
            value={languageFilter}
            onChange={(e) => setLanguageFilter(e.target.value)}
            className="px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          >
            <option value="all">All Languages</option>
            {uniqueLanguages.map((language) => (
              <option key={language} value={language}>
                {language.charAt(0).toUpperCase() + language.slice(1)}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
        <div className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-4">
          <div className="text-2xl font-bold text-gray-900 dark:text-white">{reviews.length}</div>
          <div className="text-sm text-gray-500 dark:text-gray-400">Total Reviews</div>
        </div>
        <div className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-4">
          <div className="text-2xl font-bold text-green-600 dark:text-green-400">
            {reviews.filter(r => r.status === 'approved').length}
          </div>
          <div className="text-sm text-gray-500 dark:text-gray-400">Approved</div>
        </div>
        <div className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-4">
          <div className="text-2xl font-bold text-yellow-600 dark:text-yellow-400">
            {reviews.filter(r => r.status === 'pending').length}
          </div>
          <div className="text-sm text-gray-500 dark:text-gray-400">Pending</div>
        </div>
        <div className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-4">
          <div className="text-2xl font-bold text-purple-600 dark:text-purple-400">
            {reviews.filter(r => r.aiReview).length}
          </div>
          <div className="text-sm text-gray-500 dark:text-gray-400">AI Analyzed</div>
        </div>
      </div>

      {/* Reviews Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {filteredReviews.map((review) => (
          <CodeReviewCard
            key={review.id}
            review={review}
            onClick={onReviewClick}
          />
        ))}
      </div>

      {/* Empty State */}
      {filteredReviews.length === 0 && (
        <div className="text-center py-12">
          <div className="max-w-md mx-auto">
            <div className="w-16 h-16 bg-gray-100 dark:bg-gray-800 rounded-full flex items-center justify-center mx-auto mb-4">
              <Filter className="w-8 h-8 text-gray-400" />
            </div>
            <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">No reviews found</h3>
            <p className="text-gray-500 dark:text-gray-400">
              {searchQuery || statusFilter !== 'all' || languageFilter !== 'all'
                ? 'Try adjusting your search or filters.'
                : 'Start by creating your first code review.'}
            </p>
          </div>
        </div>
      )}
    </div>
  );
}