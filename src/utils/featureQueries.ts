
/*
  browser support & media queries
*/
export const supportsSmoothScroll = (): boolean => 'scroll-behavior' in document.documentElement.style;
export const prefersReducedMotion = (): boolean => !window.matchMedia('(prefers-reduced-motion: no-preference)').matches;
export const isTouchscreen = (): boolean => window.matchMedia('(hover: none), (hover: on-demand)').matches;

/*
  browser features to enable/disable
*/
export const scrollSnapEnabled = isTouchscreen;
