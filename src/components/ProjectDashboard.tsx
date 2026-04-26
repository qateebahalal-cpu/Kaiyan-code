import React, { useState } from 'react';
import { 
  FolderPlus, 
  Trash2, 
  Clock, 
  Layout, 
  ChevronRight, 
  Plus, 
  Code2, 
  FileJson, 
  Globe,
  Settings
} from 'lucide-react';
import { type Project, type Template, TEMPLATES } from '@/src/constants';
import { cn } from '@/src/lib/utils';
import { motion } from 'motion/react';

interface ProjectDashboardProps {
  projects: Project[];
  onSelectProject: (id: string) => void;
  onCreateProject: (name: string, templateId?: string) => void;
  onDeleteProject: (id: string) => void;
}

export default function ProjectDashboard({ 
  projects, 
  onSelectProject, 
  onCreateProject, 
  onDeleteProject 
}: ProjectDashboardProps) {
  const [showNewModal, setShowNewModal] = useState(false);
  const [newProjectName, setNewProjectName] = useState('');
  const [selectedTemplate, setSelectedTemplate] = useState<string | undefined>();

  const handleCreate = () => {
    if (!newProjectName.trim()) return;
    onCreateProject(newProjectName.trim(), selectedTemplate);
    setNewProjectName('');
    setSelectedTemplate(undefined);
    setShowNewModal(false);
  };

  const getTemplateIcon = (id?: string) => {
    if (id === 'python-basic') return <Code2 size={24} className="text-blue-400" />;
    if (id === 'web-basic') return <Globe size={24} className="text-orange-400" />;
    if (id === 'js-basic') return <FileJson size={24} className="text-yellow-400" />;
    return <Layout size={24} className="text-purple-400" />;
  };

  return (
    <div className="flex-1 h-full bg-[#121212] flex flex-col overflow-y-auto">
      <div className="max-w-6xl mx-auto w-full p-8 space-y-12">
        
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div>
            <h1 className="text-4xl font-black text-white tracking-tight flex items-center gap-3">
              <span className="bg-purple-600 p-2 rounded-xl">KC</span>
              ادارة المشاريع
            </h1>
            <p className="text-gray-500 mt-2">مرحباً بك في كيان كود. ابدأ مشروعاً جديداً أو استكمل عملك.</p>
          </div>
          <button 
            onClick={() => setShowNewModal(true)}
            className="bg-purple-600 hover:bg-purple-500 text-white px-6 py-3 rounded-2xl font-bold flex items-center gap-2 shadow-lg shadow-purple-900/40 transition-all active:scale-95"
          >
            <Plus size={20} /> مشروع جديد
          </button>
        </div>

        {/* Projects Grid */}
        <div className="space-y-6">
          <h2 className="text-xs font-black text-gray-600 uppercase tracking-widest flex items-center gap-2">
            <Clock size={14} /> مشروعاتك الأخيرة
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {projects.map((project) => (
              <motion.div
                key={project.id}
                whileHover={{ y: -5, borderColor: '#a855f7' }}
                className="bg-[#181818] border border-[#333] rounded-3xl p-6 group cursor-pointer transition-all flex flex-col justify-between h-48"
                onClick={() => onSelectProject(project.id)}
              >
                <div className="flex justify-between items-start">
                  <div className="p-3 bg-[#222] rounded-2xl group-hover:bg-purple-900/20 transition-colors">
                    {getTemplateIcon(project.templateId)}
                  </div>
                  <button 
                    onClick={(e) => {
                      e.stopPropagation();
                      onDeleteProject(project.id);
                    }}
                    className="opacity-0 group-hover:opacity-100 p-2 hover:bg-red-500/10 hover:text-red-400 rounded-xl transition-all"
                  >
                    <Trash2 size={18} />
                  </button>
                </div>
                
                <div>
                  <h3 className="text-xl font-bold text-white mb-1">{project.name}</h3>
                  <div className="flex items-center justify-between">
                    <span className="text-xs text-gray-500">
                      {project.files.length} ملفات • {new Date(project.lastModified).toLocaleDateString()}
                    </span>
                    <ChevronRight size={18} className="text-gray-700 group-hover:text-purple-500 group-hover:translate-x-1 transition-all" />
                  </div>
                </div>
              </motion.div>
            ))}

            {/* Empty State / Add Card */}
            <div 
              onClick={() => setShowNewModal(true)}
              className="border-2 border-dashed border-[#333] rounded-3xl p-6 flex flex-col items-center justify-center gap-4 hover:border-purple-500/50 hover:bg-purple-500/5 cursor-pointer transition-all h-48"
            >
              <div className="w-12 h-12 rounded-full border-2 border-[#444] border-dashed flex items-center justify-center text-gray-500">
                <Plus size={24} />
              </div>
              <span className="text-gray-500 font-medium">ابدأ مشروعاً جديداً</span>
            </div>
          </div>
        </div>

        {/* Templates Section */}
        <div className="space-y-6">
          <h2 className="text-xs font-black text-gray-600 uppercase tracking-widest flex items-center gap-2">
            <Layout size={14} /> قوالب سريعة
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {TEMPLATES.map((template) => (
              <div 
                key={template.id}
                onClick={() => {
                  setNewProjectName(`My ${template.name}`);
                  setSelectedTemplate(template.id);
                  setShowNewModal(true);
                }}
                className="bg-[#181818] border border-[#333] rounded-2xl p-4 hover:bg-[#202020] cursor-pointer transition-colors space-y-3"
              >
                <div className="w-10 h-10 rounded-xl bg-[#222] flex items-center justify-center">
                  {getTemplateIcon(template.id)}
                </div>
                <div>
                  <h4 className="font-bold text-white text-sm">{template.name}</h4>
                  <p className="text-[10px] text-gray-500 mt-1">{template.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* New Project Modal Overlay */}
      {showNewModal && (
        <div className="fixed inset-0 z-[200] flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-black/80 backdrop-blur-md" onClick={() => setShowNewModal(false)} />
          <motion.div 
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="bg-[#1e1e1e] border border-[#333] w-full max-w-md rounded-3xl p-8 relative z-[210] shadow-2xl"
          >
            <h2 className="text-2xl font-black text-white mb-6">مشروع جديد</h2>
            
            <div className="space-y-6">
              <div className="space-y-2">
                <label className="text-[10px] font-black text-gray-500 uppercase tracking-widest">اسم المشروع</label>
                <input 
                  autoFocus
                  value={newProjectName}
                  onChange={(e) => setNewProjectName(e.target.value)}
                  placeholder="مثال: متجر الكتروني"
                  className="w-full bg-[#252525] border border-[#333] rounded-xl px-4 py-3 text-white focus:outline-none focus:border-purple-500 transition-colors"
                />
              </div>

              <div className="space-y-2">
                <label className="text-[10px] font-black text-gray-500 uppercase tracking-widest">اختر قالباً (اختياري)</label>
                <div className="grid grid-cols-2 gap-2">
                  {TEMPLATES.map(t => (
                    <div 
                      key={t.id}
                      onClick={() => setSelectedTemplate(t.id)}
                      className={cn(
                        "p-3 rounded-xl border cursor-pointer transition-all text-center",
                        selectedTemplate === t.id 
                          ? "bg-purple-600/20 border-purple-500 text-purple-400" 
                          : "bg-[#252525] border-[#333] text-gray-500 hover:border-[#444]"
                      )}
                    >
                      <div className="mb-1 flex justify-center">{getTemplateIcon(t.id)}</div>
                      <span className="text-[10px] font-bold">{t.name}</span>
                    </div>
                  ))}
                  <div 
                    onClick={() => setSelectedTemplate(undefined)}
                    className={cn(
                      "p-3 rounded-xl border cursor-pointer transition-all text-center flex flex-col items-center justify-center",
                      selectedTemplate === undefined 
                        ? "bg-purple-600/20 border-purple-500 text-purple-400" 
                        : "bg-[#252525] border-[#333] text-gray-500 hover:border-[#444]"
                    )}
                  >
                    <FolderPlus size={18} className="mb-1" />
                    <span className="text-[10px] font-bold">مشروع فارغ</span>
                  </div>
                </div>
              </div>

              <div className="flex gap-3 pt-4">
                <button 
                  onClick={() => setShowNewModal(false)}
                  className="flex-1 bg-transparent hover:bg-[#333] text-gray-400 py-3 rounded-xl font-bold transition-all"
                >
                  إلغاء
                </button>
                <button 
                  onClick={handleCreate}
                  disabled={!newProjectName.trim()}
                  className="flex-1 bg-purple-600 hover:bg-purple-500 disabled:opacity-50 text-white py-3 rounded-xl font-bold shadow-lg shadow-purple-900/30 transition-all"
                >
                  إنشاء المشروع
                </button>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </div>
  );
}
