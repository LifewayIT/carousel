import '&test/browser/styles/main.css';
import React, { useRef } from 'react';
import { Box } from '&test/browser/utils/Box';
import { Image } from '&test/browser/utils/Image';
import { mountHookWithUI } from '&test/browser/utils/mountHookWithUI';
import { useTargetZone } from '../useTargetZone';
import { useLayoutChange } from '../useLayoutChange';

const Margin = ({ width }) => {
  return <div className="margin" style={{ width }} data-carousel-skip />;
};


const mainStyle = `
  body {
    margin: 50px;
  }

  .list {
    border: 1px solid black;
    margin: -1px;
  }

  .list > *:not([data-carousel-skip]) {
    width: 100px;
    height: 100px;
  }

  .margin {
    height: 100px;
    margin: 0 auto;
  }
`;

const useWrappedHook = (resultRef, { children }) => {
  const ref = useRef();

  const [hookResult, { onLayoutChange }] = useTargetZone(ref);
  resultRef.current = hookResult;

  const { onLoad } = useLayoutChange(ref, onLayoutChange, [children]);

  return (
    <div className="list" ref={ref} onLoad={onLoad}>
      {children}
    </div>
  );
};

const mountTest = (initialChildren) => {
  return mountHookWithUI(
    useWrappedHook,
    { children: initialChildren },
    mainStyle
  )
    .then(({ rerender, ...rest }) => {
      return {
        rerender: (children) => rerender({ children }),
        ...rest
      };
    });
};

it('tracks the target zone', () => {
  cy.viewport(300, 500);

  mountTest(
    <>
      <Margin width="100px" />
      <Image loadedWidth="100px" />
      <Box />
      <Margin width="100px" />
    </>
  ).as('mounted');

  cy.get('@mounted').its('result.current').should('toEqual',
    { left: 150, right: 150 }
  );

  cy.viewport(700, 500);
  cy.get('@mounted').its('result.current').should('toEqual',
    { left: 200, right: 200 }
  );

  cy.get('.image').trigger('load', { force: true });
  cy.get('@mounted').its('result.current').should('toEqual',
    { left: 150, right: 150 }
  );

  cy.get('@mounted').invoke('rerender',
    <>
      <Margin width="200px" />
      <Image loadedWidth="100px" />
      <Box />
      <Margin width="200px" />
    </>
  );
  cy.get('@mounted').its('result.current').should('toEqual',
    { left: 250, right: 250 }
  );
});
