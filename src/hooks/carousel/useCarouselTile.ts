import { FocusEventHandler, RefObject } from 'react';
import { useScrollFocusedIntoView } from '../scroll/useScrollFocusedIntoView';


export interface CarouselTileHookProps {
  selected: number;
  onSelect: (nextSelected: number) => void;
}

export interface TileProps {
  className: string;
  onClick: () => void;
  onFocus: FocusEventHandler;
  selected: boolean;
}

export type CarouselTileResult = (num: number) => TileProps;


type useCarouselTile = (containerRef: RefObject<HTMLElement>, hookProps: CarouselTileHookProps) => CarouselTileResult;

export const useCarouselTile: useCarouselTile = (containerRef, { selected, onSelect }) => {
  const scrollIntoView = useScrollFocusedIntoView(containerRef);

  const tileProps = (num: number) => ({
    className: num === selected ? 'lwc-selected' : '',
    onClick: () => {
      onSelect(num);
    },
    onFocus: scrollIntoView.onFocus,
    selected: num === selected
  });

  return tileProps;
};

