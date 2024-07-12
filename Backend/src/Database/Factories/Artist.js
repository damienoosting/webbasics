import db from "../SqLite.js";
import artist from "../Seeders/Artist.js";

export function seed() {
    const count = db.prepare("SELECT COUNT(*) from artist").get();

    if (count["COUNT(*)"] === 0) {
        const insertArtist = db.prepare("INSERT INTO artist (name, genre, biografy) VALUES (@name, @genre,@biografy)");
        artist.forEach((artist) => {
            insertArtist.run(artist);
        });
    }
}