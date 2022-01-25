import db from '../index.js';

export default async function selectData() {
  const data = await db.query('SELECT * FROM events ORDER BY id ASC;');

  return data;
}
