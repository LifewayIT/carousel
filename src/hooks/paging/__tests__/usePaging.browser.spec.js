import '&test/browser/styles/main.css';
import React, { useRef } from 'react';
import { Box } from '&test/browser/utils/Box';
import { mountHookWithUI } from '&test/browser/utils/mountHookWithUI';
import { usePaging } from '../usePaging';
import { pageByOneCentered } from './pageByOneCentered';

const mainStyle = `
  .list {
    width: 900px;
  }
`;

const useWrappedHook = (result) => {
  const ref = useRef();

  result.current = usePaging(ref, pageByOneCentered);

  return (
    <div className="list" ref={ref}>
      <Box />
      <Box />
      <Box />
      <Box />
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
  cy.get('.list').invoke('scrollLeft').should('toEqual', 300);

  cy.get('@result').invoke('current.pageRight');
  cy.get('.list').invoke('scrollLeft').should('toEqual', 300);

  cy.get('@result').invoke('current.pageLeft');
  cy.get('.list').invoke('scrollLeft').should('toEqual', 0);

  cy.get('@result').invoke('current.pageLeft');
  cy.get('.list').invoke('scrollLeft').should('toEqual', 0);
});
