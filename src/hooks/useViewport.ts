import { useEffect } from 'react';

/** Follow the visible viewport on iOS as well as browsers that resize the layout for the IME. */
export function useViewport(active: boolean) {
  useEffect(() => {
    if (!active) return;
    const viewport = window.visualViewport;
    let frame = 0;
    const update = () => {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(() => {
        // Preserve native pinch zoom; do not reflow the app around a zoomed viewport.
        if (viewport && Math.abs(viewport.scale - 1) > 0.05) return;
        document.documentElement.style.setProperty(
          '--practice-height',
          `${viewport?.height ?? window.innerHeight}px`,
        );
        document.documentElement.style.setProperty(
          '--practice-top',
          `${viewport?.offsetTop ?? 0}px`,
        );
      });
    };
    update();
    viewport?.addEventListener('resize', update);
    viewport?.addEventListener('scroll', update);
    window.addEventListener('resize', update);
    document.body.classList.add('practicing');
    return () => {
      cancelAnimationFrame(frame);
      viewport?.removeEventListener('resize', update);
      viewport?.removeEventListener('scroll', update);
      window.removeEventListener('resize', update);
      document.body.classList.remove('practicing');
      document.documentElement.style.removeProperty('--practice-height');
      document.documentElement.style.removeProperty('--practice-top');
    };
  }, [active]);
}
