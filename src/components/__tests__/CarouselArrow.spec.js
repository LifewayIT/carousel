import React from 'react';
import { render } from '@testing-library/react';
import { CarouselArrow } from '../CarouselArrow';

test('left arrow matches snapshot', () => {
  const { container } = render(
    <CarouselArrow className="test-class" left>
      <div id="children" />
    </CarouselArrow>
  );

  expect(container.firstChild).toMatchSnapshot();
});

test('right arrow matches snapshot', () => {
  const { container } = render(
    <CarouselArrow className="test-class" right>
      <div id="children" />
    </CarouselArrow>
  );

  expect(container.firstChild).toMatchSnapshot();
});
