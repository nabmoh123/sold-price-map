/**
 * A utility function allowing for clean error handling.
 *
 * @param {Promise} promise - The promise to resolve
 *
 * @return {Promise<Array>} Returns the resolved value or any errors encountered while trying to resolve the promise.
 */
until = (promise) => {
    return promise.then(data => {
        return [data]
    })
    .catch(err => [null, err])
};

module.exports = until;