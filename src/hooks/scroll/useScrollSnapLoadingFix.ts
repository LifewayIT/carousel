import { RefObject } from 'react';
import { scrollToCenter } from '../../utils/scroll';
import { getTile } from '../../utils/tiles';

type useScrollSnapLoadingFix = (containerRef: RefObject<HTMLElement>, selected: number) =>
  { onLoad: () => void };

export const useScrollSnapLoadingFix: useScrollSnapLoadingFix = (containerRef, selected) => {
  const onLoad = () => {
    /* scroll-snapping on chrome jumps to random position in list when images load */
    if (containerRef.current) {
      const tile = getTile(containerRef.current, selected);
      scrollToCenter(containerRef.current, tile, false);
    }
  };

  return { onLoad };
};
