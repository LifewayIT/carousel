import { useRef } from 'react';

const randomColor = () => {
  const hue = Math.round(Math.random() * 18) * 20;
  const sat = Math.floor(Math.random() * 2) / 2 + .25;
  return `hsl(${hue}, ${sat * 100}%, 90%)`;
};

export const useRandomColor = (): string => {
  const color = useRef<string>('');
  if (color.current === '') {
    color.current = randomColor();
  }

  return color.current;
};
