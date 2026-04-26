import React, { useState } from 'react';
import { 
  ShoppingBag, 
  Star, 
  Download, 
  Flame, 
  Layout, 
  Palette, 
  Cpu, 
  Globe, 
  Users, 
  Plus,
  ArrowRight,
  Search,
  Check
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { cn } from '@/src/lib/utils';

export default function Marketplace() {
  const [activeCategory, setActiveCategory] = useState('all');

  const categories = [
    { id: 'all', name: 'الكل' },
    { id: 'templates', name: 'القوالب' },
    { id: 'components', name: 'المكونات' },
    { id: 'themes', name: 'السمات' },
    { id: 'plugins', name: 'الإضافات' },
  ];

  const items = [
    {
      id: '1',
      name: 'E-Commerce Pro',
      category: 'templates',
      author: 'Kayan Team',
      rating: 4.9,
      downloads: '2.5k',
      price: 'Free',
      image: 'https://images.unsplash.com/photo-1557821552-17105176677c?w=800&q=80',
      tags: ['React', 'Tailwind']
    },
    {
      id: '2',
      name: 'Glassmorphism UI',
      category: 'components',
      author: 'DesignGuru',
      rating: 4.7,
      downloads: '1.2k',
      price: 'Premium',
      image: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=800&q=80',
      tags: ['UI', 'Modern']
    },
    {
      id: '3',
      name: 'Cyberpunk Dark',
      category: 'themes',
      author: 'NeonCoder',
      rating: 5.0,
      downloads: '800',
      price: 'Free',
      image: 'https://images.unsplash.com/photo-1614850523296-d8c1af93d400?w=800&q=80',
      tags: ['Theme', 'Dark']
    }
  ];

  return (
    <div className="flex-1 flex flex-col bg-[#121212] overflow-hidden">
      {/* Header */}
      <div className="p-8 pb-0">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h2 className="text-3xl font-black text-white tracking-tight flex items-center gap-4">
              <div className="p-3 bg-orange-600 rounded-2xl shadow-lg shadow-orange-900/20">
                <ShoppingBag size={24} />
              </div>
              متجر كيان (Marketplace)
            </h2>
            <p className="text-gray-500 mt-2">استكشف آلاف الموارد الجاهزة لتسريع عملية التطوير</p>
          </div>
          
          <div className="flex items-center gap-4">
            <div className="relative group">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500 group-focus-within:text-purple-400 transition-colors" size={18} />
              <input 
                placeholder="ابحث عن قالب، مكون، أو سمة..."
                className="bg-[#1a1a1a] border border-[#333] rounded-2xl pl-12 pr-6 py-3 text-sm text-white w-80 focus:outline-none focus:border-purple-600 transition-all"
              />
            </div>
            <button className="bg-purple-600 text-white px-6 py-3 rounded-2xl font-black text-sm flex items-center gap-3 hover:bg-purple-500 transition-all shadow-xl shadow-purple-900/20">
              <Plus size={18} /> نشر مورد
            </button>
          </div>
        </div>

        {/* Categories Bar */}
        <div className="flex items-center gap-2 border-b border-[#222]">
          {categories.map(cat => (
            <button
              key={cat.id}
              onClick={() => setActiveCategory(cat.id)}
              className={cn(
                "px-6 py-4 text-xs font-black uppercase tracking-widest transition-all relative",
                activeCategory === cat.id ? "text-purple-400" : "text-gray-600 hover:text-gray-400"
              )}
            >
              {cat.name}
              {activeCategory === cat.id && (
                <motion.div layoutId="market-tab" className="absolute bottom-0 left-4 right-4 h-1 bg-purple-600 rounded-t-full" />
              )}
            </button>
          ))}
        </div>
      </div>

      {/* Grid Content */}
      <div className="flex-1 overflow-y-auto p-8 pt-6 scrollbar-hide">
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
          {items.map((item, i) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              className="bg-[#1a1a1a] border border-[#333] rounded-[32px] overflow-hidden group hover:border-purple-500/50 transition-all"
            >
              <div className="relative h-48 overflow-hidden">
                <img src={item.image} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" alt={item.name} />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
                <div className="absolute top-4 right-4 bg-black/50 backdrop-blur-md px-3 py-1 rounded-full text-[10px] font-black text-white flex items-center gap-2">
                   <Star size={10} className="text-yellow-500 fill-yellow-500" />
                   {item.rating}
                </div>
              </div>

              <div className="p-6 space-y-4">
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="text-lg font-black text-white">{item.name}</h3>
                    <p className="text-xs text-gray-500">تم بواسطة {item.author}</p>
                  </div>
                  <div className={cn(
                    "px-3 py-1 rounded-lg text-[10px] font-black uppercase tracking-wider",
                    item.price === 'Free' ? "bg-green-600/20 text-green-400" : "bg-purple-600/20 text-purple-400"
                  )}>
                    {item.price}
                  </div>
                </div>

                <div className="flex flex-wrap gap-2">
                  {item.tags.map(tag => (
                    <span key={tag} className="text-[10px] bg-[#252525] text-gray-500 px-2 py-0.5 rounded-md">#{tag}</span>
                  ))}
                </div>

                <div className="flex items-center justify-between pt-4 border-t border-[#222]">
                  <div className="flex items-center gap-2 text-[10px] font-bold text-gray-600">
                    <Download size={12} />
                    <span>{item.downloads} تحميل</span>
                  </div>
                  <button className="flex items-center gap-2 text-white font-black text-xs hover:text-purple-400 transition-colors">
                     عرض التفاصيل <ArrowRight size={14} />
                  </button>
                </div>
              </div>
            </motion.div>
          ))}
          
          {/* Add more mockup items to simulate "500" */}
          {[...Array(6)].map((_, i) => (
            <div key={`mock-${i}`} className="bg-[#1a1a1a] border border-[#333] rounded-[32px] p-8 flex flex-col items-center justify-center gap-4 opacity-40">
               <div className="w-16 h-16 bg-[#222] rounded-2xl flex items-center justify-center text-gray-700">
                  <Flame size={32} />
               </div>
               <div className="h-4 w-32 bg-[#222] rounded-full" />
               <div className="h-3 w-48 bg-[#222] rounded-full" />
            </div>
          ))}
        </div>
      </div>
      
      {/* Footer Stats */}
      <div className="h-10 border-t border-[#222] bg-[#1a1a1a] flex items-center px-8 justify-between text-[10px] font-black text-gray-600 uppercase tracking-widest">
         <div className="flex items-center gap-6">
            <span>542 قالب</span>
            <span>1,200 مكون</span>
            <span>340 سمة</span>
         </div>
         <div className="flex items-center gap-2 text-purple-500">
            <Users size={12} /> 12,403 مشارك نشط
         </div>
      </div>
    </div>
  );
}
