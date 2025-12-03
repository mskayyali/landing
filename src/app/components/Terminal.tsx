"use client";

import { useState, useEffect } from 'react';
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
              {copied ? 'Copied!' : 'Email'}
            </button>
          </div>
        </div>
      </div>

      {/* Right Column: Content Grid */}
      <div className="w-full md:w-2/3 flex flex-col gap-4 md:gap-6 h-auto md:h-full md:overflow-y-auto no-scrollbar">
        
        {/* Top: Side Projects List */}
        <div className="flex-1 min-h-[420px] md:min-h-[300px] bg-neutral-900/50 rounded-3xl p-6 md:p-8 border border-neutral-800 flex flex-col fade-in-up" style={{ animationDelay: '0.1s' }}>
          <div className="mb-6">
            <h3 className="text-xs uppercase tracking-widest text-gray-500 font-bold flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-green-400"></span>
              Side Projects & Design Exploration
              <span className="text-gray-600 font-normal">({SIDE_PROJECTS.length})</span>
            </h3>
          </div>
          
          <div className="flex-1 overflow-y-auto no-scrollbar">
            <div className="flex flex-col gap-4">
              {SIDE_PROJECTS.map((project) => (
                <a
                  key={project.id}
                  href={project.link}
                  className="group flex items-start gap-4 p-4 rounded-xl border border-neutral-800 hover:border-neutral-700 hover:bg-neutral-900/50 transition-all"
                >
                  {/* Small squared image */}
                  <div className={`flex-shrink-0 w-16 h-16 md:w-20 md:h-20 rounded-lg overflow-hidden border border-neutral-800 ${
                    project.imageFit === 'contain' ? 'bg-neutral-800' : 'bg-neutral-900'
                  }`}>
                    <img 
                      src={project.image} 
                      alt={project.title} 
                      className={`w-full h-full transition-opacity duration-300 ${
                        project.imageFit === 'contain' 
                          ? 'object-contain p-2 opacity-100' 
                          : 'object-cover opacity-80 group-hover:opacity-100'
                      }`}
                    />
                  </div>

                  {/* Title and Description */}
                  <div className="flex-1 min-w-0">
                    <h4 className="text-base md:text-lg font-bold text-white mb-1 group-hover:text-green-400 transition-colors">
                      {project.title}
                    </h4>
                    <p className="text-sm md:text-base text-gray-400 leading-relaxed">
                      {project.description}
                    </p>
                  </div>

                  {/* View link on the right */}
                  <div className="flex-shrink-0 flex items-center">
                    <span className="text-sm text-neutral-500 group-hover:text-white transition-colors whitespace-nowrap">
                      View <span className="ml-1">→</span>
                    </span>
                  </div>
                </a>
              ))}
            </div>
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
