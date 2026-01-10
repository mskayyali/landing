"use client";

import { useState, useEffect } from 'react';
import Link from 'next/link';


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
  const [copied, setCopied] = useState(false);

  const handleCopyEmail = async () => {
    const email = 'mskayyali@me.com';
    
    try {
      // Try modern clipboard API first (requires HTTPS on mobile)
      if (navigator.clipboard && navigator.clipboard.writeText) {
        await navigator.clipboard.writeText(email);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
      } else {
        // Fallback for older browsers or HTTP connections
        const textArea = document.createElement('textarea');
        textArea.value = email;
        textArea.style.position = 'fixed';
        textArea.style.left = '-999999px';
        textArea.style.top = '-999999px';
        document.body.appendChild(textArea);
        textArea.focus();
        textArea.select();
        
        try {
          const successful = document.execCommand('copy');
          if (successful) {
            setCopied(true);
            setTimeout(() => setCopied(false), 2000);
          } else {
            // If copy fails, fallback to showing email
            alert(`Email: ${email}`);
          }
        } catch (err) {
          // If execCommand fails, show email
          alert(`Email: ${email}`);
        } finally {
          document.body.removeChild(textArea);
        }
      }
    } catch (err) {
      // If clipboard API fails, show email as fallback
      alert(`Email: ${email}`);
    }
  };

  return (
    <div className="min-h-screen md:h-screen w-full bg-black text-gray-100 selection:bg-green-400 selection:text-black flex flex-col md:flex-row p-4 pt-6 pb-12 md:p-8 gap-4 md:gap-8 md:overflow-hidden">
      
      {/* Left Column: Bio & Intro */}
      <div className="w-full md:w-1/3 flex flex-col justify-start md:justify-between h-auto md:h-full fade-in-up gap-4 md:gap-0 pt-4 md:pt-0">
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
      <div className="w-full md:w-2/3 flex flex-col gap-4 md:gap-6 h-auto md:h-full md:overflow-y-auto no-scrollbar pb-8 md:pb-0">
        
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

        {/* Bottom: Interface Studies */}
        <div className="h-auto md:h-[40%] fade-in-up mb-8 md:mb-0" style={{ animationDelay: '0.2s' }}>
          <div className="bg-neutral-900/50 rounded-3xl p-6 md:p-8 border border-neutral-800 hover:bg-neutral-900/80 transition-colors flex flex-col md:flex-row gap-6 md:gap-8 items-start">
            {/* Image on the left */}
            <div className="flex-shrink-0 w-24 h-24 md:w-32 md:h-32 rounded-lg overflow-hidden border border-neutral-800">
              <img 
                src="/IS.jpg" 
                alt="Interface Studies" 
                className="w-full h-full object-cover"
        />
      </div>

            {/* Content on the right */}
            <div className="flex-1 min-w-0">
              <h3 className="text-2xl md:text-3xl font-bold text-white mb-4 md:mb-6">
                Interface Studies
              </h3>
              <p className="text-base md:text-lg text-gray-300 leading-relaxed mb-6 md:mb-8">
                Exploring human interfaces, software, and digital culture—past, present, and future—one video at a time. Expect deep dives into books and papers, some news, personal projects, and design insights.
              </p>
              <Link 
                href="/interfacestudies"
                className="inline-flex items-center text-sm md:text-base text-green-400 hover:text-green-300 transition-colors font-medium"
              >
                Learn more <span className="ml-2">→</span>
              </Link>
            </div>
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
