import React, { useState } from 'react';
import { 
  User, 
  Mail, 
  MapPin, 
  Globe, 
  Building, 
  Github, 
  Calendar,
  Edit,
  Settings,
  BarChart3,
  Zap,
  CheckCircle,
  Code,
  GitBranch
} from 'lucide-react';
import { UserProfile } from '../../types';
import { ProfileEdit } from './ProfileEdit';
import { ProfileSettings } from './ProfileSettings';

interface ProfileViewProps {
  profile: UserProfile;
  onProfileUpdate: (profile: UserProfile) => void;
}

export function ProfileView({ profile, onProfileUpdate }: ProfileViewProps) {
  const [activeTab, setActiveTab] = useState<'overview' | 'edit' | 'settings'>('overview');

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { 
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const tabs = [
    { id: 'overview', label: 'Overview', icon: User },
    { id: 'edit', label: 'Edit Profile', icon: Edit },
    { id: 'settings', label: 'Settings', icon: Settings }
  ];

  const stats = [
    { label: 'Total Issues', value: profile.stats.total_issues, icon: BarChart3, color: 'text-blue-600 dark:text-blue-400' },
    { label: 'Issues Closed', value: profile.stats.issues_closed, icon: CheckCircle, color: 'text-green-600 dark:text-green-400' },
    { label: 'Code Reviews', value: profile.stats.code_reviews, icon: Code, color: 'text-purple-600 dark:text-purple-400' },
    { label: 'AI Analyses', value: profile.stats.ai_analyses, icon: Zap, color: 'text-yellow-600 dark:text-yellow-400' },
    { label: 'Repositories', value: profile.stats.repositories_connected, icon: GitBranch, color: 'text-gray-600 dark:text-gray-400' }
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Profile</h1>
        <p className="text-gray-600 dark:text-gray-400 mt-1">
          Manage your account settings and preferences
        </p>
      </div>

      {/* Profile Header */}
      <div className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-6">
        <div className="flex items-start space-x-6">
          <div className="relative">
            <img
              src={profile.avatar_url}
              alt={profile.name}
              className="w-24 h-24 rounded-full ring-4 ring-gray-200 dark:ring-gray-700"
            />
            {profile.github_connected && (
              <div className="absolute -bottom-2 -right-2 w-8 h-8 bg-green-500 rounded-full flex items-center justify-center ring-4 ring-white dark:ring-gray-800">
                <Github className="w-4 h-4 text-white" />
              </div>
            )}
          </div>
          
          <div className="flex-1">
            <div className="flex items-center space-x-3 mb-2">
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white">{profile.name}</h2>
              <span className="text-gray-500 dark:text-gray-400">@{profile.username}</span>
            </div>
            
            {profile.bio && (
              <p className="text-gray-600 dark:text-gray-300 mb-4 max-w-2xl">{profile.bio}</p>
            )}
            
            <div className="flex flex-wrap gap-4 text-sm text-gray-500 dark:text-gray-400">
              {profile.company && (
                <div className="flex items-center space-x-1">
                  <Building className="w-4 h-4" />
                  <span>{profile.company}</span>
                </div>
              )}
              {profile.location && (
                <div className="flex items-center space-x-1">
                  <MapPin className="w-4 h-4" />
                  <span>{profile.location}</span>
                </div>
              )}
              {profile.website && (
                <div className="flex items-center space-x-1">
                  <Globe className="w-4 h-4" />
                  <a 
                    href={profile.website} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="text-blue-600 dark:text-blue-400 hover:underline"
                  >
                    {profile.website.replace(/^https?:\/\//, '')}
                  </a>
                </div>
              )}
              <div className="flex items-center space-x-1">
                <Calendar className="w-4 h-4" />
                <span>Joined {formatDate(profile.created_at)}</span>
              </div>
            </div>
          </div>
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

      {/* Tab Content */}
      {activeTab === 'overview' && (
        <div className="space-y-6">
          {/* Stats Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-4">
            {stats.map((stat) => {
              const Icon = stat.icon;
              return (
                <div key={stat.label} className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-gray-600 dark:text-gray-400">{stat.label}</p>
                      <p className="text-2xl font-bold text-gray-900 dark:text-white mt-1">{stat.value}</p>
                    </div>
                    <Icon className={`w-6 h-6 ${stat.color}`} />
                  </div>
                </div>
              );
            })}
          </div>

          {/* GitHub Integration Status */}
          <div className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-6">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">GitHub Integration</h3>
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <div className={`w-3 h-3 rounded-full ${profile.github_connected ? 'bg-green-500' : 'bg-red-500'}`} />
                <div>
                  <p className="font-medium text-gray-900 dark:text-white">
                    {profile.github_connected ? 'Connected' : 'Not Connected'}
                  </p>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    {profile.github_connected 
                      ? `Connected as @${profile.github_username}` 
                      : 'Connect your GitHub account to sync repositories'
                    }
                  </p>
                </div>
              </div>
              <button className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                profile.github_connected
                  ? 'bg-red-100 dark:bg-red-900 text-red-700 dark:text-red-300 hover:bg-red-200 dark:hover:bg-red-800'
                  : 'bg-green-100 dark:bg-green-900 text-green-700 dark:text-green-300 hover:bg-green-200 dark:hover:bg-green-800'
              }`}>
                {profile.github_connected ? 'Disconnect' : 'Connect GitHub'}
              </button>
            </div>
          </div>

          {/* Recent Activity */}
          <div className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-6">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Recent Activity</h3>
            <div className="space-y-4">
              <div className="flex items-center space-x-3 p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
                <Zap className="w-5 h-5 text-purple-600 dark:text-purple-400" />
                <div>
                  <p className="text-sm font-medium text-gray-900 dark:text-white">AI analyzed 3 new issues</p>
                  <p className="text-xs text-gray-500 dark:text-gray-400">2 hours ago</p>
                </div>
              </div>
              <div className="flex items-center space-x-3 p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
                <CheckCircle className="w-5 h-5 text-green-600 dark:text-green-400" />
                <div>
                  <p className="text-sm font-medium text-gray-900 dark:text-white">Closed 2 issues in awesome-project</p>
                  <p className="text-xs text-gray-500 dark:text-gray-400">5 hours ago</p>
                </div>
              </div>
              <div className="flex items-center space-x-3 p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
                <Code className="w-5 h-5 text-blue-600 dark:text-blue-400" />
                <div>
                  <p className="text-sm font-medium text-gray-900 dark:text-white">Completed code review for LoginForm.tsx</p>
                  <p className="text-xs text-gray-500 dark:text-gray-400">1 day ago</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {activeTab === 'edit' && (
        <ProfileEdit profile={profile} onSave={onProfileUpdate} />
      )}

      {activeTab === 'settings' && (
        <ProfileSettings profile={profile} onSave={onProfileUpdate} />
      )}
    </div>
  );
}