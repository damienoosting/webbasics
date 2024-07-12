import express from "express";
import {
    deleteEvent,
    getAllEvents,
    getEventByID,
    getEventByName,
    addEvent,
    editEvent
} from "../controllers/EventController.js";
const router = express.Router();
//done! werken allemaal
router.get("/",getAllEvents);
router.get("/",getEventByName);
router.get("/:id",getEventByID);
router.delete("/:id",deleteEvent);
router.post("/",addEvent);
router.put("/:id",editEvent);
export default router;