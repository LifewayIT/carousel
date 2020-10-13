# Carousel
[![CircleCI Build](https://img.shields.io/circleci/build/github/LifewayIT/carousel/master?token=b67a6d07fbdd18e4b0283491299a0331a2c8c504)](https://app.circleci.com/pipelines/github/LifewayIT/carousel)
[![NPM Version](https://img.shields.io/npm/v/@lifeway/carousel)](https://www.npmjs.com/package/@lifeway/carousel)
[![NPM Downloads](https://img.shields.io/npm/dm/@lifeway/carousel)](https://www.npmjs.com/package/@lifeway/carousel)

A reusable, responsive, and adaptive carousel for react

## Demo

![Demo Combined Carousel](docs/demo/combined-carousel.gif)

## Usage

This package is on npm: [`@lifeway/carousel`](https://www.npmjs.com/package/@lifeway/carousel) :fire:

## Development

This projects uses [Storybook](https://storybook.js.org/) for developing UI components & [Jest](https://jestjs.io/) for running tests. 

Simply install the dependencies and you are ready to go!
```
> npm install
```

### Storybook

Run storybook locally using the start command:
```
> npm start
```

You can also build a static version of storybook if you really want to:
```
> npm run build-storybook
```

### Tests

This project uses the philosophy of favoring integration tests over unit tests (from [Kent C Dodds](https://kentcdodds.com/blog/write-tests)).
All integration tests live in the `src/__integration_tests__` folder, with the test file named `[feature].spec.js`.
All unit tests are co-located with the corresponding source file in a `__tests__` folder, with the test file named `[file].spec.js`.

There are several npm scripts to run tests, with `npm test` being the main one (rather obviously :P)

```
npm test                # run the tests for development
npm run test:ci         # run the tests for use in a CI environment
npm run test:coverage   # run the tests with coverage
npm run test:watch      # run the tests in watch mode
```

### Building

[Babel](https://babeljs.io/) is used to build the app:

```
> npm run build
```

### Audit

The `npm audit` tool is used in prs to check vulnerabilities.  You can see more details [here](https://docs.npmjs.com/cli/audit)

```
> npm audit
```


_**[Last updated: 10/08/2020]**_
