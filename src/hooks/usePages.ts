import React, { useState } from 'react';
import {
  scrollPosition,
  leftEdgeOffset,
  rightEdgeOffset,
  getTargetZoneOffsets,
  TargetZoneOffsets
} from '../utils/layout';
import { getTiles } from '../utils/tiles';


const getRawStartPoints = (tiles: HTMLElement[], targetWidth: number, targetOffset: TargetZoneOffsets, maxPosition: number): number[] => {
  if (tiles.length < 1) {
    return [];
  }

  const unboundedNextStart = leftEdgeOffset(tiles[0]) - targetOffset.left;
  const nextStart = Math.min(unboundedNextStart, maxPosition);

  const projectedTargetRightEdge = nextStart + targetOffset.left + targetWidth;
  const offPageTiles = tiles.slice(1).filter(tile => rightEdgeOffset(tile) > projectedTargetRightEdge);

  return [nextStart, ...getRawStartPoints(offPageTiles, targetWidth, targetOffset, maxPosition)];
};

const getRawEndPoints = (tiles: HTMLElement[], targetWidth: number, targetOffset: TargetZoneOffsets, minPosition: number): number[] => {
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

const getScaledWeightedAverage = (list1: number[], list2: number[], leftRatio: number, rightRatio: number) => {
  if (list1.length === 0) {
    return [];
  } else if (list1.length === 1) {
    const ratio = (leftRatio + rightRatio) / 2;
    return [list1[0] * (1 - ratio) + list2[0] * ratio];
  }

  const total = list1.length - 1;
  const progress = (n: number) => n / total;
  const ratio = (n: number) => (1 - progress(n)) * leftRatio + progress(n) * rightRatio;
  return list1.map((item1, i) => (item1 * (1 - ratio(i)) + list2[i] * ratio(i)));
};

const getCurrentPage = (currentPosition: number, pageSplitPoints: number[]) => {
  const pageIndex = pageSplitPoints.findIndex(splitPoint => currentPosition < splitPoint);
  return pageIndex === -1 ? pageSplitPoints.length + 1 : pageIndex + 1;
};


type PagePoints = number[] | undefined;

const calculatePagePoints = (container: HTMLElement): PagePoints => {
  const tiles = getTiles(container);
  const targetOffset = getTargetZoneOffsets(container, tiles);
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


const calculatePages = (container: HTMLElement, pagePoints: PagePoints) => {
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

export interface Pages {
  total: number;
  current: number;
}

type usePagesResult = Pages & {
  onLayoutUpdate: () => void;
  onScroll: () => void;
};

export const usePages = (containerRef: React.RefObject<HTMLElement>): usePagesResult => {
  const [pagePoints, setPagePoints] = useState<PagePoints>(undefined);
  const [pages, setPages] = useState({ current: 0, total: 0 });

  const updatePagePoints = () => {
    const newPagePoints = containerRef.current
      ? calculatePagePoints(containerRef.current)
      : undefined;

    setPagePoints(newPagePoints);
    return pagePoints;
  };

  const updatePages = (pagePnts: PagePoints) => {
    if (!containerRef.current) return;
    const container = containerRef.current;

    const newPages = calculatePages(container, pagePnts);
    if (newPages.current !== pages.current || newPages.total !== pages.total) {
      setPages(newPages);
    }
  };

  const onLayoutUpdate = () => {
    const newPagePoints = updatePagePoints();
    updatePages(newPagePoints);
  };

  const onScroll = () => {
    updatePages(pagePoints);
  };

  return {
    ...pages,
    onLayoutUpdate,
    onScroll
  };
};


interface IndicatorProps {
  key: string;
  num: number;
  className: string;
}

export const usePageIndicator = (pages: Pages): IndicatorProps[] =>
  [...Array(pages.total)].map((_, num) => ({
    key: `page-${num}`,
    num,
    current: num + 1 === pages.current,
    className: num + 1 === pages.current ? 'lwc-current' : ''
  }));
