/*
  scrollLeft is a decimal on some browsers/devices
  rounding it to an integer avoids some nefarious edge cases
*/
export const scrollPosition = el => Math.round(el.scrollLeft);

/*
  an elements position relative to its parent's containing box
*/

export const leftEdgeOffset = el => el?.offsetLeft;

export const rightEdgeOffset = el => el &&
  (el.offsetLeft + el.offsetWidth);

export const centerOffset = (el) => el &&
  (el.offsetLeft + el.offsetWidth / 2);



/*
  the target zone is a subsection of the container's visible area
  (in this case, the area between the forward & back arrow buttons)
*/

export const getTargetZoneOffsets = (container, meaningfulChildren) => {
    const first = meaningfulChildren[0];
    const last = meaningfulChildren[meaningfulChildren.length - 1];

    return {
      left: leftEdgeOffset(first) ?? 0,
      right: container.scrollWidth - (rightEdgeOffset(last) ?? 0)
    }
  };

export const targetZoneLeftEdge = (container, targetOffset) =>
  scrollPosition(container) + targetOffset.left;

export const targetZoneRightEdge = (container, targetOffset) =>
  scrollPosition(container) + container.clientWidth - targetOffset.right

export const projectTargetZoneLeftEdge = (scrollPosition, targetOffset) =>
  scrollPosition + targetOffset.left; 


/*
  the position the container should be scrolled to to align it
  as requested with the given element 
*/

export const alignAtTargetZoneLeftEdge = (container, targetOffset, el) =>
  leftEdgeOffset(el) - targetOffset.left;

export const alignAtTargetZoneRightEdge = (container, targetOffset, el) =>
  rightEdgeOffset(el) + targetOffset.right - container.clientWidth;

export const alignAtCenter = (container, el) =>
  centerOffset(el) - container.clientWidth / 2;


/*
  finds the first element that is focusable by tabbing to it
  (the provided element or a child)
*/
const focusable = [
  'button',
  'a[href]',
  'area[href]',
  'input',
  'select',
  'textarea',
  '[contenteditable=true]',
  'iframe',
  'object',
  'embed',
  '[tabindex]'
]
  .map(selector => `${selector}:not([disabled]):not([tabindex="-1"])`)
  .join(', ');

export const getFirstFocusableElement = (el) => {
  if (el?.matches(focusable)) {
    return el;
  } else {
    return el?.querySelector(focusable);
  }
}


/*
  browser support & media queries
*/
export const supportsSmoothScroll = 'scroll-behavior' in document.documentElement.style;
export const prefersReducedMotion = () => !window.matchMedia('(prefers-reduced-motion: no-preference)').matches;
export const isTouchscreen = () => window.matchMedia('(hover: none), (hover: on-demand)').matches;

/*
  scroll the element (horizontally) to the specified position, optionally doing it smoothly
  uses fallbacks if browser doesn't support el.scrollTo() or smooth scrolling
*/
export const scrollTo = (el, position, smooth) => {
  if (scrollPosition(el) === position) return;

  if (smooth && !prefersReducedMotion()) {
    scrollToSmooth(el, position);
  } else {
    scrollToImmediate(el, position);
  }

};
const scrollToImmediate = (el, position) => {
  if (el.scrollTo) {
    el.scrollTo({ left: position, behavior: 'auto' });
  } else {
    el.scrollLeft = position;
  }
};

const scrollToSmooth = (el, position) => {
  if (el.scrollTo && supportsSmoothScroll) {
    el.scrollTo({ left: position, behavior: 'smooth' });
  } else {
    fallbackSmoothScroll(el, position);
  }
};


/*
  a fallback for manually smooth scrolling
*/

const ease = x => 0.5 * (1 - Math.cos(Math.PI * x)); 

const DURATION = 500;

const fallbackSmoothScroll = (el, position) => {
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


