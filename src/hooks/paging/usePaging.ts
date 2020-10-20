import { RefObject } from 'react';
import { PagingStrategy } from './strategies/common';

export interface Paging {
  pageLeft: () => void;
  pageRight: () => void;
}

export const usePaging = (containerRef: RefObject<HTMLElement>, pagingStrategy: PagingStrategy): Paging => {
  return {
    pageLeft: () => {
      if (!containerRef.current) return;
      pagingStrategy.pageLeft(containerRef.current);
    },
    pageRight: () => {
      if (!containerRef.current) return;
      pagingStrategy.pageRight(containerRef.current);
    }
  };
};
