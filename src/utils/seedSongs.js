/** 
 * Import packages
 */
 import fs from 'fs';
 import { v4 as uuidv4 } from 'uuid';
 
 /**
  * Import local packages
  */
 import Song from '../api/models/Song.js';
 import * as songService from '../api/services/songService.js';
 
 // !NOTICE: In order for this module to work it needs to be placed into the /db folder
 // ! Together with tracks.json
 // ! And the filename in knexMusic.js needs to be changed so it is hardcoded
 // ! Not entirely sure why

 /**
  * Read data from tracks.json file
  */
 const getData = async () => {
   try {
     const rawData = fs.readFileSync('./tracks.json');
     const data = JSON.parse(rawData);
     parseData(data);
   } catch(e) {
     console.error(e);
   }
 }
 
 /**
  * Parse the data from Spotify to match the Song model
  * @param {Object} data 
  */
 const parseData = (data) => {
   let songs = [];
   for (const track of data.items) {
     const song = new Song(
       uuidv4(), 
       track.track.name, 
       track.track.artists[0].name, 
       track.track.uri, 
       Date.now()
     );
     songs.push(song);
     addSongToDatabase(song);
   }
   console.log(songs);
 }
 
 /**
  * Add song to database
  * @param {Object} song 
  * @returns text
  */
  const addSongToDatabase = async (song) => {
   try {
     console.info(`Creating song: ${song.title} by ${song.artist}`);
     return await songService.createSong(song);
   } catch (e) {
     return console.error(e, e.message);
   }
 }
 
 // Call the function, end the process
 getData();
 process.exit(0);

