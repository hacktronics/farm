import { useState, useEffect } from 'react';

function compute() {
  const appBarHeight = 65;
  const winW = window.innerWidth;
  const winH = window.innerHeight;
  const editorPanelWidth = Math.max(400, Math.floor(winW * 0.38));
  const sidebarWidth = Math.max(120, Math.min(160, Math.floor(editorPanelWidth * 0.24)));
  const aceEditorWidth = editorPanelWidth - sidebarWidth;
  const mazePanelWidth = winW - editorPanelWidth;
  const mazePanelHeight = winH - appBarHeight;

  // Proportional margins so canvas scales smoothly across sizes
  const availW = mazePanelWidth * 0.95;
  const availH = mazePanelHeight * 0.95;
  const canvasScale = Math.min(availW / 1000, availH / 800, 1.5);

  return { appBarHeight, editorPanelWidth, sidebarWidth, aceEditorWidth,
           mazePanelWidth, mazePanelHeight, canvasScale };
}

export default function useLayoutDimensions() {
  const [dimensions, setDimensions] = useState(() => compute());

  useEffect(() => {
    let rafId;
    const handleResize = () => {
      cancelAnimationFrame(rafId);
      rafId = requestAnimationFrame(() => {
        const d = compute();
        setDimensions(d);
        const root = document.documentElement.style;
        root.setProperty('--editor-panel-width', d.editorPanelWidth + 'px');
        root.setProperty('--sidebar-width', d.sidebarWidth + 'px');
        root.setProperty('--ace-editor-width', d.aceEditorWidth + 'px');
        root.setProperty('--maze-panel-width', d.mazePanelWidth + 'px');
        root.setProperty('--maze-panel-height', d.mazePanelHeight + 'px');
        root.setProperty('--canvas-scale', d.canvasScale);
        root.setProperty('--appbar-height', d.appBarHeight + 'px');
      });
    };
    handleResize();
    window.addEventListener('resize', handleResize);
    document.addEventListener('fullscreenchange', handleResize);
    return () => {
      cancelAnimationFrame(rafId);
      window.removeEventListener('resize', handleResize);
      document.removeEventListener('fullscreenchange', handleResize);
    };
  }, []);

  return dimensions;
}
