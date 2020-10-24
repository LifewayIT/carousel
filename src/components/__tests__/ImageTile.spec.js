import React from 'react';
import { render } from '@testing-library/react';
import { ImageTile } from '../ImageTile';

test('matches snapshot', () => {
  const { container } = render(
    <ImageTile className="test-class" src="/src" alt="image label">
      <div id="children" />
    </ImageTile>
  );

  expect(container.firstChild).toMatchSnapshot();
});
