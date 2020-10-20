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
