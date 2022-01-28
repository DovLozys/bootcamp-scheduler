import {pool} from '../connection.js';

async function selectData() {
  const data = await pool.query('SELECT * FROM events ORDER BY id ASC;');

  console.log(data);
}

selectData();
