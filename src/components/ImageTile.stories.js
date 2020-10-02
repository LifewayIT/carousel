import React from 'react';
import styled from 'styled-components';
import ImageTile from './ImageTile';
import { color } from '../utils/styleguide';

export default {
  component: ImageTile,
  title: 'ImageTile',
  parameters: {
    actions: {
      handles: ['click', 'focusin', 'focusout'],
    }
  }
};

const Template = args => <ImageTile {...args} />;

export const Default = Template.bind({});
Default.args = {
  src: 'https://images.unsplash.com/photo-1596910547037-846b1980329f?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1350&q=80',
  alt: 'this is the image'
};


const Ribbon = styled.span`
  position: absolute;
  top: 0;
  right: 0;
  transform: translateX(30%) translateY(0%) rotate(45deg);
  transform-origin: top left;

  margin: 0.5em;
  padding: 0.5em;

  background: ${color.teal500};
  color: white;

  &::before, &::after {
    content: '';
    position: absolute;
    top: 0;
    margin: 0 -1px;
    width: 100%;
    height: 100%;
    background: ${color.teal500};
  }

  &::before {
    right: 100%;
  }

  &::after {
    left: 100%;
  }
`;

const Parent = styled.div`
  & .tile {
    position: relative;
    overflow: hidden;
  }
`;

export const WithChildren = args => (
  <Parent>
    <ImageTile {...args} />
  </Parent>
);
WithChildren.args = {
  src: 'https://images.unsplash.com/photo-1596910547037-846b1980329f?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1350&q=80',
  alt: 'this is the image',
  className: 'tile',
  children: <Ribbon>YOLO</Ribbon>
};
