import {
  alignAtTargetZoneLeftEdge,
  alignAtTargetZoneRightEdge,
  getTileTargetZoneOffsets,
  leftEdgeOffset,
  projectTargetZoneLeftEdge,
  rightEdgeOffset,
  targetZoneLeftEdge,
  targetZoneRightEdge
} from '../../../utils/layout';
import { scrollTo } from '../../../utils/scroll';
import { getTiles } from '../../../utils/tiles';
import { PagingStrategy } from './common';


const scrollSnapEnabled = (container: HTMLElement): boolean => {
  const snapRule = getComputedStyle(container).getPropertyValue('scroll-snap-type') ?? 'none';

  return snapRule !== 'none';
};

const pageLeft = (container: HTMLElement): void => {
  const targetOffset = getTileTargetZoneOffsets(container);
  const targetLeftEdge = targetZoneLeftEdge(container, targetOffset);

  const tiles = getTiles(container);
  const leftTiles = tiles
    .filter(tile => leftEdgeOffset(tile) < targetLeftEdge );

  const nextTile = leftTiles[leftTiles.length - 1];

  if (nextTile == null) {
    scrollTo(container, 0, true);
  } else if (scrollSnapEnabled(container)) {
    const projectedLeftEdge = projectTargetZoneLeftEdge(alignAtTargetZoneRightEdge(container, targetOffset, nextTile), targetOffset);
    const nextLeftTile = leftTiles.find(tile => leftEdgeOffset(tile) >= projectedLeftEdge) ?? nextTile;
    scrollTo(container, alignAtTargetZoneLeftEdge(container, targetOffset, nextLeftTile), true);
  } else {
    scrollTo(container, alignAtTargetZoneRightEdge(container, targetOffset, nextTile), true);
  }
};

const pageRight = (container: HTMLElement): void => {
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

export const pageByVisibility: PagingStrategy = { pageLeft, pageRight };
