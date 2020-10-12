import { useLayoutEffect, useRef } from 'react';

type InitialEffectCallback = (initial: boolean) => ReturnType<React.EffectCallback>;
export const useIsInitialLayoutEffect = (effectFn: InitialEffectCallback, deps: React.DependencyList | undefined): void => {
  const isInitial = useRef(true);

  useLayoutEffect(() => {
    const currentIsInitial = isInitial.current;
    isInitial.current = false;

    return effectFn(currentIsInitial);
  }, deps); // eslint-disable-line react-hooks/exhaustive-deps
};

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

interface getTarget {
  (
    targetRef: React.RefObject<Element> | ((root: Element) => Element) | Element,
    root: Element
  ): Element;

  (
    targetRef: React.RefObject<Element> | Element,
    root: undefined
  ): Element;
}

const getTarget: getTarget = (
  targetRef: React.RefObject<Element> | ((root: Element) => Element) | Element,
  root: Element | undefined
) => {
  if ('current' in targetRef) {
    return targetRef.current as Element;
  } else if (typeof targetRef === 'function') {
    return targetRef(root as Element);
  } else {
    return targetRef;
  }
};


interface useIntersectionEffect {
  (
    rootRef: React.RefObject<Element>,
    targetRef: React.RefObject<Element> | ((root: Element) => Element) | Element,
    options: IntersectionObserverInit | undefined,
    fn: IntersectionObserverCallback
  ): void;

  (
    rootRef: undefined,
    targetRef: React.RefObject<Element> | Element,
    options: IntersectionObserverInit | undefined,
    fn: IntersectionObserverCallback
  ): void;
}

export const useIntersectionEffect: useIntersectionEffect = (
  rootRef: React.RefObject<Element> | undefined,
  targetRef: React.RefObject<Element> | ((root: Element) => Element) | Element,
  options: IntersectionObserverInit | undefined,
  fn: IntersectionObserverCallback
): void => {
  const effectFn = useRef<IntersectionObserverCallback>();
  effectFn.current = fn;

  const { rootMargin, threshold } = options ?? {};

  useLayoutEffect(() => {
    if (!window.IntersectionObserver) return undefined;

    const target = rootRef?.current
      ? getTarget(targetRef, rootRef?.current)
      : getTarget(targetRef as React.RefObject<Element> | Element, rootRef?.current as undefined);

    if (target) {
      const observer = new window.IntersectionObserver(
        (...args) => (effectFn.current as IntersectionObserverCallback)(...args),  //TODO not sure why args have to be passed in explicitly
        { root: rootRef?.current, rootMargin, threshold }
      );

      observer.observe(target);

      return () => observer.unobserve(target);
    }

    return undefined;
  }, [rootRef, targetRef, rootMargin, threshold]);
};
