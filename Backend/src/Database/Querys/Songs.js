import db from "../SqLite.js";
export function queryGetAllSongs() {
    return db.prepare("SELECT * FROM `song`").all();
}
export function queryGetSongByTitle(name) {
    return db.prepare("SELECT * FROM `song` WHERE LOWER(`title`) = LOWER(?)").all(name);
}
export function queryDeleteSongByID(ID) {
    return db.prepare("DELETE FROM `song` WHERE `ID` = " + ID).run();
}
export function queryGetSongByID(ID) {
    return db.prepare("SELECT * FROM `song` WHERE `ID` = "+ID).get();
}
export function queryGetSongByArtistID(artistID) {
    return db.prepare("SELECT * FROM `song` WHERE `artistID` = "+artistID).all();
}
export function queryAddSong(newtitle, newlength,artistID) {
    if (artistID == null){
        return db.prepare("INSERT INTO `song` (`title`, `length`) VALUES (?,?)").run(newtitle,newlength);
    }
    else {
        return db.prepare("INSERT INTO `song` (`title`, `length`,`artistID`) VALUES (?,?,?)").run(newtitle,newlength,artistID);
    }
}
