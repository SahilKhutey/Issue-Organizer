import React from 'react';
import { 
  Calendar, 
  User, 
  Code, 
  Zap,
  CheckCircle,
  AlertTriangle,
  Clock,
  FileText
} from 'lucide-react';
import { CodeReview } from '../../types';

interface CodeReviewCardProps {
  review: CodeReview;
  onClick?: (review: CodeReview) => void;
}

export function CodeReviewCard({ review, onClick }: CodeReviewCardProps) {
  const statusConfig = {
    pending: { color: 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200', icon: Clock },
    reviewed: { color: 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200', icon: FileText },
    approved: { color: 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200', icon: CheckCircle },
    'needs-changes': { color: 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200', icon: AlertTriangle }
  };

  const StatusIcon = statusConfig[review.status].icon;

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { 
      month: 'short', 
      day: 'numeric',
      year: date.getFullYear() !== new Date().getFullYear() ? 'numeric' : undefined
    });
  };

  const getScoreColor = (score: number) => {
    if (score >= 8) return 'text-green-600 dark:text-green-400';
    if (score >= 6) return 'text-yellow-600 dark:text-yellow-400';
    return 'text-red-600 dark:text-red-400';
  };

  return (
    <div 
      className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-6 hover:shadow-lg transition-all duration-200 cursor-pointer group hover:border-gray-300 dark:hover:border-gray-600"
      onClick={() => onClick?.(review)}
    >
      {/* Header */}
      <div className="flex items-start justify-between mb-3">
        <div className="flex items-center space-x-3">
          <div className="flex items-center space-x-2">
            <Code className="w-5 h-5 text-gray-400" />
            <span className="text-sm font-medium text-gray-500 dark:text-gray-400">
              {review.language}
            </span>
          </div>
          <span className={`inline-flex items-center px-2 py-1 text-xs font-medium rounded-full ${statusConfig[review.status].color}`}>
            <StatusIcon className="w-3 h-3 mr-1" />
            {review.status.replace('-', ' ')}
          </span>
        </div>
        
        <div className="flex items-center space-x-2">
          {review.aiReview && (
            <div className="flex items-center space-x-1">
              <span className="text-sm text-gray-500 dark:text-gray-400">Score:</span>
              <span className={`text-sm font-bold ${getScoreColor(review.aiReview.overallScore)}`}>
                {review.aiReview.overallScore}/10
              </span>
            </div>
          )}
          {review.aiSummary && (
            <div className="p-1 bg-purple-100 dark:bg-purple-900 rounded">
              <Zap className="w-3 h-3 text-purple-600 dark:text-purple-400" />
            </div>
          )}
        </div>
      </div>

      {/* Title and File */}
      <div className="mb-3">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-1 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
          {review.title}
        </h3>
        {review.fileName && (
          <p className="text-sm text-gray-500 dark:text-gray-400 font-mono">
            {review.fileName}
          </p>
        )}
      </div>

      {/* AI Summary */}
      {review.aiSummary && (
        <div className="mb-4 p-3 bg-purple-50 dark:bg-purple-900/20 rounded-lg border border-purple-200 dark:border-purple-800">
          <div className="flex items-center space-x-2 mb-1">
            <Zap className="w-4 h-4 text-purple-600 dark:text-purple-400" />
            <span className="text-sm font-medium text-purple-700 dark:text-purple-300">AI Summary</span>
          </div>
          <p className="text-sm text-purple-600 dark:text-purple-300">{review.aiSummary}</p>
        </div>
      )}

      {/* Review Highlights */}
      {review.aiReview && (
        <div className="mb-4 grid grid-cols-2 gap-4">
          <div>
            <div className="flex items-center space-x-2 mb-2">
              <CheckCircle className="w-4 h-4 text-green-500" />
              <span className="text-sm font-medium text-gray-700 dark:text-gray-300">Strengths</span>
            </div>
            <ul className="text-xs text-gray-600 dark:text-gray-400 space-y-1">
              {review.aiReview.strengths.slice(0, 2).map((strength, index) => (
                <li key={index} className="flex items-start space-x-1">
                  <span className="text-green-500 mt-1">•</span>
                  <span>{strength}</span>
                </li>
              ))}
              {review.aiReview.strengths.length > 2 && (
                <li className="text-gray-500 dark:text-gray-500">
                  +{review.aiReview.strengths.length - 2} more
                </li>
              )}
            </ul>
          </div>
          
          <div>
            <div className="flex items-center space-x-2 mb-2">
              <AlertTriangle className="w-4 h-4 text-orange-500" />
              <span className="text-sm font-medium text-gray-700 dark:text-gray-300">Issues</span>
            </div>
            <ul className="text-xs text-gray-600 dark:text-gray-400 space-y-1">
              {[...review.aiReview.bugs, ...review.aiReview.improvements].slice(0, 2).map((issue, index) => (
                <li key={index} className="flex items-start space-x-1">
                  <span className="text-orange-500 mt-1">•</span>
                  <span>{issue}</span>
                </li>
              ))}
              {(review.aiReview.bugs.length + review.aiReview.improvements.length) > 2 && (
                <li className="text-gray-500 dark:text-gray-500">
                  +{(review.aiReview.bugs.length + review.aiReview.improvements.length) - 2} more
                </li>
              )}
            </ul>
          </div>
        </div>
      )}

      {/* Tags */}
      <div className="flex flex-wrap gap-2 mb-4">
        {review.tags.slice(0, 3).map((tag) => (
          <span
            key={tag}
            className="inline-flex items-center px-2 py-1 text-xs font-medium bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-full"
          >
            {tag}
          </span>
        ))}
        {review.tags.length > 3 && (
          <span className="inline-flex items-center px-2 py-1 text-xs font-medium bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-400 rounded-full">
            +{review.tags.length - 3} more
          </span>
        )}
      </div>

      {/* Footer */}
      <div className="flex items-center justify-between text-sm text-gray-500 dark:text-gray-400">
        <div className="flex items-center space-x-4">
          <div className="flex items-center space-x-1">
            <Calendar className="w-4 h-4" />
            <span>{formatDate(review.createdAt)}</span>
          </div>
          <div className="flex items-center space-x-1">
            <User className="w-4 h-4" />
            <span>{review.author.name || review.author.login}</span>
          </div>
        </div>
        
        <div className="text-xs bg-gray-100 dark:bg-gray-700 px-2 py-1 rounded">
          {review.code.split('\n').length} lines
        </div>
      </div>
    </div>
  );
}