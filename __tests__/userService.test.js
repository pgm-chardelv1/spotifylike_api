import * as userService from '../src/api/services/userService.js';

describe('Tests to an sqlite3 database for users', () => {
  it('should return an array with users', async () => {
    const users = await userService.getUsers();
    expect(Array.isArray(users)).toBe(true);
    expect(users.length).toBeGreaterThan(0);
  });

  it('should return a single user', async () => {
    const username = 'pinkfluffyunicorns';
    const user = await userService.getUserByUsername(username);
    expect(user).toMatchObject({
      id: expect.any(String),
      username: expect.any(String),
      password: expect.any(String),
      is_admin: expect.any(Number),
      email: expect.any(String)
    })
  });

  it('should create a user', async () => {
    const user = {
      id: 'aaa',
      username: 'aaa',
      password: 'aaa',
      is_admin: 0,
      email: 'aaa'
    };
    const response = await userService.createUser(user);
    expect(response).resolves;
  });

  it('should return a message and not create a user', async () => {
    const user = {
      id: 'aab',
      username: 'aaa',
      password: 'aaa',
      is_admin: 0,
      email: 'aaa'
    };
    const response = await userService.createUser(user);
    expect(response).toHaveProperty('message');
    expect(response.message).toEqual('Not inserting user because of a database conflict. Username and/or email already known.');
  })

  it('should update a user with username', async () => {
    const username = 'aaa';
    const user = {
      password: 'bbb'
    };
    const response = await userService.updateUser(username, user);
    expect(response).toBe(1);
  });

  it('should return a message and not update a user', async () => {
    const username = 'bbb';
    const user = {
      password: 'bbb',
    }
    const response = await userService.updateUser(username, user);
    expect(response).toHaveProperty('message');
    expect(response.message).toEqual('Could not update the user with username: bbb.');
  })

  it('should delete a user with username', async () => {
    const username = 'aaa';
    const response = await userService.deleteUser(username);
    expect(response).toBe(1);
  })

  it('should return a message and not delete a user', async () => {
    const username = 'bbb';
    const response = await userService.deleteUser(username);
    expect(response).toHaveProperty('message');
  })
})