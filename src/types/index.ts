export interface Issue {
  id: string;
  number: number;
  title: string;
  body: string;
  state: 'open' | 'closed';
  priority: 'low' | 'medium' | 'high' | 'urgent';
  tags: string[];
  assignee?: User;
  author: User;
  repository: Repository;
  createdAt: string;
  updatedAt: string;
  comments: number;
  aiSummary?: string;
  aiTags?: string[];
  aiPriority?: 'low' | 'medium' | 'high' | 'urgent';
  duplicateOf?: string;
  aiDraftComment?: string;
}

export interface User {
  id: string;
  login: string;
  avatar_url: string;
  name?: string;
}

export interface Repository {
  id: string;
  name: string;
  full_name: string;
  owner: User;
  private: boolean;
  language?: string;
}

export interface FilterOptions {
  priority: string[];
  tags: string[];
  assignee: string[];
  state: string[];
  repository: string[];
}

export type Theme = 'light' | 'dark' | 'system';

export interface AnalyticsData {
  totalIssues: number;
  openIssues: number;
  closedIssues: number;
  priorityDistribution: Record<string, number>;
  tagDistribution: Record<string, number>;
  resolutionRate: number;
  avgResolutionTime: number;
}

export interface CodeReview {
  id: string;
  title: string;
  code: string;
  language: string;
  fileName?: string;
  createdAt: string;
  updatedAt: string;
  author: User;
  aiSummary?: string;
  aiReview?: {
    overallScore: number;
    strengths: string[];
    improvements: string[];
    bugs: string[];
    security: string[];
    performance: string[];
    maintainability: string[];
  };
  status: 'pending' | 'reviewed' | 'approved' | 'needs-changes';
  tags: string[];
}

export type CodeAnalysisType = 'summary' | 'review' | 'bugs' | 'security' | 'performance' | 'style';

export interface UserProfile {
  id: string;
  username: string;
  email: string;
  name: string;
  avatar_url: string;
  bio?: string;
  location?: string;
  website?: string;
  company?: string;
  github_username?: string;
  github_connected: boolean;
  created_at: string;
  updated_at: string;
  preferences: {
    theme: Theme;
    notifications: {
      email: boolean;
      push: boolean;
      slack: boolean;
    };
    ai_analysis: {
      auto_analyze: boolean;
      priority_threshold: 'low' | 'medium' | 'high';
      summary_length: 'short' | 'medium' | 'detailed';
    };
    dashboard: {
      default_view: string;
      items_per_page: number;
      show_closed_issues: boolean;
    };
  };
  stats: {
    total_issues: number;
    issues_closed: number;
    code_reviews: number;
    ai_analyses: number;
    repositories_connected: number;
  };
}