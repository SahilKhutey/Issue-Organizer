import React from 'react';
import { 
  Zap, 
  TrendingUp, 
  Search, 
  Filter, 
  ShieldCheck, 
  Cpu, 
  BarChart,
  BrainCircuit,
  Binary,
  Layers,
  Sparkles
} from 'lucide-react';
import { motion } from 'framer-motion';

export function AIAnalysisView() {
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
      {/* Hero Section */}
      <motion.div variants={item} className="relative rounded-[3.5rem] bg-gradient-to-br from-primary/10 via-primary/5 to-background border overflow-hidden p-12 md:p-20">
        <div className="absolute top-0 right-0 p-20 opacity-10">
          <BrainCircuit className="w-64 h-64 text-primary" />
        </div>
        <div className="relative z-10 max-w-2xl space-y-6">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-primary/10 text-primary rounded-2xl text-xs font-black uppercase tracking-[0.2em]">
            <Sparkles className="w-4 h-4" />
            Next-Gen Intelligence
          </div>
          <h1 className="text-5xl md:text-7xl font-black tracking-tighter leading-none text-foreground">
            Neural Issue <br />
            <span className="text-primary">Intelligence</span>
          </h1>
          <p className="text-xl text-muted-foreground font-medium leading-relaxed">
            Our autonomous AI engine scans your repositories in real-time, predicting bottlenecks and generating strategic insights before they impact your velocity.
          </p>
          <div className="flex gap-4">
            <button className="px-8 py-4 bg-primary text-primary-foreground font-black rounded-2xl shadow-2xl shadow-primary/20 hover:scale-105 transition-all">
              Initialize Full Scan
            </button>
            <button className="px-8 py-4 bg-muted font-black rounded-2xl hover:bg-muted/80 transition-all">
              View Audit Logs
            </button>
          </div>
        </div>
      </motion.div>

      {/* Real-time Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {[
          { label: 'Neural Accuracy', value: '99.4%', icon: Binary, trend: '+0.2%' },
          { label: 'Latency', value: '42ms', icon: Cpu, trend: '-12ms' },
          { label: 'Insights Generated', value: '1,284', icon: Layers, trend: '+12%' }
        ].map((metric, i) => (
          <motion.div 
            key={i}
            variants={item}
            className="glass-morphism rounded-[2.5rem] p-8 border shadow-xl flex items-center justify-between group hover:border-primary/50 transition-colors"
          >
            <div className="space-y-1">
              <p className="text-[10px] font-black uppercase tracking-[0.2em] text-muted-foreground">{metric.label}</p>
              <p className="text-3xl font-black">{metric.value}</p>
              <p className="text-xs font-bold text-green-500">{metric.trend} this week</p>
            </div>
            <div className="p-4 bg-primary/5 rounded-2xl text-primary group-hover:scale-110 transition-transform">
              <metric.icon className="w-8 h-8" />
            </div>
          </motion.div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
        {/* Sentiment Analysis */}
        <motion.div variants={item} className="glass-morphism rounded-[3rem] p-10 border shadow-xl space-y-8">
          <h3 className="text-xl font-black tracking-tight flex items-center gap-3">
            <TrendingUp className="w-6 h-6 text-primary" />
            Ecosystem Health
          </h3>
          <div className="space-y-6">
            {[
              { label: 'Contributor Morale', value: 88 },
              { label: 'Documentation Quality', value: 72 },
              { label: 'Bug Resolution Velocity', value: 94 }
            ].map((stat, i) => (
              <div key={i} className="space-y-2">
                <div className="flex justify-between text-sm font-bold">
                  <span>{stat.label}</span>
                  <span className="text-primary">{stat.value}%</span>
                </div>
                <div className="h-3 bg-muted rounded-full overflow-hidden">
                  <motion.div 
                    initial={{ width: 0 }}
                    animate={{ width: `${stat.value}%` }}
                    className="h-full bg-primary rounded-full shadow-lg shadow-primary/20"
                  />
                </div>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Strategic Predictions */}
        <motion.div variants={item} className="glass-morphism rounded-[3rem] p-10 border shadow-xl relative overflow-hidden">
          <div className="absolute top-0 right-0 p-10 opacity-5">
            <ShieldCheck className="w-40 h-40 text-primary" />
          </div>
          <h3 className="text-xl font-black tracking-tight flex items-center gap-3 mb-8">
            <Zap className="w-6 h-6 text-primary" />
            Strategic Predictions
          </h3>
          <div className="space-y-4">
            {[
              { type: 'Alert', text: 'Potential release delay in Sprint 14 due to dependency bloat.' },
              { type: 'Optimization', text: 'Auto-categorization can reduce triage time by 40%.' },
              { type: 'Insight', text: 'Team velocity peaking in core-UI modules.' }
            ].map((pred, i) => (
              <div key={i} className="p-5 bg-muted/30 rounded-2xl border border-transparent hover:border-primary/20 transition-all">
                <div className="flex items-center gap-3 mb-1">
                  <span className="text-[10px] font-black uppercase tracking-widest text-primary">{pred.type}</span>
                </div>
                <p className="font-bold">{pred.text}</p>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
}
