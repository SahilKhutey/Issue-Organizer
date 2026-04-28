import React from 'react';
import { LucideIcon } from 'lucide-react';
import { motion } from 'framer-motion';

interface StatsCardProps {
  title: string;
  value: string | number;
  icon: LucideIcon;
  color: 'blue' | 'green' | 'yellow' | 'red' | 'purple';
  trend?: {
    value: number;
    isPositive: boolean;
  };
}

export function StatsCard({ title, value, icon: Icon, color, trend }: StatsCardProps) {
  const colorClasses = {
    blue: 'bg-blue-500/10 text-blue-500',
    green: 'bg-green-500/10 text-green-500',
    yellow: 'bg-yellow-500/10 text-yellow-500',
    red: 'bg-red-500/10 text-red-500',
    purple: 'bg-purple-500/10 text-purple-500'
  };

  return (
    <motion.div
      whileHover={{ y: -5, scale: 1.02 }}
      className="glass-morphism rounded-3xl p-6 transition-all shadow-lg hover:shadow-primary/5"
    >
      <div className="flex items-start justify-between">
        <div className="space-y-4">
          <div className={`p-3 rounded-2xl inline-block ${colorClasses[color]}`}>
            <Icon className="w-6 h-6" />
          </div>
          <div>
            <p className="text-sm font-semibold text-muted-foreground uppercase tracking-wider">{title}</p>
            <div className="flex items-baseline space-x-2">
              <p className="text-3xl font-black tracking-tight">{value}</p>
              {trend && (
                <span className={`text-xs font-bold px-2 py-0.5 rounded-full ${
                  trend.isPositive ? 'bg-green-500/10 text-green-500' : 'bg-red-500/10 text-red-500'
                }`}>
                  {trend.isPositive ? '+' : '-'}{Math.abs(trend.value)}%
                </span>
              )}
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}