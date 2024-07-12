import db from "../SqLite.js";
import {seed} from "../Factories/events.js";

const createEventTable = `create table if not exists event
                           (
                               ID
                               INTEGER
                               PRIMARY KEY
                               autoincrement,
                               name
                               TEXT,
                               date TEXT,
                               location TEXT
                           )`;
db.prepare(createEventTable).run();
seed()