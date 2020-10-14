# Carousel
[![CircleCI Build](https://img.shields.io/circleci/build/github/LifewayIT/carousel/master?token=b67a6d07fbdd18e4b0283491299a0331a2c8c504)](https://app.circleci.com/pipelines/github/LifewayIT/carousel)
[![NPM Version](https://img.shields.io/npm/v/@lifeway/carousel)](https://www.npmjs.com/package/@lifeway/carousel)
[![NPM Downloads](https://img.shields.io/npm/dm/@lifeway/carousel)](https://www.npmjs.com/package/@lifeway/carousel)

A reusable, responsive, and adaptive carousel for react

## Demo

![Demo Combined Carousel](docs/demo/combined-carousel.gif)

## Getting Started

This package is on npm: [`@lifeway/carousel`](https://www.npmjs.com/package/@lifeway/carousel) :fire:

### Installation

```sh
npm install @lifeway/carousel
```

There are several peer dependencies that must be added to your project (if you do not already have them):
```sh
npm install react@^16.8.0 styled-components@^5.1.0
```
For more information on peer dependencies, please refer to the npm docs ([here](https://docs.npmjs.com/files/package.json#peerdependencies)).

Also, this package uses the newer Web APIs [`IntersectionObserver`](https://developer.mozilla.org/en-US/docs/Web/API/IntersectionObserver) and [`ResizeObserver`](https://developer.mozilla.org/en-US/docs/Web/API/ResizeObserver).
If you are planning on using this in an older browser environment (I'm looking at you IE!) then you'll need to polyfill them or the carousel won't work right.
For reference, here are the compatibility charts for [`IntersectionObserver`](https://caniuse.com/intersectionobserver) and [`ResizeObserver`](https://caniuse.com/resizeobserver)

### Usage

This is basically the code for the demo screenshot at the top of the readme:
```jsx
import { Carousel, SingleCarousel, ImageTile } from '@lifeway/carousel';

const items = [
  { name: 'Thing 1', image: 'url-to-image-of-thing-1' },
  { name: 'Thing 2', image: 'url-to-image-of-thing-2' },
  { name: 'Thing 3', image: 'url-to-image-of-thing-3' }
];

const MyComponent = () => {
  const [selected, setSelected] = useState(0)

  return (
    <div>
      <SingleCarousel selected={selected} onSelect={setSelected}>
        {items.map(item => (
          <img key={item.name} src={item.image} alt={item.name} />
        ))}
      </SingleCarousel>
      <Carousel selected={selected} onSelect={setSelected}>
        {items.map(item => (
          <ImageTile key={item.name} src={item.image} alt={item.name} />
        ))}
      </Carousel>
    </div>
  );
}
```

All of the source is built with typescript so it all has intellisense :fire:

More complete docs will (hopefully) be coming soon :rocket:

## Development

This project uses [Storybook](https://storybook.js.org/) for developing UI components & [Jest](https://jestjs.io/) for running tests. 

Simply install the dependencies and you are ready to go!
```sh
npm install
```

### Storybook

Run storybook locally using the start command:
```sh
npm start
```

You can also build a static version of storybook if you really want to:
```sh
npm run storybook:build
```

### Tests

This project uses the philosophy of favoring integration tests over unit tests (as championed by [Kent C Dodds](https://kentcdodds.com/blog/write-tests) :trophy:).
All integration tests live in the `src/__integration_tests__` folder, with the test file named `[feature].spec.js`.
All unit tests are co-located with the corresponding source file in a `__tests__` folder, with the test file named `[file].spec.js`.

There are several npm scripts to run tests, with `npm test` being the main one (rather obviously :P)

```sh
npm test                # run the tests for development
npm run test:ci         # run the tests for use in a CI environment
npm run test:coverage   # run the tests with coverage
npm run test:watch      # run the tests in watch mode
```

### Validation

There are several npm scripts that are used to check the "health" of the current commit:

```sh
npm run build:check   # check that everything type checks & builds properly
npm test              # run the unit/integration tests
npm run lint          # lints the codebase
npm run audit         # check for security vulnerabilities
# or npm audit

npm run validate      # runs all of the above checks
```

All of these checks (or variants thereof) are run on PRs, since we want to keep the repo healthy!
