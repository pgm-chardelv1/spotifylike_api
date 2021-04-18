/**
 * Validate Spotify track URI for song
 */
import { logger } from "../../services/logger.js";

export const validateSpotifyURI = async (req, res, next) => {
  try {
    const { song } = req.body;
    const match = new RegExp('/^spotify\:track\:[a-zA-Z0-9]{22}/').test(song.uri);
    if (!!match) {
      throw new Error(`${song.uri} is not a valid Spotify URI!`);
    }
    next();
  } catch (e) {
    logger.log({ level: 'error', message: e.message, label: 'uri-val' });
    res.status(400).send(e);
  }
};