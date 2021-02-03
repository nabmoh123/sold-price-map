let add3Tuple, getAll3Tuples, get3Tuple;

const mockDBUpdate = jest.fn();
const mockDBInsert = jest.fn();
const mockDBFind = jest.fn();
const mockDBFindOne = jest.fn();

beforeAll(() => {

    // Build the DB Service mock
    const mockDBInstance = {};
    mockDBInstance.update = mockDBUpdate;
    mockDBInstance.insert = mockDBInsert;
    mockDBInstance.find = mockDBFind;
    mockDBInstance.findOne = mockDBFindOne;

    const dbMock = class DataStore {
        constructor() {
            return mockDBInstance;
        }
    };
    jest.mock('nedb', () => dbMock);

    ({getAll3Tuples,add3Tuple,get3Tuple} = require('../../src/services/dbService'));
});

beforeEach(() => {
    mockDBUpdate.mockClear();
    mockDBInsert.mockClear();
    mockDBFind.mockClear();
    mockDBFindOne.mockClear();
});

describe('Adding entries into the DB', () => {
    test('That new entries are added into the DB', () => {
        const updateEntry = {x:10, y:30, price: 800000};

        // DB Update function should not throw any errors
        mockDBUpdate.mockImplementationOnce((record, setFields, options, callback) => {
            callback(null);
        });

        // Resolved response should be true, and db.update should have been called
        expect(add3Tuple(updateEntry)).resolves.toBeTruthy();
        expect(mockDBUpdate).toHaveBeenCalledTimes(1);
        expect(mockDBInsert).not.toHaveBeenCalled();
    });
    test('That errors from the DB insert are returned as a rejected promise', () => {
        mockDBUpdate.mockImplementationOnce((record, setFields, options, callback) => {
            // Throw mock error
            throw callback(new Error('Failed to insert data'))
        });

        // Expect the add3Tuple promise to reject with the mock error
        expect(add3Tuple(10,10,30000)).rejects.toThrow('Failed to insert data');
    });
});

describe('Finding all 3 Tuples in the DB', () => {
    test('That test data is returned', () => {
        const findAllTestData = [{x: 10, y:10, price: 20000}, {x:50, y:10, price: 300000}, {x:100, y:50, price:50000}];

        mockDBFind.mockImplementationOnce((query, callback) => {
            // Return test response
            callback(null, findAllTestData);
        });

        // Expect the getAll3Tuples promise to resolve to the test data
        expect(getAll3Tuples()).resolves.toStrictEqual(findAllTestData);
    });
    test('That errors from the DB find are returned as a rejected promise', () => {
        mockDBFind.mockImplementationOnce((query, callback) => {
            // Throw mock error
            throw callback(new Error('Failed to find data'))
        });

        // Expect the getAll3Tuples promise to reject with the mock error
        expect(getAll3Tuples()).rejects.toThrow('Failed to find data');
    });
});

describe('Finding a single 3 Tuple in the DB', () => {
    test('That an array of one record is returned when the DB query matches', () => {
        const findOneTestData = {x: 40, y:40, price:300000};

        mockDBFindOne.mockImplementationOnce((query, callback) => {
            // Return the test response only if the query matches
            if (JSON.stringify(query) === JSON.stringify({x: 40, y:40}))
                callback(null, findOneTestData);
            // Else return an empty array
            else
                callback(null, []);
        });

        const query = {x: 40, y:40};

        // Expect the get3Tuple promise to resolve to the test data
        expect(get3Tuple(query.x, query.y)).resolves.toStrictEqual([findOneTestData]);
    });
    test('That an empty array is returned when no DB entries match the query', () => {
        const findOneTestData = {x: 10, y:40, price:300000};

        mockDBFindOne.mockImplementationOnce((query, callback) => {
            // Return the test response only if the query matches
            if (JSON.stringify(query) === JSON.stringify({x: 10, y:40}))
                callback(null, findOneTestData);
            // Else return null
            else
                callback(null, null);
        });

        const query = {x: 20, y:20};

        // Expect the get3Tuple promise to resolve to an empty array
        expect(get3Tuple(query.x, query.y)).resolves.toStrictEqual([]);
    });
    test('That errors from the DB findOne are returned as a rejected promise', () => {
        mockDBFindOne.mockImplementationOnce((query, callback) => {
            // Throw mock error
            throw callback(new Error('Failed to find data'));
        });

        // Expect the get3Tuple promise to reject with the mock error
        expect(get3Tuple(1,1)).rejects.toThrow('Failed to find data');
    });
});