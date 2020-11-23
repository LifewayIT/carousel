import '&test/browser/styles/main.css';
import React, { useRef, useState } from 'react';
import { Box } from '&test/browser/utils/Box';
import { mountHookWithUI } from '&test/browser/utils/mountHookWithUI';
import { useCarousel } from '../useCarousel';

const mainStyle = `
  .list {
    width: 700px;
    max-width: 100%;
  }
`;

const useWrappedHook = (result) => {
  const ref = useRef();
  const [selected, setSelected] = useState(0);
  result.current = { selected, setSelected };

  const carousel = useCarousel(ref, { selected, onSelect: setSelected, numTiles: 4 }, []);

  return (
    <>
      <div>
        <button type="button" {...carousel.props.arrow.left}>left</button>
        <button type="button" {...carousel.props.arrow.right}>right</button>
      </div>
      <div className="list" ref={ref} {...carousel.props.list}>
        <Box id="box-1" {...carousel.props.tile(0)}><button type="button">yolo</button></Box>
        <Box id="box-2" {...carousel.props.tile(1)}><button type="button">yolo</button></Box>
        <Box id="box-3" {...carousel.props.tile(2)}><button type="button">yolo</button></Box>
        <Box id="box-4" {...carousel.props.tile(3)}><button type="button">yolo</button></Box>
        <div className="margin-fix" data-lwc-ignore />
      </div>
      <p>
        {carousel.pages.current} / {carousel.pages.total}
      </p>
    </>
  );
};

const mountTest = (props) =>
  mountHookWithUI(useWrappedHook, props, mainStyle);

it('selects tile on click or with arrow keys', () => {
  mountTest().its('result').as('result');

  cy.get('@result').its('current.selected').should('toEqual', 0);
  cy.get('#box-1').should('toHaveClass', 'lwc-selected');
  cy.get('#box-1').siblings().should('not.toHaveClass', 'lwc-selected');

  cy.get('#box-2 button').click();
  cy.get('@result').its('current.selected').should('toEqual', 1);
  cy.get('#box-2').should('toHaveClass', 'lwc-selected');
  cy.get('#box-2').siblings().should('not.toHaveClass', 'lwc-selected');

  cy.get('#box-3 button').click();
  cy.get('@result').its('current.selected').should('toEqual', 2);
  cy.get('#box-3').should('toHaveClass', 'lwc-selected');
  cy.get('#box-3').siblings().should('not.toHaveClass', 'lwc-selected');

  cy.get('#box-3 button').type('{rightarrow}');
  cy.get('@result').its('current.selected').should('toEqual', 3);
  cy.get('#box-4').should('toHaveClass', 'lwc-selected');
  cy.get('#box-4').siblings().should('not.toHaveClass', 'lwc-selected');

  cy.get('#box-4 button').type('{leftarrow}');
  cy.get('@result').its('current.selected').should('toEqual', 2);
  cy.get('#box-3').should('toHaveClass', 'lwc-selected');
  cy.get('#box-3').siblings().should('not.toHaveClass', 'lwc-selected');
});

it('calculates the current and total pages', () => {
  cy.viewport(800, 500);
  mountTest();

  cy.findByText('1 / 2').should('exist');

  cy.get('.list').invoke('scrollLeft', 500);
  cy.findByText('2 / 2').should('exist');

  cy.viewport(500, 500);
  cy.findByText('3 / 4').should('exist');
});

it('pages using click or arrow keys on arrow buttons', () => {
  mountTest();

  cy.findByRole('button', { name: 'right' }).click();
  cy.get('.list').invoke('scrollLeft').should('toEqual', 500);
  cy.findByRole('button', { name: 'right' }).should('toBeDisabled');
  cy.findByRole('button', { name: 'left' }).should('not.toBeDisabled');

  cy.findByRole('button', { name: 'left' }).click();
  cy.get('.list').invoke('scrollLeft').should('toEqual', 0);
  cy.findByRole('button', { name: 'left' }).should('toBeDisabled');
  cy.findByRole('button', { name: 'right' }).should('not.toBeDisabled');

  cy.findByRole('button', { name: 'right' }).type('{rightarrow}');
  cy.get('.list').invoke('scrollLeft').should('toEqual', 500);

  cy.findByRole('button', { name: 'left' }).type('{leftarrow}');
  cy.get('.list').invoke('scrollLeft').should('toEqual', 0);
});

it('scrolls selected or focused tile into view', () => {
  mountTest().its('result').as('result');

  cy.get('@result').invoke('current.setSelected', 3);
  cy.get('.list').invoke('scrollLeft').should('toEqual', 500);

  cy.get('@result').invoke('current.setSelected', 0);
  cy.get('.list').invoke('scrollLeft').should('toEqual', 0);

  cy.get('#box-4 button').focus();
  cy.get('.list').invoke('scrollLeft').should('toEqual', 500);

  cy.get('#box-2 button').focus();
  cy.get('.list').invoke('scrollLeft').should('be.within', 0, 300);
});
