import React, { useState } from 'react';
import { 
  Calendar, 
  MessageCircle, 
  User, 
  Tag as TagIcon, 
  AlertCircle,
  CheckCircle,
  Clock,
  Zap,
  X,
  Edit,
  Send,
  Copy,
  ExternalLink,
  Github,
  Globe
} from 'lucide-react';
import { Issue } from '../../types';
import { motion, AnimatePresence } from 'framer-motion';

interface IssueDetailProps {
  issue: Issue;
  onClose: () => void;
}

export function IssueDetail({ issue, onClose }: IssueDetailProps) {
  const [showAiComment, setShowAiComment] = useState(false);
  const [editingComment, setEditingComment] = useState(false);
  const [aiComment, setAiComment] = useState(issue.aiDraftComment || '');

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
      weekday: 'long',
      month: 'long',
      day: 'numeric',
      year: 'numeric'
    });
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 md:p-8">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="absolute inset-0 bg-black/60 backdrop-blur-md"
        />
        
        <motion.div
          initial={{ opacity: 0, scale: 0.9, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.9, y: 20 }}
          className="relative bg-background border rounded-[2.5rem] shadow-2xl max-w-5xl w-full max-h-[90vh] overflow-hidden flex flex-col"
        >
          {/* Header */}
          <div className="flex items-center justify-between p-8 border-b glass-morphism-heavy z-10">
            <div className="flex items-center gap-4">
              <span className="text-2xl font-black text-muted-foreground/30">#{issue.number}</span>
              <div className="flex items-center gap-2">
                <span className={cn("px-4 py-1.5 rounded-full text-xs font-black uppercase tracking-widest flex items-center gap-2", priorityConfig[issue.priority].color)}>
                  <PriorityIcon className="w-4 h-4" />
                  {issue.priority}
                </span>
                {issue.state === 'closed' && (
                  <span className="px-4 py-1.5 rounded-full text-xs font-black uppercase tracking-widest flex items-center gap-2 bg-green-500/10 text-green-500">
                    <CheckCircle className="w-4 h-4" />
                    Closed
                  </span>
                )}
              </div>
            </div>
            
            <div className="flex items-center gap-3">
              <button 
                onClick={() => copyToClipboard(window.location.href)}
                className="p-3 text-muted-foreground hover:text-foreground bg-muted/50 rounded-2xl transition-all"
              >
                <Copy className="w-5 h-5" />
              </button>
              <button className="p-3 text-muted-foreground hover:text-foreground bg-muted/50 rounded-2xl transition-all">
                <ExternalLink className="w-5 h-5" />
              </button>
              <button 
                onClick={onClose}
                className="p-3 text-muted-foreground hover:text-foreground bg-destructive/10 text-destructive rounded-2xl transition-all"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* Content */}
          <div className="flex-1 overflow-y-auto p-10 space-y-10 scrollbar-thin scrollbar-thumb-muted">
            <section className="space-y-6">
              <h1 className="text-4xl md:text-5xl font-black tracking-tighter leading-tight">
                {issue.title}
              </h1>

              {/* AI Insight Section */}
              {issue.aiSummary && (
                <motion.div 
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  className="p-8 bg-primary/5 rounded-[2rem] border border-primary/10 relative overflow-hidden"
                >
                  <div className="absolute top-0 right-0 p-8 opacity-5">
                    <Zap className="w-32 h-32 text-primary" />
                  </div>
                  <div className="flex items-center gap-3 mb-6">
                    <div className="p-2 bg-primary text-primary-foreground rounded-xl">
                      <Zap className="w-5 h-5" />
                    </div>
                    <h3 className="text-xl font-bold tracking-tight">AI Strategic Summary</h3>
                  </div>
                  <p className="text-lg text-primary/80 leading-relaxed font-medium mb-6">
                    "{issue.aiSummary}"
                  </p>
                  
                  {issue.aiTags && (
                    <div className="flex flex-wrap gap-2">
                      {issue.aiTags.map((tag) => (
                        <span key={tag} className="px-4 py-1.5 bg-primary/10 text-primary text-xs font-bold rounded-full uppercase tracking-wider">
                          {tag}
                        </span>
                      ))}
                    </div>
                  )}
                </motion.div>
              )}
            </section>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
              {/* Main Content */}
              <div className="lg:col-span-2 space-y-8">
                <section>
                  <h3 className="text-sm font-black uppercase tracking-[0.2em] text-muted-foreground mb-4">Detailed Description</h3>
                  <div className="p-8 bg-muted/30 rounded-[2rem] border border-border/50">
                    <p className="text-lg leading-relaxed whitespace-pre-wrap">{issue.body}</p>
                  </div>
                </section>

                {/* AI Draft Response */}
                {issue.aiDraftComment && (
                  <section className="space-y-4">
                    <div className="flex items-center justify-between">
                      <h3 className="text-sm font-black uppercase tracking-[0.2em] text-muted-foreground">AI Response Draft</h3>
                      <button
                        onClick={() => setShowAiComment(!showAiComment)}
                        className="text-xs font-bold text-primary hover:underline"
                      >
                        {showAiComment ? 'Discard Draft' : 'Refine Response'}
                      </button>
                    </div>
                    
                    {showAiComment && (
                      <motion.div 
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="p-8 glass-morphism rounded-[2rem] border border-primary/20 space-y-4"
                      >
                        <textarea
                          value={aiComment}
                          onChange={(e) => setAiComment(e.target.value)}
                          className="w-full h-40 bg-transparent border-none focus:ring-0 text-lg leading-relaxed resize-none p-0"
                          placeholder="Refine the AI's response..."
                        />
                        <div className="flex justify-end gap-3">
                          <button className="px-6 py-3 bg-muted font-bold rounded-xl hover:bg-muted/80 transition-all">
                            Save as Draft
                          </button>
                          <button className="px-6 py-3 bg-primary text-primary-foreground font-bold rounded-xl shadow-lg shadow-primary/20 hover:scale-[1.02] transition-all flex items-center gap-2">
                            <Send className="w-4 h-4" />
                            Post Final Response
                          </button>
                        </div>
                      </motion.div>
                    )}
                  </section>
                )}
              </div>

              {/* Sidebar Info */}
              <div className="space-y-8">
                <section className="space-y-6">
                  <h3 className="text-sm font-black uppercase tracking-[0.2em] text-muted-foreground">Collaboration</h3>
                  
                  <div className="space-y-4">
                    <div className="flex items-center gap-4 p-4 rounded-2xl bg-muted/20">
                      <img src={issue.author.avatar_url} className="w-12 h-12 rounded-full ring-2 ring-primary/20" alt="author" />
                      <div>
                        <p className="text-xs font-black text-muted-foreground uppercase tracking-widest">Reporter</p>
                        <p className="font-bold">{issue.author.name || issue.author.login}</p>
                      </div>
                    </div>

                    {issue.assignee && (
                      <div className="flex items-center gap-4 p-4 rounded-2xl bg-primary/5 border border-primary/10">
                        <img src={issue.assignee.avatar_url} className="w-12 h-12 rounded-full ring-2 ring-primary/50" alt="assignee" />
                        <div>
                          <p className="text-xs font-black text-primary uppercase tracking-widest">Assignee</p>
                          <p className="font-bold">{issue.assignee.name || issue.assignee.login}</p>
                        </div>
                      </div>
                    )}
                  </div>
                </section>

                <section className="space-y-4">
                  <h3 className="text-sm font-black uppercase tracking-[0.2em] text-muted-foreground">Timeline</h3>
                  <div className="space-y-4 text-sm font-medium">
                    <div className="flex items-center gap-3 text-muted-foreground">
                      <Calendar className="w-5 h-5" />
                      <span>Created {formatDate(issue.createdAt)}</span>
                    </div>
                    <div className="flex items-center gap-3 text-muted-foreground">
                      <MessageCircle className="w-5 h-5" />
                      <span>{issue.comments} active discussion threads</span>
                    </div>
                  </div>
                </section>

                <section className="space-y-4">
                  <h3 className="text-sm font-black uppercase tracking-[0.2em] text-muted-foreground">Tags</h3>
                  <div className="flex flex-wrap gap-2">
                    {issue.tags.map((tag) => (
                      <span key={tag} className="px-4 py-2 bg-muted text-xs font-bold rounded-2xl border border-transparent hover:border-primary transition-all">
                        {tag}
                      </span>
                    ))}
                  </div>
                </section>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}

function cn(...inputs: any[]) {
  return inputs.filter(Boolean).join(' ');
}