import express from "express";
import {
  getAllEvents,
  getUpcomingEvents,
  createEvent,
  deleteEvent,
  getEvent,
  updateEvent,
} from "../controllers/events.js";

// import {
//   getProfileHistory,
//   deleteProfileHistory,
// } from "../controllers/profiles";

const router = express.Router();

router.route("/").get(getAllEvents);
router.route("/host-event").post(createEvent);
router.route("/upcomingevents/:count").get(getUpcomingEvents);
router.route("/:id").delete(deleteEvent).get(getEvent).patch(updateEvent);

//user profile stuff

// router
//   .route("/profile/:name")
//   .get(getProfileHistory)
//   .delete(deleteProfileHistory);

export default router;
