import React from 'react';
import { cn } from '../../utils/cn';
import { X, Filter, RotateCcw, Check } from 'lucide-react';
import { FilterOptions } from '../../types';
import { motion, AnimatePresence } from 'framer-motion';

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

  return (
    <div className="space-y-4">
      <motion.button
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        onClick={onToggle}
        className={cn(
          "flex items-center gap-2 px-5 py-2.5 text-sm font-bold rounded-2xl transition-all border shadow-sm",
          isOpen || activeFilterCount > 0
            ? "bg-primary text-primary-foreground border-primary"
            : "bg-background text-muted-foreground border-border hover:text-foreground"
        )}
      >
        <Filter className="w-4 h-4" />
        <span>Filters</span>
        {activeFilterCount > 0 && (
          <span className="flex items-center justify-center w-5 h-5 text-[10px] bg-background text-primary rounded-full font-black">
            {activeFilterCount}
          </span>
        )}
      </motion.button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10, height: 0 }}
            animate={{ opacity: 1, y: 0, height: 'auto' }}
            exit={{ opacity: 0, y: -10, height: 0 }}
            className="glass-morphism rounded-[2.5rem] border shadow-2xl overflow-hidden"
          >
            <div className="p-8 space-y-10">
              {/* Header */}
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <h3 className="text-xl font-bold tracking-tight">Advanced Filtering</h3>
                  {activeFilterCount > 0 && (
                    <span className="px-3 py-1 bg-primary/10 text-primary text-[10px] font-black rounded-full uppercase tracking-widest">
                      {activeFilterCount} Active
                    </span>
                  )}
                </div>
                <div className="flex items-center gap-4">
                  {activeFilterCount > 0 && (
                    <button
                      onClick={clearAllFilters}
                      className="flex items-center gap-2 text-xs font-bold text-muted-foreground hover:text-destructive transition-colors uppercase tracking-widest"
                    >
                      <RotateCcw className="w-3.5 h-3.5" />
                      Reset
                    </button>
                  )}
                  <button
                    onClick={onToggle}
                    className="p-2 text-muted-foreground hover:text-foreground hover:bg-muted rounded-xl transition-all"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>
              </div>

              {/* Filter Groups */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-8">
                {/* Priority */}
                <FilterGroup title="Priority">
                  <div className="flex flex-col gap-2">
                    {availableOptions.priorities.map((priority) => (
                      <FilterCheckbox
                        key={priority}
                        label={priority}
                        checked={filters.priority.includes(priority)}
                        onChange={(checked) => {
                          updateFilter('priority', checked 
                            ? [...filters.priority, priority]
                            : filters.priority.filter(p => p !== priority)
                          );
                        }}
                      />
                    ))}
                  </div>
                </FilterGroup>

                {/* State */}
                <FilterGroup title="Current State">
                  <div className="flex flex-col gap-2">
                    {availableOptions.states.map((state) => (
                      <FilterCheckbox
                        key={state}
                        label={state}
                        checked={filters.state.includes(state)}
                        onChange={(checked) => {
                          updateFilter('state', checked 
                            ? [...filters.state, state]
                            : filters.state.filter(s => s !== state)
                          );
                        }}
                      />
                    ))}
                  </div>
                </FilterGroup>

                {/* Repository */}
                <FilterGroup title="Repositories">
                  <div className="flex flex-col gap-2 max-h-48 overflow-y-auto pr-2 scrollbar-thin">
                    {availableOptions.repositories.map((repo) => (
                      <FilterCheckbox
                        key={repo}
                        label={repo}
                        checked={filters.repository.includes(repo)}
                        onChange={(checked) => {
                          updateFilter('repository', checked 
                            ? [...filters.repository, repo]
                            : filters.repository.filter(r => r !== repo)
                          );
                        }}
                      />
                    ))}
                  </div>
                </FilterGroup>

                {/* Tags */}
                <FilterGroup title="Intelligent Tags" className="md:col-span-2">
                  <div className="flex flex-wrap gap-2 max-h-48 overflow-y-auto pr-2 scrollbar-thin">
                    {availableOptions.tags.map((tag) => (
                      <button
                        key={tag}
                        onClick={() => {
                          const isIncluded = filters.tags.includes(tag);
                          updateFilter('tags', isIncluded
                            ? filters.tags.filter(t => t !== tag)
                            : [...filters.tags, tag]
                          );
                        }}
                        className={cn(
                          "px-4 py-1.5 text-xs font-bold rounded-xl border transition-all uppercase tracking-widest",
                          filters.tags.includes(tag)
                            ? "bg-primary border-primary text-primary-foreground shadow-lg shadow-primary/20"
                            : "bg-muted/50 border-transparent text-muted-foreground hover:border-primary/50 hover:text-primary"
                        )}
                      >
                        {tag}
                      </button>
                    ))}
                  </div>
                </FilterGroup>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

function FilterGroup({ title, children, className }: { title: string, children: React.ReactNode, className?: string }) {
  return (
    <div className={cn("space-y-4", className)}>
      <h4 className="text-[10px] font-black uppercase tracking-[0.2em] text-muted-foreground/50">{title}</h4>
      {children}
    </div>
  );
}

function FilterCheckbox({ label, checked, onChange }: { label: string, checked: boolean, onChange: (checked: boolean) => void }) {
  return (
    <label className="flex items-center gap-3 cursor-pointer group">
      <div 
        onClick={() => onChange(!checked)}
        className={cn(
          "w-5 h-5 rounded-lg border-2 flex items-center justify-center transition-all",
          checked 
            ? "bg-primary border-primary text-primary-foreground" 
            : "border-muted group-hover:border-primary/50"
        )}
      >
        {checked && <Check className="w-3 h-3 stroke-[4]" />}
      </div>
      <span className={cn(
        "text-sm font-bold transition-colors capitalize",
        checked ? "text-foreground" : "text-muted-foreground group-hover:text-foreground"
      )}>
        {label}
      </span>
    </label>
  );
}