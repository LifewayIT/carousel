import React, { useRef, useLayoutEffect } from 'react';
import styled from 'styled-components';
import {
  alignAtCenter,
  getFirstFocusableElement,
  scrollTo
} from './utils';
import { useResizeEffect } from '../hooks/layout';

const Container = styled.div`
  overflow: hidden;

  display: flex;
  flex-direction: row;
  align-items: stretch;

  & > * {
    flex: 0 0 auto;
  }
`;

const getTiles = container => Array.from(container.children);
const getTile = (container, num) => getTiles(container)[num]

const scrollIntoView = (container, el, smooth = true) => {
  if (!container || !el) return;

  scrollTo(container, alignAtCenter(container, el), smooth);
}



const SingleCarousel = ({ selected, onSelect, children }) => {
  const containerRef = useRef();
  
  useLayoutEffect(() => {
    if (!containerRef.current) return;
    const container = containerRef.current;

    const selectedTile = getTile(container, selected);

    scrollIntoView(container, selectedTile);
  }, [selected]);

  useResizeEffect(containerRef, () => {
    scrollIntoView(containerRef.current, getTile(containerRef.current, selected), false);
  });

  const scrollFocusedElementIntoView = (evt) => {
    if (!containerRef.current) return;
    const container = containerRef.current;

    const tiles = getTiles(container);
    const focusedNum = tiles.findIndex(tile => tile.contains(evt.target));

    scrollIntoView(container, tiles[focusedNum]);
    onSelect(focusedNum);
  };

  const onKeyDown = (e) => {
    const container = containerRef.current;
    if (e.key === 'ArrowLeft') {
      const prev = Math.max(selected - 1, 0);
      onSelect(prev);
      getFirstFocusableElement(getTile(container, prev))?.focus();
    } else if (e.key === 'ArrowRight') {
      const next = Math.min(selected + 1, React.Children.count(children) - 1);
      onSelect(next);
      getFirstFocusableElement(getTile(container, next))?.focus();
    }
  };

  return (
    <Container ref={containerRef} onFocus={scrollFocusedElementIntoView} onKeyDown={onKeyDown}>
      {children}
    </Container>
  );
};

export default SingleCarousel;
