import db from "../SqLite.js";
import songs from "../Seeders/Songs.js";


export function seed() {
    const count = db.prepare("SELECT COUNT(*) FROM song").get();


    if (count["COUNT(*)"] === 0) {
        const insertSong = db.prepare("INSERT INTO `song` (`title`, `length`, `artistID`) VALUES (@title, @length, @artistID)");

        songs.forEach((song) => {
            insertSong.run(song);
        });
    }
}