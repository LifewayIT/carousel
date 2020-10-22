import { FocusEventHandler, RefObject } from 'react';
import { scrollToCenter } from '../../utils/scroll';
import { getTiles } from '../../utils/tiles';


type useSelectOnFocus = (containerRef: RefObject<HTMLElement>, onSelect: (selected: number) => void) =>
  { onFocus: FocusEventHandler }

export const useSelectOnFocus: useSelectOnFocus = (containerRef, onSelect) => {
  const scrollFocusedElementIntoView: FocusEventHandler = (evt) => {
    if (!containerRef.current) return;
    const container = containerRef.current;

    const tiles = getTiles(container);
    const focusedNum = tiles.findIndex(tile => tile.contains(evt.target));

    scrollToCenter(container, tiles[focusedNum]);
    onSelect(focusedNum);
  };

  return {
    onFocus: scrollFocusedElementIntoView
  };
};
