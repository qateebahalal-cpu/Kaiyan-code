import React from 'react';
import { 
  Package, 
  Image as ImageIcon, 
  Type, 
  Palette, 
  Plus, 
  Search,
  Component as ComponentIcon
} from 'lucide-react';
import { motion } from 'motion/react';

export default function ResourceManager() {
  const sections = [
    { 
      id: 'components', 
      name: 'المكونات', 
      icon: <ComponentIcon size={16} />,
      items: ['Navbar', 'Button', 'Card', 'Footer', 'Modal']
    },
    { 
      id: 'assets', 
      name: 'الأصول', 
      icon: <ImageIcon size={16} />,
      items: ['logo.png', 'hero-bg.jpg', 'icon.svg']
    },
    { 
      id: 'themes', 
      name: 'السمات', 
      icon: <Palette size={16} />,
      items: ['Dark Mode', 'Light Mode', 'High Contrast']
    },
    { 
      id: 'fonts', 
      name: 'الخطوط', 
      icon: <Type size={16} />,
      items: ['Inter', 'Cairo', 'JetBrains Mono']
    }
  ];

  return (
    <div className="flex flex-col h-full bg-[#181818]">
      <div className="p-4 border-b border-[#333]">
        <h2 className="text-gray-400 font-semibold text-[10px] uppercase tracking-widest flex items-center gap-2 mb-4">
          <Package size={14} /> مدير الموارد
        </h2>
        
        <div className="relative">
          <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500" />
          <input 
            placeholder="بحث في الموارد..."
            className="w-full bg-[#252525] border border-[#333] rounded-lg pl-9 pr-3 py-1.5 text-xs text-gray-300 focus:outline-none focus:border-purple-500 transition-all"
          />
        </div>
      </div>

      <div className="flex-1 overflow-y-auto py-2 scrollbar-hide">
        {sections.map((section) => (
          <div key={section.id} className="mb-4">
            <div className="px-4 py-2 flex items-center justify-between group">
              <div className="flex items-center gap-2 text-[10px] font-black text-gray-600 uppercase tracking-widest">
                {section.icon}
                <span>{section.name}</span>
              </div>
              <button className="opacity-0 group-hover:opacity-100 p-1 hover:text-purple-400 transition-all">
                <Plus size={12} />
              </button>
            </div>
            
            <div className="space-y-0.5">
              {section.items.map((item, i) => (
                <motion.div 
                  key={i}
                  whileHover={{ x: 5 }}
                  className="px-6 py-1.5 text-xs text-gray-400 hover:text-white hover:bg-[#222] cursor-pointer transition-all flex items-center gap-3"
                >
                  <div className="w-1.5 h-1.5 rounded-full bg-purple-500/30 group-hover:bg-purple-500" />
                  {item}
                </motion.div>
              ))}
            </div>
          </div>
        ))}
      </div>

      <div className="p-4 border-t border-[#333] bg-[#1a1a1a]">
        <button className="w-full py-2 bg-purple-600/10 border border-purple-500/30 text-purple-400 rounded-lg text-xs font-bold hover:bg-purple-600/20 transition-all">
          استيراد مورد جديد
        </button>
      </div>
    </div>
  );
}
