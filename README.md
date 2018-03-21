# Flexbox Order - TailwindCSS Plugin

[![npm](https://img.shields.io/npm/v/tailwindcss-flexbox-order.svg?style=flat-square)](https://www.npmjs.com/package/tailwindcss-flexbox-order)
[![npm](https://img.shields.io/npm/dt/tailwindcss-flexbox-order.svg?style=flat-square)](https://www.npmjs.com/package/tailwindcss-flexbox-order)

This plugin generates classes for ordering flexbox items.

## Installation

Just pull it in through npm the regular way:

```bash
$ npm install --save-dev tailwindcss-flexbox-order
```

Or the cool kidz way:

```bash
$ npm i -D tailwindcss-flexbox-order
```

Or the really stressed way:

```bash
$ npm isntall -D tailwindcss-flexbox-order
```

*(PS. That actually works.)*

## Usage

To just get going and generate some sensible defaults you don't have to pass 
any options.

```js
require('tailwindcss-flexbox-order')()
```

Just add it to the plugins array in your Tailwind config.

```js
plugins: [
    require('tailwindcss/plugins/container')({
        // center: true,
        // padding: '1rem',
    }),
    require('tailwindcss-flexbox-order')(),
],
```

Doing the above would generate the following classes, 
and their responsive variants:

```css
.-order-1 { order: -1; }
.order-0 { order: 0; }
.order-1 { order: 1; }
.order-2 { order: 2; }
.order-3 { order: 3; }
.order-4 { order: 4; }
.order-5 { order: 5; }
```

You can pass an array of numbers that you want to generate classes for.  
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

/* .......... */
```

Need a lot of classes for some reason?  
Pull in lodash at the top of the config file and use the `.range()` function.

```js
var _ = require('lodash');

// ..........

// lodash does not include the last number in the range.
// Passing the empty array as the second arguments will prevent generation of responsive variants.
require('tailwindcss-flexbox-order')(_.range(-10, 25+1), []), 
```

```css
.-order-10 { order: -10; }
.-order-9 { order: -9; }
/* .......... */
.order-24 { order: 24; }
.order-25 { order: 25; }

/* No variants is generated because of the empty array */
```

## License
This project is licensed under the [MIT License](https://opensource.org/licenses/MIT).