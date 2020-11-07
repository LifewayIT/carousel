import '&test/browser/styles/main.css';
import React, { useRef } from 'react';
import { Box } from '&test/browser/utils/Box';
import { mountHookWithUI } from '&test/browser/utils/mountHookWithUI';
import { useScrollFocusedIntoView } from '../useScrollFocusedIntoView';

const mainStyle = `
  .list {
    width: 400px;
  }
`;

const useWrappedHook = () => {
  const ref = useRef();

  const domProps = useScrollFocusedIntoView(ref);

  return (
    <div className="list" ref={ref} {...domProps}>
      <Box id="box-1"><button type="button">yolo</button></Box>
      <Box id="box-2"><button type="button">yolo</button></Box>
      <Box id="box-3"><button type="button">yolo</button></Box>
      <div className="margin-fix" data-carousel-skip />
    </div>
  );
};

const mountTest = () =>
  mountHookWithUI(useWrappedHook, {}, mainStyle);

it('scrolls focused tile into target area', () => {
  mountTest();
  cy.get('.list').invoke('scrollLeft').should('toEqual', 0);

  cy.get('#box-2 button').focus();
  cy.get('.list').invoke('scrollLeft').should('be.within', 200, 300);

  cy.get('#box-3 button').focus();
  cy.get('.list').invoke('scrollLeft').should('toEqual', 500);

  cy.get('#box-2 button').focus();
  cy.get('.list').invoke('scrollLeft').should('be.within', 200, 300);

  cy.get('#box-1 button').focus();
  cy.get('.list').invoke('scrollLeft').should('toEqual', 0);
});
