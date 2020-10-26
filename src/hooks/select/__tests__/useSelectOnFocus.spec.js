import React, { useRef } from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { useSelectOnFocus } from '../useSelectOnFocus';

const Test = ({ onSelect }) => {
  const ref = useRef();

  const refProps = useSelectOnFocus(ref, onSelect);

  return (
    <ul ref={ref} {...refProps}>
      <li><button type="button">item 0</button></li>
      <li><button type="button">item 1</button></li>
      <li><button type="button">item 2</button></li>
    </ul>
  );
};

test('selects item when focused', () => {
  const onSelect = jest.fn();

  render(<Test onSelect={onSelect} />);

  userEvent.click(screen.getByRole('button', { name: 'item 0' }));
  expect(onSelect).toHaveBeenCalledWith(0);
  onSelect.mockClear();

  userEvent.tab();
  expect(screen.getByRole('button', { name: 'item 1' })).toHaveFocus();
  expect(onSelect).toHaveBeenCalledWith(1);
  onSelect.mockClear();

  userEvent.tab({ shift: true });
  expect(screen.getByRole('button', { name: 'item 0' })).toHaveFocus();
  expect(onSelect).toHaveBeenCalledWith(0);
});
