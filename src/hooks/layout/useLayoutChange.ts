import { DependencyList, EffectCallback, RefObject, useLayoutEffect } from 'react';
import { useResizeEffect } from './useResizeEffect';

type useLayoutChange = (containerRef: RefObject<HTMLElement>, fn: EffectCallback, deps: DependencyList) =>
  { onLoad: () => void };

export const useLayoutChange: useLayoutChange = (containerRef, fn, deps) => {
  useLayoutEffect(fn, deps);  // eslint-disable-line react-hooks/exhaustive-deps

  useResizeEffect(containerRef, fn);

  const onLoad = () => {
    fn();
  };

  return { onLoad };
};
