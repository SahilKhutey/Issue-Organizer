import React from 'react';
import { 
  AlertCircle, 
  CheckCircle, 
  Clock, 
  Zap,
  TrendingUp,
  Github,
  Tag,
  Users
} from 'lucide-react';
import { StatsCard } from './StatsCard';
import { IssueCard } from '../Issues/IssueCard';
import { mockIssues } from '../../data/mockData';
import { Issue } from '../../types';

interface DashboardProps {
  onIssueClick: (issue: Issue) => void;
}

export function Dashboard({ onIssueClick }: DashboardProps) {
  const openIssues = mockIssues.filter(issue => issue.state === 'open');
  const closedIssues = mockIssues.filter(issue => issue.state === 'closed');
  const highPriorityIssues = openIssues.filter(issue => issue.priority === 'high' || issue.priority === 'urgent');
  const aiAnalyzedIssues = mockIssues.filter(issue => issue.aiSummary);

  const recentIssues = [...mockIssues]
    .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
    .slice(0, 3);

  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Dashboard</h1>
        <p className="text-gray-600 dark:text-gray-400 mt-1">
          Overview of your issue management and AI analysis
        </p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatsCard
          title="Open Issues"
          value={openIssues.length}
          icon={Github}
          color="blue"
          trend={{ value: 12, isPositive: false }}
        />
        <StatsCard
          title="Closed Issues"
          value={closedIssues.length}
          icon={CheckCircle}
          color="green"
          trend={{ value: 8, isPositive: true }}
        />
        <StatsCard
          title="High Priority"
          value={highPriorityIssues.length}
          icon={AlertCircle}
          color="red"
          trend={{ value: 5, isPositive: false }}
        />
        <StatsCard
          title="AI Analyzed"
          value={aiAnalyzedIssues.length}
          icon={Zap}
          color="purple"
          trend={{ value: 15, isPositive: true }}
        />
      </div>

      {/* Charts Row */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Priority Distribution */}
        <div className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-6">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Priority Distribution</h3>
          <div className="space-y-4">
            {['urgent', 'high', 'medium', 'low'].map((priority) => {
              const count = openIssues.filter(issue => issue.priority === priority).length;
              const percentage = openIssues.length > 0 ? (count / openIssues.length) * 100 : 0;
              
              const colors = {
                urgent: 'bg-red-500',
                high: 'bg-orange-500',
                medium: 'bg-yellow-500',
                low: 'bg-green-500'
              };

              return (
                <div key={priority} className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <div className={`w-3 h-3 rounded-full ${colors[priority as keyof typeof colors]}`} />
                    <span className="text-sm font-medium text-gray-700 dark:text-gray-300 capitalize">
                      {priority}
                    </span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <div className="w-24 bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                      <div
                        className={`h-2 rounded-full ${colors[priority as keyof typeof colors]}`}
                        style={{ width: `${percentage}%` }}
                      />
                    </div>
                    <span className="text-sm text-gray-600 dark:text-gray-400 w-8 text-right">
                      {count}
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* AI Analysis Stats */}
        <div className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-6">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">AI Analysis Overview</h3>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <Zap className="w-5 h-5 text-purple-500" />
                <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                  Issues Analyzed
                </span>
              </div>
              <span className="text-sm font-bold text-gray-900 dark:text-white">
                {aiAnalyzedIssues.length}/{mockIssues.length}
              </span>
            </div>
            
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <Tag className="w-5 h-5 text-blue-500" />
                <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                  AI Tags Generated
                </span>
              </div>
              <span className="text-sm font-bold text-gray-900 dark:text-white">
                {mockIssues.reduce((sum, issue) => sum + (issue.aiTags?.length || 0), 0)}
              </span>
            </div>
            
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <TrendingUp className="w-5 h-5 text-green-500" />
                <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                  Accuracy Rate
                </span>
              </div>
              <span className="text-sm font-bold text-gray-900 dark:text-white">94%</span>
            </div>
          </div>
          
          <div className="mt-6 p-4 bg-purple-50 dark:bg-purple-900/20 rounded-lg">
            <p className="text-sm text-purple-700 dark:text-purple-300">
              AI has processed {aiAnalyzedIssues.length} issues this week, saving an estimated 
              <span className="font-semibold"> 3.2 hours</span> of manual review time.
            </p>
          </div>
        </div>
      </div>

      {/* Recent Issues */}
      <div>
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Recent Issues</h3>
          <button className="text-sm text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300 font-medium transition-colors">
            View all →
          </button>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
          {recentIssues.map((issue) => (
            <IssueCard
              key={issue.id}
              issue={issue}
              onClick={onIssueClick}
            />
          ))}
        </div>
      </div>
    </div>
  );
}