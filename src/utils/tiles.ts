type OptionalHTMLElement = HTMLElement | undefined | null;

export const getTiles = (container: OptionalHTMLElement): HTMLElement[] =>
  Array.from(container?.children ?? [])
    .filter(child => !child.hasAttribute('data-carousel-skip')) as HTMLElement[];

export const getTile = (container: OptionalHTMLElement, num: number): HTMLElement | undefined => getTiles(container)[num];
