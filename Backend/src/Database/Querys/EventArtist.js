import db from "../SqLite.js";
export function queryGetEventsByArtist(artistID){
   return db.prepare("SELECT * FROM event s JOIN event_artist l ON s.ID = l.eventID WHERE l.artistID = "+artistID)
         .all();
}
export function queryGetArtistByEvents(eventID) {
   return db.prepare("SELECT * FROM artist s JOIN event_artist l ON s.ID = l.artistID WHERE l.eventID = " + eventID)
       .all();
}