import React, { ReactElement } from 'react';
import styled from 'styled-components';
import { device, space, color } from '../utils/styleguide';

interface Props {
  total: number;
  current: number;
}

const PageIndicator = ({ total, current }: Props): ReactElement => {
  return (
    <DotContainer>
      {[...Array(total)].map((_, num) => (
        // eslint-disable-next-line react/no-array-index-key
        <Dot key={`page-${num}`} active={num + 1 === current} />
      ))}
    </DotContainer>
  );
};

export default PageIndicator;


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

const Dot = styled.div<{ active: boolean }>`
  width: ${space._8};
  height: ${space._8};

  border-radius: 50%;
  background-color: ${color.gray600};

  opacity: ${props => props.active ? '1' : '.325'};
`;

