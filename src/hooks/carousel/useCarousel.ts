import { DependencyList, KeyboardEventHandler, ReactEventHandler, RefObject, UIEventHandler } from 'react';
import { TargetZoneOffsets } from '../../utils/layout';
import { useLayoutChange } from '../layout/useLayoutChange';
import { useScrolledToEdge } from '../layout/useScrolledToEdge';
import { useTargetZone } from '../layout/useTargetZone';
import { pageByVisibility } from '../paging/strategies';
import { usePageWithArrowKeys } from '../paging/usePageWithArrowKeys';
import { usePaging } from '../paging/usePaging';
import { useScrollSelectedIntoView } from '../scroll/useScrollSelectedIntoView';
import { useScrollSnapLoadingFix } from '../scroll/useScrollSnapLoadingFix';
import { useSelectWithArrowKeys } from '../select/useSelectWithArrowKeys';
import { Pages, usePages } from '../paging/usePages';
import { useCarouselTile, CarouselTileResult } from './useCarouselTile';

export interface CarouselHookProps {
  selected: number;
  onSelect: (nextSelected: number) => void;
  numTiles: number;
}

export interface CarouselResult {
  props: {
    arrow: {
      left: {
        left: boolean;
        hide: boolean;
        disabled: boolean;
        onClick: () => void;
        onKeyDown: KeyboardEventHandler;
      };
      right: {
        right: boolean;
        hide: boolean;
        disabled: boolean;
        onClick: () => void;
        onKeyDown: KeyboardEventHandler;
      };
    };
    list: {
      onKeyDown: KeyboardEventHandler;
      onScroll: UIEventHandler;
      onLoad: ReactEventHandler;
      targetZoneOffset: TargetZoneOffsets;
    };
    tile: CarouselTileResult;
  };
  pages: Pages;
}


type useCarousel = (containerRef: RefObject<HTMLElement>, hookProps: CarouselHookProps, layoutDeps: DependencyList) => CarouselResult;

export const useCarousel: useCarousel = (containerRef, { selected, onSelect, numTiles }, layoutDeps) => {
  const pages = usePages(containerRef);
  const paging = usePaging(containerRef, pageByVisibility);
  const pageArrowKeys = usePageWithArrowKeys(containerRef, pageByVisibility);

  useScrollSelectedIntoView(containerRef, selected);
  const ssFix = useScrollSnapLoadingFix(containerRef, selected);
  const arrowKeys = useSelectWithArrowKeys(containerRef, { selected, onSelect, numTiles });

  const onEdge = useScrolledToEdge(containerRef);
  const [targetOffset, targetZone] = useTargetZone(containerRef);


  const layout = useLayoutChange(containerRef, () => {
    pages.onLayoutChange();
    targetZone.onLayoutChange();
  }, layoutDeps);

  const onLoad: ReactEventHandler = () => {
    layout.onLoad();
    ssFix.onLoad();
  };

  const onScroll: UIEventHandler = () => {
    pages.onScroll();
  };

  const tileProps = useCarouselTile(containerRef, { selected, onSelect });

  return {
    props: {
      arrow: {
        left: {
          left: true,
          hide: onEdge.both,
          disabled: onEdge.left,
          onClick: paging.pageLeft,
          onKeyDown: pageArrowKeys.onKeyDown
        },
        right: {
          right: true,
          hide: onEdge.both,
          disabled: onEdge.right,
          onClick: paging.pageRight,
          onKeyDown: pageArrowKeys.onKeyDown
        }
      },
      list: {
        onKeyDown: arrowKeys.onKeyDown,
        onScroll,
        onLoad,
        targetZoneOffset: targetOffset
      },
      tile: tileProps,
    },
    pages
  };
};
