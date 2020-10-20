import React, {
  ReactElement,
  ReactNode,
  RefObject,
  useRef
} from 'react';
import styled from 'styled-components';
import { useSelectOnFocus } from '../hooks/select/useSelectOnFocus';
import { useSelectWithArrowKeys } from '../hooks/select/useSelectWithArrowKeys';
import { useKeepSelectedTileInView } from '../hooks/scroll/useKeepTileInView';

const Container = styled.div`
  overflow: hidden;

  display: flex;
  flex-direction: row;
  align-items: stretch;

  & > * {
    flex: 0 0 auto;
  }
`;

type HookProps = {
  selected: number;
  onSelect: (nextSelected: number) => void;
  numTiles: number;
};

const useSingleCarousel = (containerRef: RefObject<HTMLElement>, props: HookProps) => {
  useKeepSelectedTileInView(containerRef, props.selected);
  const focusProps = useSelectOnFocus(containerRef, props.onSelect);
  const keyProps = useSelectWithArrowKeys(containerRef, props);

  return {
    props: {
      ...focusProps,
      ...keyProps
    }
  };
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

  const numTiles = React.Children.count(children);
  const carousel = useSingleCarousel(containerRef, { selected, onSelect, numTiles });

  return (
    <Container ref={containerRef} {...carousel.props}>
      {children}
    </Container>
  );
};

export default SingleCarousel;
