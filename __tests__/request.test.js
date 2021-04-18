/**
 * Tests the HTTP requests
 */
import request from 'supertest';
import {
  app
} from '../src/index.js';

let token = '';
beforeAll((done) => {
  request(app)
    .post('/auth/login')
    .send({
      username: 'pinkfluffyunicorns',
      password: 'dancingonrainbows'
    })
    .end((err, response) => {
      token = response.body.token;
      done();
    })
});

describe('POST /auth/login', () => {
  it('should return an access token', async (done) => {
    const response = await request(app)
      .post('/auth/login')
      .send({
        username: 'pinkfluffyunicorns',
        password: 'dancingonrainbows'
      })
      .set('Accept', 'application/json');
    token = response.body.token;
    expect(response.statusCode).toEqual(200);
    expect(response.body).toHaveProperty('token');

    done();
  })
  it('should return a response', async (done) => {
    const response = await request(app)
      .post('/auth/login')
      .send({
        username: 'doesnotexist',
        password: 'notarealpassword'
      })
    expect(response.statusCode).toEqual(401);
    expect(response.body).toHaveProperty('message')
    expect(response.body.message).toEqual('Incorrect username.');

    done();
  });

  it('should return a response', async (done) => {
    const response = await request(app)
      .post('/auth/login')
      .send({
        username: 'pinkfluffyunicorns',
        password: 'dancingonbows'
      })
    expect(response.statusCode).toEqual(401);
    expect(response.body).toHaveProperty('message');
    expect(response.body.message).toEqual('Incorrect password.');

    done();
  });
});

describe('GET /', async () => {
  it('should return a message response', async (done) => {
    const response = await request(app)
      .get('/')
    expect(response.statusCode).toEqual(200);
    expect(response.body).toEqual({})

    done();
  });
});
  
describe('GET /api', async () => {
  it('should return a response 200', async (done) => {
    const response = await request(app)
      .get('/api')
    expect(response.statusCode).toEqual(200);
    expect(response.body).toHaveProperty('message')

    done();
  });
});

