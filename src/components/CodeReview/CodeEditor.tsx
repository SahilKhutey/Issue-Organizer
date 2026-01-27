import React, { useState } from 'react';
import { Upload, FileText, Code, Zap } from 'lucide-react';
import { CodeAnalysisType } from '../../types';

interface CodeEditorProps {
  onAnalyze: (code: string, language: string, fileName?: string, analysisType?: CodeAnalysisType) => void;
  isAnalyzing?: boolean;
}

export function CodeEditor({ onAnalyze, isAnalyzing }: CodeEditorProps) {
  const [code, setCode] = useState('');
  const [language, setLanguage] = useState('javascript');
  const [fileName, setFileName] = useState('');
  const [analysisType, setAnalysisType] = useState<CodeAnalysisType>('review');

  const languages = [
    { value: 'javascript', label: 'JavaScript' },
    { value: 'typescript', label: 'TypeScript' },
    { value: 'python', label: 'Python' },
    { value: 'java', label: 'Java' },
    { value: 'cpp', label: 'C++' },
    { value: 'csharp', label: 'C#' },
    { value: 'go', label: 'Go' },
    { value: 'rust', label: 'Rust' },
    { value: 'php', label: 'PHP' },
    { value: 'ruby', label: 'Ruby' }
  ];

  const analysisTypes = [
    { value: 'summary', label: 'Summary', description: 'Get a brief overview of the code' },
    { value: 'review', label: 'Full Review', description: 'Comprehensive code review with suggestions' },
    { value: 'bugs', label: 'Bug Detection', description: 'Find potential bugs and issues' },
    { value: 'security', label: 'Security Analysis', description: 'Identify security vulnerabilities' },
    { value: 'performance', label: 'Performance', description: 'Analyze performance bottlenecks' },
    { value: 'style', label: 'Code Style', description: 'Check coding standards and style' }
  ];

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        const content = e.target?.result as string;
        setCode(content);
        setFileName(file.name);
        
        // Auto-detect language from file extension
        const extension = file.name.split('.').pop()?.toLowerCase();
        const languageMap: Record<string, string> = {
          'js': 'javascript',
          'jsx': 'javascript',
          'ts': 'typescript',
          'tsx': 'typescript',
          'py': 'python',
          'java': 'java',
          'cpp': 'cpp',
          'cc': 'cpp',
          'cxx': 'cpp',
          'cs': 'csharp',
          'go': 'go',
          'rs': 'rust',
          'php': 'php',
          'rb': 'ruby'
        };
        
        if (extension && languageMap[extension]) {
          setLanguage(languageMap[extension]);
        }
      };
      reader.readAsText(file);
    }
  };

  const handleAnalyze = () => {
    if (code.trim()) {
      onAnalyze(code, language, fileName || undefined, analysisType);
    }
  };

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-6">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center space-x-2">
          <Code className="w-6 h-6 text-blue-600 dark:text-blue-400" />
          <h2 className="text-xl font-semibold text-gray-900 dark:text-white">Code Analysis</h2>
        </div>
        
        <div className="flex items-center space-x-3">
          <label className="flex items-center space-x-2 px-4 py-2 text-sm font-medium text-gray-700 dark:text-gray-300 bg-gray-100 dark:bg-gray-700 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-600 cursor-pointer transition-colors">
            <Upload className="w-4 h-4" />
            <span>Upload File</span>
            <input
              type="file"
              onChange={handleFileUpload}
              accept=".js,.jsx,.ts,.tsx,.py,.java,.cpp,.cc,.cxx,.cs,.go,.rs,.php,.rb"
              className="hidden"
            />
          </label>
        </div>
      </div>

      {/* Configuration */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            Language
          </label>
          <select
            value={language}
            onChange={(e) => setLanguage(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          >
            {languages.map((lang) => (
              <option key={lang.value} value={lang.value}>
                {lang.label}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            File Name (Optional)
          </label>
          <input
            type="text"
            value={fileName}
            onChange={(e) => setFileName(e.target.value)}
            placeholder="e.g., component.tsx"
            className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            Analysis Type
          </label>
          <select
            value={analysisType}
            onChange={(e) => setAnalysisType(e.target.value as CodeAnalysisType)}
            className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          >
            {analysisTypes.map((type) => (
              <option key={type.value} value={type.value}>
                {type.label}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Analysis Type Description */}
      <div className="mb-4 p-3 bg-blue-50 dark:bg-blue-900/20 rounded-lg border border-blue-200 dark:border-blue-800">
        <p className="text-sm text-blue-700 dark:text-blue-300">
          <strong>{analysisTypes.find(t => t.value === analysisType)?.label}:</strong>{' '}
          {analysisTypes.find(t => t.value === analysisType)?.description}
        </p>
      </div>

      {/* Code Editor */}
      <div className="mb-6">
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
          Code
        </label>
        <textarea
          value={code}
          onChange={(e) => setCode(e.target.value)}
          placeholder="Paste your code here or upload a file..."
          className="w-full h-64 px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:ring-2 focus:ring-blue-500 focus:border-transparent font-mono text-sm resize-none"
        />
      </div>

      {/* Analyze Button */}
      <div className="flex justify-end">
        <button
          onClick={handleAnalyze}
          disabled={!code.trim() || isAnalyzing}
          className="flex items-center space-x-2 px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors font-medium"
        >
          <Zap className="w-5 h-5" />
          <span>{isAnalyzing ? 'Analyzing...' : 'Analyze Code'}</span>
        </button>
      </div>
    </div>
  );
}