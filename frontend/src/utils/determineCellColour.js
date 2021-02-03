import RainbowVis from 'rainbowvis.js';

const priceLowerBoundary = 10000;
const priceUpperBoundary = 10000000;

/**
 * Find the appropriate Colour to represent a price based on its boundaries
 *
 * @param {Number} price - The price to convert into a colour
 *
 * @return {String} Returns a Hash of the colour, e.g #000000
 */
export default function determineCellColour(price) {
    const colourGradient = new RainbowVis();
    colourGradient.setNumberRange(priceLowerBoundary, priceUpperBoundary);
    colourGradient.setSpectrum('green', 'orange', 'red');

    return colourGradient.colourAt(price);
}