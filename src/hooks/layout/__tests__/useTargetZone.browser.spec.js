import React, { useRef, useState } from 'react';
import { useTargetZone } from '../useTargetZone';
import { useLayoutChange } from '../useLayoutChange';
import { Box } from '../../../../test/browser/utils/Box';
import { mountHookWithUI } from '../../../../test/browser/utils/mountHookWithUI';

const TestImage = () => {
  const [width, setWidth] = useState('0px');

  const onLoad = () => {
    setWidth('100px');
  };

  return (
    <img className="test-image" style={{ width }} onLoad={onLoad} alt="" />
  );
};

const Margin = ({ width, ...props }) => {
  return <div style={{ width, height: '100px', margin: '0 auto' }} {...props} />;
};


const mainStyle = `
  body {
    margin: 50px;
  }

  #base {
    position: relative;
    display: flex;
    flex-direction: row;
    overflow: scroll;

    border: 1px solid black;
    margin: -1px;
  }

  #base > * {
    flex: 0 0 auto;
  }

  #base > *:not([data-carousel-skip]) {
    width: 100px;
    height: 100px;
    margin: 50px;
  }
`;

const useWrappedHook = (resultRef, { children }) => {
  const ref = useRef();

  const [hookResult, { onLayoutChange }] = useTargetZone(ref);
  resultRef.current = hookResult;

  const { onLoad } = useLayoutChange(ref, onLayoutChange, [children]);

  return (
    <div id="base" ref={ref} onLoad={onLoad}>
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
      <Margin width="100px" data-carousel-skip />
      <TestImage />
      <Box />
      <Margin width="100px" data-carousel-skip />
    </>
  ).as('mounted');

  cy.get('@mounted').its('result.current').should('toEqual',
    { left: 150, right: 150 }
  );

  cy.viewport(700, 500);
  cy.get('@mounted').its('result.current').should('toEqual',
    { left: 200, right: 200 }
  );

  cy.get('.test-image').trigger('load', { force: true });
  cy.get('@mounted').its('result.current').should('toEqual',
    { left: 150, right: 150 }
  );

  cy.get('@mounted').invoke('rerender',
    <>
      <Margin width="200px" data-carousel-skip />
      <TestImage />
      <Box />
      <Margin width="200px" data-carousel-skip />
    </>
  );
  cy.get('@mounted').its('result.current').should('toEqual',
    { left: 250, right: 250 }
  );
});
