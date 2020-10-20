import React, {
  useRef,
  ReactNode,
  HTMLAttributes,
  ReactElement,
  UIEventHandler,
  RefObject,
  ReactEventHandler,
  DependencyList
} from 'react';
import styled from 'styled-components';
import CarouselArrow from './CarouselArrow';
import { device, space } from '../utils/styleguide';
import { usePages } from '../hooks/usePages';
import PageIndicator from './PageIndicator';
import { useLayoutChange } from '../hooks/layout/useLayoutChange';
import { TargetZoneOffsets } from '../utils/layout';
import { useSelectWithArrowKeys } from '../hooks/select/useSelectWithArrowKeys';
import { useScrollSelectedIntoView } from '../hooks/scroll/useScrollSelectedIntoView';
import { useScrollSnapLoadingFix } from '../hooks/scroll/useScrollSnapLoadingFix';
import { useScrollFocusedIntoView } from '../hooks/scroll/useScrollFocusedIntoView';
import { usePaging } from '../hooks/paging/usePaging';
import { usePageWithArrowKeys } from '../hooks/paging/usePageWithArrowKeys';
import { pageByVisibility } from '../hooks/paging/strategies';
import { useScrolledToEdge } from '../hooks/layout/useScrolledToEdge';
import { useTargetZone } from '../hooks/layout/useTargetZone';


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


type CarouselTileHookProps = {
  selected: number;
  onSelect: (nextSelected: number) => void;
};
const useCarouselTile = (containerRef: RefObject<HTMLElement>, { selected, onSelect }: CarouselTileHookProps) => {
  const scrollIntoView = useScrollFocusedIntoView(containerRef);

  const tileProps = (num: number) => ({
    className: num === selected ? 'selected' : '',
    onClick: () => {
      onSelect(num);
    },
    onFocus: scrollIntoView.onFocus
  });

  return tileProps;
};


type HookProps = {
  selected: number;
  onSelect: (nextSelected: number) => void;
  numTiles: number;
};
const useCarousel = (containerRef: RefObject<HTMLElement>, { selected, onSelect, numTiles }: HookProps, layoutDeps: DependencyList) => {

  const pages = usePages(containerRef);
  const paging = usePaging(containerRef, pageByVisibility);
  const pageArrowKeys = usePageWithArrowKeys(containerRef, pageByVisibility);

  useScrollSelectedIntoView(containerRef, selected);
  const ssFix = useScrollSnapLoadingFix(containerRef, selected);
  const arrowKeys = useSelectWithArrowKeys(containerRef, { selected, onSelect, numTiles });

  const onEdge = useScrolledToEdge(containerRef);
  const [targetOffset, targetZone] = useTargetZone(containerRef);


  const layout = useLayoutChange(containerRef, () => {
    pages.onLayoutUpdate();
    targetZone.onLayoutUpdate();
  }, layoutDeps);

  const onLoad: ReactEventHandler = () => {
    layout.onLoad();
    ssFix.onLoad();
  };

  const onScroll: UIEventHandler = () => {
    pages.onScroll();
  };

  const tileProps = useCarouselTile(containerRef, { selected, onSelect });

  return {
    props: {
      arrow: {
        left: {
          left: true,
          hide: onEdge.both,
          disabled: onEdge.left,
          onClick: paging.pageLeft,
          onKeyDown: pageArrowKeys.onKeyDown
        },
        right: {
          right: true,
          hide: onEdge.both,
          disabled: onEdge.right,
          onClick: paging.pageRight,
          onKeyDown: pageArrowKeys.onKeyDown
        }
      },
      scrollContainer: {
        onKeyDown: arrowKeys.onKeyDown,
        onScroll,
        onLoad,
        targetZoneOffset: targetOffset
      },
      tile: tileProps,
    },
    pages
  };
};


type Props = {
  selected?: number,
  onSelect?: (nextSelected: number) => void,
  children?: ReactNode
} & Omit<HTMLAttributes<HTMLDivElement>, 'onSelect'>;

const Carousel = ({ selected = 0, onSelect = () => undefined, children, ...props }: Props): ReactElement => {
  const containerRef = useRef<HTMLUListElement>(null);

  const numTiles = React.Children.count(children);
  const carousel = useCarousel(containerRef, { selected, onSelect, numTiles }, [children]);

  return (
    <Container {...props}>
      <CarouselArrow {...carousel.props.arrow.left} />
      <ScrollContainer ref={containerRef} {...carousel.props.scrollContainer}>
        <Margin data-carousel-skip />
        {React.Children.map(children, (child, num) => (
          <li {...carousel.props.tile(num)}>
            {child}
          </li>
        ))}
        <Margin data-carousel-skip />
      </ScrollContainer>
      <CarouselArrow {...carousel.props.arrow.right} />
      <PageIndicator {...carousel.pages} />
    </Container>
  );
};

export default Carousel;
