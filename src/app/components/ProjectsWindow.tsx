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
  // Calculate initial position - higher up vertically, slightly to the right
  const initialPosition = {
    x: Math.max(0, (window.innerWidth / 2) - 100), // Shifted right to overlap with terminal
    y: Math.max(0, (window.innerHeight - 600) / 2 - 100) // Lifted higher up
  };

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