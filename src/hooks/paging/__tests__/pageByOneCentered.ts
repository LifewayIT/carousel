import { PagingStrategy } from '../strategies';
import { alignAtCenter, centerOffset } from '../../../utils/layout';
import { getTiles } from '../../../utils/tiles';

export const pageByOneCentered: PagingStrategy = {
  pageLeft: (list) => {
    const tiles = getTiles(list);

    const nextTile = tiles
      .filter(tile => centerOffset(tile) < list.scrollLeft + list.clientWidth / 2)
      .reduce((next, tile) =>
        !next || centerOffset(tile) > centerOffset(next)
          ? tile
          : next,
      undefined as HTMLElement | undefined);

    if (nextTile) {
      list.scrollLeft = alignAtCenter(list, nextTile);
    }
  },
  pageRight: (list) => {
    const tiles = getTiles(list);

    const nextTile = tiles
      .filter(tile => centerOffset(tile) > list.scrollLeft + list.clientWidth / 2)
      .reduce((next, tile) =>
        !next || centerOffset(tile) < centerOffset(next)
          ? tile
          : next,
      undefined as HTMLElement | undefined);


    if (nextTile) {
      list.scrollLeft = alignAtCenter(list, nextTile);
    }
  }
};
