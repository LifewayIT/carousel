import { RefObject, useState } from 'react';
import { useIntersectionEffect } from './useIntersectionEffect';

const getLeftTarget = (container: Element) => container.children[0];
const getRightTarget = (container: Element) => container.children[container.children.length - 1];

export interface ScrollEdges {
  left: boolean;
  right: boolean;
  both: boolean;
}

export const useScrolledToEdge = (containerRef: RefObject<HTMLElement>): ScrollEdges => {
  const [onEdge, setOnEdge] = useState({ left: false, right: false });

  useIntersectionEffect(
    containerRef,
    getLeftTarget,
    { threshold: .99 },
    (entries) => {
      const lastEntry = entries[entries.length - 1];
      if (lastEntry.isIntersecting !== onEdge.left) {
        setOnEdge(prev => ({ ...prev, left: lastEntry.isIntersecting }));
      }
    }
  );

  useIntersectionEffect(
    containerRef,
    getRightTarget,
    { threshold: .99 },
    (entries) => {
      const lastEntry = entries[entries.length - 1];
      if (lastEntry.isIntersecting !== onEdge.right) {
        setOnEdge(prev => ({ ...prev, right: lastEntry.isIntersecting }));
      }
    }
  );

  return {
    ...onEdge,
    both: onEdge.left && onEdge.right
  };
};
