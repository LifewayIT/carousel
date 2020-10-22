import { useLayoutEffect, useRef } from 'react';

export const useResizeEffect = (elRef: React.RefObject<Element>, fn: ResizeObserverCallback): void => {
  const effectFn = useRef<ResizeObserverCallback>();
  effectFn.current = fn;

  useLayoutEffect(() => {
    if (!window.ResizeObserver) return undefined;

    if (elRef.current) {
      const observer = new window.ResizeObserver(
        (...args) => (effectFn.current as ResizeObserverCallback)(...args)  //TODO not sure why args have to be passed in explicitly
      );

      const el = elRef.current;
      observer.observe(el);

      return () => observer.unobserve(el);
    }

    return undefined;
  }, [elRef]);
};
