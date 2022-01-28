import {pool} from '../db/connection.js';

async function queryAllEvents() {
    const result = await pool.query('SELECT * FROM events ORDER BY id ASC;');

    return result.rows;
}

export {queryAllEvents};
