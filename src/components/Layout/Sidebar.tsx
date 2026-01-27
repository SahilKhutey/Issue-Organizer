import React, { useState } from 'react';
import { 
  Home, 
  Filter, 
  BarChart3, 
  Settings, 
  Github, 
  Menu,
  X,
  ChevronDown,
  ChevronRight,
  Zap,
  Tag,
  Users,
  Code
} from 'lucide-react';
import { User } from 'lucide-react';

interface SidebarProps {
  activeView: string;
  onViewChange: (view: string) => void;
}

export function Sidebar({ activeView, onViewChange }: SidebarProps) {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [expandedSections, setExpandedSections] = useState({
    main: true,
    organization: true,
    settings: true
  });

  const toggleSection = (section: keyof typeof expandedSections) => {
    setExpandedSections(prev => ({
      ...prev,
      [section]: !prev[section]
    }));
  };

  const menuItems = {
    main: [
      { id: 'dashboard', icon: Home, label: 'Dashboard', count: null },
      { id: 'issues', icon: Github, label: 'All Issues', count: 42 },
      { id: 'ai-analysis', icon: Zap, label: 'AI Analysis', count: null },
      { id: 'code-review', icon: Code, label: 'Code Review', count: null }
    ],
    organization: [
      { id: 'filters', icon: Filter, label: 'Filters', count: null },
      { id: 'tags', icon: Tag, label: 'Tags', count: 18 },
      { id: 'assignees', icon: Users, label: 'Assignees', count: 5 }
    ],
    settings: [
      { id: 'analytics', icon: BarChart3, label: 'Analytics', count: null },
      { id: 'settings', icon: Settings, label: 'Settings', count: null }
    ]
  };

  return (
    <div className={`flex flex-col h-full bg-white dark:bg-gray-900 border-r border-gray-200 dark:border-gray-700 transition-all duration-300 ${
      isCollapsed ? 'w-16' : 'w-64'
    }`}>
      {/* Header */}
      <div className="flex items-center justify-between p-4 border-b border-gray-200 dark:border-gray-700">
        {!isCollapsed && (
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
              <Github className="w-5 h-5 text-white" />
            </div>
            <span className="font-semibold text-gray-900 dark:text-white">Issue Organizer</span>
          </div>
        )}
        <button
          onClick={() => setIsCollapsed(!isCollapsed)}
          className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
        >
          {isCollapsed ? <Menu className="w-5 h-5" /> : <X className="w-5 h-5" />}
        </button>
      </div>

      {/* Navigation */}
      <nav className="flex-1 overflow-y-auto p-4 space-y-6">
        {Object.entries(menuItems).map(([sectionKey, items]) => (
          <div key={sectionKey}>
            {!isCollapsed && (
              <button
                onClick={() => toggleSection(sectionKey as keyof typeof expandedSections)}
                className="flex items-center justify-between w-full text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider mb-3 hover:text-gray-700 dark:hover:text-gray-200 transition-colors"
              >
                <span>{sectionKey.replace(/([A-Z])/g, ' $1').trim()}</span>
                {expandedSections[sectionKey as keyof typeof expandedSections] ? (
                  <ChevronDown className="w-4 h-4" />
                ) : (
                  <ChevronRight className="w-4 h-4" />
                )}
              </button>
            )}
            
            {(isCollapsed || expandedSections[sectionKey as keyof typeof expandedSections]) && (
              <div className="space-y-1">
                {items.map((item) => (
                  <button
                    key={item.id}
                    onClick={() => onViewChange(item.id)}
                    className={`flex items-center w-full px-3 py-2 text-sm font-medium rounded-lg transition-all duration-200 ${
                      activeView === item.id
                        ? 'bg-blue-50 dark:bg-blue-900/20 text-blue-700 dark:text-blue-300 shadow-sm'
                        : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800'
                    }`}
                  >
                    <item.icon className={`w-5 h-5 ${isCollapsed ? 'mx-auto' : 'mr-3'}`} />
                    {!isCollapsed && (
                      <>
                        <span className="flex-1 text-left">{item.label}</span>
                        {item.count !== null && (
                          <span className="px-2 py-1 text-xs bg-gray-200 dark:bg-gray-700 text-gray-600 dark:text-gray-400 rounded-full">
                            {item.count}
                          </span>
                        )}
                      </>
                    )}
                  </button>
                ))}
              </div>
            )}
          </div>
        ))}
      </nav>

      {/* Footer */}
      {!isCollapsed && (
        <div className="p-4 border-t border-gray-200 dark:border-gray-700">
          <div className="flex items-center space-x-3">
            <img
              src="https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=32&h=32&dpr=2"
              alt="User"
              className="w-8 h-8 rounded-full"
            />
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-gray-900 dark:text-white truncate">
                John Doe
              </p>
              <p className="text-xs text-gray-500 dark:text-gray-400 truncate">
                @johndoe
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}