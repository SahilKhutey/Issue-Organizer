import React from 'react';
import { 
  Code, 
  Search, 
  Filter, 
  GitPullRequest, 
  CheckCircle2, 
  Clock, 
  AlertCircle,
  FileCode,
  Users,
  ArrowRight,
  Terminal,
  MessagesSquare
} from 'lucide-react';
import { motion } from 'framer-motion';

export function CodeReviewView() {
  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 }
  };

  return (
    <motion.div 
      variants={container}
      initial="hidden"
      animate="show"
      className="max-w-7xl mx-auto space-y-12 pb-20"
    >
      {/* Header */}
      <motion.div variants={item} className="flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div>
          <h1 className="text-5xl font-black tracking-tighter text-foreground">Code Review Hub</h1>
          <p className="text-xl text-muted-foreground mt-2 font-medium">
            Maintain elite code standards with automated and peer reviews.
          </p>
        </div>
        <div className="flex gap-3">
          <div className="flex -space-x-3">
            {[1, 2, 3, 4, 5].map((i) => (
              <img key={i} src={`https://i.pravatar.cc/150?u=review-${i}`} className="w-12 h-12 rounded-full border-4 border-background shadow-lg" alt="reviewer" />
            ))}
          </div>
          <button className="px-6 py-3 bg-primary text-primary-foreground font-black rounded-2xl shadow-xl shadow-primary/20 hover:scale-105 transition-all flex items-center gap-2">
            <GitPullRequest className="w-4 h-4" />
            Request Review
          </button>
        </div>
      </motion.div>

      {/* Review Pipeline */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        {[
          { label: 'Pending AI Scan', count: 12, icon: Terminal, color: 'text-purple-500 bg-purple-500/10' },
          { label: 'Awaiting Peer Review', count: 8, icon: Users, color: 'text-blue-500 bg-blue-500/10' },
          { label: 'Changes Requested', count: 3, icon: AlertCircle, color: 'text-orange-500 bg-orange-500/10' },
          { label: 'Approved Today', count: 15, icon: CheckCircle2, color: 'text-green-500 bg-green-500/10' }
        ].map((stat, i) => (
          <motion.div 
            key={i}
            variants={item}
            className="glass-morphism rounded-[2.5rem] p-8 border shadow-lg space-y-4"
          >
            <div className={cn("w-12 h-12 rounded-2xl flex items-center justify-center", stat.color)}>
              <stat.icon className="w-6 h-6" />
            </div>
            <div>
              <p className="text-4xl font-black">{stat.count}</p>
              <p className="text-[10px] font-black uppercase tracking-widest text-muted-foreground mt-1">
                {stat.label}
              </p>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Active Reviews List */}
      <motion.div variants={item} className="space-y-6">
        <div className="flex items-center justify-between">
          <h3 className="text-2xl font-black tracking-tight">Active Review Pipeline</h3>
          <div className="flex items-center gap-2">
            <button className="p-2 bg-muted rounded-xl text-muted-foreground">
              <Filter className="w-5 h-5" />
            </button>
            <button className="p-2 bg-muted rounded-xl text-muted-foreground">
              <Search className="w-5 h-5" />
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 gap-4">
          {[
            { title: 'refactor: use React.lazy for route components', repo: 'core-frontend', author: 'sahilkhutey', comments: 12, files: 4, time: '2h ago', status: 'In Review' },
            { title: 'feat: add OAuth2 provider support', repo: 'auth-service', author: 'jdoe', comments: 5, files: 12, time: '5h ago', status: 'Changes Requested' },
            { title: 'fix: memory leak in dashboard charts', repo: 'core-frontend', author: 'alex_smith', comments: 8, files: 2, time: '1d ago', status: 'AI Approved' }
          ].map((review, i) => (
            <motion.div 
              key={i}
              whileHover={{ x: 10 }}
              className="glass-morphism rounded-3xl p-6 border shadow-lg flex items-center justify-between group cursor-pointer"
            >
              <div className="flex items-center gap-6">
                <div className="p-4 bg-muted rounded-2xl">
                  <FileCode className="w-6 h-6 text-muted-foreground" />
                </div>
                <div>
                  <div className="flex items-center gap-3 mb-1">
                    <span className="text-[10px] font-black uppercase tracking-widest text-primary">{review.repo}</span>
                    <span className="text-xs font-bold text-muted-foreground/50">• {review.time}</span>
                  </div>
                  <h4 className="text-lg font-bold group-hover:text-primary transition-colors">{review.title}</h4>
                  <div className="flex items-center gap-4 mt-2 text-xs font-bold text-muted-foreground">
                    <div className="flex items-center gap-1.5">
                      <Users className="w-4 h-4" />
                      <span>{review.author}</span>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <MessagesSquare className="w-4 h-4" />
                      <span>{review.comments} discussions</span>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="flex items-center gap-6">
                <span className={cn(
                  "px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest",
                  review.status === 'In Review' ? "bg-blue-500/10 text-blue-500" :
                  review.status === 'Changes Requested' ? "bg-orange-500/10 text-orange-500" :
                  "bg-green-500/10 text-green-500"
                )}>
                  {review.status}
                </span>
                <div className="p-3 bg-primary/5 rounded-xl text-primary opacity-0 group-hover:opacity-100 transition-all">
                  <ArrowRight className="w-5 h-5" />
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </motion.div>
  );
}

function cn(...inputs: any[]) {
  return inputs.filter(Boolean).join(' ');
}
