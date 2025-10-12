"use client";

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import ReactMarkdown from 'react-markdown';
import styles from './Project.module.css';

interface ProjectClientProps {
  content: string;
  metadata: {
    name: string;
    company: string;
    companyLogo: string;
    year: string;
    heroImage?: string;
  };
}

export default function ProjectClient({ content, metadata }: ProjectClientProps) {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const router = useRouter();

  useEffect(() => {
    // Check if already authenticated
    const auth = sessionStorage.getItem('portfolio_auth');
    if (auth === 'kayyalifolio') {
      setIsAuthenticated(true);
    }
  }, []);

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
    <div className={styles.container}>
      <nav className={styles.nav}>
        <Link href="/portfolio" className={styles.backLink}>
          ← Back to Portfolio
        </Link>
      </nav>

      {metadata.heroImage && (
        <div className={styles.heroImage}>
          <img src={metadata.heroImage} alt={metadata.name} />
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
            <div>
              <p className={styles.company}>{metadata.company}</p>
              <p className={styles.year}>{metadata.year}</p>
            </div>
          </div>
        </header>

        <div className={styles.content}>
          <ReactMarkdown>{content}</ReactMarkdown>
        </div>
      </article>
    </div>
  );
}

