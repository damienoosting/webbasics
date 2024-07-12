import db from "../SqLite.js";
export function queryGetAllEvents() {
    // query geeft alle events terug
    return db.prepare("SELECT * FROM `event`").all();
}
export function queryGetEventByName(name) {
    //query selecteerd event op naam
    return db.prepare("SELECT * FROM `event` WHERE LOWER(`name`) = LOWER(?)").all(name);
}
export function queryDeleteEvent(ID) {
    return db.prepare("DELETE FROM `event` WHERE `ID` = " + ID).run();
}
export function queryGetEventByID(ID) {
    // query met selecteer event op ID
    return db.prepare("SELECT * FROM `event` WHERE `ID` = "+ID).get();
}
export function queryEditEvent(newname,newdate = null,newlocation = null,ID){
    return  db.prepare("UPDATE `event` SET `name` = ?,  `date` = ?, `location` = ? WHERE id = ?").run(newname,newdate,newlocation,ID);
}
export function queryAddEvent(name = null,date = null,location = null){
    return db.prepare("INSERT INTO `event` (`name`,`date`,`location`)VALUES (?,?,?)").run(name,date,location);
}