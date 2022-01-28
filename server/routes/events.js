import express from 'express';
import {getAllEvents, getUpcomingEvents, createEvent, deleteEvent, getEvent, updateEvent} from '../controllers/events.js';

const eventRouter = express.Router();

eventRouter.route('/').get(getAllEvents);
eventRouter.route('/host-event').post(createEvent);
eventRouter.route('/upcomingevents/:count').get(getUpcomingEvents);
eventRouter.route('/:id').get(getEvent).patch(updateEvent).delete(deleteEvent);

export {eventRouter};
