"use client";

import { useState, useEffect, useLayoutEffect } from 'react';
import Link from 'next/link';

interface Video {
  id: string;
  title: string;
  description: string;
}

const VIDEOS: Video[] = [
  {
    id: 'jP5PQ8ix7JE',
    title: 'Verbs vs Nouns: The Word Order That Shaped User Interfaces',
    description: 'This video argues that the history of user interfaces is defined by a linguistic battle between two cognitive models: Noun-Verb (select object, then act) and Verb-Noun (select action, then apply to object). It posits that AI is now synthesising these opposing philosophies into a new "intent-driven" paradigm.'
  },
  {
    id: 'ozNHu03g3Y4',
    title: 'Interfaces of the Future Past: Can AI Revive Early Interface Concepts?',
    description: 'This video argues that the dominant computing paradigm, the "Xerox Consensus" of files, folders, and windows is a historical accident designed to transition 1970s office workers from paper to screens. It posits that this metaphor has imposed a "cognitive tax" on users for decades and that the rise of Artificial Intelligence (AI) and vector databases is finally allowing us to resurrect superior, associative interface concepts that were previously abandoned.'
  },
  {
    id: '_rNOanPsZYo',
    title: 'vibe coding and "wait time" brainrot',
    description: 'An analysis that discusses a phenomenon emerging from "vibe coding" (using AI to generate code), focusing on the cognitive risks associated with the "Wait Window", the idle time between issuing a prompt and receiving the AI\'s output.'
  },
  {
    id: 'OESXpxUH_jI',
    title: 'The Curious Case of Zoomable User Interfaces and AI',
    description: 'Exploring the resurrection of the Zoomable User Interface (ZUI) - an infinite, continuous digital canvas - and its potential synergy with modern Generative AI. It posits that while the desktop metaphor (files, folders, windows) relies on symbolic memory, the ZUI aligns with human spatial memory, treating information as a navigable landscape rather than a stack of isolated screens.'
  },
  {
    id: 'xOOlFUuqlKw',
    title: 'Agents vs Operating Systems : The War That Could Kill Apps',
    description: 'Exploring the tension between legacy graphical user interfaces (GUIs) and the emerging paradigm of AI "agents," arguing that while agents promise to fulfil the original, interconnected vision of computing pioneers, they risk being stifled by the same corporate forces that fragmented the web.'
  },
  {
    id: 'eIOUkNxd4Jo',
    title: 'When Software Becomes the User: AI Agents & The Future of Interfaces',
    description: 'This analysis explores the emerging paradigm where artificial intelligence agents, rather than humans, become the primary operators of digital interfaces. It posits that we are witnessing a fundamental transition in human-computer interaction, driven by the ability of Large Language Models (LLMs) to interpret and manipulate graphical user interfaces (GUIs).'
  },
  {
    id: 'fHMPGhezj0s',
    title: 'History of The Graphical User Interface (GUI): A Wonderful Curse',
    description: 'This documentary provides a critical and historical examination of the Graphical User Interface (GUI), tracing its evolution from early mechanical computation to modern mobile operating systems. It argues that while the GUI has democratised computing, its development was shaped by commercial compromises and persistent "paper-based" metaphors (such as files and folders) that may now limit human-computer symbiosis.'
  }
];

