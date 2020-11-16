import '&test/browser/styles/main.css';
import React, { useRef } from 'react';
import { Box } from '&test/browser/utils/Box';
import { mountHookWithUI } from '&test/browser/utils/mountHookWithUI';
import { usePages } from '../usePages';
import { useLayoutChange } from '../../../hooks/layout/useLayoutChange';

const useWrappedHook = (result, { listWidth, additionalChildren }) => {
  const ref = useRef();

  const [pages, { onLayoutChange, onScroll }] = usePages(ref);
  result.current = pages;

  useLayoutChange(ref, onLayoutChange, [additionalChildren]);

  return (
    <>
      <div
        className="list"
        ref={ref}
        onScroll={onScroll}
        style={{ width: listWidth }}
      >
        <Box width="100px" />
        <Box width="400px" />
        <Box width="200px" />
        <Box width="400px" />
        <Box width="200px" />
        <Box width="400px" />
        <Box width="100px" />
        {additionalChildren &&
          <>
            <Box width="500px" />
            <Box width="300px" />
          </>}
        <div className="margin-fix" data-carousel-skip />
      </div>
      <div>{pages.current} / {pages.total}</div>
    </>
  );
};

const mountTest = (props) =>
  mountHookWithUI(useWrappedHook, props);

it('pages using provided page strategy', () => {
  mountTest({ width: '800px', additionalChildren: false }).as('mounted');
  cy.get('@mounted').its('result.current').should('toEqual', { current: 1, total: 4 });

  cy.get('.list').invoke('scrollLeft', 1500);
  cy.get('@mounted').its('result.current').should('toEqual', { current: 3, total: 4 });

  cy.get('@mounted').invoke('rerender', { additionalChildren: true });
  cy.get('@mounted').its('result.current').should('toEqual', { current: 3, total: 5 });
});
