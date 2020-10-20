import { EffectCallback, RefObject, useLayoutEffect } from 'react';
import { useResizeEffect } from './layout';

type useLayoutChange = (containerRef: RefObject<HTMLElement>, fn: EffectCallback, deps: unknown[]) =>
  { onLoad: () => void };

export const useLayoutChange: useLayoutChange = (containerRef, fn, deps) => {
  useLayoutEffect(fn, deps);

  useResizeEffect(containerRef, fn);

  const onLoad = () => {
    fn();
  };

  return { onLoad };
};
