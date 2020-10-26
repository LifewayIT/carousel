import React from 'react';
import { render } from '@testing-library/react';
import { Carousel } from '../Carousel';

test('matches snapshot', () => {
  const { container } = render(
    <Carousel className="test-class" selected={0}>
      <div id="children" />
    </Carousel>
  );

  expect(container.firstChild).toMatchSnapshot();
});
