import React, { useState } from 'react';
import { 
  Tag as TagIcon, 
  Users, 
  Archive, 
  CheckCircle,
  Zap,
  ChevronDown,
  X
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

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

  return (
    <AnimatePresence>
      {selectedIssues.length > 0 && (
        <motion.div 
          initial={{ y: 100, x: '-50%', opacity: 0 }}
          animate={{ y: 0, x: '-50%', opacity: 1 }}
          exit={{ y: 100, x: '-50%', opacity: 0 }}
          className="fixed bottom-10 left-1/2 z-50 glass-morphism-heavy rounded-[2rem] border shadow-2xl p-4 min-w-[600px]"
        >
          <div className="flex items-center justify-between gap-8 px-4">
            <div className="flex items-center gap-4">
              <div className="flex items-center justify-center w-12 h-12 bg-primary text-primary-foreground rounded-2xl font-black text-xl shadow-lg shadow-primary/20">
                {selectedIssues.length}
              </div>
              <div>
                <p className="text-sm font-black uppercase tracking-widest text-foreground">Issues Selected</p>
                <button
                  onClick={onClearSelection}
                  className="text-xs font-bold text-muted-foreground hover:text-primary transition-colors"
                >
                  Deselect all
                </button>
              </div>
            </div>

            <div className="h-10 w-px bg-border mx-2" />

            <div className="flex items-center gap-2">
              {/* AI Analysis */}
              <ActionButton 
                onClick={() => console.log('AI Batch')}
                icon={Zap}
                label="AI Analyze"
                variant="purple"
              />

              {/* Tag Dropdown */}
              <div className="relative">
                <ActionButton 
                  onClick={() => setShowTagDropdown(!showTagDropdown)}
                  icon={TagIcon}
                  label="Add Tag"
                  hasDropdown
                />
                <AnimatePresence>
                  {showTagDropdown && (
                    <Dropdown
                      items={availableTags}
                      onSelect={(tag) => {
                        console.log(tag);
                        setShowTagDropdown(false);
                      }}
                      onClose={() => setShowTagDropdown(false)}
                    />
                  )}
                </AnimatePresence>
              </div>

              {/* Assignee Dropdown */}
              <div className="relative">
                <ActionButton 
                  onClick={() => setShowAssigneeDropdown(!showAssigneeDropdown)}
                  icon={Users}
                  label="Assign"
                  hasDropdown
                />
                <AnimatePresence>
                  {showAssigneeDropdown && (
                    <Dropdown
                      items={availableAssignees}
                      prefix="@"
                      onSelect={(assignee) => {
                        console.log(assignee);
                        setShowAssigneeDropdown(false);
                      }}
                      onClose={() => setShowAssigneeDropdown(false)}
                    />
                  )}
                </AnimatePresence>
              </div>

              <div className="w-px h-6 bg-border mx-2" />

              <ActionButton 
                onClick={() => console.log('Batch Close')}
                icon={CheckCircle}
                label="Close"
                variant="green"
              />
              
              <button 
                onClick={onClearSelection}
                className="p-3 text-muted-foreground hover:text-destructive hover:bg-destructive/10 rounded-2xl transition-all"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

function ActionButton({ 
  onClick, 
  icon: Icon, 
  label, 
  variant = 'default',
  hasDropdown = false
}: { 
  onClick: () => void, 
  icon: any, 
  label: string, 
  variant?: 'default' | 'purple' | 'green',
  hasDropdown?: boolean
}) {
  const variants = {
    default: "bg-muted/50 text-foreground hover:bg-muted",
    purple: "bg-purple-500/10 text-purple-500 hover:bg-purple-500/20",
    green: "bg-green-500/10 text-green-500 hover:bg-green-500/20"
  };

  return (
    <button
      onClick={onClick}
      className={cn(
        "flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-bold transition-all",
        variants[variant]
      )}
    >
      <Icon className="w-4 h-4" />
      <span>{label}</span>
      {hasDropdown && <ChevronDown className="w-3.5 h-3.5 opacity-50" />}
    </button>
  );
}

function Dropdown({ items, onSelect, onClose, prefix = "" }: { items: string[], onSelect: (val: string) => void, onClose: () => void, prefix?: string }) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95, y: -10 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.95, y: -10 }}
      className="absolute bottom-full mb-4 left-0 w-56 glass-morphism-heavy rounded-2xl border shadow-2xl py-2 overflow-hidden"
    >
      <div className="max-h-60 overflow-y-auto scrollbar-thin pr-1">
        {items.map((item) => (
          <button
            key={item}
            onClick={() => onSelect(item)}
            className="w-full text-left px-4 py-2.5 text-sm font-bold text-muted-foreground hover:text-primary hover:bg-primary/5 transition-all"
          >
            {prefix}{item}
          </button>
        ))}
      </div>
    </motion.div>
  );
}

function cn(...inputs: any[]) {
  return inputs.filter(Boolean).join(' ');
}