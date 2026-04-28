import React from 'react';
import { 
  AlertCircle, 
  CheckCircle, 
  Clock, 
  Zap,
  TrendingUp,
  Github,
  Tag,
  Users,
  ArrowRight
} from 'lucide-react';
import { StatsCard } from './StatsCard';
import { IssueCard } from '../Issues/IssueCard';
import { mockIssues } from '../../data/mockData';
import { Issue } from '../../types';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';

interface DashboardProps {
  onIssueClick: (issue: Issue) => void;
}

export function Dashboard({ onIssueClick }: DashboardProps) {
  const navigate = useNavigate();
  const openIssues = mockIssues.filter(issue => issue.state === 'open');
  const closedIssues = mockIssues.filter(issue => issue.state === 'closed');
  const highPriorityIssues = openIssues.filter(issue => issue.priority === 'high' || issue.priority === 'urgent');
  const aiAnalyzedIssues = mockIssues.filter(issue => issue.aiSummary);

  const recentIssues = [...mockIssues]
    .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
    .slice(0, 3);

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
      className="space-y-10 pb-10"
    >
      {/* Header */}
      <motion.div variants={item} className="flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <h1 className="text-4xl font-black tracking-tight text-foreground">Dashboard</h1>
          <p className="text-muted-foreground mt-2 text-lg">
            Welcome back! Here's what's happening with your projects.
          </p>
        </div>
        <div className="flex items-center gap-3">
          <div className="flex -space-x-3">
            {[1, 2, 3, 4].map((i) => (
              <img
                key={i}
                src={`https://i.pravatar.cc/150?u=${i}`}
                className="w-10 h-10 rounded-full border-4 border-background"
                alt="team"
              />
            ))}
            <div className="w-10 h-10 rounded-full border-4 border-background bg-muted flex items-center justify-center text-xs font-bold text-muted-foreground">
              +5
            </div>
          </div>
          <span className="text-sm font-medium text-muted-foreground ml-2">Team is active</span>
        </div>
      </motion.div>

      {/* Stats Grid */}
      <motion.div variants={item} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatsCard
          title="Open Issues"
          value={openIssues.length}
          icon={Github}
          color="blue"
          trend={{ value: 12, isPositive: false }}
        />
        <StatsCard
          title="Closed Issues"
          value={closedIssues.length}
          icon={CheckCircle}
          color="green"
          trend={{ value: 8, isPositive: true }}
        />
        <StatsCard
          title="High Priority"
          value={highPriorityIssues.length}
          icon={AlertCircle}
          color="red"
          trend={{ value: 5, isPositive: false }}
        />
        <StatsCard
          title="AI Analyzed"
          value={aiAnalyzedIssues.length}
          icon={Zap}
          color="purple"
          trend={{ value: 15, isPositive: true }}
        />
      </motion.div>

      {/* Charts Row */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Priority Distribution */}
        <motion.div variants={item} className="lg:col-span-1 glass-morphism rounded-3xl p-8 shadow-xl">
          <h3 className="text-xl font-bold mb-6 flex items-center gap-2">
            <TrendingUp className="w-5 h-5 text-primary" />
            Priority Load
          </h3>
          <div className="space-y-6">
            {['urgent', 'high', 'medium', 'low'].map((priority) => {
              const count = openIssues.filter(issue => issue.priority === priority).length;
              const percentage = openIssues.length > 0 ? (count / openIssues.length) * 100 : 0;
              
              const colors = {
                urgent: 'bg-destructive shadow-destructive/20',
                high: 'bg-orange-500 shadow-orange-500/20',
                medium: 'bg-yellow-500 shadow-yellow-500/20',
                low: 'bg-green-500 shadow-green-500/20'
              };

              return (
                <div key={priority} className="space-y-2">
                  <div className="flex items-center justify-between text-sm">
                    <span className="font-bold capitalize">{priority}</span>
                    <span className="text-muted-foreground font-medium">{count} issues</span>
                  </div>
                  <div className="h-3 bg-muted rounded-full overflow-hidden">
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{ width: `${percentage}%` }}
                      transition={{ duration: 1, ease: "easeOut" }}
                      className={`h-full rounded-full ${colors[priority as keyof typeof colors]} shadow-lg`}
                    />
                  </div>
                </div>
              );
            })}
          </div>
        </motion.div>

        {/* AI Analysis Stats */}
        <motion.div variants={item} className="lg:col-span-2 glass-morphism rounded-3xl p-8 shadow-xl relative overflow-hidden">
          <div className="absolute top-0 right-0 p-8 opacity-10">
            <Zap className="w-40 h-40 text-primary" />
          </div>
          
          <h3 className="text-xl font-bold mb-6 flex items-center gap-2">
            <Zap className="w-5 h-5 text-purple-500" />
            AI Intelligence Insights
          </h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="space-y-6">
              <div className="p-4 bg-background/50 rounded-2xl border border-border/50">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-medium text-muted-foreground">Scan Completion</span>
                  <span className="text-sm font-bold text-primary">84%</span>
                </div>
                <div className="h-2 bg-muted rounded-full overflow-hidden">
                  <div className="h-full w-[84%] bg-primary rounded-full" />
                </div>
              </div>

              <div className="space-y-4">
                {[
                  { label: 'Auto-categorization', value: 'Enabled', icon: Tag, color: 'text-blue-500' },
                  { label: 'Duplicate Detection', value: 'Active', icon: Github, color: 'text-green-500' },
                  { label: 'Priority Prediction', value: 'High Accuracy', icon: TrendingUp, color: 'text-orange-500' }
                ].map((stat, i) => (
                  <div key={i} className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className={cn("p-2 rounded-lg bg-muted", stat.color)}>
                        <stat.icon className="w-4 h-4" />
                      </div>
                      <span className="text-sm font-medium">{stat.label}</span>
                    </div>
                    <span className="text-xs font-bold px-2 py-1 bg-muted rounded-md">{stat.value}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-primary/5 rounded-3xl p-6 flex flex-col justify-between">
              <div>
                <p className="text-sm font-medium text-primary mb-2 italic">Pro Tip</p>
                <p className="text-lg font-bold leading-tight">
                  AI has saved you <span className="text-primary text-2xl">3.2h</span> of manual triage this week.
                </p>
              </div>
              <button className="mt-6 w-full py-3 bg-primary text-primary-foreground font-bold rounded-2xl shadow-lg shadow-primary/20 hover:scale-[1.02] transition-transform">
                View AI Report
              </button>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Recent Issues */}
      <motion.div variants={item}>
        <div className="flex items-center justify-between mb-8">
          <h3 className="text-2xl font-black tracking-tight">Recent Activity</h3>
          <button 
            onClick={() => navigate('/issues')}
            className="group flex items-center gap-2 text-primary font-bold hover:gap-3 transition-all"
          >
            Explore all issues
            <ArrowRight className="w-5 h-5" />
          </button>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {recentIssues.map((issue, idx) => (
            <motion.div
              key={issue.id}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: idx * 0.1 + 0.5 }}
            >
              <IssueCard
                issue={issue}
                onClick={onIssueClick}
              />
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