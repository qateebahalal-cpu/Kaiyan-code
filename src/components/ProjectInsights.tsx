import React from 'react';
import { 
  BarChart3, 
  Users, 
  GitCommit, 
  Clock, 
  Code2, 
  MessageCircle, 
  Zap, 
  Star, 
  Share2,
  MoreVertical,
  Activity
} from 'lucide-react';
import { motion } from 'motion/react';
import { cn } from '@/src/lib/utils';
import { type Project } from '@/src/constants';

interface ProjectInsightsProps {
  projects: Project[];
}

export default function ProjectInsights({ projects }: ProjectInsightsProps) {
  const stats = [
    { label: 'إجمالي البرمجيات', value: '124k', icon: <Code2 size={16} />, color: 'text-blue-400', bg: 'bg-blue-400/10' },
    { label: 'الوقت المستغرق', value: '45.2h', icon: <Clock size={16} />, color: 'text-purple-400', bg: 'bg-purple-400/10' },
    { label: 'عدد المساهمين', value: '12', icon: <Users size={16} />, color: 'text-green-400', bg: 'bg-green-400/10' },
    { label: 'طلبات السحب', value: '89', icon: <GitCommit size={16} />, color: 'text-orange-400', bg: 'bg-orange-400/10' },
  ];

  return (
    <div className="flex-1 flex flex-col bg-[#121212] p-8 gap-8 overflow-y-auto scrollbar-hide">
      <div>
        <h2 className="text-3xl font-black text-white tracking-tight flex items-center gap-4">
          <div className="p-3 bg-blue-600 rounded-2xl shadow-lg shadow-blue-900/20">
            <BarChart3 size={24} />
          </div>
          تحليلات كيان (Insights)
        </h2>
        <p className="text-gray-500 mt-2">رؤية كاملة لإنتاجيتك وتطور مشاريعك البرمجية</p>
      </div>

      {/* Grid Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: i * 0.1 }}
            className="bg-[#1a1a1a] border border-[#333] p-6 rounded-[32px] flex items-center gap-5 hover:border-purple-500/30 transition-all group"
          >
            <div className={cn("p-4 rounded-2xl shadow-inner group-hover:scale-110 transition-transform", stat.bg, stat.color)}>
              {stat.icon}
            </div>
            <div>
              <p className="text-[10px] font-black text-gray-500 uppercase tracking-widest">{stat.label}</p>
              <h4 className="text-2xl font-black text-white">{stat.value}</h4>
            </div>
          </motion.div>
        ))}
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
        {/* Project Velocity Chart Mockup */}
        <div className="xl:col-span-2 bg-[#1a1a1a] border border-[#333] rounded-[40px] p-8 relative overflow-hidden group">
          <div className="flex items-center justify-between mb-8">
            <div className="flex items-center gap-3">
              <Activity className="text-purple-400" size={20} />
              <h3 className="text-lg font-black text-white">سرعة التطوير (Velocity)</h3>
            </div>
            <select className="bg-[#222] border border-[#333] text-[10px] font-black text-gray-400 px-4 py-2 rounded-xl outline-none">
              <button>آخر 7 أيام</button>
              <button>آخر شهر</button>
            </select>
          </div>
          
          <div className="h-64 flex items-end justify-between gap-2 px-2 relative z-10">
            {[40, 70, 45, 90, 65, 80, 100].map((h, i) => (
              <motion.div
                key={i}
                initial={{ height: 0 }}
                animate={{ height: `${h}%` }}
                className="flex-1 bg-gradient-to-t from-purple-600/80 to-purple-400/40 rounded-t-2xl relative group/bar"
              >
                <div className="absolute -top-10 left-1/2 -translate-x-1/2 bg-white text-black px-2 py-1 rounded text-[10px] font-black opacity-0 group-hover/bar:opacity-100 transition-opacity">
                  {h * 12} lines
                </div>
              </motion.div>
            ))}
          </div>
          
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(168,85,247,0.05)_0%,transparent_100%)]" />
        </div>

        {/* Real-time Presence */}
        <div className="bg-[#1a1a1a] border border-[#333] rounded-[40px] p-8 flex flex-col gap-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
               <Users className="text-green-400" size={20} />
               <h3 className="text-lg font-black text-white">المتعاونون الآن</h3>
            </div>
            <span className="bg-green-600/20 text-green-400 px-2 py-0.5 rounded text-[10px] font-black">2 نَشِط</span>
          </div>

          <div className="space-y-4">
             {[
               { name: 'أحمد علي', role: 'Fullstack Dev', status: 'Working on App.tsx', color: 'bg-blue-500' },
               { name: 'سارة خالد', role: 'UI Designer', status: 'In Design View', color: 'bg-pink-500' },
               { name: 'محمد حسن', role: 'Backend Dev', status: 'Offline', color: 'bg-gray-700' },
             ].map((u, i) => (
               <div key={i} className="flex items-center gap-4 p-3 hover:bg-white/5 rounded-2xl transition-all cursor-pointer">
                  <div className={cn("w-10 h-10 rounded-full flex items-center justify-center text-white font-black ring-4 ring-black", u.color)}>
                    {u.name[0]}
                  </div>
                  <div className="flex-1 overflow-hidden">
                    <h4 className="text-xs font-black text-white truncate">{u.name}</h4>
                    <p className="text-[10px] text-gray-500">{u.role}</p>
                    <p className="text-[10px] text-purple-400/80 mt-1">{u.status}</p>
                  </div>
                  <button className="p-2 text-gray-700 hover:text-white transition-colors">
                    <Share2 size={16} />
                  </button>
               </div>
             ))}
          </div>
          
          <button className="w-full py-4 mt-auto bg-white/5 hover:bg-white/10 border border-white/5 text-xs text-white font-black rounded-2xl transition-all flex items-center justify-center gap-3">
             <Plus size={16} /> دعوة زميل جديد
          </button>
        </div>
      </div>
    </div>
  );
}
