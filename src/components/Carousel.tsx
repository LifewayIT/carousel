import React, {
  useRef,
  ReactNode,
  HTMLAttributes,
  ReactElement,
} from 'react';
import styled from 'styled-components';
import { CarouselArrow } from './CarouselArrow';
import { device, space } from '../utils/styleguide';
import { PageIndicator } from './PageIndicator';
import { TargetZoneOffsets } from '../utils/layout';
import { useCarousel } from '../hooks/carousel/useCarousel';
import { cn } from '../utils/classnames';


type Props = {
  selected?: number,
  onSelect?: (nextSelected: number) => void,
  children?: ReactNode
} & Omit<HTMLAttributes<HTMLDivElement>, 'onSelect'>;

export const Carousel = ({ selected = 0, onSelect = () => undefined, children, className, ...props }: Props): ReactElement => {
  const containerRef = useRef<HTMLUListElement>(null);

  const numTiles = React.Children.count(children);
  const carousel = useCarousel(containerRef, { selected, onSelect, numTiles }, [children]);

  return (
    <Container {...props} className={cn('lwc-carousel', className)}>
      <CarouselArrow {...carousel.props.arrow.left} />
      <ScrollContainer ref={containerRef} className="lwc-carousel-list" {...carousel.props.list}>
        <Margin className="lwc-margin" data-lwc-ignore />
        {React.Children.map(children, (child, num) => (
          <li {...carousel.props.tile(num)}>
            {child}
          </li>
        ))}
        <Margin className="lwc-margin" data-lwc-ignore />
      </ScrollContainer>
      <CarouselArrow {...carousel.props.arrow.right} />
      <PageIndicator {...carousel.pages} />
    </Container>
  );
};


const Container = styled.div`
  position: relative;
`;

const Margin = styled.div`
  width: calc(${space._64} - ${space._8});
  height: 1px;
  flex: 0 0 auto;

  @media ${device._480} {
    width: calc(${space._64} - ${space._16});
  }

  @media ${device._768} {
    width: calc(${space._96} - ${space._16});
  }
`;

const ScrollContainer = styled.ul<{ targetZoneOffset: TargetZoneOffsets }>`
  overflow-x: scroll;

  &::-webkit-scrollbar {
    display: none;
  }
  scrollbar-width: none;

  margin: 0;
  padding: ${space._48} 0;

  display: flex;
  flex-direction: row;
  align-items: center;

  & > ${Margin} {
    flex: 1 0 auto;
  }

  & > li {
    flex: 0 0 auto;
    margin: 0 ${space._8};
    list-style-type: none;
  }

  /* only enable snap scrolling on touchscreen devices */
  @media (hover: none), (hover: on-demand) {
    scroll-snap-type: x mandatory;
    scroll-padding-left: ${props => props.targetZoneOffset.left}px;
    scroll-padding-right: ${props => props.targetZoneOffset.right}px;

    & > li {
      scroll-snap-align: start;
    }
  }

  @media ${device._480} {
    & > li {
      margin: 0 ${space._16};
    }
  }

  @media ${device._768} {
    padding: ${space._96} 0;
  }
`;
