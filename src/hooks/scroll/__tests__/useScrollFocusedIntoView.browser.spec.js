import React, { useRef } from 'react';
import { Box } from '../../../../test/browser/utils/Box';
import { mountHookWithUI } from '../../../../test/browser/utils/mountHookWithUI';
import { useScrollFocusedIntoView } from '../useScrollFocusedIntoView';

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

const useWrappedHook = () => {
  const ref = useRef();

  const domProps = useScrollFocusedIntoView(ref);

  return (
    <div id="base" ref={ref} {...domProps}>
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
  cy.get('#base').invoke('scrollLeft').should('toEqual', 0);

  cy.get('#box-2 button').focus();
  cy.get('#base').invoke('scrollLeft').should('be.within', 200, 300);

  cy.get('#box-3 button').focus();
  cy.get('#base').invoke('scrollLeft').should('toEqual', 500);

  cy.get('#box-2 button').focus();
  cy.get('#base').invoke('scrollLeft').should('be.within', 200, 300);

  cy.get('#box-1 button').focus();
  cy.get('#base').invoke('scrollLeft').should('toEqual', 0);
});
