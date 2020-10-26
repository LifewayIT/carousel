import React from 'react';
import styled from 'styled-components';
import { ImageTile } from './ImageTile';

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


const Ribbon = styled.div`
  position: absolute;
  top: 0;
  right: 0;
  transform: translate(50%, -50%) rotate(45deg) translateY(39px);

  width: 200px;

  margin: 0.5em;
  padding: 0.5em;

  background: #38B2AC;
  color: white;
  font-size: 14px;
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
