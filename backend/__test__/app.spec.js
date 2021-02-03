let mockExpressListenFunc = jest.fn();
let mockExpressUseFunc = jest.fn();
let initialiseApplication;

beforeAll(() => {
    // Build the Express mocked function
    const mockExpressFunc = () => ({
        listen: mockExpressListenFunc,
        use: mockExpressUseFunc,
    });
    mockExpressFunc.json = () => {};
    mockExpressFunc.urlencoded = () => {};

    // Mock the function calls from the express package
    jest.mock('express', () => mockExpressFunc);

    // Mock the indexRouter to return an empty object
    jest.mock('../src/routers/index', () => ({}));

    ({initialiseApplication} = require('../src/app'));
});

beforeEach(() => {
    mockExpressUseFunc.mockClear();
    mockExpressListenFunc.mockClear();
});

afterEach(() => {
    // Clear environment variables
    delete process.env.PORT;
});

describe("express application", () => {
    test("The express config is initialised with default configuration", () => {
        initialiseApplication();

        expect(mockExpressUseFunc).toHaveBeenCalledTimes(5);
        expect(mockExpressListenFunc.mock.calls[0][0]).toBe(4000);
    });

    test("That the desired port is set", () => {
        process.env.PORT = 5000;

        initialiseApplication();

        expect(mockExpressListenFunc.mock.calls[0][0]).toBe(5000);
    });

    test("That negative ports are ignored", () => {
        process.env.PORT = -200;

        initialiseApplication();

        expect(mockExpressListenFunc.mock.calls[0][0]).toBe(4000);
    });

    test("That NaN ports are ignored", () => {
        process.env.PORT = 'abc';

        initialiseApplication();

        expect(mockExpressListenFunc.mock.calls[0][0]).toBe(4000);
    })
});