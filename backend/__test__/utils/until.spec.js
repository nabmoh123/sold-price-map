const until = require('../../src/utils/until');

describe('Until utility function', () => {
    test('That until returns only the result when a promise successfully resolves', () => {
        const successfullPromise = new Promise((resolve) => {
            return resolve(true);
        });

        expect(until(successfullPromise)).resolves.toStrictEqual([true]);
    });
    test('That until returns only the error when a promise fails', () => {
        const rejectedPromise = new Promise((resolve,reject) => {
            return reject(false);
        });

        expect(until(rejectedPromise)).resolves.toStrictEqual([null, false]);
    });
});