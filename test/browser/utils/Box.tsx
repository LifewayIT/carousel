import React, { CSSProperties, ReactElement, ReactNode, useRef } from 'react';
import { cn } from '../../../src/utils/classnames';

type CmptProps = {
  width?: string;
  height?: string;
  background?: boolean;
  style?: CSSProperties;
};

type DOMProps = React.DetailedHTMLProps<React.HTMLAttributes<HTMLDivElement>, HTMLDivElement>;

type Props = CmptProps
  & Omit<DOMProps, keyof CmptProps>;

const randomColor = () => {
  const hue = Math.round(Math.random() * 18) * 20;
  const sat = Math.floor(Math.random() * 2) / 2 + .25;
  return `hsl(${hue}, ${sat * 100}%, 90%)`;
};

export const Box = React.forwardRef<HTMLDivElement, Props>((
  { width, height, background = true, style, className, ...raw },
  ref
): ReactElement => {
  const defaultBC = useRef<string>('');
  if (defaultBC.current === '') {
    defaultBC.current = randomColor();
  }

  return (
    <div
      ref={ref}
      className={cn('box', className)}
      {...raw}
      style={{
        width,
        height,
        backgroundColor: background ? defaultBC.current : undefined,
        ...style
      }}
    />
  );
});
