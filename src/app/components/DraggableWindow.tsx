"use client";

import { useState, useRef, useEffect, ReactNode, useCallback } from 'react';
import styles from './DraggableWindow.module.css';
import { Theme } from '../themes';

interface DraggableWindowProps {
  children: ReactNode;
  title?: string;
  onClose?: () => void;
  className?: string;
  initialPosition: { x: number; y: number };
  disableDragging?: boolean;
  currentTheme?: Theme;
}

interface Position {
  x: number;
  y: number;
}

export default function DraggableWindow({
  children,
  title,
  onClose,
  className = '',
  initialPosition,
  disableDragging = false,
  currentTheme
}: DraggableWindowProps) {
  const [position, setPosition] = useState<Position>(initialPosition);
  const isDragging = useRef(false);
  const dragStart = useRef({ x: 0, y: 0 });
  const windowOffset = useRef({ x: 0, y: 0 });
  const windowRef = useRef<HTMLDivElement>(null);
  const frameRef = useRef<number | undefined>(undefined);

  // Memoize the bounds calculation
  const getBounds = useCallback(() => {
    if (!windowRef.current) return { minX: 0, maxX: 0, minY: 0, maxY: 0 };
    const windowWidth = windowRef.current.offsetWidth;
    const windowHeight = windowRef.current.offsetHeight;
    return {
      minX: 0,
      maxX: window.innerWidth - windowWidth,
      minY: 0,
      maxY: window.innerHeight - windowHeight
    };
  }, []);

  // Update position when initialPosition changes
  useEffect(() => {
    setPosition(initialPosition);
  }, [initialPosition]);

  const updatePosition = useCallback((clientX: number, clientY: number) => {
    if (disableDragging) return;
    
    const bounds = getBounds();
    const newX = Math.max(bounds.minX, Math.min(bounds.maxX, clientX - windowOffset.current.x));
    const newY = Math.max(bounds.minY, Math.min(bounds.maxY, clientY - windowOffset.current.y));

    setPosition({ x: newX, y: newY });
  }, [getBounds, disableDragging]);

  const handleMouseMove = useCallback((e: MouseEvent) => {
    e.preventDefault();
    if (!isDragging.current || disableDragging) return;

    // Cancel any existing frame
    if (frameRef.current) {
      cancelAnimationFrame(frameRef.current);
    }

    // Schedule the next frame
    frameRef.current = requestAnimationFrame(() => {
      updatePosition(e.clientX, e.clientY);
    });
  }, [updatePosition, disableDragging]);

  const handleMouseUp = useCallback(() => {
    if (!isDragging.current) return;
    isDragging.current = false;
    document.body.style.cursor = '';
    document.documentElement.style.userSelect = '';
    
    window.removeEventListener('mousemove', handleMouseMove);
    window.removeEventListener('mouseup', handleMouseUp);

    if (frameRef.current) {
      cancelAnimationFrame(frameRef.current);
    }
  }, [handleMouseMove]);

  const handleMouseDown = (e: React.MouseEvent<HTMLDivElement>) => {
    if (disableDragging || (e.target instanceof HTMLElement && e.target.closest('.content'))) return;
    e.preventDefault();
    
    const rect = windowRef.current?.getBoundingClientRect();
    if (!rect) return;

    isDragging.current = true;
    document.body.style.cursor = 'grabbing';
    document.documentElement.style.userSelect = 'none';

    windowOffset.current = {
      x: e.clientX - rect.left,
      y: e.clientY - rect.top
    };

    dragStart.current = { x: e.clientX, y: e.clientY };

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mouseup', handleMouseUp);
  };

  // Clean up event listeners and animation frames
  useEffect(() => {
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseup', handleMouseUp);
      if (frameRef.current) {
        cancelAnimationFrame(frameRef.current);
      }
    };
  }, [handleMouseMove, handleMouseUp]);

  return (
    <div
      ref={windowRef}
      className={`${styles.window} ${className} ${disableDragging ? styles.mobile : ''}`}
      style={{
        transform: `translate3d(${position.x}px, ${position.y}px, 0)`,
        cursor: isDragging.current ? 'grabbing' : disableDragging ? 'default' : 'grab',
        ...(currentTheme && {
          '--theme-primary': currentTheme.primary,
          '--theme-text': currentTheme.text,
          '--theme-dim-text': currentTheme.dimText,
          '--theme-border': currentTheme.border,
          '--theme-background': currentTheme.background,
        } as React.CSSProperties),
      }}
    >
      <div 
        className={styles.titleBar} 
        onMouseDown={handleMouseDown}
        style={{ cursor: disableDragging ? 'default' : isDragging.current ? 'grabbing' : 'grab' }}
      >
        {title && <div className={styles.title}>{title}</div>}
        {onClose && (
          <button 
            className={styles.closeButton} 
            onClick={onClose}
            onMouseDown={e => e.stopPropagation()}
          >
            ×
          </button>
        )}
      </div>
      <div className={`${styles.content} content`}>
        {children}
      </div>
    </div>
  );
} 