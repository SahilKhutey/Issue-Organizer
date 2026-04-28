import React, { useState, useMemo } from 'react';
import { cn } from '../../utils/cn';
import { 
  User, 
  Mail, 
  MapPin, 
  Globe, 
  Building, 
  Github, 
  Calendar,
  Edit,
  Settings,
  BarChart3,
  Zap,
  CheckCircle,
  Code,
  GitBranch,
  ArrowRight,
  Shield,
  Activity
} from 'lucide-react';
import { UserProfile } from '../../types';
import { ProfileEdit } from './ProfileEdit';
import { ProfileSettings } from './ProfileSettings';
import { motion, AnimatePresence } from 'framer-motion';

interface ProfileViewProps {
  profile: UserProfile;
  onProfileUpdate: (profile: UserProfile) => void;
}

export function ProfileView({ profile, onProfileUpdate }: ProfileViewProps) {
  const [activeTab, setActiveTab] = useState<'overview' | 'edit' | 'settings'>('overview');

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { 
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const tabs = [
    { id: 'overview', label: 'Dashboard', icon: Activity },
    { id: 'edit', label: 'Identity', icon: User },
    { id: 'settings', label: 'Security', icon: Shield }
  ];

  const stats = [
    { label: 'Issues Managed', value: profile.stats.total_issues, icon: BarChart3, color: 'text-blue-500 bg-blue-500/10' },
    { label: 'Success Rate', value: '94%', icon: CheckCircle, color: 'text-green-500 bg-green-500/10' },
    { label: 'Code Quality', value: 'A+', icon: Code, color: 'text-purple-500 bg-purple-500/10' },
    { label: 'AI Efficiency', value: '+3.2h', icon: Zap, color: 'text-yellow-500 bg-yellow-500/10' },
    { label: 'Nodes Connected', value: profile.stats.repositories_connected, icon: GitBranch, color: 'text-gray-500 bg-muted' }
  ];

  return (
    <div className="max-w-6xl mx-auto space-y-10 pb-20">
      {/* Profile Banner & Identity */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="relative group"
      >
        <div className="h-48 rounded-[3rem] bg-gradient-to-r from-primary/20 via-primary/10 to-background border overflow-hidden">
          <div className="absolute inset-0 opacity-10 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')]" />
        </div>
        
        <div className="px-10 -mt-20 flex flex-col md:flex-row items-end gap-8 relative z-10">
          <div className="relative group">
            <div className="absolute inset-0 bg-primary/20 rounded-full blur-2xl opacity-0 group-hover:opacity-100 transition-opacity" />
            <img
              src={profile.avatar_url}
              alt={profile.name}
              className="w-40 h-40 rounded-[3rem] ring-8 ring-background object-cover relative shadow-2xl"
            />
            {profile.github_connected && (
              <div className="absolute bottom-2 right-2 w-10 h-10 bg-primary text-primary-foreground rounded-2xl flex items-center justify-center shadow-xl ring-4 ring-background">
                <Github className="w-5 h-5" />
              </div>
            )}
          </div>
          
          <div className="flex-1 pb-4">
            <div className="flex items-center gap-4 mb-2">
              <h1 className="text-4xl font-black tracking-tight">{profile.name}</h1>
              <span className="px-3 py-1 bg-muted rounded-full text-xs font-bold text-muted-foreground uppercase tracking-widest">
                Level 42
              </span>
            </div>
            <p className="text-xl font-medium text-muted-foreground">@{profile.username}</p>
          </div>

          <div className="pb-4 flex gap-3">
            <button className="px-6 py-3 bg-primary text-primary-foreground font-black rounded-2xl shadow-xl shadow-primary/20 hover:scale-[1.02] transition-all">
              Connect Hub
            </button>
            <button className="p-3 bg-muted rounded-2xl hover:bg-muted/80 transition-all text-muted-foreground">
              <Globe className="w-6 h-6" />
            </button>
          </div>
        </div>
      </motion.div>

      {/* Navigation */}
      <div className="flex items-center gap-2 p-2 bg-muted/30 rounded-[2rem] border max-w-fit">
        {tabs.map((tab) => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={cn(
                "flex items-center gap-3 px-8 py-3.5 text-sm font-black rounded-2xl transition-all uppercase tracking-widest",
                isActive
                  ? "bg-background shadow-xl text-primary"
                  : "text-muted-foreground hover:text-foreground"
              )}
            >
              <Icon className="w-4 h-4" />
              <span>{tab.label}</span>
            </button>
          );
        })}
      </div>

      <AnimatePresence mode="wait">
        <motion.div
          key={activeTab}
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -20 }}
          transition={{ duration: 0.3 }}
        >
          {activeTab === 'overview' && (
            <div className="space-y-10">
              {/* Stats Grid */}
              <div className="grid grid-cols-2 md:grid-cols-5 gap-6">
                {stats.map((stat, i) => (
                  <motion.div 
                    key={stat.label}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.1 }}
                    className="glass-morphism rounded-[2.5rem] p-8 border shadow-lg hover:shadow-primary/5 transition-all text-center space-y-4"
                  >
                    <div className={cn("w-12 h-12 rounded-2xl flex items-center justify-center mx-auto", stat.color)}>
                      <stat.icon className="w-6 h-6" />
                    </div>
                    <div>
                      <p className="text-3xl font-black tracking-tighter">{stat.value}</p>
                      <p className="text-[10px] font-black uppercase tracking-[0.2em] text-muted-foreground mt-1 leading-tight">
                        {stat.label}
                      </p>
                    </div>
                  </motion.div>
                ))}
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
                {/* Details */}
                <div className="lg:col-span-1 glass-morphism rounded-[3rem] p-10 border space-y-8 shadow-xl">
                  <h3 className="text-sm font-black uppercase tracking-[0.2em] text-muted-foreground/50">Core Identity</h3>
                  <div className="space-y-6">
                    {[
                      { icon: Mail, label: 'Email', value: 'sahil@example.com' },
                      { icon: Building, label: 'Company', value: profile.company || 'Not Specified' },
                      { icon: MapPin, label: 'Base', value: profile.location || 'Global' },
                      { icon: Calendar, label: 'Active Since', value: formatDate(profile.created_at) }
                    ].map((item, i) => (
                      <div key={i} className="flex items-center gap-5">
                        <div className="p-3 bg-muted rounded-2xl text-muted-foreground">
                          <item.icon className="w-5 h-5" />
                        </div>
                        <div>
                          <p className="text-[10px] font-black uppercase tracking-widest text-muted-foreground/50">{item.label}</p>
                          <p className="font-bold">{item.value}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Recent Intelligence Activity */}
                <div className="lg:col-span-2 glass-morphism rounded-[3rem] p-10 border shadow-xl relative overflow-hidden">
                  <div className="absolute top-0 right-0 p-10 opacity-5">
                    <Activity className="w-40 h-40 text-primary" />
                  </div>
                  <h3 className="text-sm font-black uppercase tracking-[0.2em] text-muted-foreground/50 mb-8">Pulse Activity</h3>
                  <div className="space-y-6 relative z-10">
                    {[
                      { icon: Zap, label: 'AI Optimization', text: 'System processed 12 bottlenecks in repo-X', time: '2h ago', color: 'text-purple-500' },
                      { icon: CheckCircle, label: 'Validation', text: 'Achieved 100% test coverage in module-Y', time: '5h ago', color: 'text-green-500' },
                      { icon: GitBranch, label: 'Architecture', text: 'Proposed refactor for state-management-core', time: '1d ago', color: 'text-blue-500' }
                    ].map((activity, i) => (
                      <div key={i} className="flex items-center gap-6 p-6 bg-muted/20 rounded-[2rem] border border-transparent hover:border-primary/20 transition-all group">
                        <div className={cn("p-4 rounded-2xl bg-background shadow-lg group-hover:scale-110 transition-transform", activity.color)}>
                          <activity.icon className="w-6 h-6" />
                        </div>
                        <div className="flex-1">
                          <div className="flex items-center justify-between mb-1">
                            <span className="text-[10px] font-black uppercase tracking-widest text-muted-foreground">{activity.label}</span>
                            <span className="text-[10px] font-bold text-muted-foreground/50 italic">{activity.time}</span>
                          </div>
                          <p className="font-bold text-lg leading-tight">{activity.text}</p>
                        </div>
                        <ArrowRight className="w-5 h-5 text-muted-foreground opacity-0 group-hover:opacity-100 transition-all translate-x-4 group-hover:translate-x-0" />
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'edit' && (
            <div className="glass-morphism rounded-[3rem] p-10 border shadow-xl">
              <ProfileEdit profile={profile} onSave={onProfileUpdate} />
            </div>
          )}

          {activeTab === 'settings' && (
            <div className="glass-morphism rounded-[3rem] p-10 border shadow-xl">
              <ProfileSettings profile={profile} onSave={onProfileUpdate} />
            </div>
          )}
        </motion.div>
      </AnimatePresence>
    </div>
  );
}