import db from "../SqLite.js";
import {seed} from "../Factories/Songs.js";

const createSongTable = `create table if not exists song
                           (
                               ID
                               INTEGER
                               PRIMARY KEY
                               autoincrement,
                               title
                               TEXT,
                               length TEXT,
                               artistID INTEGER,
                               FOREIGN KEY(artistID) REFERENCES artist(ID) ON DELETE CASCADE
                               )`;


db.prepare(createSongTable).run();
seed();

