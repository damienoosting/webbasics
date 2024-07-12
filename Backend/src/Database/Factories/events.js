import db from "../SqLite.js";
import event from "../Seeders/Events.js";

export function seed() {
    const count = db.prepare("SELECT COUNT(*) FROM event").get();

    if (count["COUNT(*)"] === 0) {
        const insertEvent = db.prepare("INSERT INTO event (name, date, location) VALUES (@name, @date,@location)");

        event.forEach((event)=>{
            insertEvent.run(event)
        });
    }
}