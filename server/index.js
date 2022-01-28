import express from 'express';
import cors from 'cors';
import {eventRouter} from './routes/events.js';

const app = express();
const port = process.env.PORT || 5500;

app.use(express.json());
app.use(cors());
app.use('/api/v1/events', eventRouter);

app.get('/', (req, res) => {
    res.send('Events App API');
});

app.listen(port, console.log(`Server listening on port ${port}`));
