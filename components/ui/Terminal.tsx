"use client";

import { useState, useRef, useEffect } from 'react';
import { Terminal as TerminalIcon, Maximize2, Minimize2 } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { createPortal } from "react-dom";

const Terminal = () => {
  const router = useRouter();

  const [input, setInput] = useState('');
  const [output, setOutput] = useState([
    { text: "Welcome to gouse.dev interactive terminal", type: "info" },
    { text: "Type 'start' to begin or 'help' for more information.", type: "info" }
  ]);
  const [showCursor, setShowCursor] = useState(true);
  const [history, setHistory] = useState<string[]>([]);
  const [historyIndex, setHistoryIndex] = useState(-1);
  const [currentPath, setCurrentPath] = useState('/home');
  const [isMaximized, setIsMaximized] = useState(false);

  const inputRef = useRef<HTMLInputElement>(null);
  const terminalRef = useRef<HTMLDivElement>(null);
  const popupRef = useRef<HTMLDivElement>(null);

  const skills = {
    frontend: ['React.js', 'Next.js', 'HTML5', 'CSS3', 'JavaScript/TypeScript', 'TailwindCSS'],
    backend: ['Node.js', 'Express.js', 'PostgreSQL', 'MongoDB', 'Redis'],
    devops: ['Docker', 'AWS', 'CI/CD'],
    tools: ['Git', 'VS Code', 'Postman',]
  };

  const sections = {
    home: '/',
    projects: '#projects',
    contact: '#contact',
    experience: "#experience",
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

  // Close on outside click when maximized
  useEffect(() => {
    if (!isMaximized) return;
    const handleClick = (e: MouseEvent) => {
      if (popupRef.current && !popupRef.current.contains(e.target as Node)) {
        setIsMaximized(false);
      }
    };
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, [isMaximized]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const cmd = input.trim();
    const command = cmd.toLowerCase();

    const newOutput = [...output, { text: `$ ${cmd}`, type: "command" }];
    setHistory(prev => [...prev, cmd]);
    setHistoryIndex(-1);
    setInput('');

    if (command === 'clear') {
      setOutput([
        { text: "Welcome to gouse.dev interactive terminal", type: "info" },
        { text: "Type 'start' to begin or 'help' for more information.", type: "info" }
      ]);
      return;
    }

    if (command === 'pwd') {
      newOutput.push({ text: currentPath, type: "result" });
    } else if (command === 'ls' || command === 'skills: ls') {
      newOutput.push({ text: 'Available paths:', type: "result" });
      Object.keys(sections).forEach(path => {
        newOutput.push({ text: `- ${path}`, type: "result" });
      });
      newOutput.push({ text: '', type: "result" });
      newOutput.push({ text: 'Available skill categories: frontend, backend, devops, tools', type: "result" });
    } else if (command.startsWith('cd ')) {
      const path = command.split(' ')[1];
      if (path in sections) {
        newOutput.push({ text: `Navigating to ${path}...`, type: "info" });
        if (path in sections) {
          router.push(sections[path as keyof typeof sections]);
        } else {
          newOutput.push({ text: `cd: no such file or directory: ${path}`, type: "error" });
        }
      } else if (skills[path as keyof typeof skills]) {
        setCurrentPath(`/Skills/${path}`);
        newOutput.push({ text: `Entered skill category: ${path}`, type: "info" });
        skills[path as keyof typeof skills].forEach(skill => {
          newOutput.push({ text: `- ${skill}`, type: "result" });
        });
      } else {
        newOutput.push({ text: `cd: no such file or directory: ${path}`, type: "error" });
      }
    } else if (command === 'skills: all') {
      Object.keys(skills).forEach(category => {
        newOutput.push({ text: `${category.toUpperCase()} Skills:`, type: "info" });
        skills[category as keyof typeof skills].forEach(skill => {
          newOutput.push({ text: `- ${skill}`, type: "result" });
        });
        newOutput.push({ text: '', type: "result" });
      });
    } else if (skills[command.replace('skills: ', '') as keyof typeof skills]) {
      const key = command.replace('skills: ', '') as keyof typeof skills;
      newOutput.push({ text: `${key.toUpperCase()} Skills:`, type: "info" });
      skills[key].forEach(skill => {
        newOutput.push({ text: `- ${skill}`, type: "result" });
      });
    } else if (command === 'history') {
      newOutput.push({ text: 'Command History:', type: "info" });
      history.forEach((cmd, idx) => {
        newOutput.push({ text: `${idx + 1}: ${cmd}`, type: "result" });
      });
    } else if (command === 'start') {
      newOutput.push({ text: 'Welcome to the interactive terminal!', type: "info" });
      newOutput.push({ text: 'Here are some tips to get started:', type: "info" });
      newOutput.push({ text: '- Use the "help" command to see all available commands.', type: "info" });
      newOutput.push({ text: '- Use the "pwd" command to display the current directory.', type: "info" });
      newOutput.push({ text: '- Use the "ls" or "skills: ls" command to list available paths and skills.', type: "info" });
      newOutput.push({ text: '- Use the "Arrow Up" key to access your previous commands.', type: "info" });
      newOutput.push({ text: '- Use the "clear" command to reset the terminal.', type: "info" });
      newOutput.push({ text: 'Enjoy exploring the terminal!', type: "success" });
    } else if (command === 'help') {
      newOutput.push({ text: 'Available commands:', type: "info" });
      newOutput.push({ text: '- pwd', type: "result" });
      newOutput.push({ text: '- ls or skills: ls', type: "result" });
      newOutput.push({ text: '- skills: [frontend|backend|devops|tools|all]', type: "result" });
      newOutput.push({ text: '- cd [section or skill]', type: "result" });
      newOutput.push({ text: '- clear', type: "result" });
      newOutput.push({ text: '- history', type: "result" });
      newOutput.push({ text: '- start', type: "result" });
      newOutput.push({ text: '- help', type: "result" });
    } else {
      newOutput.push({ text: `Command not found: ${cmd}`, type: "error" });
      newOutput.push({ text: `Type "help" to see available commands.`, type: "info" });
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

  // Portal for maximized terminal
  const TerminalContent = (
    <div
      className={`flex flex-col w-full max-w-4xl mx-auto ${
        isMaximized
          ? "fixed inset-0 z-[9999] flex items-center justify-center"
          : ""
      }`}
      style={isMaximized ? { transition: "background 0.5s" } : {}}
    >
      {/* Blurred overlay for maximized mode */}
      {isMaximized && (
        <div
          className="fixed inset-0 bg-black/70 backdrop-blur-[6px] transition-all duration-500"
          style={{ zIndex: 9998 }}
        />
      )}
      <div
        ref={popupRef}
        className={`bg-black rounded-md border border-gray-700 shadow-lg dark:shadow-[0_0_16px_2px_rgba(0,255,128,0.15)] transition-all duration-500
        ${
          isMaximized
            ? "w-full max-w-[60rem] h-[60vh] flex flex-col justify-between scale-95 z-[9999] animate-terminalExpand"
            : ""
        }`}
        style={{
          transition: "all 0.5s cubic-bezier(.4,0,.2,1)",
          ...(isMaximized
            ? { boxShadow: "0 0 32px 4px rgba(0,255,128,0.15)" }
            : {}),
        }}
      >
        <div className="terminal-header flex items-center p-2 bg-gray-800 rounded-md justify-between shadow-md">
          <div className="flex space-x-2 ml-2">
            <div className="w-3 h-3 rounded-full bg-red-500"></div>
            <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
            <div className="w-3 h-3 rounded-full bg-green-500"></div>
          </div>
          <div className="text-center text-xs text-gray-400">
            mhdgouse.dev
          </div>
          <button
            onClick={() => setIsMaximized((prev) => !prev)}
            className="text-gray-400 hover:text-white mr-2"
          >
            {isMaximized ? <Minimize2 size={16} /> : <Maximize2 size={16} />}
          </button>
        </div>

        <div
          ref={terminalRef}
          className={`terminal bg-black p-4 terminal-prompt overflow-y-auto transition-all duration-300 flex-1 ${
            isMaximized ? "h-full" : "h-80 md:h-96"
          }`}
          onClick={focusInput}
        >
          {output.map((line, index) => (
            <div key={index} className="terminal-line">
              <span className={line.type ? `terminal-${line.type}` : ""}>
                {line.text}
              </span>
            </div>
          ))}

          <div className="terminal-input flex items-center mt-2">
            <span className="terminal-prompt mr-2">$</span>
            <form onSubmit={handleSubmit} className="flex-1">
              <input
                ref={inputRef}
                type="text"
                value={input}
                onChange={handleInputChange}
                onKeyDown={handleKeyDown}
                className="bg-transparent border-none outline-none flex-1 w-full"
                placeholder="Type a command..."
              />
            </form>
            <span
              className={`ml-1 ${
                showCursor ? "opacity-100" : "opacity-0"
              } animate-pulse`}
            >
              |
            </span>
          </div>
        </div>
      </div>
      {!isMaximized && (
        <div className="mt-4 text-center text-sm text-gray-600">
          <p className="flex items-center justify-center">
            <TerminalIcon className="w-4 h-4 mr-2" />
            Type{" "}
            <code className="bg-gray-200 px-2 py-1 rounded mx-1">help</code> to
            see available commands.
          </p>
        </div>
      )}
    </div>
  );

  // Render maximized terminal in portal, else normal
  return isMaximized
    ? createPortal(TerminalContent, typeof window !== "undefined" ? document.body : ({} as HTMLElement))
    : TerminalContent;
};

export default Terminal;

/* Add this to your global CSS (e.g., globals.css or Tailwind config)
@keyframes terminalExpand {
  0% {
    opacity: 0;
    transform: scale(0.85);
  }
  100% {
    opacity: 1;
    transform: scale(0.95);
  }
}
.animate-terminalExpand {
  animation: terminalExpand 0.5s cubic-bezier(.4,0,.2,1);
}
*/