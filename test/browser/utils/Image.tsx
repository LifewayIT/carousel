import React, { DetailedHTMLProps, HTMLAttributes, ReactElement, ReactEventHandler, useState } from 'react';
import { useRandomColor } from './useRandomColor';

type Props = {
  initialWidth?: string,
  loadedWidth?: string,
} & DetailedHTMLProps<HTMLAttributes<HTMLImageElement>, HTMLImageElement>;

export const Image = ({
  initialWidth = '0px',
  loadedWidth = '100px',
  ...domProps
}: Props): ReactElement => {
  const [width, setWidth] = useState(initialWidth);
  const bgColor = useRandomColor();

  const onLoad: ReactEventHandler<HTMLImageElement> = (e) => {
    setWidth(loadedWidth);
    domProps.onLoad?.(e);
  };

  const style = {
    backgroundColor: bgColor,
    ...domProps.style,
    width
  };

  return (
    <img alt="" {...domProps} style={style} onLoad={onLoad} />
  );
};
