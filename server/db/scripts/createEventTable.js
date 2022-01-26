import db from '../connection.js';
import { dummyProfile } from './dummyData.js';

function createEventTable() {
  db.query(
    'CREATE TABLE IF NOT EXISTS events (id SERIAL PRIMARY KEY, event_name TEXT, event_description TEXT,event_date TEXT, event_start TEXT, event_duration TEXT, event_category TEXT);'
  );
}

// function createProfilesTable() {
//   return query(
//     "CREATE TABLE IF NOT EXISTS profiles (id SERIAL PRIMARY KEY, profile_name TEXT, event_name TEXT, event_date TEXT, event_start TEXT);"
//   );
// }

// async function pooopulateProfiles(dataa) {
//   console.log(dataa.profile_name);

//   const res = dataa.forEach(async (el) => {
//     const data = await query(
//       "INSERT INTO profiles (profile_name, event_name, event_start, event_date) VALUES ($1, $2, $3, $4 );",
//       [el.profile_name, el.event_name, el.event_start, el.event_date]
//     );
//     return data;
//   });
//   return res;
// }

// async function deleteProfile() {
//   await query("DELETE FROM profiles;");
// }

createEventTable();
// createProfilesTable();
// pooopulateProfiles(dummyProfile);
// deleteProfile();
