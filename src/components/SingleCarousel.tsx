import React, {
  HTMLAttributes,
  ReactElement,
  ReactNode,
  useRef
} from 'react';
import styled from 'styled-components';
import { useSingleCarousel } from '../hooks/carousel/useSingleCarousel';


type Props = {
  /** the index of the child that is currently selected. defaults to 0 */
  selected?: number;
  /** handler for when a child is selected */
  onSelect?: (nextSelected: number) => void;
  /** the children to render */
  children?: ReactNode;
} & HTMLAttributes<HTMLDivElement>;

export const SingleCarousel = ({ selected = 0, onSelect = () => undefined, children, className, ...props }: Props): ReactElement => {
  const containerRef = useRef<HTMLDivElement>(null);

  const numTiles = React.Children.count(children);
  const carousel = useSingleCarousel(containerRef, { selected, onSelect, numTiles });

  return (
    <Container {...props} ref={containerRef} className={`lwc-single-carousel ${className}`} {...carousel.props}>
      {children}
    </Container>
  );
};


const Container = styled.div`
  overflow: hidden;

  display: flex;
  flex-direction: row;
  align-items: stretch;

  & > * {
    flex: 0 0 auto;
  }
`;
