import { useState, RefObject } from 'react';
import { getTileTargetZoneOffsets, TargetZoneOffsets } from '../../utils/layout';

type useTargetZone = (containerRef: RefObject<HTMLElement>) =>
  readonly [TargetZoneOffsets, { onLayoutChange: () => void }];

export const useTargetZone: useTargetZone = (containerRef) => {
  const [targetOffset, setTargetOffset] = useState({ left: 0, right: 0 });

  const onLayoutChange = () => {
    const newTargetOffset = containerRef.current
      ? getTileTargetZoneOffsets(containerRef.current)
      : { left: 0, right: 0 };

    if (newTargetOffset.left !== targetOffset.left || newTargetOffset.right !== targetOffset.right) {
      setTargetOffset(newTargetOffset);
    }
  };

  return [targetOffset, { onLayoutChange }] as const;
};
