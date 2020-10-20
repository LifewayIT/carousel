export interface PagingStrategy {
  pageLeft: (el: HTMLElement) => void;
  pageRight: (el: HTMLElement) => void;
}
