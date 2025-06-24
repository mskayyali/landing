"use client";

import ReactMarkdown from 'react-markdown';
import DraggableWindow from './DraggableWindow';
import styles from './ProjectsWindow.module.css';
import { Theme } from '../themes';

interface ProjectsWindowProps {
  markdownContent: string;
  onClose: () => void;
  disableDragging?: boolean;
  currentTheme: Theme;
}

export default function ProjectsWindow({ 
  markdownContent, 
  onClose, 
  disableDragging = false,
  currentTheme 
}: ProjectsWindowProps) {
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
      title="Projects"
      onClose={onClose}
      className={styles.projectsWindow}
      initialPosition={initialPosition}
      disableDragging={disableDragging}
      currentTheme={currentTheme}
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