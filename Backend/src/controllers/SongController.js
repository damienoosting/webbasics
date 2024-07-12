import song from "../routes/Song.js";
import {
    queryAddSong,
    queryGetAllSongs,
    queryGetSongByID,
    queryDeleteSongByID,
    queryGetSongByArtistID,
    queryGetSongByTitle
} from "../Database/Querys/Songs.js";
import {ReasonPhrases, StatusCodes} from "http-status-codes";
export function getAllSongs(req, res) {
    if (req.query.name) {
        getSongsByName(req, res);
        return;
    }
    res.json(queryGetAllSongs())
}
export function getSongsByName(req, res) {
    const title = req.query.name;
    const result = queryGetSongByTitle(title);
    if (!result) {
        return res.status(StatusCodes.NOT_FOUND).json({
            message: ReasonPhrases.NOT_FOUND,
        });
    }
    return res.status(StatusCodes.OK).json(result);
}
export function getSongsByID(req, res) {
    const ID = req.params.id;
    const result = queryGetSongByID(ID);
    if (!result) {
        return res.status(StatusCodes.NOT_FOUND).json({
            message: ReasonPhrases.NOT_FOUND,
        });
    }
    return res.status(StatusCodes.OK).json(result);
}
export function addSong(req, res) {
    const {title, length} = req.body;
    const result = queryAddSong(title, length);
    if (!result) {
        return res.status(StatusCodes.NOT_FOUND).json({
            message: ReasonPhrases.NOT_FOUND,
        });
    }
    return res.status(StatusCodes.OK).json(result);
}
export function deleteSong(req, res) {
    const ID = req.params.id;
    const result = queryDeleteSongByID(ID);
    if (!result) {
        return res.status(StatusCodes.NOT_FOUND).json({
            message: ReasonPhrases.NOT_FOUND,
        });
    }
    return res.status(StatusCodes.OK).json(result);
}
export function getSongByArtistID(req, res) {
    const ID = req.params.id;
    const result = queryGetSongByArtistID(ID);
    if (!result) {
        return res.status(StatusCodes.NOT_FOUND).json({
            message: ReasonPhrases.NOT_FOUND,
        });
    }
    return res.status(StatusCodes.OK).json(result);
}
