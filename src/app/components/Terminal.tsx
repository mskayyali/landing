"use client";

import { useState, useEffect, useRef } from 'react';
import { TerminalOutput } from 'react-terminal-ui';
import DraggableWindow from './DraggableWindow';
import ProjectsWindow from './ProjectsWindow';
import { FlickeringGrid } from './FlickeringGrid';
import styles from './Terminal.module.css';
import { themes, Theme } from '../themes';

const bootSequence = [];

const welcomeMessage = [
  "👋🏼 Hi! I'm Saleh Kayyali",
  'Product & User Experience Designer',
  <>
    Designer and amateur developer with over 12 years of experience in software design. Interested in computer history and media. Currently working in financial software design and pursuing (<a href="https://interfacestudies.substack.com/" target="_blank" rel="noopener noreferrer" className={styles.link}>writing</a>), (<a href="https://www.youtube.com/channel/UCqv7gk4p_rB4nRz0j7B5yFA" target="_blank" rel="noopener noreferrer" className={styles.link}>making videos</a>), (<a href="#" className={styles.link} data-action="show-projects">some side projects</a>), and continuous learning.
  </>,
  <>
    Find me on: (<a href="https://linkedin.com/in/mskayyali" target="_blank" rel="noopener noreferrer" className={styles.link}>LinkedIn</a>), (<a href="http://x.com/mskayyali" target="_blank" rel="noopener noreferrer" className={styles.link}>X</a>)
  </>,
  '',
  'Latest Project',
  <>
    <div className={styles.projectContainer}>
      <img src="/images/ntslogo.png" alt="Note to Self Logo" className={styles.projectLogo} />
      <div>
        <div className={styles.projectTitle}>Note to Self (iPhone)</div>
        <div className={styles.projectDescription}>On-Device AI Voice Memos</div>
        <a href="/notetoself" className={styles.link}>View Project</a>
      </div>
    </div>
  </>
];

// Background effect configuration
const backgroundConfig = {
  squareSize: 5,
  gridGap: 6,
  flickerChance: 0.2,
  color: '#22b455',
  maxOpacity: 0.35,
};

export default function TerminalComponent() {
  const [mounted, setMounted] = useState(false);
  const [terminalLineData, setTerminalLineData] = useState<React.ReactElement[]>([]);
  const [isPanelOpen, setIsPanelOpen] = useState(false);
  const [markdownContent, setMarkdownContent] = useState('');
  const [windowPosition, setWindowPosition] = useState({ x: 0, y: 0 });
  const [currentTheme, setCurrentTheme] = useState<Theme>(themes[0]);
  const [isMobile, setIsMobile] = useState(false);
  const keyCounterRef = useRef(0);
  const containerRef = useRef<HTMLDivElement>(null);

  const processTerminalLine = (line: string | React.JSX.Element): string | React.JSX.Element => {
    if (typeof line !== 'string') {
      return line;
    }

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

  const getNextKey = () => {
    keyCounterRef.current += 1;
    return `terminal-line-${keyCounterRef.current}`;
  };

  // Handle mounting and setup
  useEffect(() => {
    setMounted(true);
    
    // Load markdown content
    fetch('/content/side-projects.md')
      .then(res => res.text())
      .then(setMarkdownContent)
      .catch(console.error);

    // Set up window positioning
    const handleResize = () => {
      const screenWidth = window.innerWidth;
      const screenHeight = window.innerHeight;
      const isMobileDevice = screenWidth <= 768;
      setIsMobile(isMobileDevice);

      if (isMobileDevice) {
        setWindowPosition({ x: screenWidth <= 480 ? 0 : 8, y: 0 });
      } else {
        const width = Math.min(800, screenWidth - 64);
        const height = Math.min(600, screenHeight - 64);
        const x = Math.max(0, Math.floor((screenWidth - width) / 2));
        const y = Math.max(0, Math.floor((screenHeight - height) / 2));
        setWindowPosition({ x, y });
      }
    };

    handleResize();
    window.addEventListener('resize', handleResize);
    window.addEventListener('orientationchange', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('orientationchange', handleResize);
    };
  }, []);

  // Display welcome message
  useEffect(() => {
    if (!mounted) return;

    const timer = setTimeout(() => {
      const welcomeLines = welcomeMessage.map(line => (
        <TerminalOutput key={getNextKey()}>
          {processTerminalLine(line)}
        </TerminalOutput>
      ));
      setTerminalLineData(welcomeLines);
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
      clearTimeout(timer);
      document.removeEventListener('click', handleClick);
    };
  }, [mounted]);

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

  if (!mounted) {
    return (
      <div className={styles.layout}>
        <div className={styles.backgroundLayer} style={{ backgroundColor: '#111' }}>
          <div style={{ width: '100%', height: '100%', background: '#000' }} />
        </div>
        <div className={styles.windowsLayer}>
          <div className="flex items-center justify-center h-screen">
            <div className="text-green-400">Loading...</div>
          </div>
        </div>
      </div>
    );
  }

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
          title="Window"
          className={styles.terminal}
          initialPosition={windowPosition}
          disableDragging={isMobile}
          currentTheme={currentTheme}
        >
          <div className={styles.terminalContent}>
            <div className={styles.terminalOutput}>
              {terminalLineData}
            </div>
          </div>
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