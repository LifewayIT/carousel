import { DependencyList, EffectCallback, RefObject, useLayoutEffect } from 'react';
import { useResizeEffect } from './useResizeEffect';

type useLayoutChange = (containerRef: RefObject<HTMLElement>, fn: EffectCallback, deps: DependencyList) =>
  { onLoad: () => void };

export const useLayoutChange: useLayoutChange = (containerRef, fn, deps) => {
  useLayoutEffect(fn, deps);

  useResizeEffect(containerRef, fn);

  const onLoad = () => {
    fn();
  };

  return { onLoad };
};
