import { KeyboardEventHandler, RefObject } from 'react';
import { getFirstFocusableElement } from '../../utils/dom';
import { getTile } from '../../utils/tiles';

type useSelectWithArrowKeysProps = {
  selected: number;
  onSelect: (nextSelected: number) => void;
  numTiles: number;
};

type useSelectWithArrowKeys = (containerRef: RefObject<HTMLElement>, props: useSelectWithArrowKeysProps) =>
  { onKeyDown: KeyboardEventHandler };

export const useSelectWithArrowKeys: useSelectWithArrowKeys = (containerRef, { selected, onSelect, numTiles }) => {
  const onKeyDown: KeyboardEventHandler = (e) => {
    const container = containerRef.current;
    if (e.key === 'ArrowLeft') {
      e.preventDefault();

      const prev = Math.max(selected - 1, 0);
      onSelect(prev);

      // if (container) {
        getFirstFocusableElement(getTile(container, prev))?.focus();
      // }
    } else if (e.key === 'ArrowRight') {
      e.preventDefault();

      const next = Math.min(selected + 1, numTiles - 1);
      onSelect(next);

      // if (container) {
        getFirstFocusableElement(getTile(container, next))?.focus();
      // }
    }
  };

  return { onKeyDown };
};
