import db from '../connection.js';

async function deleteData() {
    await db.query('DELETE FROM events;');
}

deleteData();
