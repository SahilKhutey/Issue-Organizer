import React from 'react';
import { X, Filter } from 'lucide-react';
import { FilterOptions } from '../../types';

interface FilterPanelProps {
  filters: FilterOptions;
  onFiltersChange: (filters: FilterOptions) => void;
  availableOptions: {
    priorities: string[];
    tags: string[];
    assignees: string[];
    states: string[];
    repositories: string[];
  };
  isOpen: boolean;
  onToggle: () => void;
}

export function FilterPanel({ 
  filters, 
  onFiltersChange, 
  availableOptions, 
  isOpen, 
  onToggle 
}: FilterPanelProps) {
  const updateFilter = (key: keyof FilterOptions, values: string[]) => {
    onFiltersChange({
      ...filters,
      [key]: values
    });
  };

  const clearAllFilters = () => {
    onFiltersChange({
      priority: [],
      tags: [],
      assignee: [],
      state: [],
      repository: []
    });
  };

  const activeFilterCount = Object.values(filters).reduce((sum, arr) => sum + arr.length, 0);

  if (!isOpen) {
    return (
      <button
        onClick={onToggle}
        className="flex items-center space-x-2 px-4 py-2 text-sm font-medium text-gray-700 dark:text-gray-300 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-lg hover:shadow-md transition-all duration-200"
      >
        <Filter className="w-4 h-4" />
        <span>Filters</span>
        {activeFilterCount > 0 && (
          <span className="px-2 py-1 text-xs bg-blue-500 text-white rounded-full">
            {activeFilterCount}
          </span>
        )}
      </button>
    );
  }

  return (
    <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg shadow-lg p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <Filter className="w-5 h-5 text-gray-600 dark:text-gray-400" />
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Filters</h3>
          {activeFilterCount > 0 && (
            <span className="px-2 py-1 text-xs bg-blue-500 text-white rounded-full">
              {activeFilterCount}
            </span>
          )}
        </div>
        <div className="flex items-center space-x-2">
          {activeFilterCount > 0 && (
            <button
              onClick={clearAllFilters}
              className="text-sm text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200 transition-colors"
            >
              Clear all
            </button>
          )}
          <button
            onClick={onToggle}
            className="p-1 text-gray-400 hover:text-gray-600 dark:hover:text-gray-200 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>
      </div>

      {/* Filter Groups */}
      <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
        {/* Priority */}
        <div>
          <h4 className="text-sm font-medium text-gray-900 dark:text-white mb-3">Priority</h4>
          <div className="space-y-2">
            {availableOptions.priorities.map((priority) => (
              <label key={priority} className="flex items-center">
                <input
                  type="checkbox"
                  checked={filters.priority.includes(priority)}
                  onChange={(e) => {
                    if (e.target.checked) {
                      updateFilter('priority', [...filters.priority, priority]);
                    } else {
                      updateFilter('priority', filters.priority.filter(p => p !== priority));
                    }
                  }}
                  className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                />
                <span className="ml-2 text-sm text-gray-700 dark:text-gray-300 capitalize">
                  {priority}
                </span>
              </label>
            ))}
          </div>
        </div>

        {/* State */}
        <div>
          <h4 className="text-sm font-medium text-gray-900 dark:text-white mb-3">State</h4>
          <div className="space-y-2">
            {availableOptions.states.map((state) => (
              <label key={state} className="flex items-center">
                <input
                  type="checkbox"
                  checked={filters.state.includes(state)}
                  onChange={(e) => {
                    if (e.target.checked) {
                      updateFilter('state', [...filters.state, state]);
                    } else {
                      updateFilter('state', filters.state.filter(s => s !== state));
                    }
                  }}
                  className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                />
                <span className="ml-2 text-sm text-gray-700 dark:text-gray-300 capitalize">
                  {state}
                </span>
              </label>
            ))}
          </div>
        </div>

        {/* Repository */}
        <div>
          <h4 className="text-sm font-medium text-gray-900 dark:text-white mb-3">Repository</h4>
          <div className="space-y-2 max-h-32 overflow-y-auto">
            {availableOptions.repositories.map((repo) => (
              <label key={repo} className="flex items-center">
                <input
                  type="checkbox"
                  checked={filters.repository.includes(repo)}
                  onChange={(e) => {
                    if (e.target.checked) {
                      updateFilter('repository', [...filters.repository, repo]);
                    } else {
                      updateFilter('repository', filters.repository.filter(r => r !== repo));
                    }
                  }}
                  className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                />
                <span className="ml-2 text-sm text-gray-700 dark:text-gray-300">
                  {repo}
                </span>
              </label>
            ))}
          </div>
        </div>
      </div>

      {/* Tags Section */}
      <div>
        <h4 className="text-sm font-medium text-gray-900 dark:text-white mb-3">Tags</h4>
        <div className="flex flex-wrap gap-2 max-h-32 overflow-y-auto">
          {availableOptions.tags.map((tag) => (
            <label
              key={tag}
              className={`inline-flex items-center px-3 py-1 text-sm font-medium rounded-full cursor-pointer transition-colors ${
                filters.tags.includes(tag)
                  ? 'bg-blue-500 text-white'
                  : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600'
              }`}
            >
              <input
                type="checkbox"
                checked={filters.tags.includes(tag)}
                onChange={(e) => {
                  if (e.target.checked) {
                    updateFilter('tags', [...filters.tags, tag]);
                  } else {
                    updateFilter('tags', filters.tags.filter(t => t !== tag));
                  }
                }}
                className="sr-only"
              />
              {tag}
            </label>
          ))}
        </div>
      </div>

      {/* Assignees Section */}
      <div>
        <h4 className="text-sm font-medium text-gray-900 dark:text-white mb-3">Assignees</h4>
        <div className="space-y-2 max-h-32 overflow-y-auto">
          {availableOptions.assignees.map((assignee) => (
            <label key={assignee} className="flex items-center">
              <input
                type="checkbox"
                checked={filters.assignee.includes(assignee)}
                onChange={(e) => {
                  if (e.target.checked) {
                    updateFilter('assignee', [...filters.assignee, assignee]);
                  } else {
                    updateFilter('assignee', filters.assignee.filter(a => a !== assignee));
                  }
                }}
                className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
              />
              <span className="ml-2 text-sm text-gray-700 dark:text-gray-300">
                @{assignee}
              </span>
            </label>
          ))}
        </div>
      </div>
    </div>
  );
}