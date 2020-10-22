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

export const getFirstFocusableElement = (el: HTMLElement | undefined): HTMLElement | null | undefined => {
  if (el?.matches(focusable)) {
    return el;
  } else {
    return el?.querySelector(focusable);
  }
};


