"use client";

import { useState, useRef, useEffect } from 'react';
import { Terminal as TerminalIcon, Maximize2, Minimize2 } from 'lucide-react';
import { useRouter } from 'next/navigation';

const Skills = () => {
  const router = useRouter();

  const [input, setInput] = useState('');
  const [output, setOutput] = useState(['> cd Skills']);
  const [showCursor, setShowCursor] = useState(true);
  const [history, setHistory] = useState<string[]>([]);
  const [historyIndex, setHistoryIndex] = useState(-1);
  const [currentPath, setCurrentPath] = useState('/Skills');
  const [isMaximized, setIsMaximized] = useState(false);

  const inputRef = useRef<HTMLInputElement>(null);
  const terminalRef = useRef<HTMLDivElement>(null);

  const skills = {
    frontend: ['React.js', 'Next.js', 'Vue.js', 'HTML5', 'CSS3', 'JavaScript/TypeScript', 'TailwindCSS'],
    backend: ['Node.js', 'Express.js', 'NestJS', 'Django', 'PostgreSQL', 'MongoDB', 'Redis'],
    devops: ['Docker', 'Kubernetes', 'AWS', 'CI/CD', 'GitHub Actions', 'Terraform'],
    tools: ['Git', 'VS Code', 'Postman', 'Figma', 'Jest', 'Storybook']
  };

  const sections = {
    home: '/',
    projects: '#projects',
    contact: '#contact',
    Experience: "#experience",
    about: '#about'
  };

  useEffect(() => {
    const cursorInterval = setInterval(() => {
      setShowCursor(prev => !prev);
    }, 500);
    return () => clearInterval(cursorInterval);
  }, []);

  useEffect(() => {
    terminalRef.current?.scrollTo({ top: terminalRef.current.scrollHeight });
  }, [output]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const cmd = input.trim();
    const command = cmd.toLowerCase();

    const newOutput = [...output, `> ${cmd}`];
    setHistory(prev => [...prev, cmd]);
    setHistoryIndex(-1);
    setInput('');

    if (command === 'clear') {
      setOutput(['> cd Skills']);
      return;
    }

    if (command === 'pwd') {
      newOutput.push(currentPath);
    } else if (command === 'ls' || command === 'skills: ls') {
      newOutput.push('Available paths:');
      Object.keys(sections).forEach(path => newOutput.push(`- ${path}`));
      newOutput.push('');
      newOutput.push('Available skill categories: frontend, backend, devops, tools');
    } else if (command.startsWith('cd ')) {
      const path = command.split(' ')[1];
      if (path in sections) {
        newOutput.push(`Navigating to ${path}...`);
        if (path in sections) {
          router.push(sections[path as keyof typeof sections]);
        } else {
          newOutput.push(`cd: no such file or directory: ${path}`);
        }
      } else if (skills[path as keyof typeof skills]) {
        setCurrentPath(`/Skills/${path}`);
        newOutput.push(`Entered skill category: ${path}`);
        skills[path as keyof typeof skills].forEach(skill => newOutput.push(`- ${skill}`));
      } else {
        newOutput.push(`cd: no such file or directory: ${path}`);
      }
    } else if (command === 'skills: all') {
      Object.keys(skills).forEach(category => {
        newOutput.push(`${category.toUpperCase()} Skills:`);
        skills[category as keyof typeof skills].forEach(skill => {
          newOutput.push(`- ${skill}`);
        });
        newOutput.push('');
      });
    } else if (skills[command.replace('skills: ', '') as keyof typeof skills]) {
      const key = command.replace('skills: ', '') as keyof typeof skills;
      newOutput.push(`${key.toUpperCase()} Skills:`);
      skills[key].forEach(skill => newOutput.push(`- ${skill}`));
    } else if (command === 'history') {
      newOutput.push('Command History:');
      history.forEach((cmd, idx) => newOutput.push(`${idx + 1}: ${cmd}`));
    } else if (command === 'help') {
      newOutput.push('Available commands:');
      newOutput.push('- pwd');
      newOutput.push('- ls or skills: ls');
      newOutput.push('- skills: [frontend|backend|devops|tools|all]');
      newOutput.push('- cd [section or skill]');
      newOutput.push('- clear');
      newOutput.push('- history');
      newOutput.push('- help');
    } else {
      newOutput.push(`Command not found: ${cmd}`);
      newOutput.push(`Type "help" to see available commands.`);
    }

    setOutput(newOutput);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInput(e.target.value);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'ArrowUp') {
      if (history.length > 0 && historyIndex < history.length - 1) {
        const newIndex = historyIndex + 1;
        setHistoryIndex(newIndex);
        setInput(history[history.length - 1 - newIndex]);
      }
    } else if (e.key === 'ArrowDown') {
      if (historyIndex > 0) {
        const newIndex = historyIndex - 1;
        setHistoryIndex(newIndex);
        setInput(history[history.length - 1 - newIndex]);
      } else {
        setHistoryIndex(-1);
        setInput('');
      }
    }
  };

  const focusInput = () => {
    inputRef.current?.focus();
  };

  return (
    <section id="skills" className="py-20 px-4 sm:px-6 lg:px-8 bg-gray-50">
      <div className="max-w-5xl mx-auto">
        <h2 className="section-title">Skills</h2>

        <div className={`transition-all duration-300 ${isMaximized ? 'h-[80vh]' : 'h-80 md:h-96'} overflow-y-auto bg-black text-white p-4 rounded shadow-md`} onClick={focusInput} ref={terminalRef}>
          <div className="terminal-header flex justify-between items-center mb-2">
            <div className="flex space-x-2">
              <div className="w-3 h-3 bg-red-500 rounded-full"></div>
              <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
              <div className="w-3 h-3 bg-green-500 rounded-full"></div>
            </div>
            <button onClick={() => setIsMaximized(prev => !prev)} className="text-white">
              {isMaximized ? <Minimize2 size={16} /> : <Maximize2 size={16} />}
            </button>
          </div>

          <div className="space-y-1 font-mono text-sm">
            {output.map((line, i) => (
              <div key={i} className="whitespace-pre-wrap">{line}</div>
            ))}
            <div className="flex items-center">
              <span className="mr-1">{'> '}</span>
              <form onSubmit={handleSubmit} className="flex-1">
                <input
                  ref={inputRef}
                  type="text"
                  value={input}
                  onChange={handleInputChange}
                  onKeyDown={handleKeyDown}
                  className="bg-transparent outline-none text-white w-full"
                />
              </form>
              <span className={`ml-1 ${showCursor ? 'opacity-100' : 'opacity-0'} animate-pulse`}>|</span>
            </div>
          </div>
        </div>

        <div className="mt-4 text-center text-sm text-gray-600">
          <p className="flex items-center justify-center">
            <TerminalIcon className="w-4 h-4 mr-2" />
            Type <code className="bg-gray-200 px-2 py-1 rounded mx-1">help</code> to get started.
          </p>
        </div>
      </div>
    </section>
  );
};

export default Skills;
