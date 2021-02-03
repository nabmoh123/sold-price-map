const express = require('express');
const { validateCoords, validate3Tuple } = require('../utils/validateData');
const until = require('../utils/until');
const dbService = require('../services/dbService');

const router = express.Router();

// Add a new entry into the grid
router.post('/point', async (req, res, next) => {
    const x = req.body.x;
    const y = req.body.y;
    const price = req.body.price;

    // Validate input X and Y Coords
    try {
        validate3Tuple(x, y, price);
    } catch (validateError) {
        validateError.code = 400;
        next(validateError);
        return;
    }

    // Add new Entry
    let [, dbError] = await until(dbService.add3Tuple(x, y, price));
    if (dbError) {
        dbError.code = 500;
        next(dbError);
        return;
    }

    res.status(200);
    res.send('Successfully added entry');
});

// Return all entries in the grid
router.get('/points', async (req, res, next) => {
    let [results, dbError] = await until(dbService.getAll3Tuples());
    if (dbError) {
        dbError.code = 400;
        next(dbError);
        return;
    }
    res.status(200);
    res.json(results);
});

// Return a single entry in the grid
router.get('/point/:xcoord/:ycoord', async (req, res, next) => {
    const x = req.params.xcoord;
    const y = req.params.ycoord;

    // Validate input X and Y Coords
    let xInt, yInt;
    try {
        [xInt, yInt] = validateCoords(x, y);
    } catch (validateError) {
        validateError.code = 400;
        next(validateError, req, res);
        return;
    }

    // Search for entry in DB
    const [dbEntry, dbError] = await until(dbService.get3Tuple(xInt, yInt));
    if (dbError) {
        dbError.code = 500;
        next(dbError, req, res);
        return;
    }

    // Entry found in DB
    res.status(200);
    res.json(dbEntry);
});

module.exports = router;
