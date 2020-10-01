import React, { useRef, useLayoutEffect, useState } from 'react';
import styled from 'styled-components';
import CarouselArrow from './CarouselArrow';
import {
  scrollPosition,
  leftEdgeOffset,
  rightEdgeOffset,
  targetZoneLeftEdge,
  targetZoneRightEdge,
  alignAtTargetZoneLeftEdge,
  alignAtTargetZoneRightEdge,
  getTargetZoneOffsets,
  getFirstFocusableElement,
  scrollTo,
  isTouchscreen,
  projectTargetZoneLeftEdge,
  alignAtCenter
} from './utils';
import {
  useResizeEffect,
  useIntersectionEffect,
  useIsInitialLayoutEffect
} from '../hooks/layout';
import { device, space, color } from '../utils/styleguide';


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

const ScrollContainer = styled.ul`
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

const DotContainer = styled.div`
  position: absolute;
  bottom: ${space._16};
  left: 0;
  right: 0;

  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;

  & > * {
    margin: 0 ${space._4};
  }

  @media ${device._768} {
    bottom: ${space._48};
  }
`;

const Dot = styled.div`
  width: ${space._8};
  height: ${space._8};

  border-radius: 50%;
  background-color: ${color.gray600};

  opacity: ${props => props.active ? '1' : '.325'};
