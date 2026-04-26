import React, { useState, useEffect } from 'react';
import { 
  Github, 
  GitBranch, 
  GitMerge, 
  ArrowUp, 
  ArrowDown, 
  Plus, 
  RefreshCw, 
  ExternalLink,
  CheckCircle2,
  Lock,
  Globe,
  Settings
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { cn } from '@/src/lib/utils';
import { type Project } from '@/src/constants';

interface GitHubManagerProps {
  currentProject: Project;
  onUpdateProject: (updates: Partial<Project>) => void;
}

export default function GitHubManager({ currentProject, onUpdateProject }: GitHubManagerProps) {
  const [token, setToken] = useState<string | null>(localStorage.getItem('github_token'));
  const [user, setUser] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [repos, setRepos] = useState<any[]>([]);
  const [isLinking, setIsLinking] = useState(false);
  const [branches, setBranches] = useState<any[]>([]);
  const [isBranchMenuOpen, setIsBranchMenuOpen] = useState(false);
  const [newBranchName, setNewBranchName] = useState('');
  const [isCreatingBranch, setIsCreatingBranch] = useState(false);

  useEffect(() => {
    if (token) {
      fetchUser(token);
    }

    const handleMessage = (event: MessageEvent) => {
      // Security check: only allow own origin
      if (typeof event.data === 'object' && event.data.type === 'GITHUB_AUTH_SUCCESS') {
        const newToken = event.data.accessToken;
        setToken(newToken);
        localStorage.setItem('github_token', newToken);
        fetchUser(newToken);
      }
    };

    window.addEventListener('message', handleMessage);
    return () => window.removeEventListener('message', handleMessage);
  }, [token]);

  const fetchUser = async (t: string) => {
    setIsLoading(true);
    try {
      const res = await fetch('/api/github/user', {
        headers: { Authorization: t }
      });
      if (res.ok) {
        const data = await res.json();
        setUser(data);
        fetchRepos(t);
      } else {
        setToken(null);
        localStorage.removeItem('github_token');
      }
    } catch (e) {
      console.error(e);
    } finally {
      setIsLoading(false);
    }
  };

  const fetchRepos = async (t: string) => {
    try {
      const res = await fetch('https://api.github.com/user/repos?sort=updated', {
        headers: { Authorization: `token ${t}` }
      });
      const data = await res.json();
      setRepos(Array.isArray(data) ? data : []);
    } catch (e) {
      console.error(e);
    }
  };

  const handleConnect = async () => {
    try {
      const res = await fetch('/api/auth/github/url');
      const { url } = await res.json();
      window.open(url, 'github_oauth', 'width=600,height=700');
    } catch (e) {
      console.error(e);
    }
  };

  const handleLinkRepo = (repo: any) => {
    onUpdateProject({
      githubRepo: {
        owner: repo.owner.login,
        repo: repo.name,
        branch: repo.default_branch
      }
    });
    setIsLinking(false);
    if (token) fetchBranches(token, repo.owner.login, repo.name);
  };

  const fetchBranches = async (t: string, owner: string, repo: string) => {
    try {
      const res = await fetch(`https://api.github.com/repos/${owner}/${repo}/branches`, {
        headers: { Authorization: `token ${t}` }
      });
      const data = await res.json();
      setBranches(Array.isArray(data) ? data : []);
    } catch (e) {
      console.error(e);
    }
  };

  useEffect(() => {
    if (token && currentProject.githubRepo) {
      fetchBranches(token, currentProject.githubRepo.owner, currentProject.githubRepo.repo);
    }
  }, [currentProject.id, currentProject.githubRepo?.repo]);

  const handleSwitchBranch = (branchName: string) => {
    if (currentProject.githubRepo) {
      onUpdateProject({
        githubRepo: {
          ...currentProject.githubRepo,
          branch: branchName
        }
      });
      setIsBranchMenuOpen(false);
    }
  };

  const handleCreateBranch = async () => {
    if (!newBranchName || !token || !currentProject.githubRepo) return;
    
    setIsLoading(true);
    try {
      // 1. Get current branch SHA
      const repoPath = `${currentProject.githubRepo.owner}/${currentProject.githubRepo.repo}`;
      const branchRes = await fetch(`https://api.github.com/repos/${repoPath}/branches/${currentProject.githubRepo.branch}`, {
        headers: { Authorization: `token ${token}` }
      });
      const branchData = await branchRes.json();
      const sha = branchData.commit.sha;

      // 2. Create new reference
      const createRes = await fetch(`https://api.github.com/repos/${repoPath}/git/refs`, {
        method: 'POST',
        headers: { 
          Authorization: `token ${token}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          ref: `refs/heads/${newBranchName}`,
          sha: sha
        })
      });

      if (createRes.ok) {
        await fetchBranches(token, currentProject.githubRepo.owner, currentProject.githubRepo.repo);
        handleSwitchBranch(newBranchName);
        setNewBranchName('');
        setIsCreatingBranch(false);
      } else {
        const err = await createRes.json();
        alert(`Error: ${err.message}`);
      }
    } catch (e) {
      console.error(e);
    } finally {
      setIsLoading(false);
    }
  };

  const handlePush = () => {
    // Mock push implementation
    alert(`Pushing to ${currentProject.githubRepo?.owner}/${currentProject.githubRepo?.repo} (${currentProject.githubRepo?.branch})...`);
  };

  const handlePull = () => {
    // Mock pull implementation
    alert(`Pulling from ${currentProject.githubRepo?.owner}/${currentProject.githubRepo?.repo}...`);
  };

  if (!token) {
    return (
      <div className="flex flex-col h-full items-center justify-center p-8 text-center space-y-6">
        <div className="w-20 h-20 bg-gray-800 rounded-3xl flex items-center justify-center shadow-2xl">
          <Github size={40} className="text-white" />
        </div>
        <div className="space-y-2">
          <h2 className="text-xl font-black text-white">ربط GitHub</h2>
          <p className="text-gray-500 text-sm max-w-[200px] mx-auto">
            اربط حسابك لرفع الكود، إدارة المستودعات، والعمل الجماعي.
          </p>
        </div>
        <button 
          onClick={handleConnect}
          className="w-full bg-[#222] border border-[#333] hover:border-purple-500/50 text-white px-6 py-3 rounded-2xl text-sm font-black flex items-center justify-center gap-3 transition-all"
        >
          <Github size={20} /> اتصل بـ GitHub
        </button>
      </div>
    );
  }

  return (
    <div className="flex flex-col h-full bg-[#181818]">
      {/* Header Info */}
      <div className="p-4 border-b border-[#333] flex items-center justify-between">
        <div className="flex items-center gap-3">
          {user ? (
            <img src={user.avatar_url} className="w-8 h-8 rounded-full border border-purple-500/30" alt={user.login} />
          ) : (
            <div className="w-8 h-8 rounded-full bg-gray-800 animate-pulse" />
          )}
          <div className="flex flex-col -space-y-1">
            <span className="text-xs font-black text-white">{user?.login || 'Loading...'}</span>
            <span className="text-[10px] text-gray-500 font-bold uppercase tracking-widest">متصل</span>
          </div>
        </div>
        <button 
          onClick={() => { setToken(null); localStorage.removeItem('github_token'); }}
          className="p-2 hover:bg-red-500/10 text-gray-500 hover:text-red-400 rounded-lg transition-all"
        >
          <RefreshCw size={14} />
        </button>
      </div>

      <div className="flex-1 overflow-y-auto p-4 space-y-6">
        {currentProject.githubRepo ? (
          <div className="space-y-4">
            {/* Linked Repo Card */}
            <div className="bg-[#222] rounded-2xl p-4 border border-purple-500/20 shadow-lg relative overflow-hidden group">
              <div className="absolute top-0 right-0 p-3 opacity-10 group-hover:opacity-20 transition-opacity">
                <Github size={60} />
              </div>
              
              <div className="flex items-center gap-2 mb-2">
                <div className="px-2 py-0.5 bg-purple-600/20 text-purple-400 text-[10px] font-black uppercase rounded border border-purple-500/20">
                  مستودع مرتبط
                </div>
                {repos.find(r => r.name === currentProject.githubRepo?.repo)?.private ? (
                  <Lock size={10} className="text-gray-500" />
                ) : (
                  <Globe size={10} className="text-gray-500" />
                )}
              </div>
              
              <h3 className="text-sm font-black text-white mb-1">
                {currentProject.githubRepo.owner}/<span className="text-purple-400">{currentProject.githubRepo.repo}</span>
              </h3>
              
              <div className="flex items-center gap-3 text-gray-500 text-[10px] font-bold">
                <div 
                  className="flex items-center gap-1 cursor-pointer hover:text-purple-400 transition-colors"
                  onClick={() => setIsBranchMenuOpen(!isBranchMenuOpen)}
                >
                  <GitBranch size={12} />
                  <span>{currentProject.githubRepo.branch}</span>
                  <Settings size={10} className="ml-1 opacity-50" />
                </div>
                <div className="flex items-center gap-1">
                  <RefreshCw size={12} className="animate-spin-slow" />
                  <span>متزامن</span>
                </div>
              </div>

              {/* Branch Selector Menu */}
              <AnimatePresence>
                {isBranchMenuOpen && (
                  <motion.div 
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    className="mt-4 border-t border-[#333] pt-4 space-y-3 overflow-hidden"
                  >
                    <div className="flex items-center justify-between">
                      <span className="text-[10px] font-black text-gray-500 uppercase">الفروع (Branches)</span>
                      <button 
                        onClick={() => setIsCreatingBranch(!isCreatingBranch)}
                        className="text-purple-400 text-[10px] font-black uppercase flex items-center gap-1 hover:text-purple-300"
                      >
                        <Plus size={10} /> جديد
                      </button>
                    </div>

                    {isCreatingBranch && (
                      <div className="flex gap-2">
                        <input 
                          value={newBranchName}
                          onChange={(e) => setNewBranchName(e.target.value)}
                          placeholder="اسم الفرع..."
                          className="flex-1 bg-[#252525] border border-[#333] rounded px-2 py-1 text-[10px] text-white focus:outline-none focus:border-purple-500"
                        />
                        <button 
                          onClick={handleCreateBranch}
                          disabled={isLoading}
                          className="bg-purple-600 px-2 py-1 rounded text-[10px] font-black text-white hover:bg-purple-500 disabled:opacity-50"
                        >
                          {isLoading ? <RefreshCw size={10} className="animate-spin" /> : 'إنشاء'}
                        </button>
                      </div>
                    )}

                    <div className="max-h-32 overflow-y-auto space-y-1 scrollbar-hide">
                      {branches.map((b) => (
                        <div 
                          key={b.name}
                          onClick={() => handleSwitchBranch(b.name)}
                          className={cn(
                            "flex items-center justify-between p-2 rounded hover:bg-[#252525] cursor-pointer transition-all",
                            currentProject.githubRepo?.branch === b.name ? "bg-purple-600/10 border border-purple-500/20" : "border border-transparent"
                          )}
                        >
                          <div className="flex items-center gap-2">
                            <GitBranch size={10} className={currentProject.githubRepo?.branch === b.name ? "text-purple-400" : "text-gray-500"} />
                            <span className={cn("text-[10px] font-bold", currentProject.githubRepo?.branch === b.name ? "text-white" : "text-gray-400")}>
                              {b.name}
                            </span>
                          </div>
                          {currentProject.githubRepo?.branch === b.name && <CheckCircle2 size={10} className="text-purple-400" />}
                        </div>
                      ))}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Actions */}
              <div className="grid grid-cols-2 gap-2 mt-4">
                <button 
                  onClick={handlePush}
                  className="bg-purple-600 hover:bg-purple-500 text-white py-2 rounded-xl text-[10px] font-black flex items-center justify-center gap-2 transition-all shadow-lg shadow-purple-900/20"
                >
                  <ArrowUp size={12} /> PUSH
                </button>
                <button 
                  onClick={handlePull}
                  className="bg-[#333] hover:bg-[#444] text-gray-300 py-2 rounded-xl text-[10px] font-black flex items-center justify-center gap-2 transition-all"
                >
                  <ArrowDown size={12} /> PULL
                </button>
              </div>
            </div>

            {/* Git Ops */}
            <div className="space-y-1">
              <h4 className="text-[10px] font-black text-gray-600 uppercase tracking-widest px-2 mb-2">العمليات</h4>
              {[
                { icon: <GitBranch size={14} />, label: 'إدارة الفروع (Branches)', count: 3 },
                { icon: <GitMerge size={14} />, label: 'طلبات السحب (PRs)', count: 0 },
                { icon: <Settings size={14} />, label: 'إعدادات Git' },
              ].map((op, i) => (
                <div key={i} className="flex items-center justify-between p-3 hover:bg-[#252525] rounded-xl cursor-not-allowed group transition-all text-gray-400">
                  <div className="flex items-center gap-3">
                    <div className="p-2 rounded-lg bg-[#222] group-hover:bg-[#282828] text-gray-500">
                      {op.icon}
                    </div>
                    <span className="text-[11px] font-bold">{op.label}</span>
                  </div>
                  {op.count !== undefined && (
                    <span className="text-[10px] bg-[#333] px-1.5 py-0.5 rounded-full font-black">{op.count}</span>
                  )}
                </div>
              ))}
            </div>
            
            <button 
              onClick={() => onUpdateProject({ githubRepo: undefined })}
              className="w-full py-2 text-xs font-black text-red-500/60 hover:text-red-500 transition-colors"
            >
              إلغاء ربط المستودع
            </button>
          </div>
        ) : (
          <div className="space-y-4">
            <div className="flex items-center justify-between px-2">
              <h4 className="text-[10px] font-black text-gray-600 uppercase tracking-widest">ربط مستودع جديد</h4>
              <button onClick={() => fetchRepos(token!)} className="text-gray-500 hover:text-white">
                <RefreshCw size={12} />
              </button>
            </div>

            <div className="space-y-2">
              {repos.length > 0 ? (
                repos.slice(0, 5).map((repo) => (
                  <button 
                    key={repo.id}
                    onClick={() => handleLinkRepo(repo)}
                    className="w-full p-3 bg-[#222] border border-[#333] hover:border-purple-600/50 rounded-xl flex items-center justify-between group transition-all"
                  >
                    <div className="flex items-center gap-3">
                      <Github size={16} className="text-gray-500 group-hover:text-purple-400" />
                      <div className="flex flex-col items-start -space-y-1">
                        <span className="text-xs font-black text-white">{repo.name}</span>
                        <span className="text-[10px] text-gray-500">{repo.owner.login}</span>
                      </div>
                    </div>
                    <Plus size={14} className="text-gray-600" />
                  </button>
                ))
              ) : (
                <div className="p-8 text-center border-2 border-dashed border-[#333] rounded-3xl">
                  <p className="text-xs text-gray-500 mb-4">لا توجد مستودعات متاحة</p>
                  <button className="text-[10px] font-black text-purple-500 uppercase tracking-widest flex items-center gap-2 mx-auto">
                    <Plus size={12} /> مستودع جديد
                  </button>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
      
      <div className="p-4 border-t border-[#333] flex items-center justify-between bg-[#1a1a1a]">
        <span className="text-[10px] font-black text-gray-600 uppercase">الحالة: متصل</span>
        <div className="flex items-center gap-1">
          <div className="w-1.5 h-1.5 rounded-full bg-green-500 shadow-[0_0_8px_rgba(74,222,128,0.5)]" />
          <CheckCircle2 size={12} className="text-green-500" />
        </div>
      </div>
    </div>
  );
}
