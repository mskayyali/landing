"use client";

import { useState, useEffect, useRef } from 'react';
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

const SIDE_PROJECTS = [
  {
    id: 'notetoself',
    title: 'Note to Self',
    description: 'AI Voice Memos.',
    image: '/images/ntslogo.png',
    link: '/notetoself',
    tag: 'iOS',
    imageFit: 'contain'
  },
  {
    id: 'commareader',
    title: 'Comma Reader',
    description: 'On-Device AI EPUB & PDF Reader.',
    image: '/images/commalogo.png',
    link: '/commareader',
    tag: 'iOS',
    imageFit: 'contain'
  },
  {
    id: 'archivestream',
    title: 'Archive Stream',
    description: 'Vintage radio player & archiver.',
    image: '/images/archivestream.jpg',
    link: '/archivestream',
    tag: 'Web',
    imageFit: 'cover'
  },
  {
    id: 'presence',
    title: 'Presence',
    description: 'Time awareness app.',
    image: '/images/presence.jpeg',
    link: '#',
    tag: 'MacOS',
    imageFit: 'cover'
  }
];

export default function BioPage() {
  const [mounted, setMounted] = useState(false);
  const [rssItems, setRssItems] = useState<RSSItem[]>([]);
  const [youtubeItems, setYoutubeItems] = useState<YouTubeItem[]>([]);
  const [isLoadingRss, setIsLoadingRss] = useState(true);
  const [isLoadingYoutube, setIsLoadingYoutube] = useState(true);
  const [copied, setCopied] = useState(false);
  const isMobile = useIsMobile();
  const carouselRef = useRef<HTMLDivElement>(null);

  // Fetch RSS feeds
  useEffect(() => {
    const fetchFeeds = async () => {
      try {
        const substackResponse = await fetch(
          `https://api.rss2json.com/v1/api.json?rss_url=${encodeURIComponent('https://interfacestudies.substack.com/feed')}`
        );
        const substackData = await substackResponse.json();
        if (substackData.status === 'ok') {
          setRssItems(substackData.items.slice(0, 1));
        }
      } catch (error) {
        console.error('Failed to fetch Substack RSS:', error);
      } finally {
        setIsLoadingRss(false);
      }

      try {
        const youtubeResponse = await fetch(
          `https://api.rss2json.com/v1/api.json?rss_url=${encodeURIComponent('https://www.youtube.com/feeds/videos.xml?channel_id=UCqv7gk4p_rB4nRz0j7B5yFA')}`
        );
        const youtubeData = await youtubeResponse.json();
        if (youtubeData.status === 'ok') {
          setYoutubeItems(youtubeData.items.slice(0, 1));
        }
      } catch (error) {
        console.error('Failed to fetch YouTube RSS:', error);
      } finally {
        setIsLoadingYoutube(false);
      }
    };

    fetchFeeds();
  }, []);

  useEffect(() => {
    setMounted(true);
  }, []);

  const scrollCarousel = (direction: 'left' | 'right') => {
    if (carouselRef.current) {
      const scrollAmount = 340; // Approx card width + gap
      carouselRef.current.scrollBy({
        left: direction === 'left' ? -scrollAmount : scrollAmount,
        behavior: 'smooth'
      });
    }
  };

  const handleCopyEmail = () => {
    navigator.clipboard.writeText('mskayyali@me.com');
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  if (!mounted) {
    return (
      <div className="h-screen w-full bg-black text-white flex items-center justify-center">
        <div className="text-green-400 animate-pulse">Loading...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen md:h-screen w-full bg-black text-gray-100 selection:bg-green-400 selection:text-black flex flex-col md:flex-row p-4 md:p-8 gap-4 md:gap-8 md:overflow-hidden">
      
      {/* Left Column: Bio & Intro */}
      <div className="w-full md:w-1/3 flex flex-col justify-start md:justify-between h-auto md:h-full fade-in-up gap-4 md:gap-0">
        <div>
          <header className="mb-4 md:mb-12">
            <h1 className="text-4xl md:text-6xl font-bold mb-2 md:mb-4 tracking-tight text-white leading-tight">
              Saleh<br/>Kayyali
            </h1>
            <h2 className="text-xl md:text-2xl text-gray-400 font-medium">
              Product & UX Designer
            </h2>
          </header>
          
          <div className="prose prose-invert text-gray-300 leading-relaxed max-w-md">
            <p className="mb-4 md:mb-6 text-base md:text-lg">
              Designer and amateur developer with over 12 years of experience in software design. 
              Interested in computer history and media.
            </p>
            <p className="text-base md:text-lg">
              Currently working in financial software design and pursuing writing, making videos, 
              and continuous learning.
            </p>
          </div>
        </div>

        <div className="mt-2 md:mt-auto">
          <div className="flex flex-wrap gap-3 text-sm font-medium">
            <a 
              href="https://linkedin.com/in/mskayyali" 
              target="_blank" 
              rel="noopener noreferrer"
              className="px-4 py-2 rounded-full bg-neutral-900 hover:bg-neutral-800 text-gray-300 hover:text-white transition-colors border border-neutral-800"
            >
              LinkedIn
            </a>
            <a 
              href="http://x.com/mskayyali" 
              target="_blank" 
              rel="noopener noreferrer"
              className="px-4 py-2 rounded-full bg-neutral-900 hover:bg-neutral-800 text-gray-300 hover:text-white transition-colors border border-neutral-800"
            >
              X (Twitter)
            </a>
            <button 
              onClick={handleCopyEmail}
              className="px-4 py-2 rounded-full bg-green-400/10 hover:bg-green-400/20 text-green-400 transition-colors border border-green-400/20"
            >
              {copied ? 'Copied!' : 'Contact'}
            </button>
          </div>
        </div>
      </div>

      {/* Right Column: Content Grid */}
      <div className="w-full md:w-2/3 flex flex-col gap-4 md:gap-6 h-auto md:h-full md:overflow-y-auto no-scrollbar">
        
        {/* Top: Side Projects Carousel */}
        <div className="flex-1 min-h-[420px] md:min-h-[300px] bg-neutral-900/50 rounded-3xl p-6 md:p-8 border border-neutral-800 flex flex-col fade-in-up" style={{ animationDelay: '0.1s' }}>
          <div className="flex justify-between items-center mb-6">
            <h3 className="text-xs uppercase tracking-widest text-gray-500 font-bold flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-green-400"></span>
              Side Projects & Design Exploration
            </h3>
            
            {/* Carousel Controls */}
            <div className="flex gap-2">
              <button 
                onClick={() => scrollCarousel('left')}
                className="p-2 w-8 h-8 flex items-center justify-center rounded-full bg-neutral-800 hover:bg-neutral-700 text-gray-400 hover:text-white transition-colors focus:outline-none focus:ring-2 focus:ring-green-400/50"
                aria-label="Scroll left"
              >
                ←
              </button>
              <button 
                onClick={() => scrollCarousel('right')}
                className="p-2 w-8 h-8 flex items-center justify-center rounded-full bg-neutral-800 hover:bg-neutral-700 text-gray-400 hover:text-white transition-colors focus:outline-none focus:ring-2 focus:ring-green-400/50"
                aria-label="Scroll right"
              >
                →
              </button>
            </div>
          </div>
          
          <div 
            ref={carouselRef}
            className="flex-1 flex gap-6 md:gap-6 overflow-x-auto snap-x snap-mandatory pb-4 no-scrollbar items-start md:items-stretch"
            style={{ scrollBehavior: 'smooth' }}
          >
            {SIDE_PROJECTS.map((project) => (
              <div key={project.id} className="snap-center flex-shrink-0 w-[85vw] max-w-[340px] md:w-[320px] flex flex-col">
                {/* Mobile Header */}
                <div className="md:hidden mb-3 px-1">
                  <div className="flex items-center justify-between mb-1">
                    <h4 className="text-xl font-bold text-white">{project.title}</h4>
                    <span className="text-xs font-medium text-neutral-500 border border-neutral-800 px-2 py-1 rounded bg-neutral-900">{project.tag}</span>
                  </div>
                  <p className="text-gray-400 text-sm leading-relaxed line-clamp-2">{project.description}</p>
                </div>

                <a 
                  href={project.link}
                  className="group relative block h-full bg-transparent md:bg-black md:rounded-2xl md:border md:border-neutral-800 md:hover:border-neutral-600 transition-all overflow-hidden flex flex-col"
                >
                  <div className={`w-full relative overflow-hidden flex-shrink-0 rounded-2xl md:rounded-none border border-neutral-800 md:border-none ${
                    project.imageFit === 'contain' ? 'bg-neutral-800' : 'bg-neutral-900'
                  } h-[200px] md:h-48 md:aspect-[16/9]`}>
                    <img 
                      src={project.image} 
                      alt={project.title} 
                      className={`w-full h-full transition-opacity duration-500 ${
                        project.imageFit === 'contain' 
                          ? 'object-contain p-6 opacity-100' 
                          : 'object-cover opacity-80 group-hover:opacity-100'
                      }`}
                    />
                    {/* Desktop Tag */}
                    <div className="hidden md:block absolute top-3 right-3 bg-black/60 backdrop-blur-md px-2 py-1 rounded-md text-xs font-medium text-white border border-white/10">
                      {project.tag}
                    </div>
                  </div>

                  {/* Desktop Text Content */}
                  <div className="hidden md:flex p-5 flex-col flex-1 border-t border-neutral-800">
                    <h4 className="text-xl font-bold text-white mb-2 group-hover:text-green-400 transition-colors">
                      {project.title}
                    </h4>
                    <p className="text-gray-400 text-sm leading-relaxed">
                      {project.description}
                    </p>
                    <div className="mt-auto pt-4 flex items-center text-sm text-neutral-500 group-hover:text-white transition-colors">
                      View Project <span className="ml-2">→</span>
                    </div>
                  </div>
                </a>
              </div>
            ))}
            
            {/* Spacer for end of carousel scrolling */}
            <div className="w-4 flex-shrink-0"></div>
          </div>
        </div>

        {/* Bottom: Latest Updates */}
        <div className="h-auto md:h-[40%] flex flex-col md:flex-row gap-4 md:gap-6 fade-in-up" style={{ animationDelay: '0.2s' }}>
          
          {/* Latest Article */}
          <div className="flex-1 bg-neutral-900/50 rounded-3xl p-6 border border-neutral-800 flex flex-col hover:bg-neutral-900/80 transition-colors">
            <div className="mb-4 flex justify-between items-start">
              <span className="text-xs font-bold tracking-wider text-green-400 bg-green-400/10 px-3 py-1 rounded-full">
                WRITING
              </span>
              <a 
                href="https://interfacestudies.substack.com/" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-xs text-gray-500 hover:text-white transition-colors"
              >
                View All
              </a>
            </div>
            
            {isLoadingRss ? (
              <div className="text-gray-500 text-sm my-auto">Loading...</div>
            ) : rssItems.length > 0 ? (
              <div className="flex flex-col h-full">
                <h4 className="text-lg font-bold text-white mb-3 line-clamp-2 leading-snug group-hover:text-green-400 transition-colors">
                  <a href={rssItems[0].link} target="_blank" rel="noopener noreferrer">
                    {rssItems[0].title.replace(/&amp;/g, '&').replace(/&lt;/g, '<').replace(/&gt;/g, '>').replace(/&quot;/g, '"').replace(/&#39;/g, "'")}
                  </a>
                </h4>
                <a 
                  href={rssItems[0].link} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="mt-auto text-sm text-gray-400 hover:text-white transition-colors inline-flex items-center"
                >
                  Read Article ↗
                </a>
              </div>
            ) : (
              <div className="text-gray-500 text-sm my-auto">No articles found</div>
            )}
          </div>

          {/* Latest Video */}
          <div className="flex-1 bg-neutral-900/50 rounded-3xl p-6 border border-neutral-800 flex flex-col hover:bg-neutral-900/80 transition-colors">
            <div className="mb-4 flex justify-between items-start">
              <span className="text-xs font-bold tracking-wider text-red-400 bg-red-400/10 px-3 py-1 rounded-full">
                VIDEO
              </span>
              <a 
                href="https://www.youtube.com/channel/UCqv7gk4p_rB4nRz0j7B5yFA" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-xs text-gray-500 hover:text-white transition-colors"
              >
                View All
              </a>
            </div>

            {isLoadingYoutube ? (
              <div className="text-gray-500 text-sm my-auto">Loading...</div>
            ) : youtubeItems.length > 0 ? (
              <div className="flex flex-col h-full">
                <h4 className="text-lg font-bold text-white mb-3 line-clamp-2 leading-snug">
                  <a href={youtubeItems[0].link} target="_blank" rel="noopener noreferrer">
                    {youtubeItems[0].title.replace(/&amp;/g, '&').replace(/&lt;/g, '<').replace(/&gt;/g, '>').replace(/&quot;/g, '"').replace(/&#39;/g, "'")}
                  </a>
                </h4>
                <a 
                  href={youtubeItems[0].link} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="mt-auto text-sm text-gray-400 hover:text-white transition-colors inline-flex items-center"
                >
                  Watch Video ↗
                </a>
              </div>
            ) : (
              <div className="text-gray-500 text-sm my-auto">No videos found</div>
            )}
          </div>

        </div>

      </div>
      
      <style jsx global>{`
        .no-scrollbar::-webkit-scrollbar {
          display: none;
        }
        .no-scrollbar {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        .fade-in-up {
          animation: fadeInUp 0.6s cubic-bezier(0.16, 1, 0.3, 1) forwards;
          opacity: 0;
        }
      `}</style>
    </div>
  );
}