describe('GET /api/*', async () => {
  it('responds with JSON', async (done) => {
    await request(app)
      .get('/api/users')
      .set('Authorization', `Bearer ${token}`)
      .then((response) => {
        expect(response.statusCode).toBe(200);
        expect(response.type).toBe('application/json');
      })
      done();
  });
  it('responds with a message', async (done) => {
    await request(app)
      .get('/api/users')
      .then((response) => {
        expect(response.statusCode).toBe(401);
        expect(response).toHaveProperty('text');
        expect(response.text).toEqual('Error: User undefined is not authorized to make this request.');
      })
      done();
  });
  it('responds with JSON', async (done) => {
    await request(app)
      .get('/api/users/pinkfluffyunicorns')
      .set('Authorization', `Bearer ${token}`)
      .then((response) => {
        expect(response.statusCode).toBe(200);
        expect(response.type).toBe('application/json');
      })
      done();
  });
  it('responds with a message', async (done) => {
    await request(app)
      .get('/api/users/pinkfluffyunicorns')
      .then((response) => {
        expect(response.statusCode).toBe(401);
        expect(response).toHaveProperty('text');
        expect(response.text).toEqual('Error: User undefined is not authorized to make this request.');
      })
      done();
  });
  it('responds with JSON', async (done) => {
    await request(app)
      .get('/api/songs')
      .set('Authorization', `Bearer ${token}`)
      .then((response) => {
        expect(response.statusCode).toBe(200);
        expect(response.type).toBe('application/json');
      })
      done();
  });
  it('responds with JSON', async (done) => {
    await request(app)
      .get('/api/songs')
      .then((response) => {
        expect(response.statusCode).toBe(200);
        expect(response.type).toBe('application/json');
      })
      done();
  });
  it('responds with JSON', async (done) => {
    await request(app)
      .get('/api/songs/9769a275-22da-4b52-9b62-d869d29768dc')
      .set('Authorization', `Bearer ${token}`)
      .then((response) => {
        expect(response.statusCode).toBe(200);
        expect(response.type).toBe('application/json');
      })
      done();
  });
  it('responds with JSON', async (done) => {
    await request(app)
      .get('/api/songs/9769a275-22da-4b52-9b62-d869d29768dc')
      .then((response) => {
        expect(response.statusCode).toBe(200);
        expect(response.type).toBe('application/json');
      })
      done();
  });
  it('responds with JSON', async (done) => {
    await request(app)
      .get('/api/playlists')
      .set('Authorization', `Bearer ${token}`)
      .then((response) => {
        expect(response.statusCode).toBe(200);
        expect(response.type).toBe('application/json');
      })
      done();
  });
  it('responds with a message', async (done) => {
    await request(app)
      .get('/api/playlists')
      .then((response) => {
        expect(response.statusCode).toBe(401);
        expect(response).toHaveProperty('text');
        expect(response.text).toEqual('Error: User undefined is not authorized to make this request.');
      })
      done();
  });
  it('responds with JSON', async (done) => {
    await request(app)
      .get('/api/playlists/4eaa86f3-21cc-4e43-86ee-5130157a4970')
      .set('Authorization', `Bearer ${token}`)
      .then((response) => {
        expect(response.statusCode).toBe(200);
        expect(response.type).toBe('application/json');
      })
      done();
  });
  it('responds with a message', async (done) => {
    await request(app)
      .get('/api/playlists/4eaa86f3-21cc-4e43-86ee-5130157a4970')
      .then((response) => {
        expect(response.statusCode).toBe(401);
        expect(response).toHaveProperty('text');
        expect(response.text).toEqual('Error: User undefined is not authorized to make this request.');
      })
      done();
  });
  it('responds with JSON', async (done) => {
    await request(app)
      .get('/api/users/pinkfluffyunicorns/playlists')
      .set('Authorization', `Bearer ${token}`)
      .then((response) => {
        expect(response.statusCode).toBe(200);
        expect(response.type).toBe('application/json');
      })
      done();
  });
  it('responds with a message', async (done) => {
    await request(app)
      .get('/api/users/pinkfluffyunicorns/playlists')
      .then((response) => {
        expect(response.statusCode).toBe(401);
        expect(response).toHaveProperty('text');
        expect(response.text).toEqual('Error: User undefined is not authorized to make this request.');
      })
      done();
  });
});

