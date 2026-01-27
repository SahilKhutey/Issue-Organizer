import React, { useState } from 'react';
import { 
  Calendar, 
  MessageCircle, 
  User, 
  Tag as TagIcon, 
  AlertCircle,
  CheckCircle,
  Clock,
  Zap,
  X,
  Edit,
  Send,
  Copy,
  ExternalLink
} from 'lucide-react';
import { Issue } from '../../types';

interface IssueDetailProps {
  issue: Issue;
  onClose: () => void;
}

export function IssueDetail({ issue, onClose }: IssueDetailProps) {
  const [showAiComment, setShowAiComment] = useState(false);
  const [editingComment, setEditingComment] = useState(false);
  const [aiComment, setAiComment] = useState(issue.aiDraftComment || '');

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
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white dark:bg-gray-900 rounded-lg shadow-xl max-w-4xl w-full max-h-[90vh] overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-200 dark:border-gray-700">
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-2">
              <span className="text-lg font-semibold text-gray-500 dark:text-gray-400">
                #{issue.number}
              </span>
              <span className={`inline-flex items-center px-3 py-1 text-sm font-medium rounded-full ${priorityConfig[issue.priority].color}`}>
                <PriorityIcon className="w-4 h-4 mr-1" />
                {issue.priority}
              </span>
              {issue.state === 'closed' && (
                <span className="inline-flex items-center px-3 py-1 text-sm font-medium bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200 rounded-full">
                  <CheckCircle className="w-4 h-4 mr-1" />
                  Closed
                </span>
              )}
            </div>
          </div>
          
          <div className="flex items-center space-x-2">
            <button 
              onClick={() => copyToClipboard(window.location.href)}
              className="p-2 text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
            >
              <Copy className="w-5 h-5" />
            </button>
            <button className="p-2 text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors">
              <ExternalLink className="w-5 h-5" />
            </button>
            <button 
              onClick={onClose}
              className="p-2 text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Content */}
        <div className="overflow-y-auto max-h-[calc(90vh-120px)]">
          <div className="p-6">
            {/* Title */}
            <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
              {issue.title}
            </h1>

            {/* AI Analysis */}
            {issue.aiSummary && (
              <div className="mb-6 p-4 bg-purple-50 dark:bg-purple-900/20 rounded-lg border border-purple-200 dark:border-purple-800">
                <div className="flex items-center space-x-2 mb-3">
                  <Zap className="w-5 h-5 text-purple-600 dark:text-purple-400" />
                  <h3 className="text-lg font-semibold text-purple-700 dark:text-purple-300">AI Analysis</h3>
                </div>
                <p className="text-purple-600 dark:text-purple-300 font-medium mb-3">{issue.aiSummary}</p>
                
                {issue.aiTags && issue.aiTags.length > 0 && (
                  <div className="mb-3">
                    <h4 className="text-sm font-medium text-purple-700 dark:text-purple-300 mb-2">Suggested Tags:</h4>
                    <div className="flex flex-wrap gap-2">
                      {issue.aiTags.map((tag) => (
                        <span
                          key={tag}
                          className="inline-flex items-center px-2 py-1 text-xs font-medium bg-purple-100 dark:bg-purple-800 text-purple-800 dark:text-purple-200 rounded-full"
                        >
                          <TagIcon className="w-3 h-3 mr-1" />
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                )}

                {issue.aiPriority && issue.aiPriority !== issue.priority && (
                  <div className="text-sm text-purple-600 dark:text-purple-400">
                    <strong>AI Suggested Priority:</strong> {issue.aiPriority}
                  </div>
                )}
              </div>
            )}

            {/* Metadata */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
              <div className="space-y-4">
                <div className="flex items-center space-x-3">
                  <User className="w-5 h-5 text-gray-400" />
                  <div className="flex items-center space-x-2">
                    <img
                      src={issue.author.avatar_url}
                      alt={issue.author.login}
                      className="w-6 h-6 rounded-full"
                    />
                    <span className="text-gray-900 dark:text-white font-medium">{issue.author.name || issue.author.login}</span>
                    <span className="text-gray-500 dark:text-gray-400">opened this issue</span>
                  </div>
                </div>
                
                {issue.assignee && (
                  <div className="flex items-center space-x-3">
                    <User className="w-5 h-5 text-gray-400" />
                    <div className="flex items-center space-x-2">
                      <img
                        src={issue.assignee.avatar_url}
                        alt={issue.assignee.login}
                        className="w-6 h-6 rounded-full"
                      />
                      <span className="text-gray-900 dark:text-white font-medium">{issue.assignee.name || issue.assignee.login}</span>
                      <span className="text-gray-500 dark:text-gray-400">assigned</span>
                    </div>
                  </div>
                )}
              </div>

              <div className="space-y-4">
                <div className="flex items-center space-x-3">
                  <Calendar className="w-5 h-5 text-gray-400" />
                  <div>
                    <span className="text-gray-500 dark:text-gray-400">Created: </span>
                    <span className="text-gray-900 dark:text-white">{formatDate(issue.createdAt)}</span>
                  </div>
                </div>
                
                <div className="flex items-center space-x-3">
                  <MessageCircle className="w-5 h-5 text-gray-400" />
                  <span className="text-gray-900 dark:text-white">{issue.comments} comments</span>
                </div>
              </div>
            </div>

            {/* Tags */}
            <div className="mb-6">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">Tags</h3>
              <div className="flex flex-wrap gap-2">
                {issue.tags.map((tag) => (
                  <span
                    key={tag}
                    className="inline-flex items-center px-3 py-1 text-sm font-medium bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 rounded-full"
                  >
                    <TagIcon className="w-4 h-4 mr-1" />
                    {tag}
                  </span>
                ))}
              </div>
            </div>

            {/* Description */}
            <div className="mb-6">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">Description</h3>
              <div className="prose prose-gray dark:prose-invert max-w-none bg-gray-50 dark:bg-gray-800 rounded-lg p-4">
                <p className="whitespace-pre-wrap">{issue.body}</p>
              </div>
            </div>

            {/* AI Draft Comment */}
            {issue.aiDraftComment && (
              <div className="mb-6">
                <div className="flex items-center justify-between mb-3">
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white">AI Draft Response</h3>
                  <button
                    onClick={() => setShowAiComment(!showAiComment)}
                    className="px-4 py-2 text-sm font-medium text-purple-700 dark:text-purple-300 bg-purple-100 dark:bg-purple-900 rounded-lg hover:bg-purple-200 dark:hover:bg-purple-800 transition-colors"
                  >
                    {showAiComment ? 'Hide' : 'Show'} AI Response
                  </button>
                </div>
                
                {showAiComment && (
                  <div className="bg-purple-50 dark:bg-purple-900/20 rounded-lg border border-purple-200 dark:border-purple-800 p-4">
                    {editingComment ? (
                      <div>
                        <textarea
                          value={aiComment}
                          onChange={(e) => setAiComment(e.target.value)}
                          className="w-full h-32 p-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white resize-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                          placeholder="Edit AI-generated response..."
                        />
                        <div className="flex items-center space-x-2 mt-3">
                          <button
                            onClick={() => setEditingComment(false)}
                            className="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors flex items-center space-x-2"
                          >
                            <Send className="w-4 h-4" />
                            <span>Post Comment</span>
                          </button>
                          <button
                            onClick={() => setEditingComment(false)}
                            className="px-4 py-2 text-gray-600 dark:text-gray-400 border border-gray-300 dark:border-gray-600 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
                          >
                            Cancel
                          </button>
                        </div>
                      </div>
                    ) : (
                      <div>
                        <p className="text-purple-700 dark:text-purple-300 mb-3">{aiComment}</p>
                        <button
                          onClick={() => setEditingComment(true)}
                          className="px-4 py-2 text-sm font-medium text-purple-700 dark:text-purple-300 border border-purple-300 dark:border-purple-600 rounded-lg hover:bg-purple-100 dark:hover:bg-purple-800 transition-colors flex items-center space-x-2"
                        >
                          <Edit className="w-4 h-4" />
                          <span>Edit & Post</span>
                        </button>
                      </div>
                    )}
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}