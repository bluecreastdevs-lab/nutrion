import React, { useState } from 'react';
import { X, Copy, Check, Download, FileCode2, Terminal } from 'lucide-react';
import { androidKotlinProjectFiles, KotlinFile } from '../../data/androidKotlinCode';
import { useApp } from '../../context/AppContext';

export const AndroidStudioExportModal: React.FC = () => {
  const { showCodeExport, setShowCodeExport } = useApp();
  const [selectedFile, setSelectedFile] = useState<KotlinFile>(androidKotlinProjectFiles[0]);
  const [copied, setCopied] = useState(false);

  if (!showCodeExport) return null;

  const handleCopy = () => {
    navigator.clipboard.writeText(selectedFile.code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleDownloadAll = () => {
    const combinedContent = androidKotlinProjectFiles
      .map((f) => `// ==========================================\n// FILE: ${f.path}\n// ${f.description}\n// ==========================================\n\n${f.code}\n\n`)
      .join('\n');
    const blob = new Blob([combinedContent], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'NutriFitAI_Android_Compose_Source.kt';
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="bg-[#0b1120] border border-slate-700/80 rounded-3xl w-full max-w-4xl h-[85vh] flex flex-col shadow-2xl overflow-hidden">
        {/* Header */}
        <div className="px-6 py-4 border-b border-slate-800 flex items-center justify-between bg-slate-900/60">
          <div className="flex items-center gap-2.5">
            <div className="p-2 rounded-xl bg-emerald-500/15 text-emerald-400 border border-emerald-500/30">
              <FileCode2 className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-base font-bold text-white flex items-center gap-2">
                Android Studio Project Exporter
                <span className="text-[11px] font-semibold bg-emerald-500/20 text-emerald-400 px-2 py-0.5 rounded-full border border-emerald-500/30">
                  Kotlin + Jetpack Compose
                </span>
              </h3>
              <p className="text-xs text-slate-400">
                Native Clean Architecture · Room Database · MVVM StateFlow · Navigation Compose
              </p>
            </div>
          </div>
          <button
            onClick={() => setShowCodeExport(false)}
            className="p-2 rounded-xl bg-slate-800/80 hover:bg-slate-700 text-slate-400 hover:text-white cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content Body */}
        <div className="flex-1 flex overflow-hidden">
          {/* File Sidebar */}
          <div className="w-64 border-r border-slate-800/80 bg-slate-950/50 p-3 overflow-y-auto">
            <span className="text-[10px] font-bold uppercase tracking-wider text-slate-500 px-2 mb-2 block">
              Android Source Files
            </span>
            <div className="space-y-1">
              {androidKotlinProjectFiles.map((file) => {
                const isSelected = selectedFile.path === file.path;
                return (
                  <button
                    key={file.path}
                    onClick={() => setSelectedFile(file)}
                    className={`w-full text-left px-3 py-2 rounded-xl text-xs font-mono transition-all cursor-pointer ${
                      isSelected
                        ? 'bg-emerald-500/15 text-emerald-400 border border-emerald-500/30 font-semibold'
                        : 'text-slate-400 hover:text-white hover:bg-slate-800/50'
                    }`}
                  >
                    <div className="truncate">{file.path.split('/').pop()}</div>
                    <div className="text-[10px] text-slate-500 font-sans truncate">{file.path}</div>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Code Viewer */}
          <div className="flex-1 flex flex-col bg-[#070b14] overflow-hidden">
            {/* File Info Bar */}
            <div className="px-4 py-2.5 bg-slate-900/80 border-b border-slate-800/60 flex items-center justify-between">
              <div>
                <span className="text-xs font-mono text-emerald-400">{selectedFile.path}</span>
                <p className="text-[11px] text-slate-400">{selectedFile.description}</p>
              </div>
              <div className="flex items-center gap-2">
                <button
                  onClick={handleCopy}
                  className="px-3 py-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-medium flex items-center gap-1.5 border border-slate-700/60 active:scale-95 transition-all cursor-pointer"
                >
                  {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                  {copied ? 'Copied' : 'Copy Code'}
                </button>
                <button
                  onClick={handleDownloadAll}
                  className="px-3 py-1.5 rounded-xl bg-emerald-500/20 hover:bg-emerald-500/30 text-emerald-300 text-xs font-medium flex items-center gap-1.5 border border-emerald-500/40 active:scale-95 transition-all cursor-pointer"
                >
                  <Download className="w-3.5 h-3.5" />
                  Download Bundle
                </button>
              </div>
            </div>

            {/* Code Block */}
            <pre className="flex-1 p-4 text-xs font-mono text-slate-300 overflow-auto leading-relaxed bg-[#050811]">
              <code>{selectedFile.code}</code>
            </pre>
          </div>
        </div>
      </div>
    </div>
  );
};
