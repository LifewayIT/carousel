import { scrollSnapEnabled, prefersReducedMotion, supportsSmoothScroll } from './featureQueries';
import { alignAtCenter, alignAtTargetZoneLeftEdge, alignAtTargetZoneRightEdge, getTileTargetZoneOffsets, leftEdgeOffset, projectTargetZoneLeftEdge, rightEdgeOffset, scrollPosition, targetZoneLeftEdge, targetZoneRightEdge } from './layout';
import { getTiles } from './tiles';

type OptionalHTMLElement = HTMLElement | undefined | null;

/*
  a fallback for manually smooth scrolling
*/

const ease = (x: number) => 0.5 * (1 - Math.cos(Math.PI * x));

const DURATION = 500;

const fallbackSmoothScroll = (el: HTMLElement, position: number) => {
  const start = el.scrollLeft;
  const end = position;
  const distance = end - start;

  const startTime = performance.now();

  const scrollStep = () => {
    const currentTime = performance.now();

    // add a max speed? increase time proportially to the distance??
    const elapsed = Math.min(1, (currentTime - startTime) / DURATION);
    const progress = ease(elapsed);

    const currentPosition = start + distance * progress;
    el.scrollLeft = currentPosition;

    if (currentPosition !== end) {
      requestAnimationFrame(scrollStep);
    }
  };

  scrollStep();
};


/*
  scroll the element (horizontally) to the specified position
  uses fallbacks if browser doesn't support el.scrollTo() or smooth scrolling
*/
const scrollToImmediate = (el: HTMLElement, position: number) => {
  if (el.scrollTo) {
    el.scrollTo({ left: position, behavior: 'auto' });
  } else {
    el.scrollLeft = position;
  }
};

const scrollToSmooth = (el: HTMLElement, position: number) => {
  if (el.scrollTo && supportsSmoothScroll()) {
    el.scrollTo({ left: position, behavior: 'smooth' });
  } else {
    fallbackSmoothScroll(el, position);
  }
};

/*
  scroll the element (horizontally) to the specified position, optionally doing it smoothly
  uses fallbacks if browser doesn't support el.scrollTo() or smooth scrolling
*/
export const scrollTo = (el: HTMLElement, position: number, smooth: boolean): void => {
  if (scrollPosition(el) === position) return;

  if (smooth && !prefersReducedMotion()) {
    scrollToSmooth(el, position);
  } else {
    scrollToImmediate(el, position);
  }
};


/*
  scroll the element (horizontally) so that the target element is centered (or as close to) in the container
*/
export const scrollToCenter = (container: OptionalHTMLElement, target: OptionalHTMLElement, smooth = true): void => {
  if (!container || !target) return;

  scrollTo(container, alignAtCenter(container, target), smooth);
};

/*
  scroll the element (horizontally) so that the target is entirely visibile
*/
export const scrollIntoView = (container: OptionalHTMLElement, tile: OptionalHTMLElement, smooth = true): void => {
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
};
