import React, { useRef, useState, ReactNode, HTMLAttributes, ReactElement, KeyboardEventHandler, UIEventHandler, RefObject, FocusEventHandler, EffectCallback, ReactEventHandler, DependencyList } from 'react';
import styled from 'styled-components';
import CarouselArrow from './CarouselArrow';
import { useIntersectionEffect } from '../hooks/layout/useIntersectionEffect';
import { device, space } from '../utils/styleguide';
import { usePages } from '../hooks/usePages';
import PageIndicator from './PageIndicator';
import { useLayoutChange } from '../hooks/layout/useLayoutChange';
import {
  leftEdgeOffset,
  rightEdgeOffset,
  getTargetZoneOffsets,
  targetZoneLeftEdge,
  targetZoneRightEdge,
  TargetZoneOffsets,
  alignAtTargetZoneLeftEdge,
  alignAtTargetZoneRightEdge,
  projectTargetZoneLeftEdge,
} from '../utils/layout';
import { isTouchscreen } from '../utils/featureQueries';
import { scrollIntoView, scrollTo } from '../utils/scroll';
import { useSelectWithArrowKeys } from '../hooks/select/useSelectWithArrowKeys';
import { useScrollSelectedIntoView } from '../hooks/scroll/useScrollSelectedIntoView';
import { useScrollSnapLoadingFix } from '../hooks/scroll/useScrollSnapLoadingFix';
import { useScrollFocusedIntoView } from '../hooks/scroll/useScrollFocusedIntoView';


const Container = styled.div`
  position: relative;
`;

const Margin = styled.div`
  width: calc(${space._64} - ${space._8});
  height: 1px;
  flex: 0 0 auto;

  @media ${device._480} {
    width: calc(${space._64} - ${space._16});
  }

  @media ${device._768} {
    width: calc(${space._96} - ${space._16});
  }
`;

const ScrollContainer = styled.ul<{ targetZoneOffset: TargetZoneOffsets }>`
  overflow-x: scroll;

  &::-webkit-scrollbar {
    display: none;
  }
  scrollbar-width: none;

  margin: 0;
  padding: ${space._48} 0;

  display: flex;
  flex-direction: row;
  align-items: center;

  & > ${Margin} {
    flex: 1 0 auto;
  }

  & > li {
    flex: 0 0 auto;
    margin: 0 ${space._8};
    list-style-type: none;
  }

  /* only enable snap scrolling on touchscreen devices */
  @media (hover: none), (hover: on-demand) {
    scroll-snap-type: x mandatory;
    scroll-padding-left: ${props => props.targetZoneOffset.left}px;
    scroll-padding-right: ${props => props.targetZoneOffset.right}px;

    & > li {
      scroll-snap-align: start;
    }
  }

  @media ${device._480} {
    & > li {
      margin: 0 ${space._16};
    }
  }

  @media ${device._768} {
    padding: ${space._96} 0;
  }
`;


const scrollSnapEnabled = isTouchscreen;

type OptionalHTMLElement = HTMLElement | undefined | null;

const getTiles = (container: OptionalHTMLElement) =>
  Array.from(container?.children ?? [])
    .filter(child => !child.hasAttribute('data-carousel-skip')) as HTMLElement[];

const getTile = (container: OptionalHTMLElement, num: number) => getTiles(container)[num];

const getTileTargetZoneOffsets = (container: HTMLElement) => {
  const tiles = getTiles(container);
  return getTargetZoneOffsets(container, tiles);
};

const getLeftMargin = (container: Element) => container.children[0];
const getRightMargin = (container: Element) => container.children[container.children.length - 1];


const scrollTileIntoView = (container: OptionalHTMLElement, num: number, smooth?: boolean) => {
  const tile = getTile(container, num);
  scrollIntoView(container, tile, smooth);
};

const pageLeft = (container: OptionalHTMLElement) => {
  if (!container) return;

  const targetOffset = getTileTargetZoneOffsets(container);
  const targetLeftEdge = targetZoneLeftEdge(container, targetOffset);

  const tiles = getTiles(container);
  const leftTiles = tiles
    .filter(tile => leftEdgeOffset(tile) < targetLeftEdge );

  const nextTile = leftTiles[leftTiles.length - 1];

  if (nextTile == null) {
    scrollTo(container, 0, true);
  } else if (scrollSnapEnabled()) {
    const projectedLeftEdge = projectTargetZoneLeftEdge(alignAtTargetZoneRightEdge(container, targetOffset, nextTile), targetOffset);
    const nextLeftTile = leftTiles.find(tile => leftEdgeOffset(tile) >= projectedLeftEdge) ?? nextTile;
    scrollTo(container, alignAtTargetZoneLeftEdge(container, targetOffset, nextLeftTile), true);
  } else {
    scrollTo(container, alignAtTargetZoneRightEdge(container, targetOffset, nextTile), true);
  }
};

const pageRight = (container: OptionalHTMLElement) => {
  if (!container) return;

  const targetOffset = getTileTargetZoneOffsets(container);
  const targetRightEdge = targetZoneRightEdge(container, targetOffset);

  const tiles = getTiles(container);
  const rightTiles = tiles
    .filter(tile => rightEdgeOffset(tile) > targetRightEdge);

  const nextTile = rightTiles[0];

  if (nextTile == null) {
    scrollTo(container, container.scrollWidth - container.clientWidth, true);
  } else {
    scrollTo(container, alignAtTargetZoneLeftEdge(container, targetOffset, nextTile), true);
  }
};


