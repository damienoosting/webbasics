import {
    queryAddEvent,
    queryDeleteEvent,
    queryEditEvent,
    queryGetAllEvents,
    queryGetEventByID,
    queryGetEventByName
} from "../Database/Querys/Event.js";
import {ReasonPhrases, StatusCodes} from "http-status-codes";
export function getAllEvents(req, res) {
    if (req.query.name){
        getEventByName(req, res);
        return;
    }
    return res.json(queryGetAllEvents());
}
export function getEventByName(req, res) {
    const name = req.query.name;
    const result = queryGetEventByName(name);
    if (!result) {
        return res.status(StatusCodes.NOT_FOUND).json({
            message: ReasonPhrases.NOT_FOUND,
        });
    }
    //statuscode 200(ok) en geeft de data terug in json
    return res.status(StatusCodes.OK).json(result);
}
export function getEventByID(req, res) {
    const ID = req.params.id;
    const result = queryGetEventByID(ID);
    if (!result) {
        return res.status(StatusCodes.NOT_FOUND).json({
            message: ReasonPhrases.NOT_FOUND,
        });
    }
    //statuscode 200(ok) en geeft de data terug in json
    return res.status(StatusCodes.OK).json(result);
}
export function deleteEvent(req, res) {
    const ID = req.params.id;
    const result = queryDeleteEvent(ID);
    if (!result) {
        return res.status(StatusCodes.NOT_FOUND).json({
            message: ReasonPhrases.NOT_FOUND,
        });
    }
    //statuscode 200(ok) en geeft de verwijderde data terug in json
    return res.status(StatusCodes.OK).json(result);
}
export function addEvent(req,res){
    const {name, date, location} = req.body;

    const result = queryAddEvent(name,date,location);
    if (!result) {
        return res.status(StatusCodes.NOT_FOUND).json({
            message: ReasonPhrases.NOT_FOUND,
        });
    }
    //statuscode 200(ok) en geeft de aanpassingen terug
    return res.status(StatusCodes.CREATED).json(result);
}
export function editEvent(req,res){
    const ID = req.params.id;
    const {name,date,location} = req.body;
    const result = queryEditEvent(name,date,location,ID);

    if (!result) {
        return res.status(StatusCodes.NOT_FOUND).json({
            message: ReasonPhrases.NOT_FOUND,
        });
    }
    //statuscode 200(ok) en geeft de aanpassingen terug
    return res.status(StatusCodes.OK).json(result);
}