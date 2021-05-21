import { useLayoutEffect, useRef } from 'react';

export const useResizeEffect = (elRef: React.RefObject<Element>, fn: ResizeObserverCallback): void => {
  const effectFn = useRef<ResizeObserverCallback>();
  effectFn.current = fn;

  useLayoutEffect(() => {
    if (!window.ResizeObserver) return undefined;

    if (elRef.current) {
      const callback: ResizeObserverCallback =
        (...args: Parameters<ResizeObserverCallback>) => (effectFn.current as ResizeObserverCallback)(...args);
      const observer = new window.ResizeObserver(callback);

      const el = elRef.current;
      observer.observe(el);

      return () => observer.unobserve(el);
    }

    return undefined;
  }, [elRef]);
};
