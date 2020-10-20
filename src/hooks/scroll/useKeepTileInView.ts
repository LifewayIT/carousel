import { RefObject, useLayoutEffect } from 'react';
import { useResizeEffect } from '../../hooks/layout/useResizeEffect';
import { scrollToCenter } from '../../utils/scroll';
import { getTile } from '../../utils/tiles';

export const useKeepSelectedTileInView = (containerRef: RefObject<HTMLElement>, selected: number): void => {
  useLayoutEffect(() => {
    if (!containerRef.current) return;
    const container = containerRef.current;

    const selectedTile = getTile(container, selected);

    scrollToCenter(container, selectedTile);
  }, [containerRef, selected]);

  useResizeEffect(containerRef, () => {
    if (!containerRef.current) return;
    scrollToCenter(containerRef.current, getTile(containerRef.current, selected), false);
  });
};
