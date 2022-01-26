import express from "express";
import {getAllEvents, getUpcomingEvents, createEvent, deleteEvent, getEvent, updateEvent} from "../controllers/events.js";

// import {
//   getProfileHistory,
//   deleteProfileHistory,
// } from "../controllers/profiles";

const eventRouter = express.Router();

eventRouter.route("/").get(getAllEvents);
eventRouter.route("/host-event").post(createEvent);
eventRouter.route("/upcomingevents/:count").get(getUpcomingEvents);
eventRouter.route("/:id").delete(deleteEvent).get(getEvent).patch(updateEvent);

//user profile stuff

// eventRouter
//   .route("/profile/:name")
//   .get(getProfileHistory)
//   .delete(deleteProfileHistory);

export {eventRouter};
