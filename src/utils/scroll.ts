import { prefersReducedMotion, supportsSmoothScroll } from './featureQueries';
import { scrollPosition } from './layout';

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

