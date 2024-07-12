import db from "../SqLite.js";
import {seed} from "../Factories/EventArtist.js";
const createEventArtistTable = `create table if not exists event_artist
                           (
                               eventID INTEGER,
                               artistID INTEGER,
                               PRIMARY KEY (eventID,artistID),
                               FOREIGN KEY (eventID) REFERENCES event(ID) ON DELETE CASCADE,
                               FOREIGN KEY (artistID) REFERENCES artist(ID) ON DELETE CASCADE
                           )`;
db.prepare(createEventArtistTable).run();
seed();