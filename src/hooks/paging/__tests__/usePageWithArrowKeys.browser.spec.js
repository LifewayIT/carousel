import '&test/browser/styles/main.css';
import React, { useRef } from 'react';
import { Box } from '&test/browser/utils/Box';
import { mountHookWithUI } from '&test/browser/utils/mountHookWithUI';
import { usePageWithArrowKeys } from '../usePageWithArrowKeys';
import { pageByOneCentered } from './pageByOneCentered';

const mainStyle = `
  .list {
    width: 900px;
  }
`;

const useWrappedHook = () => {
  const ref = useRef();

  const domProps = usePageWithArrowKeys(ref, pageByOneCentered);

  return (
    <>
      <button className="control" type="button" {...domProps}>control</button>
      <div className="list" ref={ref}>
        <Box />
        <Box />
        <Box />
        <Box />
        <div className="margin-fix" data-carousel-skip />
      </div>
    </>
  );
};

const mountTest = (props) =>
  mountHookWithUI(useWrappedHook, props, mainStyle);

it('pages using provided page strategy', () => {
  mountTest();
  cy.get('.list').invoke('scrollLeft').should('toEqual', 0);

  cy.get('.control').type('{rightarrow}');
  cy.get('.list').invoke('scrollLeft').should('toEqual', 300);

  cy.get('.control').type('{rightarrow}');
  cy.get('.list').invoke('scrollLeft').should('toEqual', 300);

  cy.get('.control').type('{leftarrow}');
  cy.get('.list').invoke('scrollLeft').should('toEqual', 0);

  cy.get('.control').type('{leftarrow}');
  cy.get('.list').invoke('scrollLeft').should('toEqual', 0);
});