describe('POST /api/*', async () => {
  it('responds with text', async (done) => {
    await request(app)
      .post('/api/users')
      .set('Authorization', `Bearer ${token}`)
      .send({
        user: {
          username: 'zzz',
          password: 'zzz',
          email: 'zzz'
        }
      })
      .then((response) => {
        expect(response.statusCode).toBe(200);
        expect(response.type).toBe('text/html');
      })
      done();
  });
  it('responds with text', async (done) => {
    await request(app)
      .post('/api/users')
      .send({
        user: {
          username: 'zzz',
          password: 'zzz',
          email: 'zzz'
        }
      })
      .then((response) => {
        expect(response.statusCode).toBe(500);
        expect(response).toHaveProperty('text');
        expect(response.text).toEqual('Failed. Not inserting user because of a database conflict. Username and/or email already known.');
      })
      done();
  });
  it('responds with text', async (done) => {
    await request(app)
      .post('/api/songs')
      .set('Authorization', `Bearer ${token}`)
      .send({
        song: {
          title: 'zzz',
          artist: 'zzz',
          uri: 'spotify:track:6Yg3gGtLuZTyZ8i4zGUaJa'
        }
      })
      .then((response) => {
        expect(response.statusCode).toBe(201);
        expect(response.type).toBe('text/html');
      })
      done();
  });
  it('responds with text', async (done) => {
    await request(app)
      .post('/api/songs')
      .send({
        user: {
          username: 'zzz',
          password: 'zzz',
          email: 'zzz'
        }
      })
      .then((response) => {
        expect(response.statusCode).toBe(401);
        expect(response).toHaveProperty('text');
        expect(response.text).toEqual('Error: User undefined is not authorized to make this request.');
      })
      done();
  });
  it('responds with text', async (done) => {
    await request(app)
      .post('/api/playlists')
      .set('Authorization', `Bearer ${token}`)
      .send({
        playlist: {
          title: "new playlist",
          description: "with songs",
          owner: "pinkfluffyunicorns",
          songs: ["9769a275-22da-4b52-9b62-d869d29768dc","74e0a999-b3d5-454a-ad85-7da457c3f308","fdce8a0c-444d-4cc8-b3ba-b67fb214f2db"]
        }
      })
      .then((response) => {
        expect(response.statusCode).toBe(201);
        expect(response.type).toBe('text/html')
      })
      done();
  })
  it('responds with text', async (done) => {
    await request(app)
      .post('/api/playlists')
      .send({
        playlist: {
          title: "new playlist",
          description: "with songs",
          owner: "pinkfluffyunicorns",
          songs: ["9769a275-22da-4b52-9b62-d869d29768dc","74e0a999-b3d5-454a-ad85-7da457c3f308","fdce8a0c-444d-4cc8-b3ba-b67fb214f2db"]
        }
      })
      .then((response) => {
        expect(response.statusCode).toBe(401);
        expect(response.type).toBe('text/html')
      })
      done();
  })
  it('responds with text', async (done) => {
    await request(app)
      .post('/api/users/julien/playlists')
      .set('Authorization', `Bearer ${token}`)
      .send({
        playlist: {
          title: "new playlist",
          description: "with songs",
          songs: ["9769a275-22da-4b52-9b62-d869d29768dc","74e0a999-b3d5-454a-ad85-7da457c3f308","fdce8a0c-444d-4cc8-b3ba-b67fb214f2db"]
        }
      })
      .then((response) => {
        expect(response.statusCode).toBe(201);
        expect(response.type).toBe('text/html')
      })
      done();
  })
  it('responds with text', async (done) => {
    await request(app)
      .post('/api/users/julien/playlists')
      .send({
        playlist: {
          title: "new playlist",
          description: "with songs",
          songs: ["9769a275-22da-4b52-9b62-d869d29768dc","74e0a999-b3d5-454a-ad85-7da457c3f308","fdce8a0c-444d-4cc8-b3ba-b67fb214f2db"]
        }
      })
      .then((response) => {
        expect(response.statusCode).toBe(401);
        expect(response.type).toBe('text/html')
      })
      done();
  })
});

describe('PUT /api/*', async () => {
  it('responds with text/html', async (done) => {
    await request(app)
      .put('/api/songs/ef83b690-4970-49ce-9e38-ff24dd6edc47')
      .set('Authorization', `Bearer ${token}`)
      .send({
        song: {
          title: 'zza'
        }
      })
      .then((response) => {
        expect(response.statusCode).toBe(400);
        expect(response.type).toBe('text/html');
      })
      done();
  });
  it('responds with a message', async (done) => {
    await request(app)
      .put('/api/songs/ef83b690-4970-49ce-9e38-ff24dd6edc47')
      .send({
        song: {
          title: 'zza'
        }
      })
      .then((response) => {
        expect(response.statusCode).toBe(401);
        expect(response).toHaveProperty('text');
        expect(response.text).toEqual('Error: User undefined is not authorized to make this request.');
      })
      done();
  });
  it('responds with text/html', async (done) => {
    await request(app)
      .put('/api/users/zzz')
      .set('Authorization', `Bearer ${token}`)
      .send({
        user: {
          username: 'zza'
        }
      })
      .then((response) => {
        expect(response.statusCode).toBe(200);
        expect(response.type).toBe('text/html');
      })
      done();
  });
  it('responds with a message', async (done) => {
    await request(app)
      .put('/api/users/zzz')
      .send({
        user: {
          username: 'zza'
        }
      })
      .then((response) => {
        expect(response.statusCode).toBe(401);
        expect(response).toHaveProperty('text');
        expect(response.text).toEqual('Error: User undefined is not authorized to make this request.');
      })
      done();
  });
  it('responds with text/html', async (done) => {
    await request(app)
      .put('/api/playlists/ef83b690-4970-49ce-9e38-ff24dd6edc47')
      .set('Authorization', `Bearer ${token}`)
      .send({
        playlist: {
          title: 'zza'
        }
      })
      .then((response) => {
        expect(response.statusCode).toBe(400);
        expect(response.type).toBe('text/html');
      })
      done();
  });
  it('responds with a message', async (done) => {
    await request(app)
      .put('/api/playlists/ef83b690-4970-49ce-9e38-ff24dd6edc47')
      .send({
        playlist: {
          title: 'zza'
        }
      })
      .then((response) => {
        expect(response.statusCode).toBe(401);
        expect(response).toHaveProperty('text');
        expect(response.text).toEqual('Error: User undefined is not authorized to make this request.');
      })
      done();
  });
  it('responds with text/html', async (done) => {
    await request(app)
      .put('/api/users/julien/playlists/ef83b690-4970-49ce-9e38-ff24dd6edc47')
      .set('Authorization', `Bearer ${token}`)
      .send({
        playlist: {
          title: 'zza'
        }
      })
      .then((response) => {
        expect(response.statusCode).toBe(400);
        expect(response.type).toBe('text/html');
      })
      done();
  });
  it('responds with a message', async (done) => {
    await request(app)
      .put('/api/users/julien/playlists/ef83b690-4970-49ce-9e38-ff24dd6edc47')
      .send({
        playlist: {
          title: 'zza'
        }
      })
      .then((response) => {
        expect(response.statusCode).toBe(401);
        expect(response).toHaveProperty('text');
        expect(response.text).toEqual('Error: User undefined is not authorized to make this request.');
      })
      done();
  });
});

