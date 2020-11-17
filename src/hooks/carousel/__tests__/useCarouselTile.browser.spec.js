import '&test/browser/styles/main.css';
import React, { useRef, useState } from 'react';
import { Box } from '&test/browser/utils/Box';
import { mountHookWithUI } from '&test/browser/utils/mountHookWithUI';
import { useCarouselTile } from '../useCarouselTile';

const mainStyle = `
  .list {
    width: 400px;
  }
`;

const useWrappedHook = (result) => {
  const ref = useRef();
  const [selected, onSelect] = useState(0);
  result.current = selected;

  const tileProps = useCarouselTile(ref, { selected, onSelect });
  const domTileProps = (num) => {
    const { selected, ...domProps } = tileProps(num);
    return { 'data-selected': selected, ...domProps };
  };

  return (
    <div className="list" ref={ref}>
      <Box id="box-1" {...domTileProps(0)}><button type="button">yolo</button></Box>
      <Box id="box-2" {...domTileProps(1)}><button type="button">yolo</button></Box>
      <Box id="box-3" {...domTileProps(2)}><button type="button">yolo</button></Box>
      <div className="margin-fix" data-carousel-skip />
    </div>
  );
};

const mountTest = (props) =>
  mountHookWithUI(useWrappedHook, props, mainStyle);

it('selects tile on click', () => {
  mountTest().its('result').as('result');
  cy.get('#box-1')
    .should('toHaveClass', 'lwc-selected')
    .should('toHaveAttr', 'data-selected', 'true');
  cy.get('#box-1').siblings()
    .should('not.toHaveClass', 'lwc-selected')
    .should('toHaveAttr', 'data-selected', 'false');

  cy.get('#box-2').click();
  cy.get('@result').its('current').should('toEqual', 1);
  cy.get('#box-2')
    .should('toHaveClass', 'lwc-selected')
    .should('toHaveAttr', 'data-selected', 'true');
  cy.get('#box-2').siblings()
    .should('not.toHaveClass', 'lwc-selected')
    .should('toHaveAttr', 'data-selected', 'false');
});

it('scrolls focused tile into view', () => {
  mountTest();
  cy.get('.list').invoke('scrollLeft').should('toEqual', 0);

  cy.get('#box-2 button').focus();
  cy.get('.list').invoke('scrollLeft').should('be.within', 200, 300);

  cy.get('#box-3 button').focus();
  cy.get('.list').invoke('scrollLeft').should('toEqual', 500);
});

