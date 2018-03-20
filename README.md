# Flexbox Order Tailwind Plugin

## Installation

Add this plugin to your project:

```bash
# Install via npm
npm install --save-dev tailwindcss-flexbox-order
```

## Usage

This plugin exposes options for you to use, if you want to. Here are some examples for adding it to your project plugins.

```js
require('tailwindcss-flexbox-order')()
```

Calling the plugin without any arguments would generate the following classes, and all their responsive variants:

```css
.-order-1 { order: -1; }
.order-0 { order: 0; }
.order-1 { order: 1; }
.order-2 { order: 2; }
.order-3 { order: 3; }
.order-4 { order: 4; }
.order-5 { order: 5; }
```

The plugin accepts an array of numbers that you want to generate classes for.  
The second argument is an array of the variants you want.

```js
require('tailwindcss-flexbox-order')([1], ['hover', 'responsive']),
```

```css
.order-1 { order: 1; }

.hover\:order-1:hover { order: 1; }

@media (min-width: 576px) {
    .sm\:order-1 { order: 1; }
}
```

```js
const _ = require('lodash');

// .....

require('tailwindcss-flexbox-order')(_.range(-10, 25+1), []),
```

```css
.-order-10 { order: -10; }
.-order-9 { order: -9; }
/* .......... */
.order-24 { order: 24; }
.order-25 { order: 25; }

/* No variants */
```