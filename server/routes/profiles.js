import express from 'express';
import {getProfileHistory, deleteProfileHistory} from '../controllers/profiles.js';

const profileRouter = express.Router();

profileRouter.route('/profile/:name').get(getProfileHistory).delete(deleteProfileHistory);