/* paging */
type PagingMethod = { pageLeft: (el: HTMLElement) => void; pageRight: (el: HTMLElement) => void };
const pageByVisibility = { pageLeft, pageRight };

const usePaging = (containerRef: RefObject<HTMLElement>, pagingMethod: PagingMethod) => {
  return {
    pageLeft: () => {
      if (!containerRef.current) return;
      pagingMethod.pageLeft(containerRef.current);
    },
    pageRight: () => {
      if (!containerRef.current) return;
      pagingMethod.pageRight(containerRef.current);
    }
  };
};

const usePageWithArrowKeys = (containerRef: RefObject<HTMLElement>, paging: PagingMethod) => {
  const onKeyDown: KeyboardEventHandler = (e) => {
    if (!containerRef.current) return;

    if (e.key === 'ArrowLeft') {
      paging.pageLeft(containerRef.current);
    } else if (e.key === 'ArrowRight') {
      paging.pageRight(containerRef.current);
    }
  };

  return { onKeyDown };
};


/* carousel */
type CarouselTileHookProps = {
  selected: number;
  onSelect: (nextSelected: number) => void;
};
const useCarouselTile = (containerRef: RefObject<HTMLElement>, { selected, onSelect }: CarouselTileHookProps) => {
  const scrollIntoView = useScrollFocusedIntoView(containerRef);

  const tileProps = (num: number) => ({
    className: num === selected ? 'selected' : '',
    onClick: () => {
      onSelect(num);
    },
    onFocus: scrollIntoView.onFocus
  });

  return tileProps;
};


/* layout */
const useScrollEdges = (containerRef: RefObject<HTMLElement>) => {
  const [onEdge, setOnEdge] = useState({ left: false, right: false });

  useIntersectionEffect(
    containerRef,
    getLeftMargin,
    { threshold: .99 },
    (entries) => {
      const lastEntry = entries[entries.length - 1];
      if (lastEntry.isIntersecting !== onEdge.left) {
        setOnEdge(prev => ({ ...prev, left: lastEntry.isIntersecting }));
      }
    }
  );

  useIntersectionEffect(
    containerRef,
    getRightMargin,
    { threshold: .99 },
    (entries) => {
      const lastEntry = entries[entries.length - 1];
      if (lastEntry.isIntersecting !== onEdge.right) {
        setOnEdge(prev => ({ ...prev, right: lastEntry.isIntersecting }));
      }
    }
  );

  return {
    ...onEdge,
    both: onEdge.left && onEdge.right
  };
};

const useTargetZone = (containerRef: RefObject<HTMLElement>) => {
  const [targetOffset, setTargetOffset] = useState({ left: 0, right: 0 });

  const onLayoutUpdate = () => {
    const newTargetOffset = containerRef.current
      ? getTileTargetZoneOffsets(containerRef.current)
      : { left: 0, right: 0 };

    if (newTargetOffset.left !== targetOffset.left || newTargetOffset.right !== targetOffset.right) {
      setTargetOffset(newTargetOffset);
    }
  };

  return [targetOffset, { onLayoutUpdate }] as const;
};


type HookProps = {
  selected: number;
  onSelect: (nextSelected: number) => void;
  numTiles: number;
};
const useCarousel = (containerRef: RefObject<HTMLElement>, { selected, onSelect, numTiles }: HookProps, layoutDeps: DependencyList) => {

  const pages = usePages(containerRef);
  const paging = usePaging(containerRef, pageByVisibility);
  const pageArrowKeys = usePageWithArrowKeys(containerRef, pageByVisibility);

  useScrollSelectedIntoView(containerRef, selected);
  const ssFix = useScrollSnapLoadingFix(containerRef, selected);
  const arrowKeys = useSelectWithArrowKeys(containerRef, { selected, onSelect, numTiles });

  const onEdge = useScrollEdges(containerRef);
  const [targetOffset, targetZone] = useTargetZone(containerRef);


  const layout = useLayoutChange(containerRef, () => {
    pages.onLayoutUpdate();
    targetZone.onLayoutUpdate();
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
      scrollContainer: {
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


type Props = {
  selected?: number,
  onSelect?: (nextSelected: number) => void,
  children?: ReactNode
} & Omit<HTMLAttributes<HTMLDivElement>, 'onSelect'>;

const Carousel = ({ selected = 0, onSelect = () => undefined, children, ...props }: Props): ReactElement => {
  const containerRef = useRef<HTMLUListElement>(null);

  const numTiles = React.Children.count(children);
  const carousel = useCarousel(containerRef, { selected, onSelect, numTiles }, [children]);

  return (
    <Container {...props}>
      <CarouselArrow {...carousel.props.arrow.left} />
      <ScrollContainer ref={containerRef} {...carousel.props.scrollContainer}>
        <Margin data-carousel-skip />
        {React.Children.map(children, (child, num) => (
          <li {...carousel.props.tile(num)}>
            {child}
          </li>
        ))}
        <Margin data-carousel-skip />
      </ScrollContainer>
      <CarouselArrow {...carousel.props.arrow.right} />
      <PageIndicator {...carousel.pages} />
    </Container>
  );
};

export default Carousel;
