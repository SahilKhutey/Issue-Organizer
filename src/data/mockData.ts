import { Issue, Repository, User } from '../types';
import { CodeReview } from '../types';

export const mockUsers: User[] = [
  {
    id: '1',
    login: 'johndoe',
    avatar_url: 'https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=64&h=64&dpr=2',
    name: 'John Doe'
  },
  {
    id: '2', 
    login: 'janedoe',
    avatar_url: 'https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg?auto=compress&cs=tinysrgb&w=64&h=64&dpr=2',
    name: 'Jane Doe'
  },
  {
    id: '3',
    login: 'devuser',
    avatar_url: 'https://images.pexels.com/photos/91227/pexels-photo-91227.jpeg?auto=compress&cs=tinysrgb&w=64&h=64&dpr=2',
    name: 'Dev User'
  }
];

export const mockRepositories: Repository[] = [
  {
    id: '1',
    name: 'awesome-project',
    full_name: 'johndoe/awesome-project',
    owner: mockUsers[0],
    private: false,
    language: 'TypeScript'
  },
  {
    id: '2',
    name: 'react-components',
    full_name: 'janedoe/react-components',
    owner: mockUsers[1],
    private: false,
    language: 'JavaScript'
  },
  {
    id: '3',
    name: 'backend-api',
    full_name: 'devuser/backend-api',
    owner: mockUsers[2],
    private: true,
    language: 'Python'
  }
];

export const mockIssues: Issue[] = [
  {
    id: '1',
    number: 42,
    title: 'Login form validation not working properly',
    body: 'When users try to login with invalid credentials, the form doesn\'t show proper error messages. Sometimes it shows "undefined" instead of the actual error message. This is causing confusion for users trying to access their accounts.',
    state: 'open',
    priority: 'high',
    tags: ['bug', 'frontend', 'authentication'],
    assignee: mockUsers[0],
    author: mockUsers[1],
    repository: mockRepositories[0],
    createdAt: '2024-01-15T10:30:00Z',
    updatedAt: '2024-01-15T14:20:00Z',
    comments: 3,
    aiSummary: 'Login form displays "undefined" error messages instead of proper validation feedback when credentials are invalid.',
    aiTags: ['bug', 'ui', 'validation', 'authentication'],
    aiPriority: 'high',
    aiDraftComment: 'Thanks for reporting this issue! This seems to be related to our error handling in the authentication flow. I\'ll investigate the validation logic and get back to you with a fix.'
  },
  {
    id: '2',
    number: 38,
    title: 'Add dark mode toggle to settings page',
    body: 'Users have been requesting a dark mode option. We should add a toggle switch in the settings page that allows users to switch between light and dark themes. The preference should be saved in localStorage.',
    state: 'open',
    priority: 'medium',
    tags: ['enhancement', 'ui', 'settings'],
    author: mockUsers[2],
    repository: mockRepositories[0],
    createdAt: '2024-01-12T09:15:00Z',
    updatedAt: '2024-01-14T16:45:00Z',
    comments: 7,
    aiSummary: 'Feature request to implement dark mode toggle in settings with localStorage persistence.',
    aiTags: ['enhancement', 'theme', 'ui', 'user-experience'],
    aiPriority: 'medium',
    aiDraftComment: 'Great suggestion! Dark mode is definitely a popular feature request. I\'ll add this to our roadmap and look into implementing a theme system with toggle functionality.'
  },
  {
    id: '3',
    number: 35,
    title: 'Performance issue with large datasets',
    body: 'When loading tables with more than 1000 rows, the application becomes very slow and sometimes crashes. We need to implement pagination or virtual scrolling to handle large datasets efficiently.',
    state: 'open',
    priority: 'urgent',
    tags: ['performance', 'bug', 'optimization'],
    assignee: mockUsers[2],
    author: mockUsers[0],
    repository: mockRepositories[1],
    createdAt: '2024-01-10T08:00:00Z',
    updatedAt: '2024-01-15T11:30:00Z',
    comments: 12,
    aiSummary: 'Application performance degrades severely with large datasets (1000+ rows), requiring pagination or virtualization solution.',
    aiTags: ['performance', 'optimization', 'virtualization', 'critical'],
    aiPriority: 'urgent',
    aiDraftComment: 'This is definitely a critical performance issue. I\'ll prioritize implementing virtual scrolling for large datasets. In the meantime, let\'s add pagination as a quick fix.'
  },
  {
    id: '4',
    number: 29,
    title: 'Documentation for API endpoints',
    body: 'We need comprehensive documentation for all our API endpoints. This should include request/response examples, authentication requirements, and error codes.',
    state: 'open',
    priority: 'low',
    tags: ['documentation', 'api'],
    author: mockUsers[1],
    repository: mockRepositories[2],
    createdAt: '2024-01-08T14:20:00Z',
    updatedAt: '2024-01-08T14:20:00Z',
    comments: 2,
    aiSummary: 'Need to create comprehensive API documentation with examples, auth requirements, and error codes.',
    aiTags: ['documentation', 'api', 'developer-experience'],
    aiPriority: 'low',
    aiDraftComment: 'Absolutely! Good documentation is essential for API adoption. I\'ll start working on comprehensive docs with interactive examples.'
  },
  {
    id: '5',
    number: 51,
    title: 'Button styles inconsistent across components',
    body: 'Different button components have varying styles, colors, and hover effects. We need to standardize button designs according to our design system.',
    state: 'open',
    priority: 'medium',
    tags: ['design-system', 'ui', 'consistency'],
    assignee: mockUsers[1],
    author: mockUsers[2],
    repository: mockRepositories[0],
    createdAt: '2024-01-16T11:45:00Z',
    updatedAt: '2024-01-16T13:10:00Z',
    comments: 5,
    aiSummary: 'Button components lack consistent styling and need standardization according to design system.',
    aiTags: ['design-system', 'ui', 'consistency', 'components'],
    aiPriority: 'medium',
    aiDraftComment: 'Good catch! Consistency is key for a polished user experience. I\'ll audit all button components and create a standardized button system.'
  },
  {
    id: '6',
    number: 23,
    title: 'Add search functionality to issue tracker',
    body: 'Users should be able to search through issues by title, description, tags, and assignee. We need both simple text search and advanced filtering options.',
    state: 'closed',
    priority: 'high',
    tags: ['enhancement', 'search', 'completed'],
    assignee: mockUsers[0],
    author: mockUsers[1],
    repository: mockRepositories[1],
    createdAt: '2024-01-05T16:30:00Z',
    updatedAt: '2024-01-14T10:15:00Z',
    comments: 18,
    aiSummary: 'Implemented comprehensive search functionality with text search and advanced filtering capabilities.',
    aiTags: ['enhancement', 'search', 'filtering', 'completed'],
    aiPriority: 'high',
    aiDraftComment: 'This feature has been successfully implemented! Users can now search by title, description, tags, and use advanced filters.'
  }
];

