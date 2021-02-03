let validateCoords = require('../../src/utils/validateData').validateCoords;
let validate3Tuple = require('../../src/utils/validateData').validate3Tuple;

describe('Validate input data', () => {
    test('That (52, 60) is within the X and Y boundaries', () => {
        expect(validateCoords('52', '60')).toStrictEqual([52, 60]);
    });
    test('That (52, 101) is outside the X and Y boundaries', () => {
        expect(() => validateCoords('52', '101')).toThrow('Y Coord must lie between 0 and 100');
    });
    test('That (20,50,200000) is within the X, Y and price boundaries', () => {
        expect(validate3Tuple('20', '50','200000')).toStrictEqual([20, 50,200000]);
    });

    test('That NaN Validate Coords fails when either X or Y are NaN', () => {
        expect(() => validateCoords('a', '10')).toThrow('X Coord must be an integer');
    })
});