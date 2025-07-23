"use client";

import { useState, useEffect, useRef, useCallback } from 'react';
import { TerminalOutput } from 'react-terminal-ui';
import DraggableWindow from './DraggableWindow';
import ProjectsWindow from './ProjectsWindow';
import ContactWindow from './ContactWindow';
import { FlickeringGrid } from './FlickeringGrid';
import styles from './Terminal.module.css';
import { themes, Theme } from '../themes';
import { useIsMobile } from '../hooks/useIsMobile';

interface RSSItem {
  title: string;
  link: string;
  description: string;
  pubDate: string;
}

interface YouTubeItem {
  title: string;
  link: string;
  pubDate: string;
}

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
  <>
    Feel free to <a href="#" className={styles.link} data-action="show-contact">Contact me</a> anytime :) would love to collaborate.
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
  const [isProjectsOpen, setIsProjectsOpen] = useState(false);
  const [isContactOpen, setIsContactOpen] = useState(false);
  const [windowPosition, setWindowPosition] = useState({ x: 0, y: 0 });
  const [currentTheme, setCurrentTheme] = useState<Theme>(themes[0]);
  const [projectsWindowPosition, setProjectsWindowPosition] = useState({
    x: 50,
    y: 50,
  });
  const [contactWindowPosition, setContactWindowPosition] = useState({
    x: 100,
    y: 100,
  });
  const [isMobile, setIsMobile] = useState(false);
  const [rssItems, setRssItems] = useState<RSSItem[]>([]);
  const [youtubeItems, setYoutubeItems] = useState<YouTubeItem[]>([]);
  const [isLoadingRss, setIsLoadingRss] = useState(true);
  const [isLoadingYoutube, setIsLoadingYoutube] = useState(true);
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

  // Fetch RSS feeds
  useEffect(() => {
    const fetchFeeds = async () => {
      try {
        // Fetch Substack RSS
        const substackResponse = await fetch(
          `https://api.rss2json.com/v1/api.json?rss_url=${encodeURIComponent('https://interfacestudies.substack.com/feed')}`
        );
        const substackData = await substackResponse.json();
        
        if (substackData.status === 'ok') {
          setRssItems(substackData.items.slice(0, 1)); // Get only 1 latest item
        }
      } catch (error) {
        console.error('Failed to fetch Substack RSS:', error);
      } finally {
        setIsLoadingRss(false);
      }

      try {
        // Fetch YouTube RSS
        const youtubeResponse = await fetch(
          `https://api.rss2json.com/v1/api.json?rss_url=${encodeURIComponent('https://www.youtube.com/feeds/videos.xml?channel_id=UCqv7gk4p_rB4nRz0j7B5yFA')}`
        );
        const youtubeData = await youtubeResponse.json();
        
        if (youtubeData.status === 'ok') {
          setYoutubeItems(youtubeData.items.slice(0, 1)); // Get only 1 latest video
        }
      } catch (error) {
        console.error('Failed to fetch YouTube RSS:', error);
      } finally {
        setIsLoadingYoutube(false);
      }
    };

    fetchFeeds();
  }, []);

  // Handle mounting and setup
  useEffect(() => {
    setMounted(true);

    // Set up window positioning
    const handleResize = () => {
      const screenWidth = window.innerWidth;
      const screenHeight = window.innerHeight;
      const isMobileDevice = screenWidth <= 768;
      setIsMobile(isMobileDevice);

      if (isMobileDevice) {
        setWindowPosition({ x: screenWidth <= 480 ? 0 : 8, y: 0 });
      } else {
        const width = Math.min(800, screenWidth - 64); // Standard terminal size
        const height = Math.min(450, screenHeight - 64); // Compact terminal height
        const x = Math.max(0, Math.floor((screenWidth - width) / 2));
        const y = Math.max(0, Math.floor((screenHeight - height) / 2)); // Centered in viewport
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

  // Display welcome message and Latest section
  useEffect(() => {
    if (!mounted) return;

    const timer = setTimeout(() => {
      // Convert welcome message to terminal outputs
      const welcomeLines = welcomeMessage.map(line => (
        <TerminalOutput key={getNextKey()}>
          {processTerminalLine(line)}
        </TerminalOutput>
      ));

      // Create Latest section with three items in a row (no header)
      const latestLines = [];
      const latestContent = (
        <TerminalOutput key={getNextKey()}>
          <div style={{ 
            display: 'grid', 
            gridTemplateColumns: '1fr 1fr 1fr',
            gap: '2rem',
            marginTop: '1rem',
            alignItems: 'start'
          }}>
            {/* Note to Self Project */}
            <div style={{ 
              display: 'flex', 
              flexDirection: 'column', 
              height: '120px' 
            }}>
              <div style={{ 
                display: 'flex', 
                alignItems: 'flex-start', 
                gap: '0.75rem',
                marginBottom: '0.5rem',
                flex: 1
              }}>
                <img 
                  src="/images/ntslogo.png" 
                  alt="Note to Self Logo" 
                  style={{
                    width: '32px',
                    height: '32px',
                    borderRadius: '6px',
                    objectFit: 'cover',
                    flexShrink: 0
                  }}
                />
                <div style={{ flex: 1 }}>
                  <div style={{ 
                    color: 'var(--theme-text)', 
                    fontWeight: '500',
                    fontSize: '0.9rem',
                    marginBottom: '0.25rem'
                  }}>
                    Note to Self
                  </div>
                  <div style={{ 
                    color: 'var(--theme-dim-text)', 
                    fontSize: '0.8rem'
                  }}>
                    AI Voice Memos
                  </div>
                </div>
              </div>
              <div style={{ marginTop: 'auto' }}>
                <a href="/notetoself" className={styles.link} style={{ fontSize: '0.8rem' }}>
                  View Project
                </a>
              </div>
            </div>

            {/* Latest Article */}
            <div style={{ 
              display: 'flex', 
              flexDirection: 'column', 
              height: '120px' 
            }}>
              <div style={{ flex: 1 }}>
                <div style={{ 
                  color: 'var(--theme-text)', 
                  fontWeight: '500',
                  fontSize: '0.9rem',
                  marginBottom: '0.5rem'
                }}>
                  Latest Writing
                </div>
                {isLoadingRss ? (
                  <div style={{ color: 'var(--theme-dim-text)', fontSize: '0.8rem' }}>Loading...</div>
                ) : rssItems.length > 0 ? (
                  <div style={{ 
                    color: 'var(--theme-dim-text)', 
                    fontSize: '0.8rem',
                    lineHeight: '1.4'
                  }}>
                    {rssItems[0].title.replace(/&amp;/g, '&').replace(/&lt;/g, '<').replace(/&gt;/g, '>').replace(/&quot;/g, '"').replace(/&#39;/g, "'")}
                  </div>
                ) : (
                  <div style={{ color: 'var(--theme-dim-text)', fontSize: '0.8rem' }}>No articles found</div>
                )}
              </div>
              {!isLoadingRss && rssItems.length > 0 && (
                <div style={{ marginTop: 'auto', fontSize: '0.8rem' }}>
                  <a href={rssItems[0].link} target="_blank" rel="noopener noreferrer" className={styles.link}>
                    Read Article
                  </a>
                  {' • '}
                  <a href="https://interfacestudies.substack.com/" target="_blank" rel="noopener noreferrer" className={styles.link}>
                    Subscribe
                  </a>
                </div>
              )}
            </div>

            {/* Latest Video */}
            <div style={{ 
              display: 'flex', 
              flexDirection: 'column', 
              height: '120px' 
            }}>
              <div style={{ flex: 1 }}>
                <div style={{ 
                  color: 'var(--theme-text)', 
                  fontWeight: '500',
                  fontSize: '0.9rem',
                  marginBottom: '0.5rem'
                }}>
                  Latest Video
                </div>
                {isLoadingYoutube ? (
                  <div style={{ color: 'var(--theme-dim-text)', fontSize: '0.8rem' }}>Loading...</div>
                ) : youtubeItems.length > 0 ? (
                  <div style={{ 
                    color: 'var(--theme-dim-text)', 
                    fontSize: '0.8rem',
                    lineHeight: '1.4'
                  }}>
                    {youtubeItems[0].title.replace(/&amp;/g, '&').replace(/&lt;/g, '<').replace(/&gt;/g, '>').replace(/&quot;/g, '"').replace(/&#39;/g, "'")}
                  </div>
                ) : (
                  <div style={{ color: 'var(--theme-dim-text)', fontSize: '0.8rem' }}>No videos found</div>
                )}
              </div>
              {!isLoadingYoutube && youtubeItems.length > 0 && (
                <div style={{ marginTop: 'auto' }}>
                  <a href={youtubeItems[0].link} target="_blank" rel="noopener noreferrer" className={styles.link} style={{ fontSize: '0.8rem' }}>
                    Watch Video
                  </a>
                </div>
              )}
            </div>
          </div>
        </TerminalOutput>
      );

      latestLines.push(latestContent);

      setTerminalLineData([...welcomeLines, ...latestLines]);
    }, 500);

    // Add click handler for project link
    const handleClick = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      const action = target.closest('[data-action]')?.getAttribute('data-action');

      if (action === 'show-projects') {
        e.preventDefault();
        setIsProjectsOpen(true);
      }
      
      if (action === 'show-contact') {
        e.preventDefault();
        setIsContactOpen(true);
      }
    };

    document.addEventListener('click', handleClick);
    
    return () => {
      clearTimeout(timer);
      document.removeEventListener('click', handleClick);
    };
  }, [mounted, rssItems, youtubeItems, isLoadingRss, isLoadingYoutube]);

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
          title="mskayyali.com"
          className={styles.terminal}
          onClose={() => {}}
          position={windowPosition}
          onPositionChange={setWindowPosition}
          disableDragging={isMobile}
          currentTheme={currentTheme}
        >
          <div className={styles.terminalContent}>
            <div className={styles.terminalOutput}>
              {terminalLineData}
            </div>
          </div>
        </DraggableWindow>

        {isProjectsOpen && (
          <ProjectsWindow
            onClose={() => setIsProjectsOpen(false)}
            disableDragging={isMobile}
            currentTheme={currentTheme}
            position={projectsWindowPosition}
            onPositionChange={setProjectsWindowPosition}
          />
        )}
        
        {isContactOpen && (
          <ContactWindow
            onClose={() => setIsContactOpen(false)}
            disableDragging={isMobile}
            currentTheme={currentTheme}
            position={contactWindowPosition}
            onPositionChange={setContactWindowPosition}
          />
        )}
      </div>
    </div>
  );
} 