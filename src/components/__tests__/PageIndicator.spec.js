import React from 'react';
import { render } from '@testing-library/react';
import { PageIndicator } from '../PageIndicator';

test('matches snapshot', () => {
  const { container } = render(<PageIndicator current={2} total={4} className="test-class" />);

  expect(container.firstChild).toMatchSnapshot();
});
