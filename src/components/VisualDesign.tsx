import React from 'react';
import { Palette, Box, Grid, Type, MousePointer2, Sparkles, Wand2 } from 'lucide-react';
import { motion } from 'motion/react';

export default function VisualDesign() {
  const tools = [
    { icon: <Box size={20} />, label: 'Containers', color: 'text-blue-400' },
    { icon: <Type size={20} />, label: 'Typography', color: 'text-green-400' },
    { icon: <Grid size={20} />, label: 'Layouts', color: 'text-purple-400' },
    { icon: <MousePointer2 size={20} />, label: 'Interactions', color: 'text-orange-400' },
  ];

  return (
    <div className="flex-1 h-full bg-[#121212] flex overflow-hidden">
      {/* Design Toolbar */}
      <div className="w-20 border-r border-[#333] bg-[#181818] flex flex-col items-center py-6 gap-6">
        {tools.map((tool, i) => (
          <div 
            key={i}
            className="flex flex-col items-center gap-1 cursor-pointer group"
          >
            <div className={`p-3 rounded-2xl bg-[#222] ${tool.color} group-hover:scale-110 transition-all shadow-lg`}>
              {tool.icon}
            </div>
            <span className="text-[8px] font-black uppercase text-gray-600 group-hover:text-gray-400">{tool.label}</span>
          </div>
        ))}
      </div>

      {/* Design Canvas Area */}
      <div className="flex-1 flex flex-col p-8 items-center justify-center relative bg-[radial-gradient(#333_1px,transparent_1px)] bg-[size:20px_20px]">
        <div className="text-center space-y-4 max-w-sm">
          <div className="w-16 h-16 bg-gradient-to-br from-purple-500 to-pink-500 rounded-2xl mx-auto flex items-center justify-center shadow-2xl shadow-purple-900/40">
            <Palette className="text-white" size={32} />
          </div>
          <h2 className="text-2xl font-black text-white">واجهة التصميم المرئي</h2>
          <p className="text-gray-500 text-sm leading-relaxed">
            قريباً: ابنِ واجهات تطبيقاتك سحباً وإفلاتاً. حالياً يمكنك استخدام الذكاء الاصطناعي لإنشاء التصاميم في محرر الكود.
          </p>
          <button className="bg-[#222] border border-[#333] text-purple-400 px-6 py-2 rounded-xl text-xs font-bold flex items-center gap-2 mx-auto hover:bg-[#282828] transition-all">
            <Sparkles size={14} /> اطلب تصميماً بالذكاء الاصطناعي
          </button>
        </div>

        {/* Floating Widgets Mockup */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="absolute top-10 right-10 w-48 bg-[#1e1e1e] border border-[#333] rounded-2xl p-4 shadow-2xl"
        >
          <div className="flex items-center gap-2 mb-4">
            <div className="w-2 h-2 rounded-full bg-red-500" />
            <div className="w-2 h-2 rounded-full bg-yellow-500" />
            <div className="w-2 h-2 rounded-full bg-green-500" />
          </div>
          <div className="space-y-2">
            <div className="h-2 w-full bg-[#333] rounded" />
            <div className="h-2 w-3/4 bg-[#333] rounded" />
            <div className="h-8 w-full bg-purple-600/20 border border-purple-500/30 rounded-lg flex items-center justify-center">
               <Wand2 size={12} className="text-purple-400" />
            </div>
          </div>
        </motion.div>
      </div>

      {/* Properties Panel */}
      <div className="w-64 border-l border-[#333] bg-[#181818] p-4 hidden xl:block">
        <h3 className="text-[10px] font-black text-gray-500 uppercase tracking-widest mb-6">الخصائص المميزة</h3>
        <div className="space-y-6">
          <div className="space-y-3">
            <span className="text-[10px] font-bold text-gray-400">الألوان</span>
            <div className="flex gap-2">
              <div className="w-6 h-6 rounded-full bg-purple-600 ring-2 ring-white/10" />
              <div className="w-6 h-6 rounded-full bg-blue-600 ring-2 ring-white/10" />
              <div className="w-6 h-6 rounded-full bg-pink-600 ring-2 ring-white/10" />
              <div className="w-6 h-6 rounded-full bg-orange-600 ring-2 ring-white/10" />
            </div>
          </div>
          
          <div className="space-y-3">
            <span className="text-[10px] font-bold text-gray-400">نصف القطر</span>
            <div className="grid grid-cols-3 gap-2">
              <div className="h-8 bg-[#222] rounded flex items-center justify-center text-xs text-gray-500">None</div>
              <div className="h-8 bg-[#222] rounded-lg flex items-center justify-center text-xs text-gray-500">LG</div>
              <div className="h-8 bg-[#222] rounded-full flex items-center justify-center text-xs text-gray-500">Full</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
