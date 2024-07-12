import db from "../SqLite.js";
import {seed} from "../Factories/Artist.js";


const createArtistTable = `create table if not exists artist
                           (
                               ID INTEGER
                               PRIMARY
                               KEY AUTOINCREMENT,
                               name
                               TEXT,
                               genre
                               TEXT,
                               biografy
                               TEXT
                           )`;
db.prepare(createArtistTable).run();
seed();