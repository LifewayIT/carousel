import { renderHook } from '@testing-library/react-hooks';
import { usePageIndicator } from '../usePageIndicator';

test('selects item when focused', () => {
  const { rerender, result } = renderHook(
    (pages) => usePageIndicator(pages),
    { initialProps: { current: 1, total: 2 } }
  );

  expect(result.current).toEqual([
    {
      key: expect.anything(),
      num: 0,
      current: true,
      className: 'lwc-current'
    },
    {
      key: expect.anything(),
      num: 1,
      current: false,
      className: ''
    },
  ]);

  rerender({ current: 2, total: 2 });

  expect(result.current).toEqual([
    {
      key: expect.anything(),
      num: 0,
      current: false,
      className: ''
    },
    {
      key: expect.anything(),
      num: 1,
      current: true,
      className: 'lwc-current'
    },
  ]);
});
