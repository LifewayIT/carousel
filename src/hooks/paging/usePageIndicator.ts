import { Pages } from './usePages';

interface IndicatorProps {
  key: string;
  num: number;
  className: string;
}

export const usePageIndicator = (pages: Pages): IndicatorProps[] =>
  [...Array(pages.total)].map((_, num) => ({
    key: `page-${num}`,
    num,
    current: num + 1 === pages.current,
    className: num + 1 === pages.current ? 'lwc-current' : ''
  }));
