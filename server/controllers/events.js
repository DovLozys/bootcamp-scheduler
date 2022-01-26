import selectData from "../db/scripts/selectData.js";
import db from "../db/connection.js";

async function getAllEvents(req, res) {
  const events = await selectData();

  res.json({
    success: true,
    message: "all events",
    payload: events,
  });
}

// will have the rest of get queries here, use db.query() for sending SQL to db

async function getUpcomingEvents(req, res) {
  const data = await db.query("SELECT * FROM events ORDER BY id ASC LIMIT $1;", [
    Number(req.params.count),
  ]);
  console.log(req.params.count);
  res.json({
    success: true,
    message: "all events",
    payload: data,
  });
}

// will create en event

async function createEvent(req, res) {
  const data = await db.query(
    "INSERT INTO events (event_name, event_description, event_date, event_start, event_duration, event_category) VALUES ($1, $2, $3, $4, $5, $6); ",
    [
      req.body.event_name,
      req.body.event_description,
      req.body.event_date,
      req.body.event_start,
      req.body.event_duration,
      req.body.event_category,
    ]
  );
  res.json({
    success: true,
    message: "event added",
  });
}

// will delete an event by id

async function deleteEvent(req, res) {
  const data = await db.query(`DELETE FROM events WHERE id = $1;`, [
    Number(req.params.id),
  ]);
  res.json({
    success: true,
    message: `event removed`,
  });
}

// will get an event by id

async function getEvent(req, res) {
  const data = await db.query(`SELECT * FROM events WHERE id = $1;`, [
    Number(req.params.id),
  ]);
  res.json({
    success: true,
    message: `found event`,
    payload: data.rows,
  });
}

async function updateEvent(req, res) {
  const data = await db.query(
    `UPDATE events SET event_description = $1 WHERE id = $2 RETURNING *;`,
    [req.body.event_description, Number(req.params.id)]
  );

  res.json({
    success: true,
    message: `event updated`,
    payload: data.rows,
  });
}

export {
  getAllEvents,
  getUpcomingEvents,
  createEvent,
  deleteEvent,
  getEvent,
  updateEvent,
};
