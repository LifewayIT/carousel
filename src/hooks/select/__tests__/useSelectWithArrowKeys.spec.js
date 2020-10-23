import React, { useRef, useState } from 'react';
import { render, fireEvent, screen } from '@testing-library/react';
import { useSelectWithArrowKeys } from '../useSelectWithArrowKeys';

const Test = ({ onSelect }) => {
  const ref = useRef();
  const [selected, setSelected] = useState(0);

  const onTileSelect = (tile) => {
    setSelected(tile);
    onSelect(tile);
  };

  const refProps = useSelectWithArrowKeys(ref, { selected, onSelect: onTileSelect, numTiles: 2 });

  return (
    <ul data-qa-hook="list" ref={ref} {...refProps}>
      <li><button type="button">item 0</button></li>
      <li><button type="button">item 1</button></li>
    </ul>
  );
};

test('selects item when focused', () => {
  const onSelect = jest.fn();

  render(<Test onSelect={onSelect} />);

  fireEvent.keyDown(screen.getByTestId('list'), { key: 'ArrowRight' });
  expect(onSelect).toHaveBeenCalledWith(1);
  onSelect.mockClear();

  fireEvent.keyDown(screen.getByTestId('list'), { key: 'ArrowRight' });
  expect(onSelect).toHaveBeenCalledWith(1);
  onSelect.mockClear();

  fireEvent.keyDown(screen.getByTestId('list'), { key: 'ArrowLeft' });
  expect(onSelect).toHaveBeenCalledWith(0);
  onSelect.mockClear();

  fireEvent.keyDown(screen.getByTestId('list'), { key: 'ArrowLeft' });
  expect(onSelect).toHaveBeenCalledWith(0);
});
