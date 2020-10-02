import React from 'react';
import styled from 'styled-components';
import { color, shadow, device, space } from '../utils/styleguide';

import ChevronLeft from '../../svg/chevron-left.svg';
import ChevronRight from '../../svg/sprite/chevron-right.svg';

const Arrow = styled.button`
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
  ${props => props.left && `left: ${space._8};`}
  ${props => props.right && `right: ${space._8};`}
  z-index: 1;


  @media ${device._768} {
    width: 64px;
    height: 64px;

    & svg, & img {
      width: 24px;
      height: 24px;
    }

    top: calc(50% - 32px);
    ${props => props.left && `left: ${space._16};`}
    ${props => props.right && `right: ${space._16};`}
  }
`;

const CarouselArrow = ({ left, right, onClick, ...props }) => {
  if (!left && !right) {
    throw new Error('either "left" or "right" prop is required');
  } else if (left && right) {
    throw new Error('cannot have both "left" and "right" props');
  }

  return (
    <Arrow left={left} right={right} onClick={onClick} {...props}>
      {left && <img src={ChevronLeft} alt="page left" />}
      {right && <img src={ChevronRight} alt="page right" />}
    </Arrow>
  );
};

export default CarouselArrow;
