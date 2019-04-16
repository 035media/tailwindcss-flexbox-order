const _ = require('lodash');
const plugin = require('./index');
const postcss = require('postcss');
const tailwindcss = require('tailwindcss');
const cssMatcher = require('jest-matcher-css');
const defaultConfig = require('tailwindcss/defaultConfig');

const generatePluginCss = (options = {}) => {
    return postcss(
        tailwindcss({
            corePlugins: disableCorePlugins(),
            plugins: [plugin(options)],
            theme: {
                screens: _.pick(defaultConfig.theme.screens, 'lg'),
            },
        }))
        .process('@tailwind utilities;', {
            from: undefined,
        })
        .then(result => {
            return result.css;
        });
}

const disableCorePlugins = () => {
    return _.mapValues(defaultConfig.variants, () => false);
}

expect.extend({
    toMatchCss: cssMatcher,
});

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
        `);
    });
});

test('it generates order classes by defining a range', () => {
    const range = {
        from: -2,
        to: 1,
    };

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
            }
        `);
    });
});

test('it generates order classes by defining values', () => {
    const range = false;
    const values = [-10, 0, 10, 20];

    return generatePluginCss({ range, values }).then(css => {
        expect(css).toMatchCss(`
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
        `);
    });
});

test('it generates order classes by defining named values', () => {
    const range = false;
    const values = {
        'first': -999,
        'last': 999,
        '$p3c:@l': 1337,
    };

    return generatePluginCss({ range, values }).then(css => {
        expect(css).toMatchCss(`
            .order-first {
                order: -999;
            }

            .order-last {
                order: 999;
            }

            .order-\\$p3c\\:\\@l {
                order: 1337;
            }

            @media (min-width: 1024px) {
                .lg\\:order-first {
                    order: -999;
                }

                .lg\\:order-last {
                    order: 999;
                }

                .lg\\:order-\\$p3c\\:\\@l {
                    order: 1337;
                }
            }
        `);
    });
});
