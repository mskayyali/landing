"use client";

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useIsMobile } from '../hooks/useIsMobile';

export default function ArchiveStreamPage() {
  const [mounted, setMounted] = useState(false);
  const isMobile = useIsMobile();

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return (
      <div className="h-screen w-full bg-black text-white flex items-center justify-center">
        <div className="text-green-400 animate-pulse">Loading...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen md:h-screen w-full bg-black text-gray-100 selection:bg-[#8FE800] selection:text-black flex flex-col md:flex-row md:overflow-hidden">
      
      {/* Back Button (Absolute) */}
      <Link 
        href="/"
        className="fixed top-6 left-6 md:top-8 md:left-8 z-50 w-10 h-10 flex items-center justify-center rounded-full bg-neutral-900/50 hover:bg-neutral-800 border border-neutral-700 text-white transition-colors backdrop-blur-md"
      >
        ←
      </Link>

      {/* Left Column: App Description */}
      <div className="w-full md:w-1/2 min-h-screen md:h-full p-8 md:p-16 flex flex-col justify-center relative z-10 bg-neutral-900/30 backdrop-blur-sm border-b md:border-b-0 md:border-r border-neutral-800">
        <div className="max-w-lg mx-auto w-full fade-in-up pt-20 md:pt-0">
          <div className="mb-8">
            <img 
              src="/images/archviestream.png" 
              alt="Archive Stream Logo" 
              className="w-[100px] h-[100px] object-contain mb-8"
            />
            <span className="inline-block px-3 py-1 rounded-full bg-[#8FE800]/20 text-[#8FE800] text-xs font-bold tracking-wider border border-[#8FE800]/20 mb-6">
              WEB APP
            </span>
            <h1 className="text-5xl md:text-7xl font-bold mb-6 tracking-tighter leading-none">
              ARCHIVE<br />STREAM
            </h1>
          </div>

          <div className="space-y-6 text-lg md:text-xl text-gray-400 leading-relaxed">
            <p>
              Archive Stream is an audio player I created out of a love for the Internet Archive's rich library of vintage radio shows, and as a simple way to play and save my favourite programmes.
            </p>
            <p>
              It features a neo-brutalist, retro design with a clean, straightforward interface, allowing you to browse, search, and beautifully play back your favourite audio collections.
            </p>
          </div>

          <div className="mt-12">
            <p className="text-sm text-gray-500 mb-4 uppercase tracking-widest font-semibold">Visit it here:</p>
            <a 
              href="https://archive-stream-437222560370.us-west1.run.app/" 
              target="_blank" 
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-[#8FE800] hover:text-[#8FE800]/80 transition-colors text-lg font-medium group"
            >
              Archive Stream
              <span className="group-hover:translate-x-1 transition-transform">→</span>
            </a>
          </div>
        </div>
      </div>

      {/* Right Column: Scrollable Content */}
      <div className="w-full md:w-1/2 h-auto md:h-full bg-black md:overflow-y-auto no-scrollbar">
        <div className="w-full">
          <video 
            src="/images/asvidfin.mp4" 
            autoPlay 
            muted 
            loop 
            playsInline 
            className="w-full h-auto block"
          />
          <img 
            src="/images/as1.png" 
            alt="Archive Stream Screenshot 1" 
            className="w-full h-auto block" 
          />
          <img 
            src="/images/as2.png" 
            alt="Archive Stream Screenshot 2" 
            className="w-full h-auto block" 
          />
          <img 
            src="/images/as3.png" 
            alt="Archive Stream Screenshot 3" 
            className="w-full h-auto block" 
          />
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
          animation: fadeInUp 0.8s cubic-bezier(0.16, 1, 0.3, 1) forwards;
          opacity: 0;
        }
      `}</style>
    </div>
  );
}
