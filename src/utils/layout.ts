import { getTiles } from './tiles';

/*
  scrollLeft is a decimal on some browsers/devices
  rounding it to an integer avoids some nefarious edge cases
*/
export const scrollPosition = (el: HTMLElement): number => Math.round(el.scrollLeft);

/*
  an elements position relative to its parent's containing box
*/

export const leftEdgeOffset = (el: HTMLElement): number => el.offsetLeft;

export const rightEdgeOffset = (el: HTMLElement): number => el &&
  (el.offsetLeft + el.offsetWidth);

export const centerOffset = (el: HTMLElement): number => el &&
  (el.offsetLeft + el.offsetWidth / 2);



/*
  the target zone is a subsection of the container's visible area
  (in this case, the area between the forward & back arrow buttons)
*/
export interface TargetZoneOffsets {
  left: number;
  right: number;
}

export const getTargetZoneOffsets = (container: HTMLElement, meaningfulChildren: HTMLElement[]): TargetZoneOffsets => {
  const first = meaningfulChildren[0];
  const last = meaningfulChildren[meaningfulChildren.length - 1];

  return {
    left: leftEdgeOffset(first) ?? 0,
    right: container.scrollWidth - (rightEdgeOffset(last) ?? 0)
  };
};

export const getTileTargetZoneOffsets = (container: HTMLElement): TargetZoneOffsets => {
  const tiles = getTiles(container);
  return getTargetZoneOffsets(container, tiles);
};

export const targetZoneLeftEdge = (container: HTMLElement, targetOffset: TargetZoneOffsets): number =>
  scrollPosition(container) + targetOffset.left;

export const targetZoneRightEdge = (container: HTMLElement, targetOffset: TargetZoneOffsets): number =>
  scrollPosition(container) + container.clientWidth - targetOffset.right;

export const projectTargetZoneLeftEdge = (scrollPosition: number, targetOffset: TargetZoneOffsets): number =>
  scrollPosition + targetOffset.left;


/*
  the position the container should be scrolled to to align it
  as requested with the given element
*/

export const alignAtTargetZoneLeftEdge = (container: HTMLElement, targetOffset: TargetZoneOffsets, el: HTMLElement): number =>
  leftEdgeOffset(el) - targetOffset.left;

export const alignAtTargetZoneRightEdge = (container: HTMLElement, targetOffset: TargetZoneOffsets, el: HTMLElement): number =>
  rightEdgeOffset(el) + targetOffset.right - container.clientWidth;

export const alignAtCenter = (container: HTMLElement, el: HTMLElement): number =>
  centerOffset(el) - container.clientWidth / 2;