`;

const scrollSnapEnabled = isTouchscreen;

const getTiles = container =>
  Array.from(container?.children ?? [])
    .filter(child => !child.hasAttribute('data-carousel-skip'));

const getTile = (container, num) => getTiles(container)[num];

const getTileTargetZoneOffsets = (container) => {
  const tiles = getTiles(container);
  return getTargetZoneOffsets(container, tiles);
};

const getLeftMargin = (container) => container.children[0];
const getRightMargin = (container) => container.children[container.children.length - 1];


const scrollIntoView = (container, tile, smooth = true) => {
  if (!container || !tile) return;

  const targetOffset = getTileTargetZoneOffsets(container);

  const isTooFarLeft = leftEdgeOffset(tile) < targetZoneLeftEdge(container, targetOffset);
  const isTooFarRight = rightEdgeOffset(tile) > targetZoneRightEdge(container, targetOffset);

  if (isTooFarLeft) {
    scrollTo(container, alignAtTargetZoneLeftEdge(container, targetOffset, tile), smooth);
  } else if (isTooFarRight && !scrollSnapEnabled()) {
    scrollTo(container, alignAtTargetZoneRightEdge(container, targetOffset, tile), smooth);
  } else if (isTooFarRight && scrollSnapEnabled()) {
    const tiles = getTiles(container);
    const projectedLeftEdge = projectTargetZoneLeftEdge(alignAtTargetZoneRightEdge(container, targetOffset, tile), targetOffset);
    const nextLeftTile = tiles.find(tile => leftEdgeOffset(tile) >= projectedLeftEdge) ?? tile;
    scrollTo(container, alignAtTargetZoneLeftEdge(container, targetOffset, nextLeftTile), true);
  }
}

const scrollTileIntoView = (container, num, smooth) => {
  const tile = getTile(container, num);
  scrollIntoView(container, tile, smooth);
};

const scrollTileToCenter = (container, num, smooth = true) => {
  const tile = getTile(container, num);
  if (!container || !tile) return;

  scrollTo(container, alignAtCenter(container, tile), smooth)
};

const pageLeft = (container) => {
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

const pageRight = (container) => {
  if (!container) return;

  const targetOffset = getTileTargetZoneOffsets(container);
  const targetRightEdge = targetZoneRightEdge(container, targetOffset)

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

const getRawStartPoints = (tiles, targetWidth, targetOffset, maxPosition) => {
  if (tiles.length < 1) {
    return [];
  }

  const unboundedNextStart = leftEdgeOffset(tiles[0]) - targetOffset.left; 
  const nextStart = Math.min(unboundedNextStart, maxPosition);

  const projectedTargetRightEdge = nextStart + targetOffset.left + targetWidth;
  const offPageTiles = tiles.slice(1).filter(tile => rightEdgeOffset(tile) > projectedTargetRightEdge);

  return [nextStart, ...getRawStartPoints(offPageTiles, targetWidth, targetOffset, maxPosition)];
};

const getRawEndPoints = (tiles, targetWidth, targetOffset, minPosition) => {
  if (tiles.length < 1) {
    return [];
  }

  const unboundedNextEnd = rightEdgeOffset(tiles[tiles.length - 1]) - targetOffset.left; 
  const nextEnd = Math.max(unboundedNextEnd, minPosition);

  const projectedTargetLeftEdge = nextEnd + targetOffset.left - targetWidth;
  const nextPagePoint = projectedTargetLeftEdge - targetOffset.left;
  const offPageTiles = tiles.slice(0, -1).filter(tile => leftEdgeOffset(tile) < projectedTargetLeftEdge);

  return [...getRawEndPoints(offPageTiles, targetWidth, targetOffset, minPosition), nextPagePoint];
};

const getScaledWeightedAverage = (list1, list2, leftRatio, rightRatio) => {
  const total = list1.length - 1;
  const progress = (n) => n / total;
  const ratio = (n) => (1 - progress(n)) * leftRatio + progress(n) * rightRatio;
  return list1.map((item1, i) => (item1 * (1 - ratio(i)) + list2[i] * ratio(i)));
};

const getCurrentPage = (currentPosition, pageSplitPoints) => {
  const pageIndex = pageSplitPoints.findIndex(splitPoint => currentPosition < splitPoint);
  return pageIndex === -1 ? pageSplitPoints.length + 1 : pageIndex + 1;
};


const calculatePagePoints = (container) => {
  const tiles = getTiles(container);
  const targetOffset = getTileTargetZoneOffsets(container);
  const targetZoneWidth = container.clientWidth - targetOffset.left - targetOffset.right;

  if (targetZoneWidth === 0) {
    return undefined;
  }

  const maxPosition = container.scrollWidth - container.clientWidth;
  const rawStartPoints = getRawStartPoints(tiles, targetZoneWidth, targetOffset, maxPosition);

  const minPosition = targetZoneWidth;
  const rawEndPoints = getRawEndPoints(tiles, targetZoneWidth, targetOffset, minPosition);

  const pagePoints = getScaledWeightedAverage(rawEndPoints.slice(1), rawStartPoints.slice(0, -1), 0, .5);

  return pagePoints;
};


const calculatePages = (container, pagePoints) => {
  if (pagePoints === undefined) {
    return { total: 0, current: 0 };
  }

  const numberOfPages = pagePoints.length + 1;
  const currentPosition = scrollPosition(container);
  const currentPage = getCurrentPage(currentPosition, pagePoints); 

  return {
    total: numberOfPages,
    current: currentPage,
  };
};


const Carousel = ({ selected, onSelect, children, ...props }) => {
  const containerRef = useRef();
  const [targetOffset, setTargetOffset] = useState({ left: 0, right: 0 });
  const [onEdge, setOnEdge] = useState({ left: false, right: false });
  const noScroll = onEdge.left && onEdge.right;

  const [pagePoints, setPagePoints] = useState(undefined);
  const [pages, setPages] = useState({ current: 0, total: 0 });

  const updatePagePoints = () => {
    const newPagePoints = calculatePagePoints(containerRef.current);
    setPagePoints(newPagePoints);
    return pagePoints;
  };

  const updatePages = (pagePnts) => {
    if (!containerRef.current) return;
    const container = containerRef.current;
    const newPages = calculatePages(container, pagePnts);
    if (newPages.current !== pages.current || newPages.total !== pages.total) {
      setPages(newPages);
    }
  }

  const updateTargetZoneOffset = () => {
    if (!containerRef.current) return;
    const container = containerRef.current;
    const newTargetOffset = getTileTargetZoneOffsets(container);
    if (newTargetOffset.left !== targetOffset.left || newTargetOffset.right !== targetOffset.right) {
      setTargetOffset(newTargetOffset);
    }
  };

  const updateLayoutProperties = () => {
    const newPagePoints = updatePagePoints();
    updatePages(newPagePoints);
    updateTargetZoneOffset();
  };


  useIsInitialLayoutEffect((isInitial) => {
    if (isInitial) {
      scrollTileToCenter(containerRef.current, selected, false);
    } else {
      scrollTileIntoView(containerRef.current, selected);
    }
  }, [selected]);

  useLayoutEffect(() => {
    updateLayoutProperties();
  }, [children]);

  useResizeEffect(containerRef, () => {
    updateLayoutProperties();
  });

  const onLoad = () => {
    updateLayoutProperties();

    /* scroll-snapping on chrome jumps to random position in list when images load */
    scrollTileToCenter(containerRef.current, selected, false);
  };

  const onScroll = () => {
    updatePages(pagePoints);
  };

  const arrowKeyDown = (e) => {
    if (e.key === 'ArrowLeft') {
      pageLeft(containerRef.current);
    } else if (e.key === 'ArrowRight') {
      pageRight(containerRef.current);
    }
  };

  const scrollKeyDown = (e) => {
    const container = containerRef.current;
    if (e.key === 'ArrowLeft') {
      e.preventDefault();

      const prev = Math.max(selected - 1, 0);
      onSelect(prev);
      getFirstFocusableElement(getTile(container, prev))?.focus();
    } else if (e.key === 'ArrowRight') {
      e.preventDefault();

      const next = Math.min(selected + 1, React.Children.count(children) - 1);
      onSelect(next);
      getFirstFocusableElement(getTile(container, next))?.focus();
    }
  };

  const tileProps = (num) => ({
    className: num === selected ? `selected` : '',
    onClick: () => {
      onSelect(num);
    },
    onFocus: () => {
      scrollTileIntoView(containerRef.current, num);
    },
  });

  useIntersectionEffect(
    containerRef,
    getLeftMargin,
    { threshold: .99 },
    (entries) => {
      const lastEntry = entries[entries.length - 1];
      if (lastEntry.isIntersecting !== onEdge.left) {
        setOnEdge(prev => ({ ...prev, left: lastEntry.isIntersecting }))
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
        setOnEdge(prev => ({ ...prev, right: lastEntry.isIntersecting }))
      }
    }
  );

  return (
    <Container {...props}>
      <CarouselArrow
        left
        hide={noScroll}
        disabled={onEdge.left}
        onClick={() => pageLeft(containerRef.current)}
        onKeyDown={arrowKeyDown}
      />
      <ScrollContainer
        ref={containerRef}
        onKeyDown={scrollKeyDown}
        onScroll={onScroll}
        onLoad={onLoad}
        targetZoneOffset={targetOffset}
      >
        <Margin data-carousel-skip />
        {React.Children.map(children, (child, num) => (
          <li {...tileProps(num)}>
            {child}
          </li>
        ))}
        <Margin data-carousel-skip />
      </ScrollContainer>
      <CarouselArrow
        right
        hide={noScroll}
        disabled={onEdge.right}
        onClick={() => pageRight(containerRef.current)}
        onKeyDown={arrowKeyDown}
      />
      <DotContainer>
        {[...Array(pages.total)].map((_, num) => (
          <Dot key={`page-${num}`} active={num + 1 === pages.current} />
        ))}
      </DotContainer>
    </Container>
  );
};

export default Carousel;