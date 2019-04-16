# Flexbox Order - TailwindCSS Plugin

[![npm version](https://img.shields.io/npm/v/tailwindcss-flexbox-order.svg)](https://www.npmjs.com/package/tailwindcss-flexbox-order)
[![npm downloads](https://img.shields.io/npm/dt/tailwindcss-flexbox-order.svg)](https://www.npmjs.com/package/tailwindcss-flexbox-order)
[![Build Status](https://travis-ci.com/035media/tailwindcss-flexbox-order.svg?branch=master)](https://travis-ci.com/035media/tailwindcss-flexbox-order)

This plugin generates classes for ordering flexbox and grid items using `order: #;`.

## Installation

Pull it in through npm:

```bash
npm install --save-dev tailwindcss-flexbox-order
```

## Usage

To get going with some sensible defaults you don't have to pass any options.\
Just add it to the plugins array of your Tailwind config.

```js
plugins: [
  // Other plugins
  require('tailwindcss-flexbox-order')(),
],
```

By default the plugin generates the following classes, with all of their responsive variants:

```css
.-order-1 { order: -1; }
.order-0  { order:  0; }
.order-1  { order:  1; }
.order-2  { order:  2; }
.order-3  { order:  3; }
.order-4  { order:  4; }
.order-5  { order:  5; }
```

### Options

You can pass an object to override the default settings.

```js
// Default options
{
  range: {
    from: -1,
    to: 5,
  },
  values: false,
  variants: ['responsive'],
}
```

#### range

Range takes an object with `from` and `to` keys with integer values and generates them and every number in between.

The default option is `{ from: -1, to: 5 }`.

```js
range: {
  from: -2,
  to: 2,
},
```

```css
.-order-2 { order: -2; }
.-order-1 { order: -1; }
.order-0  { order:  0; }
.order-1  { order:  1; }
.order-2  { order:  2; }
```

Setting range to `false` disables range generation.

```js
range: false,
```

#### values

Values can be an object with key/value pairs.\
Your strings are automatically escaped.

The default option is `false`.

```js
values: {
  'first': -999,
  'last': 999,
  '$p3ci@l': 1337,
}
```

```css
.order-first { order: -999; }
.order-last  { order:  999; }
.order-\$p3ci\@l { order: 1337; }
```

Or it can take an array of integers.

```js
values: [-10, 0, 10, 20],
```

```css
.-order-10 { order: -10; }
.order-0   { order:   0; }
.order-10  { order:  10; }
.order-20  { order:  20; }
```

#### variants

Variants can be set to an array with any of the supported Tailwind variants.

The default option is `['responsive']`.

```js
variants: ['responsive', 'hover', 'focus', 'active', 'group-hover']
```

## Upgrading from 0.1 or 0.2

Earlier versions took an array of integers as the first argument, and another array of variants as the second argument.

Starting at 1.0, all options should be passed as a plain object.

```js
// OLD - 0.x
require('tailwindcss-flexbox-order')([-1, 1, 5, 10], ['responsive'])

// NEW - 1.x
require('tailwindcss-flexbox-order')({
    range: false,
    values: [-1, 1, 5, 10],
    variants: ['responsive'],
})
```

All versions will still generate the same output if no options are passed.

## License

This project is licensed under the [MIT License](https://opensource.org/licenses/MIT).
