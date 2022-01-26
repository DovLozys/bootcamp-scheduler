import {pool} from '../db/connection.js';

function getAllEvents() {
    const result = pool.query('SELECT * FROM events');

    return result.rows;
}

export {getAllEvents};
