const _ = require('lodash')
const cssMatcher = require('jest-matcher-css')
const defaultConfig = require('tailwindcss/defaultConfig')
const plugin = require('./index')
const postcss = require('postcss')
const tailwindcss = require('tailwindcss')

const generatePluginCss = (options = {}) => {
  return postcss(
    tailwindcss({
      corePlugins: disableCorePlugins(),
      plugins: [plugin(options)],
      theme: {
        screens: _.pick(defaultConfig.theme.screens, 'lg')
      }
    })
  )
  .process('@tailwind utilities;', {
    from: undefined
  })
  .then(result => {
    return result.css
  })
};

const disableCorePlugins = () => {
  return _.mapValues(defaultConfig.variants, plugin => {
    return false
  })
}

expect.extend({
  toMatchCss: cssMatcher
})

test('it generates the default order classes', () => {
  return generatePluginCss().then(css => {
    expect(css).toMatchCss(`
      .-order-1 {
        order: -1;
      }

      .order-0 {
        order: 0;
      }

      .order-1 {
        order: 1;
      }

      .order-2 {
        order: 2;
      }

      .order-3 {
        order: 3;
      }

      .order-4 {
        order: 4;
      }

      .order-5 {
        order: 5;
      }

      @media (min-width: 1024px) {
        .lg\\:-order-1 {
          order: -1;
        }

        .lg\\:order-0 {
          order: 0;
        }

        .lg\\:order-1 {
          order: 1;
        }

        .lg\\:order-2 {
          order: 2;
        }

        .lg\\:order-3 {
          order: 3;
        }

        .lg\\:order-4 {
          order: 4;
        }

        .lg\\:order-5 {
          order: 5;
        }
      }
    `)
  })
})

test('it generates order classes by defining a range', () => {
  const range = {
    from: -2,
    to: 2
  }

  return generatePluginCss({ range }).then(css => {
    expect(css).toMatchCss(`
      .-order-2 {
        order: -2;
      }

      .-order-1 {
        order: -1;
      }

      .order-0 {
        order: 0;
      }

      .order-1 {
        order: 1;
      }

      .order-2 {
        order: 2;
      }

      @media (min-width: 1024px) {
        .lg\\:-order-2 {
          order: -2;
        }

        .lg\\:-order-1 {
          order: -1;
        }

        .lg\\:order-0 {
          order: 0;
        }

        .lg\\:order-1 {
          order: 1;
        }

        .lg\\:order-2 {
          order: 2;
        }
      }
    `)
  })
})

test('it generates order classes by defining values', () => {
  const values = [-10, 0, 10, 20]

  return generatePluginCss({ values }).then(css => {
    expect(css).toMatchCss(`
      .-order-1 {
        order: -1;
      }

      .order-0 {
        order: 0;
      }

      .order-1 {
        order: 1;
      }

      .order-2 {
        order: 2;
      }

      .order-3 {
        order: 3;
      }

      .order-4 {
        order: 4;
      }

      .order-5 {
        order: 5;
      }

      .-order-10 {
        order: -10;
      }

      .order-0 {
        order: 0;
      }

      .order-10 {
        order: 10;
      }

      .order-20 {
        order: 20;
      }

      @media (min-width: 1024px) {
        .lg\\:-order-1 {
          order: -1;
        }

        .lg\\:order-0 {
          order: 0;
        }

        .lg\\:order-1 {
          order: 1;
        }

        .lg\\:order-2 {
          order: 2;
        }

        .lg\\:order-3 {
          order: 3;
        }

        .lg\\:order-4 {
          order: 4;
        }

        .lg\\:order-5 {
          order: 5;
        }

        .lg\\:-order-10 {
          order: -10;
        }

        .lg\\:order-0 {
          order: 0;
        }

        .lg\\:order-10 {
          order: 10;
        }

        .lg\\:order-20 {
          order: 20;
        }
      }
    `)
  })
})
