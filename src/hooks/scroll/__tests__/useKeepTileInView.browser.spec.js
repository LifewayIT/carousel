import React, { useRef } from 'react';
import { Box } from '&test/browser/utils/Box';
import { mountHookWithUI } from '&test/browser/utils/mountHookWithUI';
import { useKeepSelectedTileInView } from '../useKeepTileInView';

const mainStyle = `
  body {
    margin: 16px;
  }

  #base {
    position: relative;
    display: flex;
    flex-direction: row;
    overflow: scroll;
  }

  #base > * {
    flex: 0 0 auto;
    width: 100%;
    height: 200px;
  }
`;

const useWrappedHook = (result, { selected }) => {
  const ref = useRef();

  useKeepSelectedTileInView(ref, selected);

  return (
    <div id="base" ref={ref}>
      <Box />
      <Box />
      <Box />
    </div>
  );
};

const mountTest = (props) =>
  mountHookWithUI(useWrappedHook, props, mainStyle);

it('centers selected tile', () => {
  cy.viewport(332, 300);  // 32px total margin -> #base is 300px wide

  mountTest({ selected: 1 }).as('mounted');
  cy.get('#base').invoke('scrollLeft').should('toEqual', 300);

  cy.get('@mounted').invoke('rerender', { selected: 2 });
  cy.get('#base').invoke('scrollLeft').should('toEqual', 600);
});

it('keeps selected tile centered when resizing', () => {
  cy.viewport(332, 300);

  mountTest({ selected: 1 }).as('mounted');
  cy.get('#base').invoke('scrollLeft').should('toEqual', 300);

  cy.viewport(182, 300);
  cy.get('#base').invoke('scrollLeft').should('toEqual', 300);
});
