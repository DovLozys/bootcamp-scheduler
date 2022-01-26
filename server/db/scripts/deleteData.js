import {pool} from '../connection.js';

async function deleteData() {
    await pool.query('DELETE FROM events;');
}

deleteData();