export default function InterfaceStudiesPage() {
  const [mounted, setMounted] = useState(false);

  // Use useLayoutEffect to scroll before paint - this is critical for mobile
  useLayoutEffect(() => {
    // Force scroll to top immediately, before any rendering
    if (typeof window !== 'undefined') {
      window.scrollTo(0, 0);
      document.documentElement.scrollTop = 0;
      document.body.scrollTop = 0;
      
      // Also set scroll position on root elements
      if (document.documentElement) {
        document.documentElement.scrollTop = 0;
      }
      if (document.body) {
        document.body.scrollTop = 0;
      }
    }
  }, []);

  useEffect(() => {
    setMounted(true);
    
    // Comprehensive scroll handling for mobile browsers
    const scrollToTop = () => {
      if (typeof window !== 'undefined') {
        // Force scroll on all possible scroll containers
        window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
        if (window.scrollY !== 0) {
          window.scrollTo(0, 0);
        }
        
        document.documentElement.scrollTop = 0;
        document.body.scrollTop = 0;
        
        // Also try scrolling the document element directly
        const html = document.documentElement;
        const body = document.body;
        if (html) html.scrollTop = 0;
        if (body) body.scrollTop = 0;
        
        // Handle iOS Safari specifically
        if (html && html.scrollHeight > html.clientHeight) {
          html.scrollTop = 0;
        }
        if (body && body.scrollHeight > body.clientHeight) {
          body.scrollTop = 0;
        }
      }
    };
    
    // Immediate scroll
    scrollToTop();
    
    // Multiple attempts for mobile browsers (especially iOS Safari)
    // Mobile browsers have address bar behavior that affects scroll position
    const timers = [
      setTimeout(scrollToTop, 0),
      setTimeout(scrollToTop, 50),
      setTimeout(scrollToTop, 100),
      setTimeout(scrollToTop, 200),
      setTimeout(scrollToTop, 400),
      setTimeout(scrollToTop, 600),
    ];

    // Also handle window resize events (mobile address bar show/hide)
    const handleResize = () => {
      scrollToTop();
    };
    window.addEventListener('resize', handleResize);
    window.addEventListener('orientationchange', handleResize);

    // Handle scroll events to force position if it changes
    let scrollCheckInterval: NodeJS.Timeout | null = null;
    if (typeof window !== 'undefined') {
      scrollCheckInterval = setInterval(() => {
        if (window.scrollY > 0 || document.documentElement.scrollTop > 0 || document.body.scrollTop > 0) {
          scrollToTop();
        }
      }, 100);
      
      // Stop checking after 2 seconds
      setTimeout(() => {
        if (scrollCheckInterval) {
          clearInterval(scrollCheckInterval);
        }
      }, 2000);
    }

    return () => {
      timers.forEach(timer => clearTimeout(timer));
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('orientationchange', handleResize);
      if (scrollCheckInterval) {
        clearInterval(scrollCheckInterval);
      }
    };
  }, []);

  if (!mounted) {
    return (
      <div className="min-h-screen w-full bg-black text-white flex items-center justify-center">
        <div className="text-green-400 animate-pulse">Loading...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen w-full bg-black text-white overflow-x-hidden" style={{ scrollBehavior: 'auto' }}>
      {/* Minimal Header */}
      <header className="fixed top-0 left-0 right-0 z-50 bg-black/20 backdrop-blur-xl border-b border-neutral-900/30">
        <div className="max-w-[1600px] mx-auto px-6 md:px-12 py-4 md:py-6">
          <Link 
            href="/" 
            className="text-sm md:text-base text-white/70 hover:text-white transition-colors inline-flex items-center gap-2"
          >
            <span>←</span>
            <span>Home</span>
          </Link>
        </div>
      </header>

      {/* Cinematic Hero Section with Video Background */}
      <section className="relative h-screen w-full overflow-hidden">
        {/* Looping Background Video */}
        <div className="absolute inset-0 z-0">
          <video
            autoPlay
            loop
            muted
            playsInline
            className="w-full h-full object-cover"
          >
            <source src="/background.mp4" type="video/mp4" />
          </video>
          {/* Dark overlay for text readability */}
          <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/40 to-black/80"></div>
        </div>

        {/* Hero Content */}
        <div className="relative z-10 h-full flex flex-col justify-center items-center px-6 md:px-12">
          <div className="max-w-[1600px] w-full">
            <div className="mb-12 md:mb-16">
              <h1 
                className="text-6xl md:text-9xl lg:text-[12rem] font-bold leading-[0.85] mb-8 md:mb-12 text-white drop-shadow-2xl"
                style={{ fontFamily: 'var(--font-orbit)' }}
              >
                Interface<br/>Studies
              </h1>
            </div>
            <div className="max-w-3xl mb-12 md:mb-16">
              <p 
                className="text-xl md:text-2xl lg:text-3xl leading-relaxed text-white/90 mb-8 md:mb-12 drop-shadow-lg" 
                style={{ fontFamily: 'var(--font-space-grotesk)' }}
              >
                Exploring human interfaces, software, and digital culture—past, present, and future—one video at a time.
              </p>
              <div className="flex flex-col gap-4">
                <a 
                  href="https://interfacestudies.substack.com/" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="inline-flex items-center text-lg md:text-xl text-green-400 hover:text-green-300 transition-colors font-medium border-b-2 border-green-400/50 hover:border-green-400 pb-2 w-fit"
                  style={{ fontFamily: 'var(--font-space-grotesk)' }}
                >
                  Subscribe on Substack <span className="ml-3">→</span>
                </a>
                <p 
                  className="text-base md:text-lg text-white/70"
                  style={{ fontFamily: 'var(--font-space-grotesk)' }}
                >
                  or scroll for videos
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Scroll Indicator */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-10 animate-bounce">
          <div className="flex flex-col items-center gap-2 text-white/60">
            <span className="text-xs uppercase tracking-widest">Scroll</span>
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
            </svg>
          </div>
        </div>
      </section>

      {/* Videos Section - Alternating Layout */}
      <section className="relative px-6 md:px-12 pb-32 md:pb-48 bg-black">
        <div className="max-w-[1600px] mx-auto">
          <div className="space-y-32 md:space-y-48">
            {VIDEOS.map((video, index) => {
              const isEven = index % 2 === 0;
              return (
                <article 
                  key={video.id}
                  id={`video-${index}`}
                  className="fade-in-up scroll-mt-24"
                  style={{ animationDelay: `${index * 0.15}s` }}
                >
                  {/* Alternating Layout: Even = Video Left, Odd = Video Right */}
                  <div className={`grid grid-cols-1 lg:grid-cols-12 gap-8 md:gap-16 items-center ${
                    isEven ? '' : 'lg:flex-row-reverse'
                  }`}>
                    {/* Video Embed - Takes 6 columns */}
                    <div className={`lg:col-span-6 ${isEven ? 'lg:order-1' : 'lg:order-2'}`}>
                      <div className="aspect-video w-full rounded-2xl overflow-hidden border border-neutral-800/50 bg-neutral-900/50 shadow-2xl hover:border-neutral-700 transition-colors">
                        <iframe
                          src={`https://www.youtube.com/embed/${video.id}`}
                          title={video.title}
                          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                          allowFullScreen
                          className="w-full h-full"
                        />
                      </div>
                    </div>

                    {/* Text Content - Takes 6 columns */}
                    <div className={`lg:col-span-6 flex flex-col justify-center space-y-6 md:space-y-8 ${isEven ? 'lg:order-2' : 'lg:order-1'}`}>
                      <div className="flex items-center gap-3">
                        <span className="text-xs md:text-sm font-bold tracking-widest text-green-400 bg-green-400/10 px-4 py-2 rounded-full border border-green-400/20">
                          {String(VIDEOS.length - index).padStart(2, '0')}
                        </span>
                      </div>
                      <h2 
                        className="text-3xl md:text-5xl lg:text-6xl font-bold leading-[1.1] text-white"
                        style={{ fontFamily: 'var(--font-orbit)' }}
                      >
                        {video.title}
                      </h2>
                      <p 
                        className="text-lg md:text-xl lg:text-2xl leading-relaxed text-gray-400"
                        style={{ fontFamily: 'var(--font-space-grotesk)' }}
                      >
                        {video.description}
                      </p>
                      <a
                        href={`https://www.youtube.com/watch?v=${video.id}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center text-base md:text-lg text-gray-500 hover:text-white transition-colors mt-4 group"
                        style={{ fontFamily: 'var(--font-space-grotesk)' }}
                      >
                        <span className="border-b border-gray-500 group-hover:border-white transition-colors pb-1">
                          Watch on YouTube
                        </span>
                        <span className="ml-3 group-hover:translate-x-1 transition-transform">→</span>
                      </a>
                    </div>
                  </div>
                </article>
              );
            })}
          </div>
        </div>
      </section>

      <style jsx global>{`
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(60px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        .fade-in-up {
          animation: fadeInUp 1s cubic-bezier(0.16, 1, 0.3, 1) forwards;
          opacity: 0;
        }
        .scrollbar-hide {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }
        .line-clamp-2 {
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }
        
        /* Mobile scroll fixes */
        @media (max-width: 768px) {
          html {
            scroll-behavior: auto !important;
          }
          body {
            overflow-x: hidden;
            position: relative;
            -webkit-overflow-scrolling: touch;
          }
          /* Ensure hero section starts at top on mobile */
          section:first-of-type {
            min-height: 100vh;
            min-height: -webkit-fill-available;
          }
        }
        
        /* iOS Safari specific fixes */
        @supports (-webkit-touch-callout: none) {
          html {
            height: -webkit-fill-available;
          }
          body {
            min-height: 100vh;
            min-height: -webkit-fill-available;
          }
        }
      `}</style>
    </div>
  );
}