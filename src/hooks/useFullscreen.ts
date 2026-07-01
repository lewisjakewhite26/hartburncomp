import { useCallback, useEffect, useRef, useState } from 'react';

export function useFullscreen<T extends HTMLElement = HTMLDivElement>() {
  const ref = useRef<T>(null);
  const [active, setActive] = useState(false);

  useEffect(() => {
    const sync = () => {
      setActive(document.fullscreenElement === ref.current);
    };
    document.addEventListener('fullscreenchange', sync);
    return () => document.removeEventListener('fullscreenchange', sync);
  }, []);

  const enter = useCallback(async () => {
    if (!ref.current) return;
    await ref.current.requestFullscreen();
  }, []);

  const exit = useCallback(async () => {
    if (document.fullscreenElement) {
      await document.exitFullscreen();
    }
  }, []);

  const toggle = useCallback(async () => {
    if (document.fullscreenElement === ref.current) {
      await exit();
    } else {
      await enter();
    }
  }, [enter, exit]);

  return { ref, active, enter, exit, toggle };
}
