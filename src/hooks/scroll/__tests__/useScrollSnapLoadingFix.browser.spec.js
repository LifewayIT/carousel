import React, { useRef } from 'react';
import { mountHookWithUI } from '&test/browser/utils/mountHookWithUI';
import { Image } from '&test/browser/utils/Image';
import { useScrollSnapLoadingFix } from '../useScrollSnapLoadingFix';

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

    scroll-snap-type: x mandatory;
    scroll-padding-left: 50px;
    scroll-padding-right: 50px;
  }

  #base > * {
    flex: 0 0 auto;
    height: 200px;
    margin: 50px;
    scroll-snap-align: center;
  }

  #base .margin-fix {
    display: block;
    width: 1px;
    height: 1px;
    margin: 0 0 -1px -1px;
  }
`;

const useWrappedHook = (result, { selected }) => {
  const ref = useRef();

  const domProps = useScrollSnapLoadingFix(ref, selected);

  return (
    <div id="base" ref={ref} {...domProps}>
      <Image id="img-1" loadedWidth="200px" />
      <Image id="img-2" loadedWidth="200px" />
      <Image id="img-3" loadedWidth="200px" />
      <Image id="img-4" loadedWidth="200px" />
      <div className="margin-fix" data-carousel-skip />
    </div>
  );
};

const mountTest = (props) =>
  mountHookWithUI(useWrappedHook, props, mainStyle);

it('centers selected tile', () => {
  mountTest({ selected: 1 });

  cy.get('#img-2').trigger('load', { force: true });
  cy.get('#img-1').trigger('load', { force: true });
  cy.get('#img-4').trigger('load', { force: true });
  cy.get('#img-3').trigger('load', { force: true });

  cy.get('#base').invoke('scrollLeft').should('toEqual', 250);
});
