import React, { useState, useEffect } from 'react';
import Sidebar from './components/Sidebar';
import CodeEditor from './components/Editor';
import AIChat from './components/AIChat';
import BuildRunTools from './components/BuildRunTools';
import ProjectDashboard from './components/ProjectDashboard';
import SettingsPanel from './components/SettingsPanel';
import { INITIAL_FILES, TEMPLATES, type File, type Task, type Project } from './constants';
import { 
  Menu, 
  X, 
  Settings, 
  Cloud, 
  Search, 
  Layout, 
  MessageSquare,
  Cpu,
  Monitor,
  ArrowLeft,
  LayoutDashboard,
  Plus
} from 'lucide-react';
import { cn } from './lib/utils';
import { motion, AnimatePresence } from 'motion/react';

const INITIAL_PROJECT: Project = {
  id: 'default-project',
  name: 'مشروعي الأول',
  description: 'بداية سريعة مع كيان كود',
  lastModified: Date.now(),
  files: INITIAL_FILES,
  tasks: [],
};

import VisualDesign from './components/VisualDesign';
import WebPreview from './components/WebPreview';

export default function App() {
  const [view, setView] = useState<'dashboard' | 'editor'>('dashboard');
  const [projects, setProjects] = useState<Project[]>([INITIAL_PROJECT]);
  const [currentProjectId, setCurrentProjectId] = useState<string>(INITIAL_PROJECT.id);
  const [currentFileId, setCurrentFileId] = useState<string>('');
  
  const [logs, setLogs] = useState<string[]>([]);
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [isChatOpen, setIsChatOpen] = useState(true);
  const [isOutputOpen, setIsOutputOpen] = useState(true);
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  const [editorMode, setEditorMode] = useState<'code' | 'design' | 'preview'>('code');

  // Active Project Helper
  const currentProject = projects.find(p => p.id === currentProjectId) || projects[0];
  const files = currentProject.files;
  const tasks = currentProject.tasks;
  const currentFile = files.find(f => f.id === currentFileId) || files[0];

  useEffect(() => {
    if (currentProject && !currentFileId && currentProject.files.length > 0) {
      setCurrentFileId(currentProject.files[0].id);
    }
  }, [currentProjectId, currentProject, currentFileId]);

  const handleSelectProject = (id: string) => {
    setCurrentProjectId(id);
    setView('editor');
    const project = projects.find(p => p.id === id);
    if (project && project.files.length > 0) {
      setCurrentFileId(project.files[0].id);
    }
  };

  const handleCreateProject = (name: string, templateId?: string) => {
    const template = TEMPLATES.find(t => t.id === templateId);
    const newFiles: File[] = template 
      ? template.defaultFiles.map(df => ({ ...df, id: Math.random().toString(36).substr(2, 9) }))
      : [];

    const newProject: Project = {
      id: Math.random().toString(36).substr(2, 9),
      name,
      description: template ? template.description : 'مشروع مخصص',
      lastModified: Date.now(),
      files: newFiles.length > 0 ? newFiles : [
        { id: '1', name: 'README.md', language: 'markdown', content: `# ${name}\nCreated with Kayan Code` }
      ],
      tasks: [],
      templateId,
    };

    setProjects(prev => [...prev, newProject]);
    handleSelectProject(newProject.id);
  };

  const handleDeleteProject = (id: string) => {
    setProjects(prev => prev.filter(p => p.id !== id));
  };

  const updateProject = (updates: Partial<Project>) => {
    setProjects(prev => prev.map(p => p.id === currentProjectId ? { ...p, ...updates, lastModified: Date.now() } : p));
  };

  const handleCodeChange = (newCode: string) => {
    const updatedFiles = files.map(f => f.id === currentFileId ? { ...f, content: newCode } : f);
    updateProject({ files: updatedFiles });
  };

  const handleAddFile = () => {
    const name = prompt('اسم الملف (e.g. script.js):');
    if (!name) return;
    
    const extension = name.split('.').pop() || 'txt';
    const langMap: Record<string, string> = {
      'py': 'python',
      'js': 'javascript',
      'css': 'css',
      'html': 'html',
      'md': 'markdown'
    };

    const newFile: File = {
      id: Math.random().toString(36).substr(2, 9),
      name,
      language: langMap[extension] || 'javascript',
      content: '',
    };
    updateProject({ files: [...files, newFile] });
    setCurrentFileId(newFile.id);
  };

  const handleDeleteFile = (id: string) => {
    if (files.length === 1) return;
    const updatedFiles = files.filter(f => f.id !== id);
    updateProject({ files: updatedFiles });
    if (currentFileId === id) {
      setCurrentFileId(updatedFiles[0].id);
    }
  };

  const handleAddTask = (text: string) => {
    const newTask: Task = {
      id: Math.random().toString(36).substr(2, 9),
      text,
      completed: false,
      createdAt: Date.now()
    };
    updateProject({ tasks: [newTask, ...tasks] });
  };

  const handleToggleTask = (id: string) => {
    updateProject({ tasks: tasks.map(t => t.id === id ? { ...t, completed: !t.completed } : t) });
  };

  const handleDeleteTask = (id: string) => {
    updateProject({ tasks: tasks.filter(t => t.id !== id) });
  };

  const runCode = () => {
    setLogs([`$ run ${currentFile.name}`, `Executing ${currentFile.language} environment...`, `Process started...`, `Output from ${currentFile.name}:`, `...`, `Execution successful.`]);
    if (editorMode !== 'preview') setEditorMode('preview');
  };

  const aiContext = `
Project: ${currentProject.name}
Current File (${currentFile.name}):
\`\`\`${currentFile.language}
${currentFile.content}
\`\`\`

Current Tasks:
${tasks.map(t => `- [${t.completed ? 'x' : ' '}] ${t.text}`).join('\n')}
  `.trim();

  return (
    <div className="h-screen w-screen bg-[#121212] flex flex-col text-gray-200 overflow-hidden font-sans select-none rtl">
      {/* Top Navbar */}
      <header className="h-14 border-b border-[#333] flex items-center justify-between px-4 bg-[#181818] z-50">
        <div className="flex items-center gap-4">
          {view === 'editor' && (
            <button 
              onClick={() => setIsSidebarOpen(!isSidebarOpen)}
              className="p-2 hover:bg-[#333] rounded-xl transition-colors"
            >
              {isSidebarOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          )}
          
          <div className="flex items-center gap-3">
            <div className="bg-purple-600 p-1.5 rounded-xl shadow-lg shadow-purple-900/40">
              <Cpu className="w-5 h-5 text-white" />
            </div>
            <div className="flex flex-col -space-y-1">
              <h1 className="font-black text-lg tracking-tight">
                <span className="text-purple-500">كيان</span> كود
              </h1>
              {view === 'editor' && (
                <span className="text-[10px] text-gray-500 font-bold uppercase tracking-widest">{currentProject.name}</span>
              )}
            </div>
          </div>
        </div>

        <div className="flex items-center gap-2">
          {view === 'editor' ? (
            <button 
              onClick={() => setView('dashboard')}
              className="flex items-center gap-2 px-4 py-2 bg-[#252525] hover:bg-[#333] text-gray-300 rounded-xl text-xs font-bold transition-all border border-[#333]"
            >
              <LayoutDashboard size={16} /> لوحة التحكم
            </button>
          ) : (
            <div className="hidden md:flex items-center bg-[#252525] px-4 py-2 rounded-xl border border-[#333] text-xs text-gray-400 gap-3 min-w-[300px]">
              <Search size={14} />
              <input 
                placeholder="ابحث عن مشروع..." 
                className="bg-transparent border-none outline-none w-full text-gray-200"
              />
            </div>
          )}
          
          <div className="h-8 w-[1px] bg-[#333] mx-2 hidden sm:block" />

          <div className="flex items-center gap-1">
            <button className="p-2.5 hover:bg-[#333] rounded-xl transition-colors text-gray-400">
              <Cloud size={20} />
            </button>
            <button 
              onClick={() => setIsSettingsOpen(true)}
              className="p-2.5 hover:bg-[#333] rounded-xl transition-colors text-gray-400"
            >
              <Settings size={20} />
            </button>
          </div>
        </div>
      </header>

      <div className="flex-1 flex overflow-hidden">
        {view === 'dashboard' ? (
          <ProjectDashboard 
            projects={projects}
            onSelectProject={handleSelectProject}
            onCreateProject={handleCreateProject}
            onDeleteProject={handleDeleteProject}
          />
        ) : (
          <>
            {/* Editor Sidebar */}
            <AnimatePresence mode="wait">
              {isSidebarOpen && (
                <motion.div
                  initial={{ width: 0, opacity: 0 }}
                  animate={{ width: 280, opacity: 1 }}
                  exit={{ width: 0, opacity: 0 }}
                  transition={{ type: 'spring', damping: 25, stiffness: 200 }}
                  className="overflow-hidden h-full z-40 border-l border-[#333]"
                >
                  <Sidebar 
                    files={files} 
                    currentFileId={currentFileId} 
                    tasks={tasks}
                    currentProject={currentProject}
                    onSelectFile={setCurrentFileId}
                    onAddFile={handleAddFile}
                    onDeleteFile={handleDeleteFile}
                    onAddTask={handleAddTask}
                    onToggleTask={handleToggleTask}
                    onDeleteTask={handleDeleteTask}
                    onUpdateProject={updateProject}
                  />
                </motion.div>
              )}
            </AnimatePresence>

            {/* Main Editor Area */}
            <main className="flex-1 flex flex-col relative overflow-hidden bg-[#1e1e1e]">
              <div className="h-11 bg-[#181818] border-b border-[#333] flex items-center justify-between px-2">
                <div className="flex items-center overflow-x-auto scrollbar-hide gap-1">
                  {files.map(file => (
                    <div 
                      key={file.id}
                      onClick={() => {
                        setCurrentFileId(file.id);
                        if (editorMode !== 'code') setEditorMode('code');
                      }}
                      className={cn(
                        "px-4 py-2 text-xs font-bold border-t-2 transition-all flex items-center gap-3 rounded-t-lg min-w-fit max-w-[200px]",
                        file.id === currentFileId 
                          ? "bg-[#1e1e1e] border-t-purple-500 text-white" 
                          : "bg-transparent border-t-transparent text-gray-500 hover:text-gray-300"
                      )}
                    >
                      <span className="truncate">{file.name}</span>
                      {files.length > 1 && file.id === currentFileId && (
                        <X 
                          size={12} 
                          className="hover:text-red-400 opacity-50 cursor-pointer" 
                          onClick={(e) => {
                            e.stopPropagation();
                            handleDeleteFile(file.id);
                          }}
                        />
                      )}
                    </div>
                  ))}
                  <button 
                    onClick={handleAddFile}
                    className="p-2 text-gray-600 hover:text-gray-400 transition-colors"
                  >
                    <Plus size={16} />
                  </button>
                </div>

                {/* Editor Sub-Mode Toggle */}
                <div className="flex bg-[#121212] p-1 rounded-xl border border-[#333] mx-2">
                  <button 
                    onClick={() => setEditorMode('code')}
                    className={cn(
                      "px-3 py-1 text-[10px] font-black uppercase rounded-lg transition-all",
                      editorMode === 'code' ? "bg-purple-600 text-white" : "text-gray-500 hover:text-gray-300"
                    )}
                  >
                    الكود
                  </button>
                  <button 
                    onClick={() => setEditorMode('design')}
                    className={cn(
                      "px-3 py-1 text-[10px] font-black uppercase rounded-lg transition-all",
                      editorMode === 'design' ? "bg-purple-600 text-white" : "text-gray-500 hover:text-gray-300"
                    )}
                  >
                    التصميم
                  </button>
                  <button 
                    onClick={() => setEditorMode('preview')}
                    className={cn(
                      "px-3 py-1 text-[10px] font-black uppercase rounded-lg transition-all",
                      editorMode === 'preview' ? "bg-purple-600 text-white" : "text-gray-500 hover:text-gray-300"
                    )}
                  >
                    المعاينة
                  </button>
                </div>
              </div>

              <div className="flex-1 flex flex-col overflow-hidden">
                <div className="flex-1 overflow-hidden relative">
                  <AnimatePresence mode="wait">
                    {editorMode === 'code' && (
                      <motion.div 
                        key="editor-code"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="h-full"
                      >
                        <CodeEditor 
                          code={currentFile.content} 
                          onChange={handleCodeChange} 
                          language={currentFile.language} 
                        />
                      </motion.div>
                    )}
                    {editorMode === 'design' && (
                      <motion.div 
                        key="editor-design"
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.95 }}
                        className="h-full"
                      >
                        <VisualDesign />
                      </motion.div>
                    )}
                    {editorMode === 'preview' && (
                      <motion.div 
                        key="editor-preview"
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -20 }}
                        className="h-full"
                      >
                        <WebPreview files={files} />
                      </motion.div>
                    )}
                  </AnimatePresence>
                  
                  {/* Floating buttons for mobile */}
                  <div className="absolute bottom-6 right-6 flex flex-col gap-3 lg:hidden">
                    <button 
                      onClick={() => setIsChatOpen(!isChatOpen)}
                      className="w-14 h-14 rounded-full bg-purple-600 flex items-center justify-center shadow-2xl shadow-purple-900/40"
                    >
                      <MessageSquare size={24} className="text-white" />
                    </button>
                  </div>
                </div>

                {/* Output Panel */}
                <AnimatePresence>
                  {isOutputOpen && (
                    <motion.div
                      initial={{ height: 0 }}
                      animate={{ height: 220 }}
                      exit={{ height: 0 }}
                      className="overflow-hidden"
                    >
                      <BuildRunTools logs={logs} onRun={runCode} />
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
              
              <div 
                onClick={() => setIsOutputOpen(!isOutputOpen)}
                className="h-2 bg-[#252525] hover:bg-purple-600/20 cursor-pointer flex items-center justify-center transition-all group"
              >
                <div className="w-12 h-1 bg-[#444] group-hover:bg-purple-500 rounded-full transition-colors" />
              </div>
            </main>

            {/* AI Chat Sidebar */}
            <AnimatePresence mode="wait">
              {isChatOpen && (
                <motion.div
                  initial={{ width: 0, opacity: 0 }}
                  animate={{ width: 420, opacity: 1 }}
                  exit={{ width: 0, opacity: 0 }}
                  transition={{ type: 'spring', damping: 25, stiffness: 200 }}
                  className="hidden lg:block overflow-hidden border-r border-[#333]"
                >
                  <AIChat currentCode={aiContext} />
                </motion.div>
              )}
            </AnimatePresence>

            {/* Settings Overlay */}
            <AnimatePresence>
              {isSettingsOpen && (
                <SettingsPanel onClose={() => setIsSettingsOpen(false)} />
              )}
            </AnimatePresence>

            {/* Mobile Chat Sidebar Overlay */}
            <AnimatePresence>
              {isChatOpen && (
                <motion.div
                  initial={{ x: '-100%' }}
                  animate={{ x: 0 }}
                  exit={{ x: '-100%' }}
                  className="fixed inset-0 z-[100] lg:hidden"
                >
                   <div className="absolute inset-0 bg-black/60 backdrop-blur-md" onClick={() => setIsChatOpen(false)} />
                   <div className="absolute left-0 top-0 bottom-0 w-[85%] bg-[#1e1e1e] shadow-2xl">
                      <AIChat currentCode={aiContext} />
                      <button 
                        onClick={() => setIsChatOpen(false)}
                        className="absolute right-[-50px] top-4 w-12 h-12 rounded-full bg-[#1e1e1e] border border-[#333] flex items-center justify-center shadow-xl"
                      >
                        <X className="text-gray-400" />
                      </button>
                   </div>
                </motion.div>
              )}
            </AnimatePresence>
          </>
        )}
      </div>

      {/* Footer Status Bar */}
      <footer className="h-7 bg-purple-700 flex items-center justify-between px-4 text-[10px] uppercase font-black tracking-tighter text-white/90">
        <div className="flex items-center gap-6">
          <div className="flex items-center gap-1.5 opacity-80">
            <Layout size={12} />
            <span>Ln 1, Col 1</span>
          </div>
          <div className="opacity-80">UTF-8</div>
          {view === 'editor' && (
            <div className="flex items-center gap-2 bg-white/10 px-2 py-0.5 rounded-full">
              <span className="w-1.5 h-1.5 rounded-full bg-green-400 shadow-[0_0_8px_rgba(74,222,128,0.5)]" />
              <span>جاهز للعمل</span>
            </div>
          )}
        </div>
        <div className="flex items-center gap-6">
          <div className="flex items-center gap-1.5 hover:text-white cursor-pointer transition-colors">
            <MessageSquare size={12} />
            <span>دعم ذكي</span>
          </div>
          {view === 'editor' && (
            <div className="bg-white/10 px-3 py-0.5 rounded-full font-black">
               {currentFile.language.toUpperCase()}
            </div>
          )}
        </div>
      </footer>
    </div>
  );
}
