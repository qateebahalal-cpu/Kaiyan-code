import React, { useState } from 'react';
import { 
  Settings, 
  User, 
  Monitor, 
  ShieldCheck, 
  Cpu, 
  Layers, 
  Globe, 
  Bell, 
  Database, 
  Zap, 
  X, 
  Eye, 
  Smartphone,
  Code,
  Palette,
  Key
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { cn } from '@/src/lib/utils';

interface SettingsPanelProps {
  onClose: () => void;
}

export default function SettingsPanel({ onClose }: SettingsPanelProps) {
  const [activeSection, setActiveSection] = useState('general');

  const sections = [
    { id: 'general', name: 'عام', icon: <Settings size={18} /> },
    { id: 'editor', name: 'المحرر', icon: <Code size={18} /> },
    { id: 'theme', name: 'المظهر', icon: <Palette size={18} /> },
    { id: 'security', name: 'الأمان', icon: <ShieldCheck size={18} /> },
    { id: 'advanced', name: 'متقدم', icon: <Cpu size={18} /> },
  ];

  return (
    <div className="fixed inset-0 z-[500] flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/90 backdrop-blur-xl" onClick={onClose} />
      
      <motion.div 
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        className="w-full max-w-4xl h-[600px] bg-[#121212] border border-[#333] rounded-[32px] overflow-hidden flex shadow-2xl relative z-10"
      >
        {/* Sidebar Nav */}
        <div className="w-64 border-r border-[#333] bg-[#1a1a1a] p-6 flex flex-col">
          <div className="flex items-center gap-3 mb-10 px-2">
            <div className="bg-purple-600 p-2 rounded-xl shadow-lg shadow-purple-900/40">
               <Settings className="text-white" size={20} />
            </div>
            <h2 className="text-xl font-black text-white tracking-tight">الإعدادات</h2>
          </div>

          <div className="flex-1 space-y-1">
            {sections.map(s => (
              <button
                key={s.id}
                onClick={() => setActiveSection(s.id)}
                className={cn(
                  "w-full px-4 py-3 rounded-2xl flex items-center gap-4 transition-all text-sm font-bold",
                  activeSection === s.id 
                    ? "bg-purple-600 text-white shadow-lg shadow-purple-900/20" 
                    : "text-gray-500 hover:bg-white/5 hover:text-gray-300"
                )}
              >
                {s.icon}
                <span>{s.name}</span>
              </button>
            ))}
          </div>

          <div className="pt-6 border-t border-[#333] text-[10px] text-gray-700 font-bold uppercase tracking-widest text-center">
            كيان كود v2.4.0
          </div>
        </div>

        {/* Content Area */}
        <div className="flex-1 flex flex-col overflow-hidden bg-[#121212]">
          <div className="h-16 border-b border-[#333] flex items-center justify-between px-8">
            <h3 className="text-lg font-black text-white capitalize">{sections.find(s => s.id === activeSection)?.name}</h3>
            <button 
              onClick={onClose}
              className="p-2 hover:bg-[#333] rounded-full transition-all text-gray-500 hover:text-white"
            >
              <X size={20} />
            </button>
          </div>

          <div className="flex-1 overflow-y-auto p-10 scrollbar-hide">
            <AnimatePresence mode="wait">
              {activeSection === 'general' && (
                <motion.div 
                  initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}
                  className="space-y-10"
                >
                  <div className="space-y-4">
                    <label className="text-[10px] font-black text-gray-500 uppercase tracking-widest mb-2 block">اللغة المفضلة</label>
                    <div className="grid grid-cols-2 gap-3">
                      <div className="p-4 bg-[#1a1a1a] border-2 border-purple-600 rounded-2xl flex items-center justify-between cursor-pointer">
                        <span className="text-white font-bold">العربية</span>
                        <div className="w-5 h-5 rounded-full bg-purple-600 flex items-center justify-center">
                           <CheckCircle2 size={12} className="text-white" />
                        </div>
                      </div>
                      <div className="p-4 bg-[#1a1a1a] border border-[#333] rounded-2xl flex items-center justify-between cursor-pointer hover:border-gray-700">
                        <span className="text-gray-500 font-bold">English</span>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <label className="text-[10px] font-black text-gray-500 uppercase tracking-widest mb-2 block">منطقة العمل</label>
                    <div className="bg-[#1a1a1a] p-4 rounded-2xl border border-[#333] flex items-center justify-between">
                       <div className="flex items-center gap-3">
                         <Globe size={18} className="text-gray-500" />
                         <span className="text-sm font-bold text-gray-300">الشرق الأوسط (دبي)</span>
                       </div>
                       <button className="text-purple-400 text-xs font-black uppercase underline">تغيير</button>
                    </div>
                  </div>

                  <div className="flex items-center justify-between p-4 bg-purple-600/5 border border-purple-500/20 rounded-2xl">
                     <div className="flex items-center gap-4">
                       <Zap className="text-purple-400" size={24} />
                       <div>
                         <h4 className="text-sm font-bold text-white">تحسين الأداء</h4>
                         <p className="text-[10px] text-gray-500">تقليل استهلاك الرام عبر تعطيل المعاينة التلقائية</p>
                       </div>
                     </div>
                     <div className="w-12 h-6 bg-purple-600 rounded-full relative p-1 cursor-pointer">
                        <div className="w-4 h-4 bg-white rounded-full absolute right-1" />
                     </div>
                  </div>
                </motion.div>
              )}

              {activeSection === 'editor' && (
                <motion.div 
                  initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}
                  className="space-y-8"
                >
                  <div className="space-y-4">
                     <label className="text-[10px] font-black text-gray-500 uppercase tracking-widest">حجم الخط</label>
                     <div className="flex items-center gap-6 bg-[#1a1a1a] p-4 rounded-2xl border border-[#333]">
                        <span className="text-xs text-gray-500">A</span>
                        <input type="range" className="flex-1 h-1 bg-[#333] rounded-full appearance-none cursor-pointer accent-purple-600" />
                        <span className="text-xl text-white">A</span>
                     </div>
                  </div>

                  <div className="space-y-4">
                     <label className="text-[10px] font-black text-gray-500 uppercase tracking-widest">إعدادات الكود</label>
                     <div className="space-y-3">
                        {[
                          'الإكمال التلقائي الذكي',
                          'تنسيق الكود عند الحفظ',
                          'إظهار أرقام الأسطر',
                          'تحديد القوس المقابل'
                        ].map((label, i) => (
                           <div key={i} className="flex items-center justify-between py-2 border-b border-[#222]">
                             <span className="text-sm font-bold text-gray-400">{label}</span>
                             <div className="w-10 h-5 bg-[#333] rounded-full relative p-1 cursor-pointer">
                                <div className="w-3 h-3 bg-gray-500 rounded-full" />
                             </div>
                           </div>
                        ))}
                     </div>
                  </div>
                </motion.div>
              )}

              {activeSection === 'security' && (
                <motion.div 
                  initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}
                  className="space-y-6"
                >
                   <div className="bg-red-500/10 border border-red-500/20 p-6 rounded-3xl space-y-4">
                      <div className="flex items-center gap-3 text-red-400">
                         <ShieldCheck size={20} />
                         <span className="font-black text-sm uppercase tracking-widest">تحذير أمني</span>
                      </div>
                      <p className="text-xs text-red-300 opacity-80 leading-relaxed">
                         تأكد من عدم مشاركة أي مفاتيح API خاصة في الكود العام. استخدم ملفات .env دائماً.
                      </p>
                   </div>

                   <div className="space-y-4">
                      <label className="text-[10px] font-black text-gray-500 uppercase tracking-widest">مفاتيح API الخارجية</label>
                      <div className="space-y-2">
                         <div className="bg-[#1a1a1a] border border-[#333] p-4 rounded-2xl flex items-center justify-between">
                            <span className="text-sm font-bold text-gray-300">OpenAI API Key</span>
                            <div className="flex items-center gap-3">
                               <input type="password" value="**************" disabled className="bg-transparent border-none outline-none text-xs text-gray-500 w-24" />
                               <button className="p-2 hover:bg-[#222] rounded-lg text-purple-400"><Eye size={16} /></button>
                            </div>
                         </div>
                         <div className="bg-[#1a1a1a] border border-[#333] p-4 rounded-2xl flex items-center justify-between">
                            <span className="text-sm font-bold text-gray-300">Google Gemini Key</span>
                            <button className="bg-purple-600/10 text-purple-400 px-4 py-1 rounded text-[10px] font-bold">إضافة مفتاح</button>
                         </div>
                      </div>
                   </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          <div className="h-20 border-t border-[#333] bg-[#181818] flex items-center justify-end px-10 gap-4">
             <button 
              onClick={onClose}
              className="text-gray-500 text-sm font-bold hover:text-white transition-all"
             >
               إلغاء التغييرات
             </button>
             <button 
              onClick={onClose}
              className="bg-purple-600 hover:bg-purple-500 text-white px-8 py-3 rounded-2xl font-black text-sm shadow-xl shadow-purple-900/40 transition-all active:scale-95"
             >
               حفظ الإعدادات
             </button>
          </div>
        </div>
      </motion.div>
    </div>
  );
}

const CheckCircle2 = ({ size, className }: { size?: number, className?: string }) => (
  <svg 
    width={size} height={size} 
    viewBox="0 0 24 24" fill="none" stroke="currentColor" 
    strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" 
    className={className}
  >
    <path d="M20 6L9 17l-5-5" />
  </svg>
);
