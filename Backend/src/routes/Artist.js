import express from "express";
import {
    getAllArtists,
    getArtistByName,
    addArtist,
    getArtistByID,
    deleteArtist,
    editArtist
} from "../controllers/ArtistController.js";
const router = express.Router();
//done! werkt allemaal
router.get("/", getAllArtists)
router.get("/", getArtistByName)
router.get("/:id", getArtistByID)
router.delete("/:id", deleteArtist)
router.put("/:id", editArtist)
router.post("/", addArtist)
export default router;