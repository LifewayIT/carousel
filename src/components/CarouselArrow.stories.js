import React from 'react';
import { CarouselArrow } from './CarouselArrow';

export default {
  component: CarouselArrow,
  title: 'CarouselArrow',
  argTypes: {
    onClick: { type: { name: 'function', required: true } }
  },
  parameters: {
    actions: {
      handles: ['keydown'],
    }
  }
};

const Template = args => <CarouselArrow {...args} />;

export const Left = Template.bind({});
Left.args = {
  left: true,
};

export const Right = Template.bind({});
Right.args = {
  right: true,
};
