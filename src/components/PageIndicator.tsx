import React, { HTMLAttributes, ReactElement } from 'react';
import styled from 'styled-components';
import { Pages, usePageIndicator } from '../hooks/usePages';
import { cn } from '../utils/classnames';
import { device, space, color } from '../utils/styleguide';

type Props = Pages & HTMLAttributes<HTMLDivElement>;

export const PageIndicator = ({ current, total, className, ...props }: Props): ReactElement => {
  const indicators = usePageIndicator({ current, total });

  return (
    <DotContainer {...props} className={cn('lwc-page-indicator', className)}>
      {indicators.map((indicator) => (
        <Dot {...indicator} key={indicator.key} className={cn('lwc-page-dot', indicator.className)} />
      ))}
    </DotContainer>
  );
};


const DotContainer = styled.div`
  position: absolute;
  bottom: ${space._16};
  left: 0;
  right: 0;

  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;

  & > * {
    margin: 0 ${space._4};
  }

  @media ${device._768} {
    bottom: ${space._48};
  }
`;

const Dot = styled.div`
  width: ${space._8};
  height: ${space._8};

  border-radius: 50%;
  background-color: ${color.gray600};

  opacity: .325;

  &.lwc-current {
    opacity: 1;
  }
`;
