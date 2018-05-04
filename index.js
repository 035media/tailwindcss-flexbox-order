let _ = require('lodash');

module.exports = function (options = {}) {
    return function ({ addUtilities, e }) {
        const defaultOptions = {
            range: {
                from: -1,
                to: 5,
            },
            values: false,
            variants: ['responsive'],
        };

        options = _.defaults(options, defaultOptions);

        if (_.isEmpty(options.range) || ! _.isPlainObject(options.range)) {
            options.range = false;
        }

        if (
            _.isEmpty(options.values)
            && (
                ! _.isPlainObject(options.values)
                || ! _.isArray(options.values)
            )
        ) {
            options.values = false;
        }

        if (
            _.has(options.range, 'from')
            && _.has(options.range, 'to')
            && options.range.from < options.range.to
        ) {
            const range = _.map(_.range(options.range.from, ++options.range.to), value => {
                return generateOutput(value);
            });

            addUtilities(range, options.variants);
        }

        if (_.isPlainObject(options.values)) {
            const values = _.map(options.values, (value, key) => {
                return generateOutput(value, key);
            });

            addUtilities(values, options.variants);
        } else if (_.isArray(options.values)) {
            const values = _.map(options.values, value => {
                return generateOutput(value);
            });

            addUtilities(values, options.variants);
        }

        function generateOutput(value, key) {
            value = _.toSafeInteger(value);

            if (key === undefined) {
                key = value;

                return (value < 0)
                    ? { [`.-order-${-key}`]: { order: value } }
                    : { [`.order-${key}`]: { order: value } };
            } else {
                return { [`.order-${e(key)}`]: { order: value } };
            }
        }
    };
}
