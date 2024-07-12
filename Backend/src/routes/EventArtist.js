import express from "express";
import {getEventsByArtist,getArtistsByEvent} from "../controllers/EventArtistController.js";
const router = express.Router();
router.get("/artist/:id", getEventsByArtist);
router.get("/event/:id", getArtistsByEvent);
export default router;