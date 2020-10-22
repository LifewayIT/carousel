import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Carousel } from '../components/Carousel';

test('selects an item when clicked', () => {
  const onSelect = jest.fn();

  render(
    <Carousel onSelect={onSelect}>
      <button type="button">0</button>
      <button type="button">1</button>
      <button type="button">2</button>
    </Carousel>
  );

  userEvent.click(screen.getByText('1'));

  expect(onSelect).toHaveBeenCalledWith(1);
});
