# Changelog
All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

<!-- template for unreleased section -->
<!-- ## [Unreleased]
No unreleased changes :fire: -->

## [Unreleased]

### Added
 - Added story for `PageIndicator`
 - Added static classnames to every dom node rendered by a carousel component

### Fixed
 - Update `SingleCarousel` to forward dom attributes to the base dom node


## v0.1.0 - (10/22/2020)

### Added
 - Added visual tests (and included them in the `validate` script)
 - Expose hooks in the index file so they can be imported directly
 - Allow components & hooks to be imported through `@lifeway-carousel/lib/components` and `@lifeway-carousel/lib/hooks` respectively

### Fixed
 - Allow running `npm install` without setting up an npm auth token

### Docs
 - Update README with info on publishing a new package version
 - Update README to include visual test script

### Internal
 - Add visual tests to pipeline
 - Moved all logic to reusable hooks


## v0.0.2 - (10/14/2020)
Get README up to date

### Fixed
 - Fix Carousel's `onSelect` prop type.
 - Include the README's screenshot in the npm package

### Docs
 - Update the README to include installation & usage info (and also get other info up to date)

### Internal
 - Fix version check in pipeline so that package actually gets deployed :grin:


## v0.0.1 - (10/13/2020)

Initial Release; includes several prebuilt react components: `Carousel`, `SingleCarousel`, `CarouselArrow`, and `ImageTile`.
