import React, { useState } from 'react';
import { FileCode, Plus, Folder, Trash2, ListTodo, Package, Github } from 'lucide-react';
import { type File, type Task, type Project } from '@/src/constants';
import { cn } from '@/src/lib/utils';
import { motion, AnimatePresence } from 'motion/react';
import TaskManager from './TaskManager';
import ResourceManager from './ResourceManager';
import GitHubManager from './GitHubManager';

interface SidebarProps {
  files: File[];
  currentFileId: string;
  tasks: Task[];
  currentProject: Project;
  onSelectFile: (id: string) => void;
  onAddFile: () => void;
  onDeleteFile: (id: string) => void;
  onAddTask: (text: string) => void;
  onToggleTask: (id: string) => void;
  onDeleteTask: (id: string) => void;
  onUpdateProject: (updates: Partial<Project>) => void;
}

export default function Sidebar({ 
  files, 
  currentFileId, 
  tasks,
  currentProject,
  onSelectFile, 
  onAddFile, 
  onDeleteFile,
  onAddTask,
  onToggleTask,
  onDeleteTask,
  onUpdateProject
}: SidebarProps) {
  const [activeTab, setActiveTab] = useState<'files' | 'tasks' | 'resources' | 'github'>('files');

  return (
    <div className="w-64 h-full bg-[#181818] border-r border-[#333] flex flex-col">
      {/* Sidebar Tabs */}
      <div className="flex border-b border-[#333]">
        <button 
          onClick={() => setActiveTab('files')}
          className={cn(
            "flex-1 py-3 text-[10px] font-bold uppercase tracking-widest flex items-center justify-center gap-2 transition-colors",
            activeTab === 'files' ? "bg-[#1e1e1e] text-purple-400 border-b border-purple-500" : "text-gray-600 hover:text-gray-400"
          )}
        >
          <Folder size={12} /> Files
        </button>
        <button 
          onClick={() => setActiveTab('tasks')}
          className={cn(
            "flex-1 py-3 text-[10px] font-bold uppercase tracking-widest flex items-center justify-center gap-2 transition-colors",
            activeTab === 'tasks' ? "bg-[#1e1e1e] text-purple-400 border-b border-purple-500" : "text-gray-600 hover:text-gray-400"
          )}
        >
          <ListTodo size={12} /> Tasks
        </button>
        <button 
          onClick={() => setActiveTab('resources')}
          className={cn(
            "flex-1 py-3 text-[10px] font-bold uppercase tracking-widest flex items-center justify-center gap-2 transition-colors",
            activeTab === 'resources' ? "bg-[#1e1e1e] text-purple-400 border-b border-purple-500" : "text-gray-600 hover:text-gray-400"
          )}
        >
          <Package size={12} /> Resources
        </button>
        <button 
          onClick={() => setActiveTab('github')}
          className={cn(
            "flex-1 py-3 text-[10px] font-bold uppercase tracking-widest flex items-center justify-center gap-2 transition-colors",
            activeTab === 'github' ? "bg-[#1e1e1e] text-[#2ea44f] border-b border-[#2ea44f]" : "text-gray-600 hover:text-[#2ea44f]/80"
          )}
        >
          <Github size={12} /> GitHub
        </button>
      </div>

      <div className="flex-1 flex flex-col overflow-hidden">
        <AnimatePresence mode="wait">
          {activeTab === 'files' ? (
            <motion.div 
              key="files-tab"
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -10 }}
              className="flex-1 flex flex-col overflow-hidden"
            >
              <div className="p-4 flex items-center justify-between border-b border-[#222]">
                <h2 className="text-gray-500 font-semibold text-[10px] uppercase tracking-widest">
                  Explorer
                </h2>
                <button 
                  onClick={onAddFile}
                  className="p-1 hover:bg-[#333] rounded text-gray-400 transition-colors"
                >
                  <Plus size={14} />
                </button>
              </div>
              
              <div className="flex-1 overflow-y-auto py-2 scrollbar-hide">
                {files.map(file => (
                  <div
                    key={file.id}
                    className={cn(
                      "group px-4 py-2 flex items-center justify-between cursor-pointer transition-all",
                      file.id === currentFileId ? "bg-[#2a2a2a] text-purple-400" : "text-gray-400 hover:bg-[#252525]"
                    )}
                    onClick={() => onSelectFile(file.id)}
                  >
                    <div className="flex items-center gap-2 min-w-0">
                      <FileCode size={16} className={cn(file.id === currentFileId ? "text-purple-400" : "text-gray-500")} />
                      <span className="text-sm truncate">{file.name}</span>
                    </div>
                    
                    {files.length > 1 && (
                      <button 
                        onClick={(e) => {
                          e.stopPropagation();
                          onDeleteFile(file.id);
                        }}
                        className="opacity-0 group-hover:opacity-100 p-1 hover:text-red-400 transition-all"
                      >
                        <Trash2 size={12} />
                      </button>
                    )}
                  </div>
                ))}
              </div>
            </motion.div>
          ) : activeTab === 'tasks' ? (
            <motion.div 
              key="tasks-tab"
              initial={{ opacity: 0, x: 10 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 10 }}
              className="flex-1 flex flex-col overflow-hidden"
            >
              <TaskManager 
                tasks={tasks}
                onAddTask={onAddTask}
                onToggleTask={onToggleTask}
                onDeleteTask={onDeleteTask}
              />
            </motion.div>
          ) : activeTab === 'resources' ? (
            <motion.div 
              key="resources-tab"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 10 }}
              className="flex-1 flex flex-col overflow-hidden"
            >
              <ResourceManager />
            </motion.div>
          ) : (
            <motion.div 
              key="github-tab"
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -10 }}
              className="flex-1 flex flex-col overflow-hidden"
            >
              <GitHubManager 
                currentProject={currentProject}
                onUpdateProject={onUpdateProject}
              />
            </motion.div>
          )}
        </AnimatePresence>
      </div>
      
      <div className="p-4 border-t border-[#333] bg-[#1a1a1a]">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-full bg-purple-600 flex items-center justify-center text-white text-xs font-bold ring-2 ring-purple-500/20">
            KC
          </div>
          <div className="flex flex-col">
            <span className="text-xs text-white font-medium">Kayan User</span>
            <span className="text-[10px] text-gray-500">Pro Developer</span>
          </div>
        </div>
      </div>
    </div>
  );
}
