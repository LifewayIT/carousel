import React from 'react';
import { render } from '@testing-library/react';
import { SingleCarousel } from '../SingleCarousel';

test('matches snapshot', () => {
  const { container } = render(
    <SingleCarousel className="test-class" selected={0}>
      <div id="children" />
    </SingleCarousel>
  );

  expect(container.firstChild).toMatchSnapshot();
});
