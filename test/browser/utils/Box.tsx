import React, { CSSProperties, ReactElement, ReactNode, useRef } from 'react';
import { cn } from '../../../src/utils/classnames';
import { useRandomColor } from './useRandomColor';

type CmptProps = {
  width?: string;
  height?: string;
  background?: boolean;
  style?: CSSProperties;
};

type DOMProps = React.DetailedHTMLProps<React.HTMLAttributes<HTMLDivElement>, HTMLDivElement>;

type Props = CmptProps
  & Omit<DOMProps, keyof CmptProps>;


export const Box = React.forwardRef<HTMLDivElement, Props>((
  { width, height, background = true, style, className, ...raw },
  ref
): ReactElement => {
  const defaultBC = useRandomColor();

  return (
    <div
      ref={ref}
      className={cn('box', className)}
      {...raw}
      style={{
        width,
        height,
        backgroundColor: background ? defaultBC : undefined,
        ...style
      }}
    />
  );
});
