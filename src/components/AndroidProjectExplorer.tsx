import React, { useState } from 'react';
import { ANDROID_PROJECT_FILES, AndroidFile } from '../android-project/sourceFiles';
import { generateProjectZip } from '../utils/zipGenerator';
import { 
  FolderTree, 
  FileCode, 
  Download, 
  Copy, 
  Check, 
  Search, 
  FileText, 
  Layers, 
  Terminal, 
  Code2, 
  ExternalLink,
  Sparkles,
  Smartphone
} from 'lucide-react';

export const AndroidProjectExplorer: React.FC = () => {
  const [selectedFilePath, setSelectedFilePath] = useState<string>('app/src/main/java/com/volox/dynamicisland/service/DynamicIslandService.kt');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [copied, setCopied] = useState<boolean>(false);
  const [isZipping, setIsZipping] = useState<boolean>(false);
  const [zipProgress, setZipProgress] = useState<number>(0);
  const [currentZipFile, setCurrentZipFile] = useState<string>('');

  const selectedFile = ANDROID_PROJECT_FILES.find(f => f.path === selectedFilePath) || ANDROID_PROJECT_FILES[0];

  const filteredFiles = ANDROID_PROJECT_FILES.filter(f => 
    f.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
    f.path.toLowerCase().includes(searchQuery.toLowerCase()) ||
    f.description.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleCopy = () => {
    navigator.clipboard.writeText(selectedFile.content);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleDownloadZip = async () => {
    try {
      setIsZipping(true);
      setZipProgress(0);

      const blob = await generateProjectZip((percent, file) => {
        setZipProgress(percent);
        setCurrentZipFile(file);
      });

      // Trigger browser download
      const url = URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = 'VoloX-Dynamic-Island-v1.0-Realme-9i-5G.zip';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(url);
    } catch (err) {
      console.error('Failed to generate project zip', err);
    } finally {
      setIsZipping(false);
    }
  };

  const getBadgeColor = (category: AndroidFile['category']) => {
    switch (category) {
      case 'kotlin': return 'bg-purple-500/10 text-purple-400 border-purple-500/30';
      case 'manifest': return 'bg-amber-500/10 text-amber-400 border-amber-500/30';
      case 'config': return 'bg-blue-500/10 text-blue-400 border-blue-500/30';
      case 'res': return 'bg-emerald-500/10 text-emerald-400 border-emerald-500/30';
      case 'workflow': return 'bg-pink-500/10 text-pink-400 border-pink-500/30';
      case 'docs': return 'bg-zinc-500/10 text-zinc-300 border-zinc-500/30';
    }
  };

  return (
    <div className="bg-zinc-950/80 border border-zinc-800 rounded-3xl p-5 shadow-2xl backdrop-blur-xl flex flex-col gap-4 text-white">
      {/* Top Bar with Download Button */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 border-b border-zinc-800/80 pb-4">
        <div>
          <div className="flex items-center gap-2">
            <Code2 className="w-5 h-5 text-emerald-400" />
            <h3 className="font-bold text-base text-white">Android Studio Source Codebase</h3>
            <span className="text-[10px] bg-emerald-500/10 text-emerald-400 border border-emerald-500/30 px-2 py-0.5 rounded-full font-semibold">
              Kotlin • minSdk 26 • targetSdk 34
            </span>
          </div>
          <p className="text-xs text-zinc-400 mt-0.5">
            100% production-ready Android Studio project tailored for Realme 9i 5G (Android 14 / Realme UI 5.0).
          </p>
        </div>

        <button
          onClick={handleDownloadZip}
          disabled={isZipping}
          className="w-full sm:w-auto px-4 py-2.5 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-400 hover:from-emerald-400 hover:to-teal-300 text-black font-bold text-xs flex items-center justify-center gap-2 shadow-lg shadow-emerald-500/20 transition disabled:opacity-50"
        >
          {isZipping ? (
            <>
              <div className="w-4 h-4 border-2 border-black border-t-transparent rounded-full animate-spin" />
              <span>Packaging ZIP ({zipProgress}%)...</span>
            </>
          ) : (
            <>
              <Download className="w-4 h-4" />
              <span>Download Complete Android Project (.ZIP)</span>
            </>
          )}
        </button>
      </div>

      {/* Main File Browser Split */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-4">
        
        {/* Left: File Tree / List */}
        <div className="lg:col-span-4 bg-zinc-900/70 border border-zinc-800/80 rounded-2xl p-3 flex flex-col h-[520px]">
          {/* Search */}
          <div className="relative mb-2.5">
            <Search className="w-3.5 h-3.5 text-zinc-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search files (e.g. Service, Manifest)..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-8 pr-3 py-1.5 rounded-xl bg-zinc-950/80 border border-zinc-800 text-xs text-zinc-200 placeholder-zinc-500 focus:outline-none focus:border-emerald-500"
            />
          </div>

          {/* File Items */}
          <div className="flex-1 overflow-y-auto no-scrollbar space-y-1 pr-1">
            {filteredFiles.map(file => {
              const isSelected = file.path === selectedFilePath;
              return (
                <button
                  key={file.path}
                  onClick={() => setSelectedFilePath(file.path)}
                  className={`w-full text-left p-2 rounded-xl transition flex items-center justify-between border ${
                    isSelected 
                      ? 'bg-emerald-950/40 border-emerald-500/50 text-white shadow-sm' 
                      : 'border-transparent hover:bg-zinc-800/60 text-zinc-300'
                  }`}
                >
                  <div className="flex items-center gap-2 min-w-0">
                    <FileCode className={`w-4 h-4 shrink-0 ${isSelected ? 'text-emerald-400' : 'text-zinc-500'}`} />
                    <div className="truncate">
                      <div className="text-xs font-semibold truncate">{file.name}</div>
                      <div className="text-[10px] text-zinc-500 truncate">{file.path}</div>
                    </div>
                  </div>
                  <span className={`text-[9px] uppercase px-1.5 py-0.5 rounded border font-mono shrink-0 ml-1.5 ${getBadgeColor(file.category)}`}>
                    {file.language}
                  </span>
                </button>
              );
            })}
          </div>

          <div className="pt-2 border-t border-zinc-800/80 text-[11px] text-zinc-500 flex items-center justify-between px-1">
            <span>{ANDROID_PROJECT_FILES.length} Files</span>
            <span className="text-emerald-400 font-mono">Gradle 8.5 • AGP 8.2</span>
          </div>
        </div>

        {/* Right: Code Viewer */}
        <div className="lg:col-span-8 bg-zinc-900/70 border border-zinc-800/80 rounded-2xl flex flex-col h-[520px] overflow-hidden">
          {/* Header */}
          <div className="px-4 py-3 bg-zinc-950/80 border-b border-zinc-800/80 flex items-center justify-between">
            <div className="min-w-0 pr-2">
              <div className="flex items-center gap-2">
                <span className="text-xs font-mono font-bold text-white truncate">{selectedFile.path}</span>
                <span className={`text-[9px] uppercase px-1.5 py-0.2 rounded border font-mono ${getBadgeColor(selectedFile.category)}`}>
                  {selectedFile.language}
                </span>
              </div>
              <p className="text-[11px] text-zinc-400 mt-0.5 truncate">{selectedFile.description}</p>
            </div>

            <button
              onClick={handleCopy}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-zinc-800 hover:bg-zinc-700 text-xs font-semibold text-zinc-200 transition shrink-0"
            >
              {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5 text-zinc-400" />}
              <span>{copied ? 'Copied!' : 'Copy Code'}</span>
            </button>
          </div>

          {/* Code Body */}
          <div className="flex-1 overflow-auto p-4 font-mono text-xs text-zinc-300 leading-relaxed bg-[#0A0D12] select-text">
            <pre className="whitespace-pre">
              {selectedFile.content.split('\n').map((line, index) => (
                <div key={index} className="table-row">
                  <span className="table-cell select-none text-zinc-600 text-right pr-4 pl-1 text-[11px] w-8">
                    {index + 1}
                  </span>
                  <span className="table-cell">
                    {line}
                  </span>
                </div>
              ))}
            </pre>
          </div>
        </div>

      </div>
    </div>
  );
};
