import {
    queryGetArtistByID,
    queryGetAllArtists,
    queryGetArtistByName,
    queryNewArtist,
    queryDeleteArtist,
    queryEditArtist,
} from "../Database/Querys/Artist.js";
import {ReasonPhrases, StatusCodes} from "http-status-codes";
import {queryDeleteEvent} from "../Database/Querys/Event.js";

export function getAllArtists(req, res) {
    if (req.query.name){
        getArtistByName(req,res);
        return;
    }
    return res.json(queryGetAllArtists());
}
export function getArtistByName(req, res) {
    const name = req.query.name;
    const result = queryGetArtistByName(name);
    if (!result) {
        return res.status(StatusCodes.NOT_FOUND).json({
            message: ReasonPhrases.NOT_FOUND,
        });
    }
    return res.status(StatusCodes.OK).json(result);
}
export function getArtistByID(req, res) {
    const ID = req.params.id;
    const result = queryGetArtistByID(ID);
    if (!result) {
        return res.status(StatusCodes.NOT_FOUND).json({
            message: ReasonPhrases.NOT_FOUND,
        });
    }
    // geef code 200 terug en de waarde die van result in json
    return res.status(StatusCodes.OK).json(result);
}
export function addArtist(req, res) {
    const {name, genre, bio} = req.body;
    const result = queryNewArtist(name, genre, bio);
    if (!result) {
        return res.status(StatusCodes.NOT_FOUND).json({
            message: ReasonPhrases.NOT_FOUND,
        });
    }
    // geef code 200 terug en de waarde die van result in json
    return res.status(StatusCodes.CREATED).json({
        message: name +' succefully added',
        changes: result.changes,
    });
}


export function deleteArtist(req, res) {
    const ID = req.params.id;
    const result = queryDeleteArtist(ID);
    if (!result) {
        return res.status(StatusCodes.NOT_FOUND).json({
            message: ReasonPhrases.NOT_FOUND,
        });
    }

    return res.status(StatusCodes.OK).json(result);
}
export function editArtist(req,res){
    // TODO: geeft geen error maar 0 changes.
    const ID = req.params.id;
    const {name, genre, biografy } = req.body;
    const result = queryEditArtist(ID,name,genre,biografy);
    if (!result) {
        return res.status(StatusCodes.NOT_FOUND).json({
            message: ReasonPhrases.NOT_FOUND,
        });
    }
    return res.status(StatusCodes.OK).json({
        message: name + ' updated successfully.',
        changes: result.changes, // Optional: Return number of changes made
    });
}