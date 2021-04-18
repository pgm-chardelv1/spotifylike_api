import * as songService from '../src/api/services/songService.js';

describe('Tests to an sqlite3 database for songs', () => {
  it('should return an array with songs', async () => {
    const songs = await songService.getSongs();
    expect(Array.isArray(songs)).toBe(true);
    expect(songs.length).toBeGreaterThan(0);
  });

  it('should return a single song', async () => {
    const songId = 'b7a26d39-41a5-408d-8410-bfa483854aed';
    const song = await songService.getSongById(songId);
    expect(song).toMatchObject({
      id: expect.any(String),
      title: expect.any(String),
      artist: expect.any(String),
      uri: expect.any(String),
      date_created: expect.any(Number),
    })
  });

  it('should return a message and not a song', async () => {
    const songId = 'bbb';
    const response = await songService.getSongById(songId);
    expect(response).toHaveProperty('message');
  })

  it('should create a song', async () => {
    const song = {
      id: 'aaa',
      title: 'aaa',
      artist: 'aaa',
      uri: 'aaa',
      date_created: 1
    };
    const response = await songService.createSong(song);
    expect(response).resolves;
  });

  it('should return a message and not create a song', async () => {
    const song = {
      id: 'aaa',
      title: 'aaa',
      artist: 'aaa',
      uri: 'aaa',
      dateCreated: 145
    };
    const response = await songService.createSong(song);
    expect(response).toEqual([ expect.any(Number) ]);
  })

  it('should update a song with song id', async () => {
    const songId = 'aaa';
    const song = {
      uri: 'bbb'
    };
    const response = await songService.updateSong(songId, song);
    expect(response).toBe(1);
  });

  it('should return a message and not update a song', async () => {
    const songId = 'bbb';
    const song = {
      uri: 'bbb',
    }
    const response = await songService.updateSong(songId, song);
    expect(response).toHaveProperty('message');
    expect(response.message).toEqual('Could not update song with id: bbb.');
  })

  it('should delete a song with song id', async () => {
    const songId = 'aaa';
    const response = await songService.deleteSong(songId);
    expect(response).toBe(1);
  })

  it('should return a message and not delete a song', async () => {
    const songId = 'aaa';
    const response = await songService.deleteSong(songId);
    expect(response).toHaveProperty('message');
  })
})