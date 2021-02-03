import axios from 'axios';

const backendUrl = process.env.BACKEND_URL || 'http://localhost:4000';

/**
 * Returns all of the (x, y, price) Points
 * @return {Promise<Array<Object>>}
 */
const getAllPoints = () => {
    return axios.get(`${backendUrl}/points`)
      .then((json={}) => json.data);
};

/**
 * Returns a single (x, y, price) Point
 * @param x - The X Coordinate to query
 * @param y - The Y Coordinate to query
 * @return {Promise<Array<Object>>}
 */
const getSinglePoint = (x, y) => {
    return axios.get(`${backendUrl}/point/${x}/${y}`)
        .then((json={}) => json.data);
};

/**
 * Add a new Point into the backend DB
 * @param x - The X Coordinate to add
 * @param y - The Y Coordinate to add
 * @param price - The price to add
 * @return {Promise<Object>}
 */
const addPoint = (x, y, price) => {
    return axios.post(`${backendUrl}/point`, {x, y, price})
};

export { getAllPoints, getSinglePoint, addPoint }