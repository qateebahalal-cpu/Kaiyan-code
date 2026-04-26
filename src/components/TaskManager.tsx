import React, { useState } from 'react';
import { Plus, Trash2, CheckCircle2, Circle, ListTodo } from 'lucide-react';
import { type Task } from '@/src/constants';
import { cn } from '@/src/lib/utils';
import { motion, AnimatePresence } from 'motion/react';

interface TaskManagerProps {
  tasks: Task[];
  onAddTask: (text: string) => void;
  onToggleTask: (id: string) => void;
  onDeleteTask: (id: string) => void;
}

export default function TaskManager({ tasks, onAddTask, onToggleTask, onDeleteTask }: TaskManagerProps) {
  const [newTask, setNewTask] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTask.trim()) return;
    onAddTask(newTask.trim());
    setNewTask('');
  };

  return (
    <div className="flex flex-col h-full bg-[#181818]">
      <div className="p-4 border-b border-[#333]">
        <h2 className="text-gray-400 font-semibold text-xs uppercase tracking-widest flex items-center gap-2 mb-4">
          <ListTodo size={14} /> Task Manager
        </h2>
        
        <form onSubmit={handleSubmit} className="relative">
          <input
            type="text"
            value={newTask}
            onChange={(e) => setNewTask(e.target.value)}
            placeholder="Add a coding task..."
            className="w-full bg-[#252525] border border-[#333] rounded-lg px-3 py-2 text-sm text-gray-200 focus:outline-none focus:border-purple-500 pr-10 transition-colors"
          />
          <button 
            type="submit"
            className="absolute right-2 top-1/2 -translate-y-1/2 p-1 text-purple-400 hover:text-purple-300"
          >
            <Plus size={18} />
          </button>
        </form>
      </div>

      <div className="flex-1 overflow-y-auto py-2 scrollbar-hide">
        <AnimatePresence initial={false}>
          {tasks.length === 0 ? (
            <div className="px-4 py-8 text-center opacity-30 text-xs italic">
              No tasks yet. Plan your code!
            </div>
          ) : (
            tasks.sort((a, b) => b.createdAt - a.createdAt).map(task => (
              <motion.div
                key={task.id}
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                className="group px-4 py-3 flex items-start gap-3 border-b border-[#222] hover:bg-[#202020] transition-colors"
              >
                <button 
                  onClick={() => onToggleTask(task.id)}
                  className={cn(
                    "mt-0.5 shrink-0 transition-colors",
                    task.completed ? "text-green-500" : "text-gray-600 hover:text-gray-400"
                  )}
                >
                  {task.completed ? <CheckCircle2 size={18} /> : <Circle size={18} />}
                </button>
                
                <span className={cn(
                  "flex-1 text-sm transition-all",
                  task.completed ? "text-gray-600 line-through" : "text-gray-300"
                )}>
                  {task.text}
                </span>

                <button 
                  onClick={() => onDeleteTask(task.id)}
                  className="opacity-0 group-hover:opacity-100 p-1 text-gray-600 hover:text-red-400 transition-all"
                >
                  <Trash2 size={14} />
                </button>
              </motion.div>
            ))
          )}
        </AnimatePresence>
      </div>

      <div className="p-4 bg-[#1a1a1a] border-t border-[#333]">
        <div className="flex justify-between items-center text-[10px] text-gray-500 uppercase tracking-tighter">
          <span>{tasks.filter(t => t.completed).length} Done</span>
          <span>{tasks.filter(t => !t.completed).length} Pending</span>
        </div>
      </div>
    </div>
  );
}
