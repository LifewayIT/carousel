import React, { ButtonHTMLAttributes, MouseEventHandler, ReactElement } from 'react';
import styled from 'styled-components';
import { color, device, shadow, space } from '../utils/styleguide';
import { cn } from '../utils/classnames';

import ChevronLeft from '../../svg/chevron-left.svg';
import ChevronRight from '../../svg/chevron-right.svg';


type Props = {
  /** shows the left arrow icon. One of 'left' or 'right' must be specified */
  left?: boolean;
  /** shows the right arrow icon. One of 'left' or 'right' must be specified */
  right?: boolean;
  /** hide the arrow */
  hide?: boolean;
  /** handler for when the arrow button is clicked */
  onClick: MouseEventHandler<HTMLElement>;
} & ButtonHTMLAttributes<HTMLButtonElement>;

export const CarouselArrow = ({ left, right, onClick, className, ...props }: Props): ReactElement => {
  if (!left && !right) {
    throw new Error('either "left" or "right" prop is required');
  } else if (left && right) {
    throw new Error('cannot have both "left" and "right" props');
  }

  const cls = cn('lwc-arrow', { 'lwc-left': left, 'lwc-right': right }, className);

  return (
    <Arrow {...props} className={cls} onClick={onClick}>
      {left && <img src={ChevronLeft} alt="page left" />}
      {right && <img src={ChevronRight} alt="page right" />}
    </Arrow>
  );
};


type ArrowProps = {
  left?: boolean;
  right?: boolean;
  hide?: boolean;
};

const Arrow = styled.button<ArrowProps>`
  position: absolute;
  display: block;

  padding: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 50%;
  border: 0 none;
  
  color: ${color.gray800};
  background-color: ${color.gray100};
  box-shadow:
    ${shadow.button},
    inset 0 0 4px 0 rgb(0 0 0 / 0.05);

  @media (prefers-reduced-motion: no-preference) {
    transition: all .1s ease;
  }
  
  &:not(:disabled):hover {
    cursor: pointer;
    box-shadow:
      ${shadow.buttonHover},
      inset 0 0 4px 0 rgb(0 0 0 / 0.05);
    transform: scale(1.05) translateY(-2px);
  }

  @media (hover: none), (hover: on-demand) {
    &:not(:disabled):hover {
      box-shadow:
        ${shadow.button},
        inset 0 0 4px 0 rgb(0 0 0 / 0.05); 
      transform: unset;
    }
  }

  &:not(:disabled):active {
    background: ${color.gray200};
  }

  &:disabled {
    opacity: .6;
  }

  ${props => props.hide && `
    visibility: hidden;
    transform: scale(0);

    @media (prefers-reduced-motion: no-preference) {
      transition: all .15s ease-in;
    }
  `}

  width: 48px;
  height: 48px;

  & svg, & img {
    width: 16px;
    height: 16px;
  }

  top: calc(50% - 24px);
  &.lwc-left {
    left: ${space._8};
  }
  &.lwc-right {
    right: ${space._8};
  }
  z-index: 1;


  @media ${device._768} {
    width: 64px;
    height: 64px;

    & svg, & img {
      width: 24px;
      height: 24px;
    }

    top: calc(50% - 32px);

    &.lwc-left {
      left: ${space._16};
    }
    &.lwc-right {
      right: ${space._16};
    }
  }
`;
