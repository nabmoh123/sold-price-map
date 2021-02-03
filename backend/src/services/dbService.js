const DataStore = require('nedb');

const db = new DataStore();

/**
 * Adds an (x, y, price) tuple into the Database
 *
 * @param {Number} x - X Co-ordinate
 * @param {Number} y - Y Co-ordinate
 * @param {Number} price - Price of property at (x, y)
 *
 * @return {Promise}
 */
const add3Tuple = async (x, y, price) => {

    // Promisify the db response
    return new Promise((resolve, reject) => {
        // Update existing entry or Insert new data if it doesnt exist
        db.update({x:x, y:y}, {$set: { price: price }}, {upsert: true}, (err) => {
            if (err)
                return reject(err);
            else
                return resolve(true);
        });
    });
};

/**
 * Returns all (x, y, price) tuples in the Database
 *
 * @return {Promise<Array.Object>}
 */
const getAll3Tuples = async () => {

    // Promisify the db response
    return new Promise((resolve, reject) => {
        db.find({}, (err, results) => {
            if (err) {
                return reject(err)
            }
            return resolve(results);
        });
    });
};

/**
 * Returns a single (x, y, price) tuple for a given Coord
 *
 * @param {Number} x X Coordinate
 * @param {Number} y Y Coordinate
 *
 * @return {Promise<Object>}
 */
const get3Tuple = async (x, y) => {

    // Promisify the db response
    return new Promise((resolve, reject) => {
        db.findOne({x: x, y: y}, (err, result) => {
            if (err) {
                return reject(err)
            }
            // If a result was found with the matching X and Y Coord, return array of one result
            if (result) {
                return resolve([result]);
            }
            // If no result was found, then return empty array
            else {
                return resolve([]);
            }
        });
    });
};

module.exports = {
    add3Tuple,
    getAll3Tuples,
    get3Tuple,
};
