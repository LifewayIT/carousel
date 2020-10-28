import React, { useRef } from 'react';
import { useScrolledToEdge } from '../useScrolledToEdge';
import { Box } from '../../../../test/browser/utils/Box';
import { mountHookWithUI } from '../../../../test/browser/utils/mountHookWithUI';

const mainStyle = `
  #base {
    display: flex;
    flex-direction: row;
    overflow: scroll;
  }

  #base > * {
    flex: 0 0 auto;
  }
`;

const useWrappedHook = (result, { width }) => {
  const ref = useRef();

  const hookResult = useScrolledToEdge(ref);
  result.current = hookResult;

  return (
    <Box id="base" ref={ref} width={width}>
      <Box width="100px" height="100px" />
      <Box width="100px" height="100px" />
      <Box width="100px" height="100px" />
    </Box>
  );
};

const mountTest = (width) =>
  mountHookWithUI(useWrappedHook, { width }, mainStyle);

it('tracks if container is scrolled to the edge', () => {
  mountTest('200px').its('result').as('result');

  cy.get('@result').its('current').should('toEqual',
    { left: true, right: false, both: false }
  );

  cy.get('#base').scrollTo('right');
  cy.get('@result').its('current').should('toEqual',
    { left: false, right: true, both: false }
  );
});

it('tracks if on both edges (not scrollable)', () => {
  mountTest('300px').its('result').as('result');

  cy.get('@result').its('current').should('toEqual',
    { left: true, right: true, both: true }
  );
});
