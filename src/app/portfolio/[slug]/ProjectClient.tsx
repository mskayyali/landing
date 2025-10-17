"use client";

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import ReactMarkdown from 'react-markdown';
import rehypeRaw from 'rehype-raw';
import styles from './Project.module.css';

interface ProjectClientProps {
  content: string;
  metadata: {
    name: string;
    company: string;
    companyLogo: string;
    year: string;
    heroImage?: string;
    link?: string;
  };
}

export default function ProjectClient({ content, metadata }: ProjectClientProps) {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [lightboxImage, setLightboxImage] = useState<string | null>(null);
  const router = useRouter();

  useEffect(() => {
    // Check if already authenticated
    const auth = sessionStorage.getItem('portfolio_auth');
    if (auth === 'kayyalifolio') {
      setIsAuthenticated(true);
    }
  }, []);

  useEffect(() => {
    // Add click handlers to all content images
    const handleImageClick = (e: Event) => {
      const target = e.target as HTMLElement;
      if (target.tagName === 'IMG' && target.closest(`.${styles.content}`)) {
        const img = target as HTMLImageElement;
        setLightboxImage(img.src);
      }
    };

    const contentElement = document.querySelector(`.${styles.content}`);
    if (contentElement) {
      contentElement.addEventListener('click', handleImageClick);
      return () => contentElement.removeEventListener('click', handleImageClick);
    }
  }, [isAuthenticated]);

  useEffect(() => {
    // Prevent body scroll when lightbox is open
    if (lightboxImage) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
  }, [lightboxImage]);

  useEffect(() => {
    // Handle Escape key to close lightbox
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && lightboxImage) {
        setLightboxImage(null);
      }
    };

    if (lightboxImage) {
      document.addEventListener('keydown', handleKeyDown);
      return () => document.removeEventListener('keydown', handleKeyDown);
    }
  }, [lightboxImage]);

  const handleCloseLightbox = () => {
    setLightboxImage(null);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (password === 'kayyalifolio') {
      sessionStorage.setItem('portfolio_auth', 'kayyalifolio');
      setIsAuthenticated(true);
      setError('');
    } else {
      setError('Incorrect password');
    }
  };

  if (!isAuthenticated) {
    return (
      <div className={styles.passwordContainer}>
        <div className={styles.passwordBox}>
          <h1 className={styles.passwordTitle}>Portfolio Access</h1>
          <p className={styles.passwordDescription}>
            Please enter the password to view this project
          </p>
          <form onSubmit={handleSubmit} className={styles.passwordForm}>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter password"
              className={styles.passwordInput}
              autoFocus
            />
            {error && <p className={styles.error}>{error}</p>}
            <button type="submit" className={styles.passwordButton}>
              Access Project
            </button>
          </form>
        </div>
      </div>
    );
  }

  return (
    <>
      <div className={styles.container}>
        <nav className={styles.nav}>
          <Link href="/portfolio" className={styles.backLink}>
            ← Back to Portfolio
          </Link>
        </nav>

        {metadata.heroImage && (
          <div className={styles.heroImage}>
            <img 
              src={metadata.heroImage} 
              alt={metadata.name}
              onClick={() => setLightboxImage(metadata.heroImage!)}
              style={{ cursor: 'pointer' }}
            />
          </div>
        )}

        <article className={styles.article}>
          <header className={styles.header}>
            <div className={styles.meta}>
              <img 
                src={metadata.companyLogo} 
                alt={metadata.company}
                className={styles.companyLogo}
              />
              <div className={styles.metaInfo}>
                <p className={styles.company}>{metadata.company}</p>
                <p className={styles.year}>{metadata.year}</p>
              </div>
              {metadata.link && (
                <a 
                  href={metadata.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={styles.projectLink}
                  aria-label="Visit project website"
                >
                  <svg 
                    width="20" 
                    height="20" 
                    viewBox="0 0 24 24" 
                    fill="none" 
                    stroke="currentColor" 
                    strokeWidth="2" 
                    strokeLinecap="round" 
                    strokeLinejoin="round"
                  >
                    <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
                    <polyline points="15 3 21 3 21 9" />
                    <line x1="10" y1="14" x2="21" y2="3" />
                  </svg>
                  Visit Project
                </a>
              )}
            </div>
          </header>

          <div className={styles.content}>
            <ReactMarkdown rehypePlugins={[rehypeRaw]}>{content}</ReactMarkdown>
          </div>
        </article>
      </div>

      {/* Lightbox */}
      {lightboxImage && (
        <div 
          className={styles.lightbox}
          onClick={handleCloseLightbox}
          role="dialog"
          aria-modal="true"
        >
          <div className={styles.lightboxContent}>
            <button 
              className={styles.lightboxClose}
              onClick={handleCloseLightbox}
              aria-label="Close lightbox"
            >
              ✕
            </button>
            <img 
              src={lightboxImage} 
              alt="Full size view"
              className={styles.lightboxImage}
              onClick={(e) => e.stopPropagation()}
            />
          </div>
        </div>
      )}
    </>
  );
}

