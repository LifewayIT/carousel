# Changelog
All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

<!-- template for unreleased section -->
<!-- ## :package: [Unreleased]
No unreleased changes :fire: -->

## :package: [Unreleased]

### :warning: BREAKING CHANGE :warning:
 - Rename carousel list props returned from `useCarousel` from `scrollContainer` to `list`

### :rocket: Added
 - Add `lwc-hide` class name to `CarouselArrow` when it is being hidden

### :hammer_and_wrench: Fixed
 - Make `onClick` prop on `CarouselArrow` optional


## v0.1.1 - (11/3/2020)

### :rocket: Added
 - Add story for `PageIndicator`
 - Add static classnames to every dom node rendered by a carousel component

### :hammer_and_wrench: Fixed
 - Update `SingleCarousel` to forward dom attributes to the base dom node
 - Fix `pageByVisibility` strategy to directly check if scroll snapping is enabled on the element when paging (checking for `scroll-snap-type`)

### :open_book: Docs
 - Fix relative path links & images in README on NPM


## v0.1.0 - (10/22/2020)

### :rocket: Added
 - Add visual tests (and included them in the `validate` script)
 - Expose hooks in the index file so they can be imported directly
 - Allow components & hooks to be imported through `@lifeway-carousel/lib/components` and `@lifeway-carousel/lib/hooks` respectively

### :hammer_and_wrench: Fixed
 - Allow running `npm install` without setting up an npm auth token

### :open_book: Docs
 - Update README with info on publishing a new package version
 - Update README to include visual test script

### :ghost: Internal
 - Add visual tests to pipeline
 - Move all logic to reusable hooks


## v0.0.2 - (10/14/2020)
Get README up to date

### :hammer_and_wrench: Fixed
 - Fix Carousel's `onSelect` prop type.
 - Include the README's screenshot in the npm package

### :open_book: Docs
 - Update the README to include installation & usage info (and also get other info up to date)

### :ghost: Internal
 - Fix version check in pipeline so that package actually gets deployed :grin:


## v0.0.1 - (10/13/2020)

Initial Release; includes several prebuilt react components: `Carousel`, `SingleCarousel`, `CarouselArrow`, and `ImageTile`.
