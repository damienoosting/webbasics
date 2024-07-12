import db from "../SqLite.js";
import eventArtist from "../Seeders/EventArtist.js";

export function seed() {
    const count = db.prepare("SELECT COUNT(*) from `event_artist`").get();

    if (count["COUNT(*)"] === 0) {
        const insert = db.prepare("INSERT INTO `event_artist` (eventID, artistID) VALUES (@eventID, @artistID)");
        eventArtist.forEach((values) => {
            insert.run(values);
        });
    }
}