import React from 'react';
import { cn } from '../../utils/cn';
import { 
  Calendar, 
  MessageCircle, 
  User, 
  Tag as TagIcon, 
  AlertCircle,
  CheckCircle,
  Clock,
  Zap,
  MoreHorizontal
} from 'lucide-react';
import { Issue } from '../../types';
import { motion } from 'framer-motion';

interface IssueCardProps {
  issue: Issue;
  isSelected?: boolean;
  onSelect?: (issueId: string) => void;
  onClick?: (issue: Issue) => void;
}

export function IssueCard({ issue, isSelected, onSelect, onClick }: IssueCardProps) {
  const priorityConfig = {
    urgent: { color: 'bg-destructive/10 text-destructive', icon: AlertCircle },
    high: { color: 'bg-orange-500/10 text-orange-500', icon: AlertCircle },
    medium: { color: 'bg-yellow-500/10 text-yellow-500', icon: Clock },
    low: { color: 'bg-green-500/10 text-green-500', icon: CheckCircle }
  };

  const PriorityIcon = priorityConfig[issue.priority].icon;

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { 
      month: 'short', 
      day: 'numeric'
    });
  };

  return (
    <motion.div 
      whileHover={{ y: -4, scale: 1.01 }}
      className={cn(
        "glass-morphism rounded-[2rem] p-7 transition-all duration-300 cursor-pointer group relative overflow-hidden",
        isSelected ? "ring-2 ring-primary border-primary" : "hover:shadow-2xl hover:shadow-primary/5"
      )}
      onClick={() => onClick?.(issue)}
    >
      {/* Selection Overlay */}
      {onSelect && (
        <div className="absolute top-6 left-6 z-10">
          <input
            type="checkbox"
            checked={isSelected}
            onChange={() => onSelect(issue.id)}
            onClick={(e) => e.stopPropagation()}
            className="w-5 h-5 rounded-lg border-2 border-muted bg-background text-primary focus:ring-primary transition-all cursor-pointer"
          />
        </div>
      )}

      {/* Header Info */}
      <div className="flex items-center justify-between mb-6 ml-8">
        <div className="flex items-center gap-3">
          <span className="text-sm font-black text-muted-foreground/50">#{issue.number}</span>
          <span className={cn("px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest flex items-center gap-1.5", priorityConfig[issue.priority].color)}>
            <PriorityIcon className="w-3.5 h-3.5" />
            {issue.priority}
          </span>
        </div>
        <div className="flex items-center gap-2">
          {issue.aiSummary && (
            <div className="p-1.5 bg-purple-500/10 rounded-xl">
              <Zap className="w-4 h-4 text-purple-500" />
            </div>
          )}
          <button className="p-1.5 text-muted-foreground hover:text-foreground transition-colors">
            <MoreHorizontal className="w-5 h-5" />
          </button>
        </div>
      </div>

      {/* Content */}
      <div className="space-y-4">
        <h3 className="text-xl font-bold tracking-tight group-hover:text-primary transition-colors leading-snug">
          {issue.title}
        </h3>

        {issue.aiSummary && (
          <div className="p-4 bg-purple-500/5 rounded-2xl border border-purple-500/10 relative group/ai">
            <div className="flex items-center gap-2 mb-2">
              <Zap className="w-3.5 h-3.5 text-purple-500" />
              <span className="text-[10px] font-bold text-purple-500 uppercase tracking-widest">AI Intelligence</span>
            </div>
            <p className="text-sm text-purple-700 dark:text-purple-300 leading-relaxed italic line-clamp-2">
              "{issue.aiSummary}"
            </p>
          </div>
        )}

        <p className="text-sm text-muted-foreground leading-relaxed line-clamp-2">
          {issue.body}
        </p>

        {/* Tags */}
        <div className="flex flex-wrap gap-2">
          {issue.tags.map((tag) => (
            <span key={tag} className="px-3 py-1 bg-muted/50 text-muted-foreground text-[10px] font-bold rounded-full border border-transparent hover:border-primary/20 hover:text-primary transition-all">
              {tag}
            </span>
          ))}
        </div>

        {/* Footer */}
        <div className="pt-6 mt-2 flex items-center justify-between border-t border-border/50">
          <div className="flex items-center gap-4 text-xs font-bold text-muted-foreground">
            <div className="flex items-center gap-1.5">
              <Calendar className="w-4 h-4" />
              <span>{formatDate(issue.createdAt)}</span>
            </div>
            <div className="flex items-center gap-1.5">
              <MessageCircle className="w-4 h-4" />
              <span>{issue.comments}</span>
            </div>
          </div>

          <div className="flex items-center gap-2">
            {issue.assignee && (
              <div className="flex -space-x-2">
                <img
                  src={issue.assignee.avatar_url}
                  className="w-7 h-7 rounded-full border-2 border-background ring-1 ring-border"
                  title={issue.assignee.login}
                  alt="assignee"
                />
              </div>
            )}
            <span className="text-[10px] font-black text-muted-foreground/30 uppercase tracking-tighter">
              {issue.repository.name}
            </span>
          </div>
        </div>
      </div>
    </motion.div>
  );
}