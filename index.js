module.exports = function(values = [-1, 0, 1, 2, 3, 4, 5], variants = ['responsive']) {
    return function({ addUtilities }) {
        let utilities = {};

        values.map(number => {
            (number < 0)
                ? utilities[`.-order-${-number}`] = { order: number.toString() }
                : utilities[`.order-${number}`] = { order: number.toString() };
        });

        addUtilities(utilities, variants);
    };
};
