const xLowerBoundary = process.env.X_LOWER_POINT_BOUNDARY || 0;
const xUpperBoundary = process.env.X_UPPER_POINT_BOUNDARY || 100;

const yLowerBoundary = process.env.Y_LOWER_POINT_BOUNDARY || 0;
const yUpperBoundary = process.env.Y_UPPER_POINT_BOUNDARY || 100;

const priceLowerBoundary = process.env.PRICE_LOWER_BOUNDARY || 10000;
const priceUpperBoundary = process.env.PRICE_UPPER_BOUNDARY || 10000000;

/**
 * Validates that the co-ordinates received
 * @param {String} x - The X Coordinate to validate
 * @param {String} y - The Y Coordinate to validate
 *
 * @return {Array.Number} Returns an array with the converted X and Y Coords as Numbers.
 *
 * @throws {TypeError} Thrown if the x and y Parameters are not Numbers.
 * @throws {RangeError} Thrown if the x and y Parameters are outside the accepted range.
 */
const validateCoords = (x, y) => {
    let xInt, yInt;
    try {
        xInt = validateNumber(x, xLowerBoundary, xUpperBoundary, 'X Coord');
        yInt = validateNumber(y, yLowerBoundary, yUpperBoundary, 'Y Coord');
    } catch (err) {
        throw err;
    }

    return [xInt, yInt];
};

/**
 * Validates the 3-Tuple of (x, y, price)
 * @param {String} x -
 * @param {String} y -
 * @param {String} price -
 *
 * @return {Array.Number} Returns an array with the converted X and Y Coords along with the Price as Numbers.
 *
 * @throws {TypeError} Thrown if the x, y or price Parameters are not Numbers.
 * @throws {RangeError} Thrown if the x, y or price Parameters are outside their accepted range.
 */
const validate3Tuple = (x, y, price) => {
    let xInt, yInt, priceInt;
    try {
        xInt = validateNumber(x, xLowerBoundary, xUpperBoundary, 'X Coord');
        yInt = validateNumber(y, yLowerBoundary, yUpperBoundary, 'Y Coord');
        priceInt = validateNumber(price, priceLowerBoundary, priceUpperBoundary, 'Price');
    } catch (err) {
        throw err;
    }

    return [xInt, yInt, priceInt];
};

const validateNumber = (number, lowerBoundary, upperBoundary, variableName) => {
    let numberInt;

    numberInt = parseInt(number);
    if (isNaN(numberInt)) {
        throw TypeError(variableName + ' must be an integer');
    }

    if (numberInt < lowerBoundary || numberInt > upperBoundary) {
        throw RangeError(variableName + ' must lie between ' + lowerBoundary + ' and ' + upperBoundary);
    }

    return numberInt;
};


module.exports = {
    validateCoords,
    validate3Tuple,
};