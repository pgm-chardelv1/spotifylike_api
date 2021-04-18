/**
 * Playlist model
 */
export default class Playlist {
  constructor(id, title, description, owner, dateCreated, dateModified, songs) {
    this.id = id;
    this.title = title;
    this.description = description;
    this.owner = owner;
    this.dateCreated = dateCreated;
    this.dateModified = dateModified;
    this.songs = songs;
  }
}