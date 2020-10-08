import React, { useState } from 'react';
import Carousel from './Carousel';
import ImageTile from './ImageTile';

export default {
  component: Carousel,
  title: 'Carousel',
  argTypes: {
    onSelect: { type: { name: 'function', required: true } },
    selected: { type: 'number' }
  },
  parameters: {
    layout: 'padded',
    actions: {
      handles: ['keydown', 'focusin']
    }
  }
};

const Template = args => {
  const [selected, setSelected] = useState(0);

  const onSelect = (newSelected) => {
    setSelected(newSelected);
    args.onSelect?.(newSelected);
  };

  return <Carousel selected={selected} {...args} onSelect={onSelect} />;
};

export const Default = Template.bind({});
Default.args = {
  children: [
    <ImageTile key="A" alt="A" src="https://images.unsplash.com/photo-1596910547037-846b1980329f?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1350&q=80" />,
    <ImageTile key="B" alt="B" src="https://i.pinimg.com/originals/0d/da/71/0dda71f869598f4273a6ad005d6d2531.jpg" />,
    <ImageTile key="C" alt="C" src="https://m.media-amazon.com/images/M/MV5BNDUwNjBkMmUtZjM2My00NmM4LTlmOWQtNWE5YTdmN2Y2MTgxXkEyXkFqcGdeQXRyYW5zY29kZS13b3JrZmxvdw@@._V1_UX477_CR0,0,477,268_AL_.jpg" />
  ]
};

export const LotsOfChildren = Template.bind({});
LotsOfChildren.args = {
  children: [
    <ImageTile key="A" alt="A" src="https://images.unsplash.com/photo-1596910547037-846b1980329f?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1350&q=80" />,
    <ImageTile key="B" alt="B" src="https://i.pinimg.com/originals/0d/da/71/0dda71f869598f4273a6ad005d6d2531.jpg" />,
    <ImageTile key="C" alt="C" src="https://m.media-amazon.com/images/M/MV5BNDUwNjBkMmUtZjM2My00NmM4LTlmOWQtNWE5YTdmN2Y2MTgxXkEyXkFqcGdeQXRyYW5zY29kZS13b3JrZmxvdw@@._V1_UX477_CR0,0,477,268_AL_.jpg" />,
    <ImageTile key="D" alt="D" src="https://images.unsplash.com/photo-1596910547037-846b1980329f?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1350&q=80" />,
    <ImageTile key="E" alt="E" src="https://i.pinimg.com/originals/0d/da/71/0dda71f869598f4273a6ad005d6d2531.jpg" />,
    <ImageTile key="F" alt="F" src="https://m.media-amazon.com/images/M/MV5BNDUwNjBkMmUtZjM2My00NmM4LTlmOWQtNWE5YTdmN2Y2MTgxXkEyXkFqcGdeQXRyYW5zY29kZS13b3JrZmxvdw@@._V1_UX477_CR0,0,477,268_AL_.jpg" />,
    <ImageTile key="G" alt="G" src="https://images.unsplash.com/photo-1596910547037-846b1980329f?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1350&q=80" />,
    <ImageTile key="H" alt="H" src="https://i.pinimg.com/originals/0d/da/71/0dda71f869598f4273a6ad005d6d2531.jpg" />,
    <ImageTile key="I" alt="I" src="https://m.media-amazon.com/images/M/MV5BNDUwNjBkMmUtZjM2My00NmM4LTlmOWQtNWE5YTdmN2Y2MTgxXkEyXkFqcGdeQXRyYW5zY29kZS13b3JrZmxvdw@@._V1_UX477_CR0,0,477,268_AL_.jpg" />,
    <ImageTile key="J" alt="J" src="https://images.unsplash.com/photo-1596910547037-846b1980329f?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1350&q=80" />,
    <ImageTile key="K" alt="K" src="https://i.pinimg.com/originals/0d/da/71/0dda71f869598f4273a6ad005d6d2531.jpg" />,
    <ImageTile key="L" alt="L" src="https://m.media-amazon.com/images/M/MV5BNDUwNjBkMmUtZjM2My00NmM4LTlmOWQtNWE5YTdmN2Y2MTgxXkEyXkFqcGdeQXRyYW5zY29kZS13b3JrZmxvdw@@._V1_UX477_CR0,0,477,268_AL_.jpg" />,
    <ImageTile key="M" alt="M" src="https://images.unsplash.com/photo-1596910547037-846b1980329f?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1350&q=80" />,
    <ImageTile key="N" alt="N" src="https://i.pinimg.com/originals/0d/da/71/0dda71f869598f4273a6ad005d6d2531.jpg" />,
    <ImageTile key="O" alt="O" src="https://m.media-amazon.com/images/M/MV5BNDUwNjBkMmUtZjM2My00NmM4LTlmOWQtNWE5YTdmN2Y2MTgxXkEyXkFqcGdeQXRyYW5zY29kZS13b3JrZmxvdw@@._V1_UX477_CR0,0,477,268_AL_.jpg" />
  ]
};

