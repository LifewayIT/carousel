import { useRef, useLayoutEffect } from 'react';

export const useIsInitialLayoutEffect = (effectFn, deps) => {
  const isInitial = useRef(true);

  useLayoutEffect(() => {
    const currentIsInitial = isInitial.current;
    isInitial.current = false;

    return effectFn(currentIsInitial);
  }, deps);
};

export const useResizeEffect = (elRef, fn) => {
  if (!window.ResizeObserver) return;

  const effectFn = useRef();
  effectFn.current = fn;

  useLayoutEffect(() => {
    if (elRef.current) {
      const observer = new window.ResizeObserver((...args) => effectFn.current(...args));
  
      observer.observe(elRef.current);
  
      return () => observer.unobserve(elRef.current);
    }
  }, [elRef.current]);
}

const getTarget = (targetRef, root) => {
  if ('current' in targetRef) {
    return targetRef.current
  } else if (typeof targetRef === 'function') {
    return targetRef(root);
  } else {
    return targetRef;
  }
};

export const useIntersectionEffect = (rootRef, targetRef, options, fn) => {
  if (!window.IntersectionObserver) return;

  const effectFn = useRef();
  effectFn.current = fn;

  useLayoutEffect(() => {
    const target = getTarget(targetRef, rootRef?.current);

    if (target) {
      const observer = new window.IntersectionObserver(
        (...args) => effectFn.current(...args),
        { root: rootRef?.current, ...options }
      );
  
      observer.observe(target);
  
      return () => observer.unobserve(target);
    }
  }, [rootRef?.current, options.rootMargin, options.threshold, targetRef, targetRef.current]);
};