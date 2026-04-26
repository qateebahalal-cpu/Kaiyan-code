import React, { useState } from 'react';
import { 
  Terminal, 
  Play, 
  CheckCircle2, 
  Cpu, 
  AlertTriangle, 
  XCircle, 
  Info,
  Monitor,
  Hammer,
  History,
  Bug
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { cn } from '@/src/lib/utils';

interface BuildRunToolsProps {
  logs: string[];
  onRun: () => void;
}

export default function BuildRunTools({ logs, onRun }: BuildRunToolsProps) {
  const [activeTab, setActiveTab] = useState<'logs' | 'build' | 'emulator' | 'problems'>('logs');

  const problems = [
    { type: 'error', message: 'Unexpected token at line 45', file: 'App.tsx' },
    { type: 'warning', message: 'Unused variable "user" at line 12', file: 'Sidebar.tsx' }
  ];

  return (
    <div className="h-full bg-[#151515] border-t border-[#333] flex flex-col overflow-hidden">
      {/* Tab Header */}
      <div className="px-4 bg-[#1a1a1a] border-b border-[#333] flex items-center justify-between">
        <div className="flex -mb-[1px]">
          {[
            { id: 'logs', label: 'السجلات (Logs)', icon: <Terminal size={14} /> },
            { id: 'build', label: 'البناء (Build)', icon: <Hammer size={14} /> },
            { id: 'emulator', label: 'المحاكي (Run)', icon: <Monitor size={14} /> },
            { id: 'problems', label: 'المشاكل (Problems)', icon: <Bug size={14} /> },
          ].map(tab => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={cn(
                "px-4 py-2 text-[10px] font-black uppercase tracking-widest flex items-center gap-2 transition-all border-b-2",
                activeTab === tab.id 
                  ? "text-purple-400 border-purple-500 bg-purple-500/5" 
                  : "text-gray-500 border-transparent hover:text-gray-300 hover:bg-white/5"
              )}
            >
              {tab.icon}
              <span className="hidden sm:inline">{tab.label}</span>
            </button>
          ))}
        </div>

        <div className="flex items-center gap-2">
          <button 
            onClick={onRun}
            className="flex items-center gap-2 px-3 py-1 bg-green-600 hover:bg-green-500 text-white rounded-lg text-[9px] font-black uppercase tracking-wider transition-all shadow-lg shadow-green-900/20 active:scale-95"
          >
            <Play size={10} fill="currentColor" /> تشغيل
          </button>
        </div>
      </div>
      
      {/* Content Area */}
      <div className="flex-1 overflow-hidden relative">
        <AnimatePresence mode="wait">
          {activeTab === 'logs' && (
            <motion.div 
              key="logs"
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              className="h-full p-4 font-mono text-xs overflow-y-auto scrollbar-hide"
            >
              {logs.length === 0 ? (
                <div className="opacity-20 flex flex-col items-center justify-center h-full gap-4 grayscale">
                   <Terminal size={40} />
                   <p className="font-sans text-[10px] font-bold uppercase tracking-widest">لا توجد مخرجات حالياً. اضغط "تشغيل" للتنفيذ.</p>
                </div>
              ) : (
                <div className="space-y-1">
                  {logs.map((log, i) => (
                    <div key={i} className="flex gap-3 group">
                      <span className="text-gray-700 select-none min-w-[20px]">{i + 1}</span>
                      <span className={cn(
                        log.startsWith('$') ? 'text-purple-400 font-bold' : 
                        log.includes('Error') ? 'text-red-400' : 'text-gray-300'
                      )}>{log}</span>
                    </div>
                  ))}
                  <div className="mt-4 text-green-500 flex items-center gap-2 bg-green-500/5 p-2 rounded-lg border border-green-500/10">
                    <CheckCircle2 size={14} />
                    <span className="font-sans font-bold text-[10px] uppercase">انتهت العملية بنجاح.</span>
                  </div>
                </div>
              )}
            </motion.div>
          )}

          {activeTab === 'build' && (
            <motion.div 
              key="build"
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              className="h-full p-8 flex flex-col items-center justify-center text-center space-y-4"
            >
              <div className="w-16 h-16 rounded-3xl bg-blue-500/10 flex items-center justify-center text-blue-400 border border-blue-500/20">
                <Hammer size={32} />
              </div>
              <div className="space-y-1">
                <h3 className="text-white font-black">حالة البناء</h3>
                <p className="text-gray-500 text-xs">آخر عملية بناء كانت قبل دقيقتين - ناجحة</p>
              </div>
              <button className="bg-[#222] hover:bg-[#282828] text-blue-400 px-6 py-2 rounded-xl text-[10px] font-black uppercase tracking-widest border border-[#333] transition-all">
                بدء البناء من جديد (Rebuild)
              </button>
            </motion.div>
          )}

          {activeTab === 'emulator' && (
            <motion.div 
              key="emulator"
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              className="h-full bg-black flex items-center justify-center"
            >
              <div className="w-full max-w-sm aspect-video bg-[#181818] rounded-2xl border border-[#333] flex items-center justify-center relative overflow-hidden group">
                 <div className="absolute inset-0 bg-gradient-to-t from-purple-600/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                 <div className="flex flex-col items-center gap-4 relative z-10">
                   <div className="w-12 h-12 rounded-full bg-purple-600 flex items-center justify-center shadow-2xl shadow-purple-900/40">
                      <Play size={24} className="text-white ml-1" />
                   </div>
                   <span className="text-[10px] font-black text-white uppercase tracking-widest">بدء المحاكي النشط</span>
                 </div>
              </div>
            </motion.div>
          )}

          {activeTab === 'problems' && (
            <motion.div 
              key="problems"
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              className="h-full flex flex-col p-4"
            >
               <h3 className="text-[10px] font-black text-gray-500 uppercase tracking-widest mb-4 flex items-center gap-2">
                 <Bug size={14} /> الأخطاء والتحذيرات
               </h3>
               <div className="space-y-2">
                 {problems.map((p, i) => (
                   <div key={i} className={cn(
                     "p-3 rounded-xl flex items-center justify-between border",
                     p.type === 'error' ? "bg-red-500/5 border-red-500/20 text-red-400" : "bg-yellow-500/5 border-yellow-500/20 text-yellow-400"
                   )}>
                     <div className="flex items-center gap-3">
                       {p.type === 'error' ? <XCircle size={14} /> : <AlertTriangle size={14} />}
                       <div className="flex flex-col">
                         <span className="text-xs font-bold">{p.message}</span>
                         <span className="text-[10px] opacity-70">File: {p.file}</span>
                       </div>
                     </div>
                     <button className="text-[10px] font-black underline uppercase opacity-50 hover:opacity-100">انتقل للخطأ</button>
                   </div>
                 ))}
               </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
      
      {/* Mini status bar */}
      <div className="h-4 bg-[#111] border-t border-[#333] flex items-center px-4 gap-4">
        <div className="flex items-center gap-1 text-[8px] font-bold text-gray-600">
           <Hammer size={8} /> <span>Built: 10:14 PM</span>
        </div>
        <div className="flex items-center gap-1 text-[8px] font-bold text-gray-600">
           <History size={8} /> <span>Last Run: 2m ago</span>
        </div>
      </div>
    </div>
  );
}
