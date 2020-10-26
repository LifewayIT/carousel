import React from 'react';
import { PageIndicator } from './PageIndicator';

export default {
  component: PageIndicator,
  title: 'PageIndicator',
};

const Template = args => <PageIndicator {...args} />;

export const Default = Template.bind({});
Default.args = {
  current: 2,
  total: 5
};

