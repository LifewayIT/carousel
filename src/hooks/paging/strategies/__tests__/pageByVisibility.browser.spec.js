import '&test/browser/styles/main.css';
import React, { useRef } from 'react';
import { Box } from '&test/browser/utils/Box';
import { mountHookWithUI } from '&test/browser/utils/mountHookWithUI';
import { pageByVisibility } from '../pageByVisibility';

const mainStyle = `
  .list {
    width: 800px;
  }
`;

const useWrappedHook = (result) => {
  const ref = useRef();

  result.current = {
    pageLeft: () => pageByVisibility.pageLeft(ref.current),
    pageRight:() => pageByVisibility.pageRight(ref.current)
  };

  return (
    <div className="list" ref={ref}>
      <Box width="100px" />
      <Box width="400px" />
      <Box width="100px" />
      <Box width="400px" />
      <Box width="100px" />
      <Box width="400px" />
      <Box width="100px" />
      <div className="margin-fix" data-lwc-ignore />
    </div>
  );
};

const mountTest = (props) =>
  mountHookWithUI(useWrappedHook, props, mainStyle);

it('pages using provided page strategy', () => {
  mountTest().its('result').as('result');
  cy.get('.list').invoke('scrollLeft').should('toEqual', 0);

  cy.get('@result').invoke('current.pageRight');
  cy.get('.list').invoke('scrollLeft').should('toEqual', 700);

  cy.get('@result').invoke('current.pageRight');
  cy.get('.list').invoke('scrollLeft').should('toEqual', 1400);

  cy.get('@result').invoke('current.pageRight');
  cy.get('.list').invoke('scrollLeft').should('toEqual', 1500);

  cy.get('@result').invoke('current.pageRight');
  cy.get('.list').invoke('scrollLeft').should('toEqual', 1500);

  cy.get('@result').invoke('current.pageLeft');
  cy.get('.list').invoke('scrollLeft').should('toEqual', 800);

  cy.get('@result').invoke('current.pageLeft');
  cy.get('.list').invoke('scrollLeft').should('toEqual', 100);

  cy.get('@result').invoke('current.pageLeft');
  cy.get('.list').invoke('scrollLeft').should('toEqual', 0);

  cy.get('@result').invoke('current.pageLeft');
  cy.get('.list').invoke('scrollLeft').should('toEqual', 0);
});
