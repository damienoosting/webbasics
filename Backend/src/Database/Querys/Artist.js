import db from "../SqLite.js";

export function queryGetArtistByName(name) {
    //query met selecteer artiest op  naam
    return db.prepare("SELECT * FROM `artist` WHERE LOWER(`name`) = LOWER(?)").all(name);
}

export function queryGetArtistByID(ID) {
    //query met selecteer artiest op ID
    return db.prepare("SELECT * FROM `artist` WHERE `ID` = " + ID).get();
}

export function queryGetAllArtists() {
    // Query met selecteer alles
    return db.prepare("SELECT * FROM `artist`").all();
}

export function queryNewArtist(newName, newGenre, newBio) {
    //query met niewe artiest voor in de database
   return db.prepare("INSERT INTO `artist` (`name`,`genre`,`biografy`) VALUES (?,?,?)").run(newName, newGenre, newBio);
}

export function queryDeleteArtist(ID) {
    // query om artist te verwijderen op basis van id
    return db.prepare("DELETE FROM `artist` WHERE `ID` = " + ID).run();
}

export function queryEditArtist(ID, newName, newGenre, newBio) {
    if(newName == null) {
        const result = db.prepare("UPDATE `artist` SET `genre` = ?, `biografy` = ? WHERE `ID` = ? ").run(newGenre, newBio, ID);
        console.log(`Changes made: ${result.changes}`);
        return result;
    } else if (newGenre == null) {
        const result = db.prepare("UPDATE `artist` SET `name` = ?, `biografy` = ? WHERE `ID` = ? ").run(newName, newBio, ID);
        console.log(`Changes made: ${result.changes}`);
        return result;
    } else if (newBio == null) {
        const result = db.prepare("UPDATE `artist` SET `name` = ?,  `genre` = ? WHERE `ID` = ? ").run(newName, newGenre, ID);
        console.log(`Changes made: ${result.changes}`);
        return result;
    } else {
        const result = db.prepare("UPDATE `artist` SET `name` = ?,  `genre` = ?, `biografy` = ? WHERE `ID` = ? ").run(newName, newGenre, newBio, ID);
        console.log(`Changes made: ${result.changes}`);
        return result;
    }
}