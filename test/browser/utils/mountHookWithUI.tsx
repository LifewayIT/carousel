import React, { MutableRefObject, ReactElement, useState } from 'react';
import { mount } from 'cypress-react-unit-test';

type WrappedHook<R = unknown, P = unknown> = (result: MutableRefObject<R | undefined>, props: P) => ReactElement | null;
type MountedResult<R = unknown, P = unknown> = Cypress.Chainable<{
  rerender: (p: P) => void;
  result: MutableRefObject<R | undefined>
}>;

export const mountHookWithUI = <R, P>(wrappedHook: WrappedHook<R, P>, initialProps: P, style = ''): MountedResult<R, P> => {
  const result: MutableRefObject<R | undefined> = { current: undefined };
  const props = { current: initialProps };
  const triggerRender =  { current: () => { /* do nothing */ } };

  const Test = () => {
    const [_, setState] = useState(0);
    triggerRender.current = () => setState(n => n + 1);

    return wrappedHook(result, props.current);
  };

  const rerender = (nextProps: P) => {
    props.current = nextProps;
    triggerRender.current();
  };

  return mount(<Test />, { style }).then(() =>
    cy.wrap({ rerender, result })
  );
};
