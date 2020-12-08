import '&test/browser/styles/main.css';
import React, { useRef } from 'react';
import { Box } from '&test/browser/utils/Box';
import { mountHookWithUI } from '&test/browser/utils/mountHookWithUI';
import { useScrolledToEdge } from '../useScrolledToEdge';

const useWrappedHook = (result, { width }) => {
  const ref = useRef();

  const hookResult = useScrolledToEdge(ref);
  result.current = hookResult;

  return (
    <Box className="list" ref={ref} width={width}>
      <Box width="100px" height="100px" />
      <Box width="100px" height="100px" />
      <Box width="100px" height="100px" />
    </Box>
  );
};

const mountTest = (width) =>
  mountHookWithUI(useWrappedHook, { width });

it('tracks if container is scrolled to the edge', () => {
  mountTest('400px').its('result').as('result');

  cy.get('@result').its('current').should('toEqual',
    { left: true, right: false, both: false }
  );

  cy.get('.list').scrollTo('right');
  cy.get('@result').its('current').should('toEqual',
    { left: false, right: true, both: false }
  );
});

it('tracks if on both edges (not scrollable)', () => {
  mountTest('600px').its('result').as('result');

  cy.get('@result').its('current').should('toEqual',
    { left: true, right: true, both: true }
  );
});
