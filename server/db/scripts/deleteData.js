import db from '../index.js';

async function deleteData() {
    await db.query('DELETE FROM events;');
}

deleteData();
