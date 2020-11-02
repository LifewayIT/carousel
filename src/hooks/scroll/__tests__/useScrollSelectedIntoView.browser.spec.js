import React, { useRef } from 'react';
import { Box } from '&test/browser/utils/Box';
import { mountHookWithUI } from '&test/browser/utils/mountHookWithUI';
import { useScrollSelectedIntoView } from '../useScrollSelectedIntoView';

const mainStyle = `
  body {
    margin: 16px;
  }

  #base {
    position: relative;
    display: flex;
    flex-direction: row;
    overflow: scroll;

    width: 400px;
  }

  #base > * {
    flex: 0 0 auto;
    width: 200px;
    height: 200px;
    margin: 50px;
  }

  #base .margin-fix {
    display: block;
    width: 1px;
    height: 1px;
    margin: 0 0 -1px -1px; 
  }
`;

const useWrappedHook = (result, { selected }) => {
  const ref = useRef();

  useScrollSelectedIntoView(ref, selected);

  return (
    <div id="base" ref={ref}>
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
  cy.get('#base').invoke('scrollLeft').should('toEqual', 250);
});

it('scrolls tile into view when selected', () => {
  mountTest({ selected: 1 }).as('mounted');

  cy.get('@mounted').invoke('rerender', { selected: 0 });
  cy.get('#base').invoke('scrollLeft').should('toEqual', 0);

  cy.get('@mounted').invoke('rerender', { selected: 2 });
  cy.get('#base').invoke('scrollLeft').should('toEqual', 500);
});
