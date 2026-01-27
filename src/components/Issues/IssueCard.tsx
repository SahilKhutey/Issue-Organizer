import React from 'react';
import { 
  Calendar, 
  MessageCircle, 
  User, 
  Tag as TagIcon, 
  AlertCircle,
  CheckCircle,
  Clock,
  Zap
} from 'lucide-react';
import { Issue } from '../../types';

interface IssueCardProps {
  issue: Issue;
  isSelected?: boolean;
  onSelect?: (issueId: string) => void;
  onClick?: (issue: Issue) => void;
}

export function IssueCard({ issue, isSelected, onSelect, onClick }: IssueCardProps) {
  const priorityConfig = {
    urgent: { color: 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200', icon: AlertCircle },
    high: { color: 'bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-200', icon: AlertCircle },
    medium: { color: 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200', icon: Clock },
    low: { color: 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200', icon: CheckCircle }
  };

  const PriorityIcon = priorityConfig[issue.priority].icon;

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { 
      month: 'short', 
      day: 'numeric',
      year: date.getFullYear() !== new Date().getFullYear() ? 'numeric' : undefined
    });
  };

  return (
    <div 
      className={`bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-6 hover:shadow-lg transition-all duration-200 cursor-pointer group ${
        isSelected ? 'ring-2 ring-blue-500 border-blue-500' : 'hover:border-gray-300 dark:hover:border-gray-600'
      }`}
      onClick={() => onClick?.(issue)}
    >
      {/* Header */}
      <div className="flex items-start justify-between mb-3">
        <div className="flex items-center space-x-3">
          {onSelect && (
            <input
              type="checkbox"
              checked={isSelected}
              onChange={() => onSelect(issue.id)}
              onClick={(e) => e.stopPropagation()}
              className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
            />
          )}
          <div className="flex items-center space-x-2">
            <span className="text-sm font-medium text-gray-500 dark:text-gray-400">
              #{issue.number}
            </span>
            <span className={`inline-flex items-center px-2 py-1 text-xs font-medium rounded-full ${priorityConfig[issue.priority].color}`}>
              <PriorityIcon className="w-3 h-3 mr-1" />
              {issue.priority}
            </span>
          </div>
        </div>
        
        <div className="flex items-center space-x-2">
          {issue.state === 'closed' && (
            <CheckCircle className="w-4 h-4 text-green-500" />
          )}
          {issue.aiSummary && (
            <div className="p-1 bg-purple-100 dark:bg-purple-900 rounded">
              <Zap className="w-3 h-3 text-purple-600 dark:text-purple-400" />
            </div>
          )}
        </div>
      </div>

      {/* Title */}
      <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
        {issue.title}
      </h3>

      {/* AI Summary */}
      {issue.aiSummary && (
        <div className="mb-3 p-3 bg-purple-50 dark:bg-purple-900/20 rounded-lg border border-purple-200 dark:border-purple-800">
          <div className="flex items-center space-x-2 mb-1">
            <Zap className="w-4 h-4 text-purple-600 dark:text-purple-400" />
            <span className="text-sm font-medium text-purple-700 dark:text-purple-300">AI Summary</span>
          </div>
          <p className="text-sm text-purple-600 dark:text-purple-300">{issue.aiSummary}</p>
        </div>
      )}

      {/* Description Preview */}
      <p className="text-gray-600 dark:text-gray-300 text-sm mb-4 line-clamp-2">
        {issue.body.length > 150 ? `${issue.body.substring(0, 150)}...` : issue.body}
      </p>

      {/* Tags */}
      <div className="flex flex-wrap gap-2 mb-4">
        {issue.tags.slice(0, 3).map((tag) => (
          <span
            key={tag}
            className="inline-flex items-center px-2 py-1 text-xs font-medium bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 rounded-full"
          >
            <TagIcon className="w-3 h-3 mr-1" />
            {tag}
          </span>
        ))}
        {issue.tags.length > 3 && (
          <span className="inline-flex items-center px-2 py-1 text-xs font-medium bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-400 rounded-full">
            +{issue.tags.length - 3} more
          </span>
        )}
      </div>

      {/* Footer */}
      <div className="flex items-center justify-between text-sm text-gray-500 dark:text-gray-400">
        <div className="flex items-center space-x-4">
          <div className="flex items-center space-x-1">
            <Calendar className="w-4 h-4" />
            <span>{formatDate(issue.createdAt)}</span>
          </div>
          <div className="flex items-center space-x-1">
            <MessageCircle className="w-4 h-4" />
            <span>{issue.comments}</span>
          </div>
        </div>
        
        <div className="flex items-center space-x-2">
          {issue.assignee && (
            <div className="flex items-center space-x-1">
              <User className="w-4 h-4" />
              <img
                src={issue.assignee.avatar_url}
                alt={issue.assignee.login}
                className="w-5 h-5 rounded-full"
              />
            </div>
          )}
          <span className="text-xs bg-gray-100 dark:bg-gray-700 px-2 py-1 rounded">
            {issue.repository.name}
          </span>
        </div>
      </div>
    </div>
  );
}