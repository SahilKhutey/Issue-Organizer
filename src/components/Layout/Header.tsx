import React from 'react';
import { Search, Bell, Sun, Moon, Monitor, Command } from 'lucide-react';
import { useTheme } from '../../hooks/useTheme';
import { motion } from 'framer-motion';

interface HeaderProps {
  searchQuery: string;
  onSearchChange: (query: string) => void;
}

export function Header({ searchQuery, onSearchChange }: HeaderProps) {
  const { theme, setTheme } = useTheme();

  const themeOptions = [
    { value: 'light', icon: Sun, label: 'Light' },
    { value: 'dark', icon: Moon, label: 'Dark' },
    { value: 'system', icon: Monitor, label: 'System' }
  ];

  return (
    <header className="glass-morphism border-b px-8 py-4 z-30 sticky top-0">
      <div className="flex items-center justify-between gap-8">
        {/* Search */}
        <div className="flex-1 max-w-3xl">
          <div className="relative group">
            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
              <Search className="h-5 w-5 text-muted-foreground group-focus-within:text-primary transition-colors" />
            </div>
            <input
              type="text"
              placeholder="Search anything... (Ctrl + K)"
              value={searchQuery}
              onChange={(e) => onSearchChange(e.target.value)}
              className="block w-full pl-12 pr-16 py-2.5 bg-muted/50 border-none rounded-2xl text-sm placeholder:text-muted-foreground focus:ring-2 focus:ring-primary/20 focus:bg-background transition-all"
            />
            <div className="absolute inset-y-0 right-0 pr-4 flex items-center pointer-events-none">
              <div className="flex items-center gap-1 px-1.5 py-0.5 rounded border bg-background text-[10px] font-medium text-muted-foreground uppercase tracking-wider">
                <Command className="h-3 w-3" />
                <span>K</span>
              </div>
            </div>
          </div>
        </div>

        {/* Actions */}
        <div className="flex items-center space-x-2">
          {/* Theme Toggle */}
          <div className="flex items-center bg-muted/50 rounded-2xl p-1">
            {themeOptions.map((option) => (
              <button
                key={option.value}
                onClick={() => setTheme(option.value as any)}
                className={`p-2 rounded-xl transition-all ${
                  theme === option.value
                    ? 'bg-background shadow-sm text-primary'
                    : 'text-muted-foreground hover:text-foreground'
                }`}
                title={option.label}
              >
                <option.icon className="h-4 w-4" />
              </button>
            ))}
          </div>

          <div className="w-px h-6 bg-border mx-2" />

          {/* Notifications */}
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="relative p-2.5 text-muted-foreground hover:text-foreground hover:bg-muted rounded-2xl transition-all"
          >
            <Bell className="w-5 h-5" />
            <span className="absolute top-2 right-2 w-2 h-2 bg-destructive rounded-full border-2 border-background animate-pulse"></span>
          </motion.button>

          {/* Quick Action Button */}
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="ml-2 px-5 py-2.5 bg-primary text-primary-foreground font-semibold rounded-2xl shadow-lg shadow-primary/20 hover:shadow-primary/30 transition-all text-sm"
          >
            New Issue
          </motion.button>
        </div>
      </div>
    </header>
  );
}