import React, {
  FocusEventHandler,
  KeyboardEventHandler,
  ReactElement,
  ReactNode,
  useLayoutEffect,
  useRef
} from 'react';
import styled from 'styled-components';
import { useResizeEffect } from '../hooks/layout';
import {
  alignAtCenter,
  getFirstFocusableElement,
  scrollTo
} from './utils';

const Container = styled.div`
  overflow: hidden;

  display: flex;
  flex-direction: row;
  align-items: stretch;

  & > * {
    flex: 0 0 auto;
  }
`;

const getTiles = (container: HTMLElement) => Array.from(container.children) as HTMLElement[];
const getTile = (container: HTMLElement, num: number): HTMLElement | undefined => getTiles(container)[num];

const scrollIntoView = (container: HTMLElement | undefined, el: HTMLElement | undefined, smooth = true) => {
  if (!container || !el) return;

  scrollTo(container, alignAtCenter(container, el), smooth);
};


type Props = {
  /** the index of the child that is currently selected. defaults to 0 */
  selected?: number;
  /** handler for when a child is selected */
  onSelect?: (nextSelected: number) => void;
  /** the children to render */
  children?: ReactNode;
};

const SingleCarousel = ({ selected = 0, onSelect = () => undefined, children }: Props): ReactElement => {
  const containerRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    if (!containerRef.current) return;
    const container = containerRef.current;

    const selectedTile = getTile(container, selected);

    scrollIntoView(container, selectedTile);
  }, [selected]);

  useResizeEffect(containerRef, () => {
    if (!containerRef.current) return;
    scrollIntoView(containerRef.current, getTile(containerRef.current, selected), false);
  });

  const scrollFocusedElementIntoView: FocusEventHandler = (evt) => {
    if (!containerRef.current) return;
    const container = containerRef.current;

    const tiles = getTiles(container);
    const focusedNum = tiles.findIndex(tile => tile.contains(evt.target));

    scrollIntoView(container, tiles[focusedNum]);
    onSelect(focusedNum);
  };

  const onKeyDown: KeyboardEventHandler = (e) => {
    const container = containerRef.current;
    if (e.key === 'ArrowLeft') {
      const prev = Math.max(selected - 1, 0);
      onSelect(prev);

      if (container) {
        getFirstFocusableElement(getTile(container, prev))?.focus();
      }
    } else if (e.key === 'ArrowRight') {
      const next = Math.min(selected + 1, React.Children.count(children) - 1);
      onSelect(next);

      if (container) {
        getFirstFocusableElement(getTile(container, next))?.focus();
      }
    }
  };

  return (
    <Container ref={containerRef} onFocus={scrollFocusedElementIntoView} onKeyDown={onKeyDown}>
      {children}
    </Container>
  );
};

export default SingleCarousel;