describe('DELETE /api/*', () => {
  it('responds with text/html', async (done) => {
    await request(app)
      .delete('/api/users/zzz')
      .set('Authorization', `Bearer ${token}`)
      .then((response) => {
        expect(response.statusCode).toBe(500);
        expect(response.type).toBe('text/html');
      })
      done();
  });
   it('responds with text/html', async (done) => {
    await request(app)
      .delete('/api/users/zza')
      .set('Authorization', `Bearer ${token}`)
      .then((response) => {
        expect(response.statusCode).toBe(200);
        expect(response.type).toBe('text/html');
      })
      done();
  });
  it('responds with a message', async (done) => {
    await request(app)
      .delete('/api/users/zzz')
      .then((response) => {
        expect(response.statusCode).toBe(401);
        expect(response).toHaveProperty('text');
        expect(response.text).toEqual('Error: User undefined is not authorized to make this request.');
      })
      done();
  });
  it('reponds with text/html', async (done) => {
    await request(app)
      .delete('/api/songs/ef83b690-4970-49ce-9e38-ff24dd6edc47')
      .set('Authorization', `Bearer ${token}`)
      .then((response) => {
        expect(response.statusCode).toBe(500)
      })
      done();
  })
  it('responds with a message', async (done) => {
    await request(app)
      .delete('/api/songs/ef83b690-4970-49ce-9e38-ff24dd6edc47')
      .then((response) => {
        expect(response.statusCode).toBe(401)
      })
      done();
  })
  it('reponds with text/html', async (done) => {
    await request(app)
      .delete('/api/playlists/ef83b690-4970-49ce-9e38-ff24dd6edc47')
      .set('Authorization', `Bearer ${token}`)
      .then((response) => {
        expect(response.statusCode).toBe(500)
      })
      done();
  })
  it('responds with a message', async (done) => {
    await request(app)
      .delete('/api/playlists/ef83b690-4970-49ce-9e38-ff24dd6edc47')
      .then((response) => {
        expect(response.statusCode).toBe(401)
      })
      done();
  })
  it('responds with text/html', async (done) => {
    await request(app)
      .delete('/api/users/julien/playlists/ef83b690-4970-49ce-9e38-ff24dd6edc47')
      .set('Authorization', `Bearer ${token}`)
      .then((response) => {
        expect(response.statusCode).toBe(500)
      })
      done();
  })
  it('responds with a message', async (done) => {
    await request(app)
      .delete('/api/users/julien/playlists/ef83b690-4970-49ce-9e38-ff24dd6edc47')
      .then((response) => {
        expect(response.statusCode).toBe(401)
      })
      done();
  })
});
