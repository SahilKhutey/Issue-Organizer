import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
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
   Code,
   LayoutDashboard,
   Boxes,
   Activity
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export function Sidebar() {
  const location = useLocation();
  const navigate = useNavigate();
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [expandedSections, setExpandedSections] = useState({
    main: true,
    organization: true,
    insights: true
  });

  const toggleSection = (section: keyof typeof expandedSections) => {
    setExpandedSections(prev => ({
      ...prev,
      [section]: !prev[section]
    }));
  };

  const menuItems = {
    main: [
      { id: 'dashboard', icon: LayoutDashboard, label: 'Control Center', path: '/dashboard', count: null },
      { id: 'issues', icon: Boxes, label: 'Issue Inventory', path: '/issues', count: 42 },
    ],
    intelligence: [
      { id: 'ai-analysis', icon: Zap, label: 'Neural Insights', path: '/ai-analysis', count: 'AI' },
      { id: 'code-review', icon: Code, label: 'Quality Audit', path: '/code-review', count: null },
    ],
    ecosystem: [
      { id: 'analytics', icon: Activity, label: 'Performance', path: '/analytics', count: null },
      { id: 'settings', icon: Settings, label: 'System Config', path: '/settings', count: null }
    ]
  };

  const isActive = (path: string) => location.pathname === path;

  return (
    <>
      {/* Mobile Overlay */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setIsMobileMenuOpen(false)}
            className="fixed inset-0 bg-background/80 backdrop-blur-md z-40 lg:hidden"
          />
        )}
      </AnimatePresence>

      <motion.aside
        initial={false}
        animate={{ 
          width: isCollapsed ? 100 : 320,
          x: isMobileMenuOpen ? 0 : (window.innerWidth < 1024 ? -320 : 0)
        }}
        className={cn(
          "fixed inset-y-0 left-0 z-50 lg:relative flex flex-col h-full glass-morphism-heavy border-r border-border/50 transition-all duration-500 ease-in-out",
          isCollapsed ? "items-center" : ""
        )}
      >
        {/* Brand */}
        <div className="p-8 w-full">
          <div className="flex items-center justify-between">
            {!isCollapsed && (
              <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="flex items-center gap-4"
              >
                <div className="w-12 h-12 bg-primary rounded-2xl flex items-center justify-center shadow-2xl shadow-primary/40 group cursor-pointer">
                  <Github className="w-6 h-6 text-primary-foreground group-hover:rotate-12 transition-transform" />
                </div>
                <div>
                  <h2 className="font-black text-xl tracking-tighter leading-none">ISSUE</h2>
                  <p className="text-[10px] font-black uppercase tracking-[0.3em] text-primary">Organizer</p>
                </div>
              </motion.div>
            )}
            <button
              onClick={() => setIsCollapsed(!isCollapsed)}
              className="p-3 rounded-2xl hover:bg-muted transition-all text-muted-foreground hover:text-foreground"
            >
              {isCollapsed ? <ChevronRight className="w-5 h-5" /> : <X className="w-5 h-5 lg:hidden" /> || <ChevronLeft className="w-5 h-5 hidden lg:block" />}
            </button>
          </div>
        </div>

        {/* Navigation */}
        <nav className="flex-1 px-6 space-y-10 overflow-y-auto scrollbar-none pb-10">
          {Object.entries(menuItems).map(([sectionKey, items]) => (
            <div key={sectionKey} className="space-y-4">
              {!isCollapsed && (
                <h3 className="px-4 text-[10px] font-black uppercase tracking-[0.4em] text-muted-foreground/30">
                  {sectionKey}
                </h3>
              )}
              <div className="space-y-2">
                {items.map((item) => {
                  const active = isActive(item.path);
                  return (
                    <button
                      key={item.id}
                      onClick={() => {
                        navigate(item.path);
                        setIsMobileMenuOpen(false);
                      }}
                      className={cn(
                        "flex items-center w-full group relative transition-all duration-300",
                        isCollapsed ? "justify-center p-4" : "px-4 py-3.5 rounded-[1.25rem]",
                        active 
                          ? "bg-primary text-primary-foreground shadow-xl shadow-primary/20" 
                          : "text-muted-foreground hover:bg-muted hover:text-foreground"
                      )}
                    >
                      <item.icon className={cn(
                        "w-5 h-5 transition-all duration-300",
                        !isCollapsed && "mr-4",
                        active ? "scale-110" : "group-hover:scale-110"
                      )} />
                      {!isCollapsed && (
                        <>
                          <span className="flex-1 text-left font-bold text-sm tracking-tight">{item.label}</span>
                          {item.count && (
                            <span className={cn(
                              "px-2 py-0.5 text-[9px] font-black rounded-lg uppercase tracking-widest",
                              active ? "bg-primary-foreground/20 text-primary-foreground" : "bg-primary/10 text-primary"
                            )}>
                              {item.count}
                            </span>
                          )}
                        </>
                      )}
                      {active && !isCollapsed && (
                        <motion.div 
                          layoutId="active-indicator"
                          className="absolute -left-2 w-1.5 h-6 bg-primary rounded-full shadow-[0_0_15px_rgba(var(--primary),0.5)]"
                        />
                      )}
                    </button>
                  );
                })}
              </div>
            </div>
          ))}
        </nav>

        {/* User Node */}
        <div className="p-6 mt-auto">
          <button
            onClick={() => navigate('/profile')}
            className={cn(
              "flex items-center w-full p-3 rounded-[1.5rem] bg-muted/30 border border-transparent hover:border-primary/20 transition-all group",
              isCollapsed ? "justify-center" : "gap-4"
            )}
          >
            <div className="relative">
              <img
                src="https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=64&h=64&dpr=2"
                alt="User"
                className="w-12 h-12 rounded-2xl object-cover grayscale group-hover:grayscale-0 transition-all shadow-lg"
              />
              <div className="absolute -top-1 -right-1 w-4 h-4 bg-primary border-2 border-background rounded-full animate-pulse" />
            </div>
            {!isCollapsed && (
              <div className="text-left">
                <p className="text-sm font-black tracking-tight">Sahil Khutey</p>
                <p className="text-[10px] font-black uppercase tracking-widest text-muted-foreground">Lead Systems Eng</p>
              </div>
            )}
          </button>
        </div>
      </motion.aside>
    </>
  );
}

function ChevronLeft(props: any) {
  return (
    <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
      <path d="m15 18-6-6 6-6" />
    </svg>
  );
}

function cn(...inputs: any[]) {
  return inputs.filter(Boolean).join(' ');
}

function ChevronLeft(props: any) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="m15 18-6-6 6-6" />
    </svg>
  );
}