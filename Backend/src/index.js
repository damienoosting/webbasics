// Requiring the module and initializing express

import express from 'express';
import cors from 'cors';
import ArtistRouter from './routes/Artist.js';
import EventRouter from './routes/Event.js';
import SongRouter from './routes/Song.js';
import eventArtist from "./routes/EventArtist.js";
import "./Database/Migrations/Artists.js"
import "./Database/Migrations/Events.js";
import "./Database/Migrations/Songs.js";
import "./Database/Migrations/EventArtists.js";

const app = express();
//cors
app.use(cors());

// Creating a port variable to listen on later
const port = 3000;
//makes it so express uses json
app.use(express.json());


// Listening for a GET call on the root URL
app.post('/', function (req, res) {
// POST request!
});

app.use("/artist", ArtistRouter);
app.use("/event", EventRouter);
app.use("/song", SongRouter);
app.use("/lineup", eventArtist)


// Server setup, listening on port 3000 (port variable)
app.listen(port, function () {
    console.log(`Server listening on port ${port}!`);
});



