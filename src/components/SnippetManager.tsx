import React, { useState } from 'react';
import { 
  Code, 
  Copy, 
  Trash2, 
  Plus, 
  Search, 
  Hash,
  ChevronRight
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { cn } from '@/src/lib/utils';

export default function SnippetManager() {
  const [snippets, setSnippets] = useState([
    { id: '1', title: 'React Hook: UseAuth', code: 'const useAuth = () => { ... }', category: 'React' },
    { id: '2', title: 'Tailwind Card Style', code: 'className="bg-white rounded-lg shadow-lg"', category: 'CSS' },
  ]);

  return (
    <div className="flex-1 flex flex-col overflow-hidden">
      <div className="p-4 border-b border-[#222]">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-[10px] font-black text-gray-500 uppercase tracking-widest">مكتبة القصاصات (Snippets)</h3>
          <button className="p-1 hover:bg-[#333] rounded text-purple-400">
            <Plus size={14} />
          </button>
        </div>
        <div className="relative">
          <Search size={12} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-600" />
          <input 
            placeholder="ابحث عن قصاصة..." 
            className="w-full bg-[#121212] border border-[#333] rounded-lg pl-8 pr-3 py-1.5 text-[10px] text-white focus:outline-none focus:border-purple-600"
          />
        </div>
      </div>

      <div className="flex-1 overflow-y-auto py-2 scrollbar-hide">
        {snippets.map(s => (
          <div key={s.id} className="group px-4 py-3 hover:bg-[#252525] transition-all cursor-pointer border-b border-[#222]/50">
             <div className="flex items-center justify-between mb-1">
               <span className="text-xs font-bold text-gray-300 group-hover:text-purple-400">{s.title}</span>
               <div className="flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                 <button className="text-gray-600 hover:text-white"><Copy size={12} /></button>
                 <button className="text-gray-600 hover:text-red-400"><Trash2 size={12} /></button>
               </div>
             </div>
             <div className="flex items-center gap-2">
               <span className="bg-[#121212] px-1.5 py-0.5 rounded text-[8px] font-black text-gray-600 uppercase tracking-tighter">{s.category}</span>
               <code className="text-[10px] text-gray-600 truncate font-mono">{s.code}</code>
             </div>
          </div>
        ))}
      </div>
      
      <div className="p-4 bg-purple-600/5 mt-auto border-t border-purple-500/10">
         <p className="text-[9px] text-purple-400/80 leading-relaxed font-bold">
           حفظ القصاصات يساعدك على بناء مشاريعك بشكل أسرع بنسبة 40%
         </p>
      </div>
    </div>
  );
}
