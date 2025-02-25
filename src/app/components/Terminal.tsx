"use client";

import { useState, useEffect, useRef, ReactNode } from 'react';
import dynamic from 'next/dynamic';
import { TerminalOutput } from 'react-terminal-ui';
import DraggableWindow from './DraggableWindow';
import ProjectsWindow from './ProjectsWindow';
import { FlickeringGrid } from './FlickeringGrid';
import styles from './Terminal.module.css';
import { themes, Theme } from '../themes';

// Import Terminal component with dynamic import to ensure client-side only
const TerminalUI = dynamic(() => import('react-terminal-ui').then(mod => mod.default), {
  ssr: false
});

type TerminalResponse = (string | JSX.Element)[];

const bootSequence = [];

const welcomeMessage = [
  "👋 Hi!",
  'Saleh Kayyali',
  'Product & User Experience Designer',
  '',
  <>
    London-based designer and amateur developer with 12+ years of experience in software design. Currently working in financial software design and pursuing (<a href="https://interfacestudies.substack.com/" target="_blank" rel="noopener noreferrer" className={styles.link}>writing</a>), (<a href="https://www.youtube.com/channel/UCqv7gk4p_rB4nRz0j7B5yFA" target="_blank" rel="noopener noreferrer" className={styles.link}>making videos</a>), (<a href="#" className={styles.link} data-action="show-projects">some side projects</a>), and continuous learning.
  </>,
  <>
    Find me on: (<a href="https://linkedin.com/in/mskayyali" target="_blank" rel="noopener noreferrer" className={styles.link}>LinkedIn</a>), (<a href="https://www.threads.net/@kayyalims" target="_blank" rel="noopener noreferrer" className={styles.link}>Threads</a>), (<a href="mailto:mskayyali@me.com" className={styles.link}>Email</a>)
  </>,
  '',
  'Type "help" to see available commands.'
];

// Background effect configuration
const backgroundConfig = {
  squareSize: 5,          // Larger squares for better visibility
  gridGap: 6,            // Slightly larger gap to make squares stand out
  flickerChance: 0.2,    // More frequent flicker for more activity
  color: '#22b455',      // Slightly brighter version of #1D9D4B
  maxOpacity: 0.35,      // Higher opacity for more pop
};

