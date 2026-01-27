import React, { useState } from 'react';
import { 
  X, 
  Code, 
  Zap, 
  CheckCircle, 
  AlertTriangle, 
  Shield, 
  Gauge, 
  Wrench,
  Copy,
  Download,
  User,
  Calendar
} from 'lucide-react';
import { CodeReview } from '../../types';

interface CodeReviewDetailProps {
  review: CodeReview;
  onClose: () => void;
}

export function CodeReviewDetail({ review, onClose }: CodeReviewDetailProps) {
  const [activeTab, setActiveTab] = useState<'code' | 'summary' | 'review'>('code');

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { 
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const getScoreColor = (score: number) => {
    if (score >= 8) return 'text-green-600 dark:text-green-400';
    if (score >= 6) return 'text-yellow-600 dark:text-yellow-400';
    return 'text-red-600 dark:text-red-400';
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
  };

  const downloadCode = () => {
    const blob = new Blob([review.code], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = review.fileName || `code-review-${review.id}.${review.language}`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const tabs = [
    { id: 'code', label: 'Code', icon: Code },
    { id: 'summary', label: 'Summary', icon: Zap },
    { id: 'review', label: 'Review', icon: CheckCircle }
  ];

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white dark:bg-gray-900 rounded-lg shadow-xl max-w-6xl w-full max-h-[90vh] overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-200 dark:border-gray-700">
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-2">
              <Code className="w-6 h-6 text-blue-600 dark:text-blue-400" />
              <div>
                <h2 className="text-xl font-bold text-gray-900 dark:text-white">{review.title}</h2>
                {review.fileName && (
                  <p className="text-sm text-gray-500 dark:text-gray-400 font-mono">{review.fileName}</p>
                )}
              </div>
            </div>
            {review.aiReview && (
              <div className="flex items-center space-x-2 px-3 py-1 bg-gray-100 dark:bg-gray-800 rounded-lg">
                <span className="text-sm text-gray-600 dark:text-gray-400">Score:</span>
                <span className={`text-lg font-bold ${getScoreColor(review.aiReview.overallScore)}`}>
                  {review.aiReview.overallScore}/10
                </span>
              </div>
            )}
          </div>
          
          <div className="flex items-center space-x-2">
            <button 
              onClick={() => copyToClipboard(review.code)}
              className="p-2 text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
            >
              <Copy className="w-5 h-5" />
            </button>
            <button 
              onClick={downloadCode}
              className="p-2 text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
            >
              <Download className="w-5 h-5" />
            </button>
            <button 
              onClick={onClose}
              className="p-2 text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Tabs */}
        <div className="flex border-b border-gray-200 dark:border-gray-700">
          {tabs.map((tab) => {
            const Icon = tab.icon;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className={`flex items-center space-x-2 px-6 py-3 text-sm font-medium border-b-2 transition-colors ${
                  activeTab === tab.id
                    ? 'border-blue-500 text-blue-600 dark:text-blue-400'
                    : 'border-transparent text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300'
                }`}
              >
                <Icon className="w-4 h-4" />
                <span>{tab.label}</span>
              </button>
            );
          })}
        </div>

        {/* Content */}
        <div className="overflow-y-auto max-h-[calc(90vh-200px)]">
          {activeTab === 'code' && (
            <div className="p-6">
              <div className="mb-4 flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  <span className="text-sm text-gray-500 dark:text-gray-400">Language:</span>
                  <span className="px-2 py-1 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded text-sm font-mono">
                    {review.language}
                  </span>
                  <span className="text-sm text-gray-500 dark:text-gray-400">
                    {review.code.split('\n').length} lines
                  </span>
                </div>
                <div className="flex items-center space-x-3 text-sm text-gray-500 dark:text-gray-400">
                  <div className="flex items-center space-x-1">
                    <User className="w-4 h-4" />
                    <span>{review.author.name || review.author.login}</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <Calendar className="w-4 h-4" />
                    <span>{formatDate(review.createdAt)}</span>
                  </div>
                </div>
              </div>
              
              <div className="bg-gray-50 dark:bg-gray-800 rounded-lg p-4 overflow-x-auto">
                <pre className="text-sm text-gray-900 dark:text-gray-100 font-mono whitespace-pre-wrap">
                  {review.code}
                </pre>
              </div>
            </div>
          )}

          {activeTab === 'summary' && review.aiSummary && (
            <div className="p-6">
              <div className="bg-purple-50 dark:bg-purple-900/20 rounded-lg border border-purple-200 dark:border-purple-800 p-6">
                <div className="flex items-center space-x-2 mb-4">
                  <Zap className="w-6 h-6 text-purple-600 dark:text-purple-400" />
                  <h3 className="text-lg font-semibold text-purple-700 dark:text-purple-300">AI Summary</h3>
                </div>
                <p className="text-purple-600 dark:text-purple-300 leading-relaxed">
                  {review.aiSummary}
                </p>
              </div>

              {/* Tags */}
              <div className="mt-6">
                <h4 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">Tags</h4>
                <div className="flex flex-wrap gap-2">
                  {review.tags.map((tag) => (
                    <span
                      key={tag}
                      className="inline-flex items-center px-3 py-1 text-sm font-medium bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 rounded-full"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          )}

          {activeTab === 'review' && review.aiReview && (
            <div className="p-6 space-y-6">
              {/* Overall Score */}
              <div className="bg-gray-50 dark:bg-gray-800 rounded-lg p-6">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Overall Assessment</h3>
                  <div className="flex items-center space-x-2">
                    <span className="text-sm text-gray-500 dark:text-gray-400">Score:</span>
                    <span className={`text-2xl font-bold ${getScoreColor(review.aiReview.overallScore)}`}>
                      {review.aiReview.overallScore}/10
                    </span>
                  </div>
                </div>
              </div>

              {/* Strengths */}
              <div className="bg-green-50 dark:bg-green-900/20 rounded-lg border border-green-200 dark:border-green-800 p-6">
                <div className="flex items-center space-x-2 mb-4">
                  <CheckCircle className="w-6 h-6 text-green-600 dark:text-green-400" />
                  <h3 className="text-lg font-semibold text-green-700 dark:text-green-300">Strengths</h3>
                </div>
                <ul className="space-y-2">
                  {review.aiReview.strengths.map((strength, index) => (
                    <li key={index} className="flex items-start space-x-2">
                      <span className="text-green-500 mt-1">•</span>
                      <span className="text-green-600 dark:text-green-300">{strength}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Issues Grid */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Bugs */}
                {review.aiReview.bugs.length > 0 && (
                  <div className="bg-red-50 dark:bg-red-900/20 rounded-lg border border-red-200 dark:border-red-800 p-6">
                    <div className="flex items-center space-x-2 mb-4">
                      <AlertTriangle className="w-6 h-6 text-red-600 dark:text-red-400" />
                      <h3 className="text-lg font-semibold text-red-700 dark:text-red-300">Bugs & Issues</h3>
                    </div>
                    <ul className="space-y-2">
                      {review.aiReview.bugs.map((bug, index) => (
                        <li key={index} className="flex items-start space-x-2">
                          <span className="text-red-500 mt-1">•</span>
                          <span className="text-red-600 dark:text-red-300">{bug}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                {/* Security */}
                {review.aiReview.security.length > 0 && (
                  <div className="bg-orange-50 dark:bg-orange-900/20 rounded-lg border border-orange-200 dark:border-orange-800 p-6">
                    <div className="flex items-center space-x-2 mb-4">
                      <Shield className="w-6 h-6 text-orange-600 dark:text-orange-400" />
                      <h3 className="text-lg font-semibold text-orange-700 dark:text-orange-300">Security</h3>
                    </div>
                    <ul className="space-y-2">
                      {review.aiReview.security.map((issue, index) => (
                        <li key={index} className="flex items-start space-x-2">
                          <span className="text-orange-500 mt-1">•</span>
                          <span className="text-orange-600 dark:text-orange-300">{issue}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                {/* Performance */}
                {review.aiReview.performance.length > 0 && (
                  <div className="bg-yellow-50 dark:bg-yellow-900/20 rounded-lg border border-yellow-200 dark:border-yellow-800 p-6">
                    <div className="flex items-center space-x-2 mb-4">
                      <Gauge className="w-6 h-6 text-yellow-600 dark:text-yellow-400" />
                      <h3 className="text-lg font-semibold text-yellow-700 dark:text-yellow-300">Performance</h3>
                    </div>
                    <ul className="space-y-2">
                      {review.aiReview.performance.map((issue, index) => (
                        <li key={index} className="flex items-start space-x-2">
                          <span className="text-yellow-500 mt-1">•</span>
                          <span className="text-yellow-600 dark:text-yellow-300">{issue}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                {/* Maintainability */}
                {review.aiReview.maintainability.length > 0 && (
                  <div className="bg-blue-50 dark:bg-blue-900/20 rounded-lg border border-blue-200 dark:border-blue-800 p-6">
                    <div className="flex items-center space-x-2 mb-4">
                      <Wrench className="w-6 h-6 text-blue-600 dark:text-blue-400" />
                      <h3 className="text-lg font-semibold text-blue-700 dark:text-blue-300">Maintainability</h3>
                    </div>
                    <ul className="space-y-2">
                      {review.aiReview.maintainability.map((issue, index) => (
                        <li key={index} className="flex items-start space-x-2">
                          <span className="text-blue-500 mt-1">•</span>
                          <span className="text-blue-600 dark:text-blue-300">{issue}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>

              {/* Improvements */}
              {review.aiReview.improvements.length > 0 && (
                <div className="bg-purple-50 dark:bg-purple-900/20 rounded-lg border border-purple-200 dark:border-purple-800 p-6">
                  <div className="flex items-center space-x-2 mb-4">
                    <Zap className="w-6 h-6 text-purple-600 dark:text-purple-400" />
                    <h3 className="text-lg font-semibold text-purple-700 dark:text-purple-300">Suggested Improvements</h3>
                  </div>
                  <ul className="space-y-2">
                    {review.aiReview.improvements.map((improvement, index) => (
                      <li key={index} className="flex items-start space-x-2">
                        <span className="text-purple-500 mt-1">•</span>
                        <span className="text-purple-600 dark:text-purple-300">{improvement}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}