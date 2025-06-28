"use client";

import { useState, useRef, useEffect, ReactNode, useCallback } from 'react';
import styles from './DraggableWindow.module.css';
import { Theme } from '../themes';

interface DraggableWindowProps {
  children: ReactNode;
  title: string;
  onClose: () => void;
  className?: string;
  initialPosition?: { x: number; y: number };
  disableDragging?: boolean;
  currentTheme: Theme;
  position: { x: number; y: number };
  onPositionChange: (position: { x: number; y: number }) => void;
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
  initialPosition = { x: 0, y: 0 },
  disableDragging = false,
  currentTheme,
  position,
  onPositionChange,
}: DraggableWindowProps) {
  const [isDragging, setIsDragging] = useState(false);
  const windowRef = useRef<HTMLDivElement>(null);
  const offsetRef = useRef({ x: 0, y: 0 });

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

  const handleMouseDown = (e: React.MouseEvent<HTMLDivElement>) => {
    if (
      disableDragging ||
      (e.target instanceof HTMLElement && e.target.closest(".content"))
    )
      return;

    const rect = windowRef.current?.getBoundingClientRect();
    if (!rect) return;

    offsetRef.current = {
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    };

    setIsDragging(true);
  };

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      e.preventDefault();
      const bounds = getBounds();
      const newX = Math.max(
        bounds.minX,
        Math.min(bounds.maxX, e.clientX - offsetRef.current.x)
      );
      const newY = Math.max(
        bounds.minY,
        Math.min(bounds.maxY, e.clientY - offsetRef.current.y)
      );
      onPositionChange({ x: newX, y: newY });
    };

    const handleMouseUp = () => {
      setIsDragging(false);
    };

    if (isDragging) {
      document.body.style.cursor = "grabbing";
      document.documentElement.style.userSelect = "none";
      window.addEventListener("mousemove", handleMouseMove);
      window.addEventListener("mouseup", handleMouseUp);
    }

    return () => {
      document.body.style.cursor = "";
      document.documentElement.style.userSelect = "";
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseup", handleMouseUp);
    };
  }, [isDragging, getBounds, onPositionChange]);

  return (
    <div
      ref={windowRef}
      className={`${styles.window} ${className} ${disableDragging ? styles.mobile : ''}`}
      style={{
        transform: `translate3d(${position.x}px, ${position.y}px, 0)`,
        cursor: isDragging ? 'grabbing' : disableDragging ? 'default' : 'grab',
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
        style={{ cursor: disableDragging ? 'default' : isDragging ? 'grabbing' : 'grab' }}
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
      <div className={`${styles.content} content`}>{children}</div>
    </div>
  );
}