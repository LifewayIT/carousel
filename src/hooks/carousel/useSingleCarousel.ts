import { FocusEventHandler, KeyboardEventHandler, RefObject } from 'react';
import { useKeepSelectedTileInView } from '../scroll/useKeepTileInView';
import { useSelectOnFocus } from '../select/useSelectOnFocus';
import { useSelectWithArrowKeys } from '../select/useSelectWithArrowKeys';


export interface SingleCarouselHookProps {
  selected: number;
  onSelect: (nextSelected: number) => void;
  numTiles: number;
}

export interface SingleCarouselResult {
  props: {
    onKeyDown: KeyboardEventHandler;
    onFocus: FocusEventHandler;
  }
}


export const useSingleCarousel = (containerRef: RefObject<HTMLElement>, props: SingleCarouselHookProps): SingleCarouselResult => {
  useKeepSelectedTileInView(containerRef, props.selected);
  const focusProps = useSelectOnFocus(containerRef, props.onSelect);
  const keyProps = useSelectWithArrowKeys(containerRef, props);

  return {
    props: {
      ...focusProps,
      ...keyProps
    }
  };
};
