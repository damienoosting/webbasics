import Database from "better-sqlite3";
let db;
try {
    db = new Database("C:\\Users\\Damien\\Documents\\Webbasics\\Backend\\db\\data.sqlite")
//    dit is de path vanaf root. werkt ook niet
}catch (e){
    console.error("unable to initialise db",e);
    throw e;
}
export default db;