import '&test/browser/styles/main.css';
import React, { useRef, useState } from 'react';
import { Box } from '&test/browser/utils/Box';
import { mountHookWithUI } from '&test/browser/utils/mountHookWithUI';
import { useSingleCarousel } from '../useSingleCarousel';

const mainStyle = `
  .list {
    width: 400px;
  }
`;

const useWrappedHook = (result) => {
  const ref = useRef();
  const [selected, setSelected] = useState(0);
  result.current = { selected, setSelected };

  const { props: listProps } = useSingleCarousel(ref, { selected, onSelect: setSelected, numTiles: 3 });

  return (
    <div className="list" ref={ref} {...listProps}>
      <Box id="box-1"><button type="button">yolo</button></Box>
      <Box id="box-2"><button type="button">yolo</button></Box>
      <Box id="box-3"><button type="button">yolo</button></Box>
      <div className="margin-fix" data-lwc-ignore />
    </div>
  );
};

const mountTest = (props) =>
  mountHookWithUI(useWrappedHook, props, mainStyle);

it('keeps selected tile centered in view', () => {
  mountTest().its('result').as('result');

  cy.get('.list').invoke('scrollLeft').should('toEqual', 0);

  cy.get('@result').invoke('current.setSelected', 1);
  cy.get('.list').invoke('scrollLeft').should('toEqual', 250);

  cy.get('@result').invoke('current.setSelected', 2);
  cy.get('.list').invoke('scrollLeft').should('toEqual', 500);
});

it('selects tile on focus', () => {
  mountTest().its('result').as('result');

  cy.get('@result').its('current.selected').should('toEqual', 0);

  cy.get('#box-2 button').focus();
  cy.get('@result').its('current.selected').should('toEqual', 1);

  cy.get('#box-3 button').focus();
  cy.get('@result').its('current.selected').should('toEqual', 2);
});

it('selects tile with arrow keys', () => {
  mountTest().its('result').as('result');

  cy.get('@result').its('current.selected').should('toEqual', 0);

  cy.get('#box-1 button').type('{rightarrow}');
  cy.get('@result').its('current.selected').should('toEqual', 1);

  cy.get('#box-2 button').type('{leftarrow}');
  cy.get('@result').its('current.selected').should('toEqual', 0);
});
