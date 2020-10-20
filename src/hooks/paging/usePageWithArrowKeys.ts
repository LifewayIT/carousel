import { KeyboardEventHandler, RefObject } from 'react';
import { PagingStrategy } from './strategies/common';

type usePageWithArrowKeys = (containerRef: RefObject<HTMLElement>, pagingStrategy: PagingStrategy) =>
  { onKeyDown: KeyboardEventHandler };

export const usePageWithArrowKeys: usePageWithArrowKeys = (containerRef, pagingStrategy) => {
  const onKeyDown: KeyboardEventHandler = (e) => {
    if (!containerRef.current) return;

    if (e.key === 'ArrowLeft') {
      pagingStrategy.pageLeft(containerRef.current);
    } else if (e.key === 'ArrowRight') {
      pagingStrategy.pageRight(containerRef.current);
    }
  };

  return { onKeyDown };
};
