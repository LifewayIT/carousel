import '&test/browser/styles/main.css';
import React, { useRef } from 'react';
import { Box } from '&test/browser/utils/Box';
import { mountHookWithUI } from '&test/browser/utils/mountHookWithUI';
import { useScrollSelectedIntoView } from '../useScrollSelectedIntoView';

const mainStyle = `
  .list {
    width: 400px;
  }
`;

const useWrappedHook = (result, { selected }) => {
  const ref = useRef();

  useScrollSelectedIntoView(ref, selected);

  return (
    <div className="list" ref={ref}>
      <Box />
      <Box />
      <Box />
      <div className="margin-fix" data-carousel-skip />
    </div>
  );
};

const mountTest = (props) =>
  mountHookWithUI(useWrappedHook, props, mainStyle);

it('centers initially selected tile', () => {
  mountTest({ selected: 1 });
  cy.get('.list').invoke('scrollLeft').should('toEqual', 250);
});

it('scrolls tile into view when selected', () => {
  mountTest({ selected: 1 }).as('mounted');

  cy.get('@mounted').invoke('rerender', { selected: 0 });
  cy.get('.list').invoke('scrollLeft').should('toEqual', 0);

  cy.get('@mounted').invoke('rerender', { selected: 2 });
  cy.get('.list').invoke('scrollLeft').should('toEqual', 500);
});
