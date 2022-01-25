import db from '../db/connection.js';

function getAllEvents() {
    const result = db.query('SELECT * FROM events');

    return result.rows;
}

export {getAllEvents};
