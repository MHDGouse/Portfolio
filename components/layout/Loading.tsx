"use client";
import React, { useEffect, useState } from 'react';

const Loading = () => {
  const [text, setText] = useState('');
  const fullText = "Welcome to mhdgouse.dev";
  const typingSpeed = 100;

  useEffect(() => {
    let i = 0;
    const typingInterval = setInterval(() => {
      if (i <= fullText.length) {
        setText(fullText.substring(0, i));
        i++;
      } else {
        clearInterval(typingInterval);
      }
    }, typingSpeed);

    return () => clearInterval(typingInterval);
  }, []);

  return (
    <div className="fixed inset-0 bg-black flex items-center justify-center z-50">
      <div className="text-green-400 font-mono text-2xl md:text-4xl">
        {text}<span className="terminal-cursor"></span>
      </div>
    </div>
  );
};

export default Loading;
