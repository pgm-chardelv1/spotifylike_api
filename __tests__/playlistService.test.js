import * as playlistService from '../src/api/services/playlistService.js';

describe('Tests to an sqlite3 database for playlists', () => {
  it('should return an array with some playlists', async () => {
    const playlists = await playlistService.getPlaylists();
    expect(Array.isArray(playlists)).toBe(true);
    expect(playlists.length).toBeGreaterThan(0);
  });

  it('should return a single playlist', async () => {
    const playlistId = '96fe95b1-3095-4e9f-9af6-c0381b62b983';
    const playlist1 = await playlistService.getPlaylistById(playlistId);
    expect(playlist1).toMatchObject({
      id: expect.any(String),
      title: expect.any(String),
      description: expect.any(String),
      owner: expect.any(String),
      date_created: expect.any(Number),
      date_modified: expect.any(Number),
      songs_list: expect.any(String),
    });
    const invalidPlaylist = await playlistService.getPlaylistById('lfzblhf');
    expect(invalidPlaylist).resolves;
    expect(invalidPlaylist).toHaveProperty('message');
  });

  it('should return a message and not a playlist', async () => {
    const playlistId = 'bbb';
    const response = await playlistService.getPlaylistById(playlistId);
    expect(response).toHaveProperty('message');
  })

  it('should update a playlist', async () => {
    const playlistId = '96fe95b1-3095-4e9f-9af6-c0381b62b983';
    const playlist2 = {
      title: 'Avalanche!'
    };
    const playlistToCreate = await playlistService.updatePlaylist(playlistId, playlist2);
    expect(playlistToCreate).resolves;
  });

  it('should not update a playlist', async () => {
    const playlistId = 'bbb';
    const playlist2 = {
      title: 'Avalanche'
    }
    const invalidPlaylistToUpdate = await playlistService.updatePlaylist(playlistId, playlist2);
    expect(invalidPlaylistToUpdate).toHaveProperty('message');
    expect(invalidPlaylistToUpdate.message).toEqual('Could not update playlist with id: bbb.');
  })

  it('should create a playlist', async () => {
    const playlist3 = {
      id: 'aaa',
      title: 'Super real playlist',
      description: 'With real music on it',
      owner: 'pinkfluffyunicorns',
      dateCreated: Date.now(),
      dateModified: Date.now(),
      songs: ['3a709ec5-5b30-4c12-95a5-8f7418d4e414', '3c1bb633-8757-4c6c-9422-433ff7e5e1ab']
    };
    const createdPlaylist = await playlistService.createPlaylist(playlist3);
    expect(createdPlaylist).toBe(undefined);
  });

  it('should return an error and not create a playlist', async () => {
    const playlist4 = {
      id: 'aab',
      title: 'aaab',
      description: 'aaaab',
      owner: 'imaginary',
      dateCreated: Date.now(),
      dateModified: Date.now(),
      songs: ['3a709ec5-5b30-4c12-95a5-8f7418d4e414']
    };
    const invalidPlaylist2 = await playlistService.createPlaylist(playlist4);
    expect(invalidPlaylist2).toHaveProperty('message');
  })

  it('should delete a playlist', async () => {
    const playlistId = 'aaa';
    const deletedPlaylist = await playlistService.deletePlaylist(playlistId);
    expect(deletedPlaylist).toEqual(1);
  });

  it('should return a message and not delete a playlist', async () => {
    const playlistId = 'bbb';
    const deletedPlaylist = await playlistService.deletePlaylist(playlistId);
    expect(deletedPlaylist).toHaveProperty('message');
  })

  it('should return playlists from user pinkfluffyunicorns', async () => {
    const owner = 'pinkfluffyunicorns';
    const playlistsToReturn = await playlistService.getPlaylistsByOwner(owner);
    const obj = {
      id: expect.any(String),
      title: expect.any(String),
      description: expect.any(String),
      owner: expect.any(String),
      date_created: expect.any(Number),
      date_modified: expect.any(Number),
      songs_list: expect.any(String),
    }
    expect(Array.isArray(playlistsToReturn)).toBe(true);
  });

  it('should return a message and not a playlist', async () => {
    const owner = 'imaginary';
    const response = await playlistService.getPlaylistsByOwner(owner);
    expect(response).toHaveProperty('message');
    expect(response.message).toEqual('Could not get playlists from owner with username imaginary');
  })

});