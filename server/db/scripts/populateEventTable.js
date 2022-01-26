import {pool} from '../connection.js';
import {dummyEventArr} from './dummyData.js';

async function populateEventTable() {
  dummyEventArr.forEach(async (e) => {
    await pool.query(
      'INSERT INTO events (event_name, event_description, event_date, event_start, event_duration, event_category) VALUES ($1, $2, $3, $4, $5, $6);',
      [e.name, e.description, e.date, e.start, e.duration, e.category]
    );
  });
  pool.end();
}

populateEventTable();
