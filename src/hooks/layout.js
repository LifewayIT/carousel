import { useRef, useLayoutEffect } from 'react';

export const useIsInitialLayoutEffect = (effectFn, deps) => {
  const isInitial = useRef(true);

  useLayoutEffect(() => {
    const currentIsInitial = isInitial.current;
    isInitial.current = false;

    return effectFn(currentIsInitial);
  }, deps); // eslint-disable-line react-hooks/exhaustive-deps
};

export const useResizeEffect = (elRef, fn) => {
  const effectFn = useRef();
  effectFn.current = fn;

  useLayoutEffect(() => {
    if (!window.ResizeObserver) return;

    if (elRef.current) {
      const observer = new window.ResizeObserver((...args) => effectFn.current(...args));

      const el = elRef.current;
      observer.observe(el);

      return () => observer.unobserve(el);
    }
  }, [elRef]);
};

const getTarget = (targetRef, root) => {
  if ('current' in targetRef) {
    return targetRef.current;
  } else if (typeof targetRef === 'function') {
    return targetRef(root);
  } else {
    return targetRef;
  }
};

export const useIntersectionEffect = (rootRef, targetRef, options, fn) => {
  const effectFn = useRef();
  effectFn.current = fn;

  const { rootMargin, threshold } = options;

  useLayoutEffect(() => {
    if (!window.IntersectionObserver) return;

    const target = getTarget(targetRef, rootRef?.current);

    if (target) {
      const observer = new window.IntersectionObserver(
        (...args) => effectFn.current(...args),
        { root: rootRef?.current, rootMargin, threshold }
      );

      observer.observe(target);

      return () => observer.unobserve(target);
    }
  }, [rootRef, targetRef, rootMargin, threshold]);
};
