"use client";

import { useState, useEffect } from 'react';
import Link from 'next/link';
import styles from './Portfolio.module.css';

interface Project {
  name: string;
  company: string;
  companyLogo: string;
  year: string;
  slug: string;
}

interface PortfolioClientProps {
  projects: Project[];
}

export default function PortfolioClient({ projects }: PortfolioClientProps) {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

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
            Please enter the password to view the portfolio
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
              Access Portfolio
            </button>
          </form>
        </div>
      </div>
    );
  }

  return (
    <div className={styles.container}>
      <header className={styles.header}>
        <h1 className={styles.title}>Portfolio</h1>
        <p className={styles.subtitle}>
          Selected projects showcasing product design and user experience work
        </p>
      </header>

      <div className={styles.grid}>
        {projects.map((project) => (
          <Link
            key={project.slug}
            href={`/portfolio/${project.slug}`}
            className={styles.card}
          >
            <div className={styles.cardHeader}>
              <img
                src={project.companyLogo}
                alt={project.company}
                className={styles.companyLogo}
              />
              <span className={styles.year}>{project.year}</span>
            </div>
            <h2 className={styles.projectName}>{project.name}</h2>
            <p className={styles.company}>{project.company}</p>
            <div className={styles.cardFooter}>
              <span className={styles.viewProject}>View Project →</span>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}

