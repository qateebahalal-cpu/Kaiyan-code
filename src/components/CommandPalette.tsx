import React, { useState, useEffect } from 'react';
import { Search, Command, FileCode, Zap, Smartphone, Globe, Shield, MessageSquare, X } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { cn } from '@/src/lib/utils';

export default function CommandPalette({ isOpen, onClose }: { isOpen: boolean, onClose: () => void }) {
  const [query, setQuery] = useState('');

  const commands = [
    { name: 'فتح ملف...', icon: <FileCode size={16} />, shortcut: '⌘P' },
    { name: 'تحسين الكود باستخدام AI', icon: <Zap size={16} />, shortcut: '⌘L' },
    { name: 'تشغيل المحاكي', icon: <Smartphone size={16} />, shortcut: '⌘R' },
    { name: 'نشر المشروع', icon: <Globe size={16} />, shortcut: '⌘D' },
    { name: 'فحص الأمان', icon: <Shield size={16} />, shortcut: '⌘S' },
    { name: 'تحدث مع المساعد', icon: <MessageSquare size={16} />, shortcut: '⌘K' },
  ];

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'k' && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        onClose(); // Toggle mechanism is handled by parent but we handle the key here
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[1000] flex items-start justify-center pt-[15vh] px-4">
          <motion.div 
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            className="absolute inset-0 bg-black/80 backdrop-blur-md"
            onClick={onClose}
          />
          
          <motion.div 
            initial={{ scale: 0.95, opacity: 0, y: -20 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.95, opacity: 0, y: -20 }}
            className="w-full max-w-2xl bg-[#1a1a1a] border border-[#333] rounded-[24px] shadow-2xl overflow-hidden relative z-10"
          >
            <div className="p-4 border-b border-[#333] flex items-center gap-4">
              <Search className="text-purple-400" size={20} />
              <input 
                autoFocus
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="ماذا تريد أن تفعل؟"
                className="flex-1 bg-transparent border-none outline-none text-lg text-white font-bold"
              />
              <div className="flex items-center gap-2 bg-[#252525] px-2 py-1 rounded text-[10px] font-black text-gray-500">
                 ESC لـلإغلاق
              </div>
            </div>

            <div className="p-2 max-h-[400px] overflow-y-auto scrollbar-hide">
              <div className="px-3 py-2 text-[10px] font-black text-gray-700 uppercase tracking-widest">الأوامر المقترحة</div>
              {commands.map((cmd, i) => (
                <div 
                  key={i}
                  className="flex items-center justify-between p-3 rounded-xl hover:bg-purple-600/10 cursor-pointer group transition-all"
                >
                  <div className="flex items-center gap-4 px-2">
                    <div className="p-2 bg-[#222] rounded-lg text-gray-500 group-hover:text-purple-400 transition-colors">
                      {cmd.icon}
                    </div>
                    <span className="text-sm font-bold text-gray-200 group-hover:text-white">{cmd.name}</span>
                  </div>
                  <span className="text-[10px] bg-[#222] p-1.5 rounded-lg text-gray-600 font-mono">{cmd.shortcut}</span>
                </div>
              ))}
            </div>
            
            <div className="p-4 bg-[#111] border-t border-[#333] flex items-center justify-between">
              <div className="flex items-center gap-6">
                 <div className="flex items-center gap-2 text-[10px] font-black text-gray-700">
                    <div className="w-4 h-4 bg-[#222] rounded flex items-center justify-center">↵</div>
                    <span>للاختيار</span>
                 </div>
                 <div className="flex items-center gap-2 text-[10px] font-black text-gray-700">
                    <div className="w-4 h-4 bg-[#222] rounded flex items-center justify-center">↑↓</div>
                    <span>للتنقل</span>
                 </div>
              </div>
              <div className="text-[10px] font-black text-purple-600 uppercase tracking-widest">
                كيان كود (Smart Command)
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
