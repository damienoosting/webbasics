import express from "express";
import {
    getSongsByID,
    getAllSongs,
    getSongsByName,
    addSong,
    deleteSong,
    getSongByArtistID
} from "../controllers/SongController.js";

const router = express.Router();

//done! werken allemaal
router.get("/", getAllSongs);
router.get("/", getSongsByName);
router.get("/:id", getSongsByID);
router.get("/artist/:id", getSongByArtistID);
router.post("/",addSong);
router.delete("/:id", deleteSong);

export default router;