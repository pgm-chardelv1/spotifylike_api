/**
 * Song model
 */
 export default class Song {
  constructor(id, title, artist, uri, dateCreated) {
    this.id = id;
    this.title = title;
    this.artist = artist;
    this.uri = uri;
    this.dateCreated = dateCreated;
  }
}