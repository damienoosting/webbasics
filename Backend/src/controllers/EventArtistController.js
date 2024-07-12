import {queryGetEventsByArtist, queryGetArtistByEvents} from "../Database/Querys/EventArtist.js";
import {ReasonPhrases, StatusCodes} from "http-status-codes";

export function getEventsByArtist(req,res){
    const ID = req.params.id;
    const result = queryGetEventsByArtist(ID);
    if (!result) {
        return res.status(StatusCodes.NOT_FOUND).json({
            message: ReasonPhrases.NOT_FOUND,
        });
    }
    return res.status(StatusCodes.OK).json(result);
}
export function getArtistsByEvent(req,res){
    const ID = req.params.id;
    const result = queryGetArtistByEvents(ID);
    if (!result) {
        return res.status(StatusCodes.NOT_FOUND).json({
            message: ReasonPhrases.NOT_FOUND,
        });
    }
    return res.status(StatusCodes.OK).json(result);
}