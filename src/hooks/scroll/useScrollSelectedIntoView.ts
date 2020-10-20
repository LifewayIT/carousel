import { RefObject } from 'react';
import { scrollIntoView, scrollToCenter } from '../../utils/scroll';
import { getTile } from '../../utils/tiles';
import { useIsInitialLayoutEffect } from '../layout/useIsInitialLayoutEffect';

export const useScrollSelectedIntoView = (containerRef: RefObject<HTMLElement>, selected: number): void => {
  useIsInitialLayoutEffect((isInitial) => {
    if (!containerRef.current) return;

    const container = containerRef.current;
    const tile = getTile(container, selected);

    if (isInitial) {
      scrollToCenter(container, tile, false);
    } else {
      scrollIntoView(container, tile);
    }
  }, [containerRef, selected]);
};