export const mockCodeReviews: CodeReview[] = [
  {
    id: '1',
    title: 'User Authentication Component',
    code: `import React, { useState, useEffect } from 'react';
import { validateEmail, hashPassword } from '../utils/auth';

interface LoginFormProps {
  onLogin: (user: User) => void;
  onError: (error: string) => void;
}

export function LoginForm({ onLogin, onError }: LoginFormProps) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateEmail(email)) {
      onError('Invalid email format');
      return;
    }
    
    if (password.length < 8) {
      onError('Password must be at least 8 characters');
      return;
    }
    
    setIsLoading(true);
    
    try {
      const hashedPassword = await hashPassword(password);
      const response = await fetch('/api/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password: hashedPassword })
      });
      
      if (response.ok) {
        const user = await response.json();
        onLogin(user);
      } else {
        onError('Login failed');
      }
    } catch (error) {
      onError('Network error occurred');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <input
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="Email"
        required
      />
      <input
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        placeholder="Password"
        required
      />
      <button type="submit" disabled={isLoading}>
        {isLoading ? 'Logging in...' : 'Login'}
      </button>
    </form>
  );
}`,
    language: 'typescript',
    fileName: 'LoginForm.tsx',
    createdAt: '2024-01-16T10:30:00Z',
    updatedAt: '2024-01-16T10:30:00Z',
    author: mockUsers[0],
    aiSummary: 'A React TypeScript login form component with email validation, password hashing, and error handling. Includes loading states and proper form submission handling.',
    aiReview: {
      overallScore: 8.5,
      strengths: [
        'Good TypeScript typing with proper interfaces',
        'Proper form validation for email and password',
        'Loading state management',
        'Error handling for network requests',
        'Clean component structure'
      ],
      improvements: [
        'Add CSRF token protection',
        'Implement rate limiting for login attempts',
        'Add password strength indicator',
        'Consider using a form library like react-hook-form',
        'Add accessibility attributes (aria-labels, roles)'
      ],
      bugs: [
        'Password hashing should be done server-side, not client-side',
        'Missing error state cleanup when user starts typing again'
      ],
      security: [
        'Client-side password hashing is not secure',
        'Missing CSRF protection',
        'No rate limiting mentioned',
        'Consider implementing 2FA support'
      ],
      performance: [
        'Consider debouncing email validation',
        'Memoize validation functions if they become complex'
      ],
      maintainability: [
        'Extract validation logic to custom hooks',
        'Consider using a form validation library',
        'Add unit tests for form validation logic'
      ]
    },
    status: 'reviewed',
    tags: ['react', 'typescript', 'authentication', 'form-validation']
  },
  {
    id: '2',
    title: 'Database Query Optimization',
    code: `const getUsersWithPosts = async (limit = 10) => {
  const users = await User.findAll({
    include: [
      {
        model: Post,
        include: [
          {
            model: Comment,
            include: [User]
          }
        ]
      }
    ],
    limit
  });
  
  return users.map(user => ({
    id: user.id,
    name: user.name,
    email: user.email,
    posts: user.Posts.map(post => ({
      id: post.id,
      title: post.title,
      content: post.content,
      comments: post.Comments.map(comment => ({
        id: comment.id,
        text: comment.text,
        author: comment.User.name
      }))
    }))
  }));
};`,
    language: 'javascript',
    fileName: 'userService.js',
    createdAt: '2024-01-15T14:20:00Z',
    updatedAt: '2024-01-15T14:20:00Z',
    author: mockUsers[1],
    aiSummary: 'A database query function that fetches users with their posts and comments using Sequelize ORM with nested includes.',
    aiReview: {
      overallScore: 6.0,
      strengths: [
        'Uses proper async/await syntax',
        'Includes data transformation for clean output',
        'Parameterized limit for flexibility'
      ],
      improvements: [
        'Add pagination support (offset parameter)',
        'Implement proper error handling',
        'Add query result caching',
        'Consider using GraphQL for complex nested queries',
        'Add input validation for limit parameter'
      ],
      bugs: [
        'No error handling for database failures',
        'Potential N+1 query problem with nested includes',
        'Missing null checks for nested data'
      ],
      security: [
        'No input sanitization for limit parameter',
        'Missing authorization checks',
        'Potential data exposure without proper filtering'
      ],
      performance: [
        'N+1 query issue with deep nesting',
        'No query optimization or indexing mentioned',
        'Large result sets could cause memory issues',
        'Consider using separate queries with joins'
      ],
      maintainability: [
        'Extract data transformation to separate functions',
        'Add TypeScript for better type safety',
        'Consider using a query builder for complex queries'
      ]
    },
    status: 'needs-changes',
    tags: ['database', 'sequelize', 'performance', 'optimization']
  }
];

export const mockUserProfile: UserProfile = {
  id: '1',
  username: 'johndoe',
  email: 'john.doe@example.com',
  name: 'John Doe',
  avatar_url: 'https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=128&h=128&dpr=2',
  bio: 'Full-stack developer passionate about AI and automation. Building tools to make developers more productive.',
  location: 'San Francisco, CA',
  website: 'https://johndoe.dev',
  company: 'Tech Innovations Inc.',
  github_username: 'johndoe',
  github_connected: true,
  created_at: '2024-01-01T00:00:00Z',
  updated_at: '2024-01-16T10:30:00Z',
  preferences: {
    theme: 'system',
    notifications: {
      email: true,
      push: true,
      slack: false
    },
    ai_analysis: {
      auto_analyze: true,
      priority_threshold: 'medium',
      summary_length: 'medium'
    },
    dashboard: {
      default_view: 'dashboard',
      items_per_page: 20,
      show_closed_issues: false
    }
  },
  stats: {
    total_issues: 156,
    issues_closed: 89,
    code_reviews: 23,
    ai_analyses: 134,
    repositories_connected: 8
  }
};