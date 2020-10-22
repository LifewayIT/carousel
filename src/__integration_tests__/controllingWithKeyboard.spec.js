import React from 'react';
import { fireEvent, render, screen, within } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Carousel } from '../components/Carousel';
import { SingleCarousel } from '../components/SingleCarousel';

describe('Carousel', () => {
  test('selects next/prev with arrow keys on the scroll container', () => {
    const onSelect = jest.fn();

    render(
      <Carousel selected={1} onSelect={onSelect}>
        <button type="button">0</button>
        <button type="button">1</button>
        <button type="button">2</button>
      </Carousel>
    );

    fireEvent.keyDown(screen.getByRole('button', { name: '0' }), { key: 'ArrowRight', code: 'ArrowRight' });
    expect(onSelect).toHaveBeenCalledWith(2);
    onSelect.mockClear();

    fireEvent.keyDown(screen.getByRole('button', { name: '0' }), { key: 'ArrowLeft', code: 'ArrowLeft' });
    expect(onSelect).toHaveBeenCalledWith(0);
  });
});

describe('SingleCarousel', () => {
  // eslint-disable-next-line react/prop-types
  const Item = ({ text }) => (
    <div>
      {text}
      <button type="button">click me!</button>
      <button type="button">yolo</button>
    </div>
  );

  test('selects item when focused', () => {
    const onSelect = jest.fn();

    render(
      <SingleCarousel selected={0} onSelect={onSelect}>
        <Item text="Item 0" />
        <Item text="Item 1" />
        <Item text="Item 2" />
      </SingleCarousel>
    );

    const item0 = screen.getByText(/item 0/i);
    const item1 = screen.getByText(/item 1/i);
    const item2 = screen.getByText(/item 2/i);

    userEvent.click(within(item0).getByRole('button', { name: 'click me!' }));

    userEvent.tab();  // Item 0 - yolo
    userEvent.tab();  // Item 1 - click me!
    expect(within(item1).getByRole('button', { name: 'click me!' })).toHaveFocus();
    expect(onSelect).toHaveBeenCalledWith(1);
    onSelect.mockClear();

    userEvent.tab();  // Item 1 - yolo
    userEvent.tab();  // Item 2 - click me!
    expect(within(item2).getByRole('button', { name: 'click me!' })).toHaveFocus();
    expect(onSelect).toHaveBeenCalledWith(2);
    onSelect.mockClear();

    userEvent.tab({ shift: true });  // Item 1 - yolo
    expect(within(item1).getByRole('button', { name: 'yolo' })).toHaveFocus();
    expect(onSelect).toHaveBeenCalledWith(1);
    onSelect.mockClear();

    userEvent.tab({ shift: true });  // Item 1 - click me!
    userEvent.tab({ shift: true });  // Item 0 - yolo
    expect(within(item0).getByRole('button', { name: 'yolo' })).toHaveFocus();
    expect(onSelect).toHaveBeenCalledWith(0);
  });

  test('selects & focuses next/prev item with arrow keys', () => {
    const onSelect = jest.fn();

    render(
      <SingleCarousel selected={1} onSelect={onSelect}>
        <Item text="Item 0" />
        <Item text="Item 1" />
        <Item text="Item 2" />
      </SingleCarousel>
    );

    const item0 = screen.getByText(/item 0/i);
    const item1 = screen.getByText(/item 1/i);
    const item2 = screen.getByText(/item 2/i);


    fireEvent.keyDown(item1, { key: 'ArrowRight', code: 'ArrowRight' });
    expect(onSelect).toHaveBeenCalledWith(2);
    expect(within(item2).getByRole('button', { name: 'click me!' })).toHaveFocus();
    onSelect.mockClear();

    fireEvent.keyDown(item1, { key: 'ArrowLeft', code: 'ArrowLeft' });
    expect(onSelect).toHaveBeenCalledWith(0);
    expect(within(item0).getByRole('button', { name: 'click me!' })).toHaveFocus();
  });
});
