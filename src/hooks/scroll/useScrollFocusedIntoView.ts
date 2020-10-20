import { FocusEventHandler, RefObject } from 'react';
import { scrollIntoView } from '../../utils/scroll';
import { getTiles } from '../../utils/tiles';

type useScrollFocusedIntoView = (containerRef: RefObject<HTMLElement>) =>
  { onFocus: FocusEventHandler }

export const useScrollFocusedIntoView: useScrollFocusedIntoView = (containerRef) => {
  const onFocus: FocusEventHandler = (e) => {
    const tiles = getTiles(containerRef.current);

    const focusedTile = tiles.find(tile => tile.contains(e.target));

    if (focusedTile) {
      scrollIntoView(containerRef.current, focusedTile);
    }
  };

  return { onFocus };
};

