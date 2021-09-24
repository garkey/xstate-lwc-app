# css_style_guide

This is a running style guide for dcx Phase 2 development.

## How to start?

Start simple by running `npm run watch`. This will start the project with a local development server.

The source files are located in the [`src`](./src) folder. All web components are within the [`src/modules`](./src/modules) folder. The folder hierarchy also represents the naming structure of the web components.



## Styles to Use
- `display: flexbox`
- `display: grid`
- avoid defining width and height using `percentage`
- avoid defining `width` and `height` for child components
  - better to use static width and height definitions for bounded page and media width layouts.
  - still prefer page layouts to be dynamic, which sizes itself according to child elements and css responsive definitions.
- avoid style redefinitions, use Selector List. https://developer.mozilla.org/en-US/docs/Web/CSS/Selector_list
- use/create lwc component to standardize css styles with elemental components
  - eg. dcx_button
- use and reuse generic styling namespaces
  - `.flex-col`, `flex-row`
  - `.card`
  - `.border`
- apply global defaults
  - `li{ list-style-type: none }`
  - `ul{ margin: 0; padding: 0; }`
- consider Attribute and Universal selectors to minimize .css key definitions
  - https://developer.mozilla.org/en-US/docs/Web/CSS/Attribute_selectors
  - https://developer.mozilla.org/en-US/docs/Web/CSS/Universal_selectors

## Styles to Avoid
- using percentages to define dimension
- `float: `
- table-based layout elements, except for obvious table based implementations. ie. avoid the bootstrap way of 'combinatorial columnifying'. ie. below
  - `<table />`
  - `<lightning-layout />`
- localized or permutative styling namespaces
  - `.unique-component-name`
  - `.permutation1-component-name`
  - `.permutation2-component-name`


# CSS Namespace
- do not use CSS attribute `id` with LWC, since SF Platform LWC reassigns the attribute
- avoid excessive class namespacing by using combinators
  - https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_Selectors#combinators

