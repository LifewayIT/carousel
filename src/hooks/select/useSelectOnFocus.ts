import { FocusEventHandler, RefObject } from 'react';
import { scrollToCenter } from '../../utils/scroll';
import { getTiles } from '../../utils/tiles';


// TODO - pass in scrollIntoView? / scrollingStrategy?
type useSelectOnFocus = (containerRef: RefObject<HTMLElement>, onSelect: (selected: number) => void) =>
  { onFocus: FocusEventHandler }

export const useSelectOnFocus: useSelectOnFocus = (containerRef, onSelect) => {
  const scrollFocusedElementIntoView: FocusEventHandler = (evt) => {
    if (!containerRef.current) return;
    const container = containerRef.current;

    const tiles = getTiles(container);
    const focusedNum = tiles.findIndex(tile => tile.contains(evt.target));

    // TODO - is this even necessary ?? already a hook that keeps the selected in view (browser scrolls automatically though) - try preventScroll on focus()
    scrollToCenter(container, tiles[focusedNum]);
    onSelect(focusedNum);
  };

  return {
    onFocus: scrollFocusedElementIntoView
  };
};
