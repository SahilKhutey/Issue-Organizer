import React, { useState } from 'react';
import { 
  Tag as TagIcon, 
  Users, 
  Archive, 
  CheckCircle,
  Zap,
  ChevronDown
} from 'lucide-react';

interface BatchActionsProps {
  selectedIssues: string[];
  onClearSelection: () => void;
  availableTags: string[];
  availableAssignees: string[];
}

export function BatchActions({ 
  selectedIssues, 
  onClearSelection,
  availableTags,
  availableAssignees 
}: BatchActionsProps) {
  const [showTagDropdown, setShowTagDropdown] = useState(false);
  const [showAssigneeDropdown, setShowAssigneeDropdown] = useState(false);

  if (selectedIssues.length === 0) return null;

  const handleBatchTag = (tag: string) => {
    console.log(`Adding tag "${tag}" to ${selectedIssues.length} issues`);
    setShowTagDropdown(false);
    // Implement batch tagging logic
  };

  const handleBatchAssign = (assignee: string) => {
    console.log(`Assigning "${assignee}" to ${selectedIssues.length} issues`);
    setShowAssigneeDropdown(false);
    // Implement batch assignment logic
  };

  const handleBatchAiAnalysis = () => {
    console.log(`Running AI analysis on ${selectedIssues.length} issues`);
    // Implement batch AI analysis logic
  };

  const handleBatchClose = () => {
    console.log(`Closing ${selectedIssues.length} issues`);
    // Implement batch close logic
  };

  const handleBatchArchive = () => {
    console.log(`Archiving ${selectedIssues.length} issues`);
    // Implement batch archive logic
  };

  return (
    <div className="fixed bottom-6 left-1/2 transform -translate-x-1/2 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg shadow-xl p-4 z-40">
      <div className="flex items-center space-x-4">
        <div className="flex items-center space-x-2">
          <span className="text-sm font-medium text-gray-900 dark:text-white">
            {selectedIssues.length} issue{selectedIssues.length !== 1 ? 's' : ''} selected
          </span>
          <button
            onClick={onClearSelection}
            className="text-sm text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200 transition-colors"
          >
            Clear
          </button>
        </div>

        <div className="flex items-center space-x-2">
          {/* Tag Dropdown */}
          <div className="relative">
            <button
              onClick={() => setShowTagDropdown(!showTagDropdown)}
              className="flex items-center space-x-2 px-3 py-2 text-sm font-medium text-gray-700 dark:text-gray-300 bg-gray-100 dark:bg-gray-700 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors"
            >
              <TagIcon className="w-4 h-4" />
              <span>Add Tag</span>
              <ChevronDown className="w-4 h-4" />
            </button>
            
            {showTagDropdown && (
              <div className="absolute bottom-full mb-2 left-0 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg shadow-lg py-2 z-50 min-w-48">
                {availableTags.slice(0, 10).map((tag) => (
                  <button
                    key={tag}
                    onClick={() => handleBatchTag(tag)}
                    className="w-full text-left px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
                  >
                    {tag}
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Assignee Dropdown */}
          <div className="relative">
            <button
              onClick={() => setShowAssigneeDropdown(!showAssigneeDropdown)}
              className="flex items-center space-x-2 px-3 py-2 text-sm font-medium text-gray-700 dark:text-gray-300 bg-gray-100 dark:bg-gray-700 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors"
            >
              <Users className="w-4 h-4" />
              <span>Assign</span>
              <ChevronDown className="w-4 h-4" />
            </button>
            
            {showAssigneeDropdown && (
              <div className="absolute bottom-full mb-2 left-0 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg shadow-lg py-2 z-50 min-w-48">
                {availableAssignees.slice(0, 10).map((assignee) => (
                  <button
                    key={assignee}
                    onClick={() => handleBatchAssign(assignee)}
                    className="w-full text-left px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
                  >
                    @{assignee}
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* AI Analysis */}
          <button
            onClick={handleBatchAiAnalysis}
            className="flex items-center space-x-2 px-3 py-2 text-sm font-medium text-purple-700 dark:text-purple-300 bg-purple-100 dark:bg-purple-900 rounded-lg hover:bg-purple-200 dark:hover:bg-purple-800 transition-colors"
          >
            <Zap className="w-4 h-4" />
            <span>AI Analysis</span>
          </button>

          {/* Close */}
          <button
            onClick={handleBatchClose}
            className="flex items-center space-x-2 px-3 py-2 text-sm font-medium text-green-700 dark:text-green-300 bg-green-100 dark:bg-green-900 rounded-lg hover:bg-green-200 dark:hover:bg-green-800 transition-colors"
          >
            <CheckCircle className="w-4 h-4" />
            <span>Close</span>
          </button>

          {/* Archive */}
          <button
            onClick={handleBatchArchive}
            className="flex items-center space-x-2 px-3 py-2 text-sm font-medium text-gray-700 dark:text-gray-300 bg-gray-100 dark:bg-gray-700 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors"
          >
            <Archive className="w-4 h-4" />
            <span>Archive</span>
          </button>
        </div>
      </div>
    </div>
  );
}