export default function TerminalComponent() {
  const [terminalLineData, setTerminalLineData] = useState<React.ReactElement[]>([]);
  const [isClient, setIsClient] = useState(false);
  const [isPanelOpen, setIsPanelOpen] = useState(false);
  const [markdownContent, setMarkdownContent] = useState('');
  const [windowPosition, setWindowPosition] = useState({ x: 0, y: 0 });
  const [isLoading, setIsLoading] = useState(true);
  const [currentTheme, setCurrentTheme] = useState<Theme>(themes[0]);
  const [isMobile, setIsMobile] = useState(false);
  const keyCounterRef = useRef(0);
  const containerRef = useRef<HTMLDivElement>(null);
  const themeIndexRef = useRef(0);

  const processTerminalLine = (line: string | JSX.Element): string | JSX.Element => {
    // If line is not a string, return it as is
    if (typeof line !== 'string') {
      return line;
    }

    // Check if line contains a URL in square brackets
    const urlMatch = line.match(/\[(.*?)\]/);
    if (urlMatch) {
      const url = urlMatch[1];
      const textBeforeUrl = line.split('[')[0].trim();
      return (
        <span>
          {textBeforeUrl}{' '}
          <a
            href={url}
            target="_blank"
            rel="noopener noreferrer"
            className={styles.link}
            onClick={(e) => {
              if (url.startsWith('mailto:')) {
                e.preventDefault();
                window.location.href = url;
              }
            }}
          >
            {url}
          </a>
        </span>
      );
    }
    return line;
  };

  // Update position and mobile state when window resizes
  useEffect(() => {
    if (!isClient) return;

    const handleResize = () => {
      const width = window.innerWidth > 800 ? 800 : window.innerWidth - 32;
      const height = window.innerWidth > 768 ? 600 : window.innerHeight - 32;
      const x = Math.max(0, Math.floor((window.innerWidth - width) / 2));
      const y = Math.max(0, Math.floor((window.innerHeight - height) / 2));
      setWindowPosition({ x, y });
      setIsMobile(window.innerWidth <= 768);
    };

    // Initial position and mobile state
    handleResize();

    // Add resize listener
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [isClient]);

  const getNextKey = () => {
    keyCounterRef.current += 1;
    return `terminal-line-${keyCounterRef.current}`;
  };

  const initializeWelcomeMessage = () => {
    return welcomeMessage.map(line => (
      <TerminalOutput key={getNextKey()}>
        {processTerminalLine(line)}
      </TerminalOutput>
    ));
  };

  useEffect(() => {
    setIsClient(true);
    // Load markdown content
    fetch('/content/side-projects.md')
      .then(res => res.text())
      .then(setMarkdownContent)
      .catch(console.error);
  }, []);

  useEffect(() => {
    if (!isClient) return;

    let currentIndex = 0;
    let isActive = true;

    // Start with empty terminal
    setTerminalLineData([]);

    const showNextLine = (messages: (string | JSX.Element)[], delay: number = 80) => {
      if (!isActive || currentIndex >= messages.length) {
        setIsLoading(false);
        return;
      }
      
      setTerminalLineData(prev => [
        ...prev,
        <TerminalOutput key={getNextKey()}>
          {processTerminalLine(messages[currentIndex])}
        </TerminalOutput>
      ]);
      currentIndex++;
      setTimeout(() => showNextLine(messages, delay), delay);
    };

    // Start welcome message after initial delay
    setTimeout(() => {
      showNextLine(welcomeMessage, 80);
    }, 500);

    // Add click handler for project link
    const handleClick = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (target.closest('[data-action="show-projects"]')) {
        e.preventDefault();
        setIsPanelOpen(true);
      }
    };

    document.addEventListener('click', handleClick);
    return () => {
      isActive = false;
      document.removeEventListener('click', handleClick);
    };
  }, [isClient]);

  const handleInput = (terminalInput: string) => {
    const input = terminalInput.trim().toLowerCase();
    let response: TerminalResponse = [];

    switch (input) {
      case 'help':
        response = [
          'Available commands:',
          '- theme: Change terminal theme',
          '- clear: Clear terminal'
        ];
        break;
      case 'theme':
        themeIndexRef.current = (themeIndexRef.current + 1) % themes.length;
        const newTheme = themes[themeIndexRef.current];
        setCurrentTheme(newTheme);
        response = [`Theme changed to: ${newTheme.name}`];
        break;
      case 'clear':
        setTerminalLineData(initializeWelcomeMessage());
        return;
      default:
        response = [`Command '${input}' not found. Type 'help' to see available commands.`];
    }

    const newLines = response.map(line => (
      <TerminalOutput key={getNextKey()}>
        {line}
      </TerminalOutput>
    ));
    setTerminalLineData(prev => [...prev, ...newLines]);
  };

  // Update CSS variables when theme changes
  useEffect(() => {
    if (!containerRef.current) return;
    
    const root = containerRef.current;
    root.style.setProperty('--theme-primary', currentTheme.primary);
    root.style.setProperty('--theme-text', currentTheme.text);
    root.style.setProperty('--theme-dim-text', currentTheme.dimText);
    root.style.setProperty('--theme-border', currentTheme.border);
    root.style.setProperty('--theme-background', currentTheme.background);
  }, [currentTheme]);

  return (
    <div ref={containerRef} className={styles.layout}>
      {/* Background Layer */}
      <div className={styles.backgroundLayer}>
        <FlickeringGrid
          className={styles.backgroundGrid}
          squareSize={backgroundConfig.squareSize}
          gridGap={backgroundConfig.gridGap}
          flickerChance={backgroundConfig.flickerChance}
          color={currentTheme.gridColor}
          maxOpacity={currentTheme.maxOpacity}
        />
      </div>

      {/* Windows Layer */}
      <div className={styles.windowsLayer}>
        <DraggableWindow
          title="Terminal"
          className={styles.terminal}
          initialPosition={windowPosition}
          disableDragging={isMobile}
          currentTheme={currentTheme}
        >
          {!isClient || isLoading ? (
            <div className={styles.terminalLoadingContent}>
              <div className={styles.loadingDots}>
                <span>.</span><span>.</span><span>.</span>
              </div>
            </div>
          ) : (
            <div className={styles.terminalContent}>
              <TerminalUI
                name=""
                onInput={handleInput}
                prompt=">"
              >
                {terminalLineData}
              </TerminalUI>
            </div>
          )}
        </DraggableWindow>

        {isPanelOpen && (
          <ProjectsWindow
            markdownContent={markdownContent}
            onClose={() => setIsPanelOpen(false)}
            disableDragging={isMobile}
            currentTheme={currentTheme}
          />
        )}
      </div>
    </div>
  );
} 