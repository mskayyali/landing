"use client";

import ReactMarkdown from 'react-markdown';
import DraggableWindow from './DraggableWindow';
import styles from './ProjectsWindow.module.css';
import { Theme } from '../themes';
import { useState, useEffect } from 'react';

interface ProjectsWindowProps {
  onClose: () => void;
  disableDragging: boolean;
  currentTheme: Theme;
  position: { x: number; y: number };
  onPositionChange: (position: { x: number; y: number }) => void;
}

function ProjectsWindow({
  onClose,
  disableDragging,
  currentTheme,
  position,
  onPositionChange,
}: ProjectsWindowProps) {
  const [markdownContent, setMarkdownContent] = useState("");
  const windowTitle = "Side Projects";

  useEffect(() => {
    fetch('/content/side-projects.md')
      .then(res => res.text())
      .then(setMarkdownContent)
      .catch(err => console.error("Failed to load projects markdown:", err));
  }, []);

  // Calculate responsive initial position
  const getInitialPosition = () => {
    if (typeof window === 'undefined') return { x: 0, y: 0 };
    
    const screenWidth = window.innerWidth;
    const screenHeight = window.innerHeight;
    
    if (screenWidth <= 480) {
      // Small mobile - full screen
      return { x: 0, y: 0 };
    } else if (screenWidth <= 768) {
      // Medium mobile/tablet - small inset
      return { x: 8, y: 8 };
    } else {
      // Desktop - offset from terminal window
      return {
        x: Math.max(0, (screenWidth / 2) - 100),
        y: Math.max(0, (screenHeight - 600) / 2 - 100)
      };
    }
  };
  
  const initialPosition = getInitialPosition();

  return (
    <DraggableWindow
      title={windowTitle}
      onClose={onClose}
      className={styles.projectsWindow}
      disableDragging={disableDragging}
      currentTheme={currentTheme}
      position={position}
      onPositionChange={onPositionChange}
    >
      <div 
        className={styles.markdownContent}
        style={{
          '--theme-primary': currentTheme.primary,
          '--theme-text': currentTheme.text,
          '--theme-dim-text': currentTheme.dimText,
          '--theme-border': currentTheme.border,
          '--theme-background': currentTheme.background,
        } as React.CSSProperties}
      >
        <ReactMarkdown>{markdownContent}</ReactMarkdown>
      </div>
    </DraggableWindow>
  );
}

export default ProjectsWindow; 