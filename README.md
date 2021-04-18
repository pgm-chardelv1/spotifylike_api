# A Spotify(like) API
Created by *Charlotte Delvaux* for the course **Programming 3: Front End Expert** at **Artevelde University for Applied Sciences**.

## Table of Contents
  - [About](#about)
  - [Tech](#tech)
  - [Endpoints](#endpoints)
    - [**Login**](#login)
    - [**Show Sample Users**](#show-sample-users)
    - [**Users**](#users)
      - [Show Users](#show-users)
      - [Show User](#show-user)
      - [Create User](#create-user)
      - [Update User](#update-user)
      - [Delete User](#delete-user)
      - [Show User Playlists](#show-user-playlists)
      - [Create User Playlist](#create-user-playlist)
      - [Update User Playlist](#update-user-playlist)
      - [Delete User Playlist](#delete-user-playlist)
    - [**Songs**](#songs)
      - [Show Songs](#show-songs)
      - [Show Song](#show-song)
      - [Create Song](#create-song)
      - [Update Song](#update-song)
      - [Delete Song](#delete-song)
    - [**Playlists**](#playlists)
      - [Show Playlists](#show-playlists)
      - [Show Playlist](#show-playlist)
      - [Create Playlist](#create-playlist)
      - [Update Playlist](#update-playlist)
      - [Delete Playlist](#delete-playlist)
  - [Files](#files)
    - [Server](#server)
    - [DB](#db)
    - [Logs](#logs)
    - [Seeders](#seeders)
    - [Services](#services)
    - [API](#api)
      - [Routes](#routes-api)
      - [Controllers](#controllers-api)
      - [Services](#services-api)
      - [Models](#models-api)
      - [Middleware](#middleware-api)

## About 
This project creates a RESTful music API backend. Authentication applied using JSON web tokens. Password hashing with bcrypt. Testing through Jest and Supertest. Dot env file included in repository under 'env_file' for grading purposes. 

## Tech
[Node], [Express], [JWT], [SQLite], [Knex], [Passport], [bcrypt], [dotenv], [Jest], [Babel], [Supertest], [Cors], [Winston].

<div align="right">
    <a href="#table-of-contents">Back to top</a>
 </div>

## Endpoints
**Login** 
---
  Returns json with **JWT** data after authentication with Passport. Checks password validity with **bcrypt**.

* **URL**

  /auth/login

* **Method**

  `POST`

* **URL Params**
  
  None

* **Success Response:**

  * **Code:** 200 <br />
    **Content:** <br> 
    ```
    {
        "success": true,
        "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjRkMTZjZmQ3LWE0NjctNDE3ZS05NjZiLWQxNmFiZGVhMmU3YiIsInVzZXJuYW1lIjoicGlua2ZsdWZmeXVuaWNvcm5zIiwicGFzc3dvcmQiOiIkMmIkMTIkSTMvOVZBdGNVOHlscjJsNjNuVU41T3lVMHNZc0Y3Lm9oMGRPcEdTVDhjWjZ3Q2ltNi5XYlMiLCJpc19hZG1pbiI6MSwiZW1haWwiOiJpbGlrZXR1cnRsZXNAZW1haWwuY29tIiwiaWF0IjoxNjE4MTQ3NjA3LCJleHAiOjE2MTgxNTEyMDd9.hAoCi9pVTm3b3VXHw0F5eJKtGgxI6a_0VchtgC7ZDpE",
        "user": {
          "id": "4d16cfd7-a467-417e-966b-d16abdea2e7b",
          "username": "pinkfluffyunicorns",
          "is_admin": 1
        }
    }
    ```
 
* **Error Response:**

  * **Code:** 401 UNAUTHORIZED <br />
    **Content:** `{ "message": "Incorrect username." }`

  OR

  * **Code:** 401 UNAUTHORIZED <br />
    **Content:** `{ "message" : "Incorrect password." }`

 
 <div align="right">
    <a href="#table-of-contents">Back to top</a>
 </div>


**API Endpoints**
---
### Show sample Users
* **URL**

  /api

* **Method:**

  `GET`

* **Success response:**
  * **200** OK <br>
    **Content:** 
    ```
    {
    "message": "API is up and running. View the Readme for info about possible endpoints and requests.",
    "sampleUsers": [
        {
            "Admins": [
                {
                    "username": "pinkfluffyunicorns",
                    "password": "dancingonrainbows"
                },
                {
                    "username": "thor",
                    "password": "donder&bliksem"
                }
            ],
            "Members": [
                {
                    "username": "julien",
                    "password": "maria"
                },
                {
                    "username": "Charlie Sheen",
                    "password": "biwinning"
                }
            ]
          }
        ]
      }
    ```

**Users**
---
### Show Users

  Returns json data about all users. Uses Passport authentication middleware and checks admin rights. 

* **URL**

  /api/users

* **Method:**

  `GET`
  
* **URL Params**

  None

* **Data Params**

  None

* **Authorization method**

  Bearer Token

* **Authorization level**
  
  `is_admin = 1`

* **Success Response:**

  * **Code:** 200 <br />
    **Content:** 
    ```
    [
      {
        "id": "4d16cfd7-a467-417e-966b-d16abdea2e7b",
        "username": "pinkfluffyunicorns",
        "password": "$2b$12$I3/9VAtcU8ylr2l63nUN5OyU0sYsF7.oh0dOpGST8cZ6wCim6.WbS",
        "is_admin": 1,
        "email": "iliketurtles@email.com"
      },
      {
        "id": "a42cfa02-81bf-48c4-ac7c-874157c2f5e3",
        "username": "julien",
        "password": "$2b$12$odBQjVp.ps9fciHViJm1RuBmD.5URi8rRhfFQzbzBLEvNRF68HA9W",
        "is_admin": 0,
        "email": "julien123@skynet.be"
      },
      {
        ...
      }
    ]
    ```
 
* **Error Response:**

  * **Code:** 404 NOT FOUND <br />
    **Content:** `Could not find users.`

  OR

  * **Code:** 401 UNAUTHORIZED <br />
    **Content:** `Error: User ${username} is not authorized to make this request.`

<div align="right">
    <a href="#table-of-contents">Back to top</a>
 </div>

### Show User

  Returns json data about one user. Uses Passport authentication middleware and checks admin rights.

* **URL**

  /api/users/:username

* **Method:**

  `GET`
  
* **URL Params**

  `username: String`

* **Data Params**

  None

* **Authorization method**

  Bearer Token

* **Authorization level**
  
  `is_admin = 1` OR `req.params.username === JWT.user.username`

* **Success Response:**

  * **Code:** 200 <br />
    **Content:** 
    ```
      {
        "id": "4d16cfd7-a467-417e-966b-d16abdea2e7b",
        "username": "pinkfluffyunicorns",
        "password": "$2b$12$I3/9VAtcU8ylr2l63nUN5OyU0sYsF7.oh0dOpGST8cZ6wCim6.WbS",
        "is_admin": 1,
        "email": "iliketurtles@email.com"
      }
    ```
 
* **Error Response:**

  * **Code:** 404 NOT FOUND <br />
    **Content:** `User with username [${username}] not found.`

  OR

  * **Code:** 401 UNAUTHORIZED <br />
    **Content:** `Error: User ${username} is not authorized to make this request.`

<div align="right">
    <a href="#table-of-contents">Back to top</a>
 </div>

### Create User

  Create a new user. Username and email must be unique in the database. Password will be hashed using **bcrypt**.

* **URL**

  /api/users

* **Method:**

  `POST`
  
* **URL Params**

  None

* **Data Params**

  ```
  {
    "user": {
      "username": String,
      "password": String,
      "email": String,
    }
  }
  ```

* **Authorization method**

  None

* **Authorization level**
  
  Public

* **Success Response:**

  * **Code:** 200 <br />
    **Content:** `Created a new user with username ${username}!`
 
* **Error Response:**

  * **Code:** 500 INTERNAL SERVER ERROR <br />
    **Content:** `Failed. ${Error.message}` 

<div align="right">
    <a href="#table-of-contents">Back to top</a>
 </div>

### Update User

  Updates one user with username. Uses Passport authentication middleware and checks username and admin rights to make request. Username and email must be unique in the database. Password will be hashed with **bcrypt**.

* **URL**

  /api/users/:username

* **Method:**

  `PUT`
  
* **URL Params**

  `username: String`

* **Data Params**

  ```
    {
      "user": {
        "username": String, // OPTIONAL
        "password": String, // OPTIONAL
        "email": String, // OPTIONAL
      }
    }
  ```

* **Authorization method**

  Bearer Token

* **Authorization level**
  
  `is_admin = 1` OR `req.params.username === JWT.user.username`

* **Success Response:**

  * **Code:** 200 <br />
    **Content:** `Updated user with username ${username}!`
 
* **Error Response:**

  * **Code:** 401 UNAUTHORIZED <br />
    **Content:** `Error: User ${username} is not authorized to make this request.`

  OR

  * **Code:** 500 INTERNAL SERVER ERROR <br />
    **Content:** `Failed. ${Error.message}` 

<div align="right">
    <a href="#table-of-contents">Back to top</a>
 </div>

### Delete User

  Delete one user with username. Uses Passport authentication middleware and checks username and admin rights to make request.

* **URL**

  /api/users/:username

* **Method:**

  `DELETE`
  
* **URL Params**

  `username: String`

* **Data Params**

  None

* **Authorization method**

  Bearer Token

* **Authorization level**
  
  `is_admin = 1` OR `req.params.username === JWT.user.username`

* **Success Response:**

  * **Code:** 200 <br />
    **Content:** `Deleted user with username ${username}!`
 
* **Error Response:**

  * **Code:** 401 UNAUTHORIZED <br />
    **Content:** `Error: User ${username} is not authorized to make this request.`

  OR

  * **Code:** 500 INTERNAL SERVER ERROR <br />
    **Content:** `Failed. ${Error.message}` 

<div align="right">
    <a href="#table-of-contents">Back to top</a>
 </div>

### Show User Playlists

  Get playlists from one user. Uses Passport authentication middleware and checks username and admin rights to make request.

* **URL**

  /api/users/:username/playlists

* **Method:**

  `GET`
  
* **URL Params**

  `username: String`

* **Data Params**

  None

* **Authorization method**

  Bearer Token

* **Authorization level**
  
  `is_admin = 1` OR `req.params.username === JWT.user.username`

* **Success Response:**

  * **Code:** 200 <br />
    **Content:** 
    ```
    [
      {
        "id": "13a5979f-4ddc-40ae-8d3e-618c125370ee",
        "title": "Epic",
        "description": "Mythical songs",
        "owner": {
            "id": "51d65e92-0c85-4311-a2b3-c6f272765939",
            "username": "thor",
            "password": "$2b$12$Wg3KhLtYUL8WoV398D8naOqxFyVHkHYHXUhkBuGDvezdeb/5xUXPi",
            "is_admin": 1,
            "email": "thunderthor@pandora.be"
        },
        "dateCreated": 1618221156418,
        "dateModified": 1618221156418,
        "songs": [
            {
                "id": "662205b4-1118-4e6c-87a1-65e3cc327d90",
                "title": "Kryptonite",
                "artist": "3 Doors Down",
                "uri": "spotify:track:6ZOBP3NvffbU4SZcrnt1k6",
                "date_created": 1617032352200
            },
            {
                "id": "4950a982-2371-4c7a-bf96-d4918ba7c791",
                "title": "We Didn't Start the Fire",
                "artist": "Billy Joel",
                "uri": "spotify:track:38bDGWuyYdSdNfrFfbCiVS",
                "date_created": 1617617766318
            },
            {
                "id": "8804a3e3-0ee1-4b69-aeae-8dcad4f3652e",
                "title": "Personal Jesus",
                "artist": "Depeche Mode",
                "uri": "spotify:track:2wUlYDGGXlSvm2NkGj0Qio",
                "date_created": 1617617766319
            },
            {
                "id": "cbcc037e-b2ab-46fb-ba91-a910df0adbf3",
                "title": "Only Happy When It Rains - 2015 - Remaster",
                "artist": "Garbage",
                "uri": "spotify:track:6p6Xq0t9XGkVg04cXWdx8v",
                "date_created": 1617032352200
            },
            {
                "id": "87fee509-cd94-4722-9b65-5705b3fb82a4",
                "title": "Great Balls Of Fire",
                "artist": "Jerry Lee Lewis",
                "uri": "spotify:track:5UvE5QlINnvEc7aFO14DVL",
                "date_created": 1617617766314
            },
            {
                "id": "20277418-b3dc-4366-9c90-ad89a18d8ca4",
                "title": "One Of Us",
                "artist": "Joan Osborne",
                "uri": "spotify:track:1xNmF1Uep5OGutizZSbKvd",
                "date_created": 1617617766316
            },
            {
                "id": "b3930390-7fce-4bba-b964-43a15f1fbe0b",
                "title": "Carry on Wayward Son",
                "artist": "Kansas",
                "uri": "spotify:track:4DMKwE2E2iYDKY01C335Uw",
                "date_created": 1617028305980
            },
            {
                "id": "d4377ba1-2524-4c52-b911-6198b8b821b8",
                "title": "The Dragonborn Comes",
                "artist": "Malukah",
                "uri": "spotify:track:088R698G2RAP4fHFBc6zVV",
                "date_created": 1617032352200
            },
            {
                "id": "cba6b91b-f2ae-41f3-8795-a95955cce452",
                "title": "Tribute",
                "artist": "Tenacious D",
                "uri": "spotify:track:6crBy2sODw2HS53xquM6us",
                "date_created": 1617617766319
            },
            {
                "id": "e75e7c02-a431-4129-92d9-c3d80c6e0dc2",
                "title": "In Hell I'll Be in Good Company",
                "artist": "The Dead South",
                "uri": "spotify:track:6Yg3gGtLuZTyZ8i4zGUaJa",
                "date_created": 1617617074053
            },
            {
                "id": "b7a26d39-41a5-408d-8410-bfa483854aed",
                "title": "Storm",
                "artist": "Tim Minchin",
                "uri": "spotify:track:3xoevvX0Ciaj7inuaC1FgA",
                "date_created": 1617617766313
            },
            {
                "id": "101c7619-3cf3-40c8-b5ed-990a7f8c0ee4",
                "title": "Piss up a Rope",
                "artist": "Ween",
                "uri": "spotify:track:0YHhpW8PnU0WNuAKAVuM70",
                "date_created": 1617617766314
            }
        ]
      }
    ]
    ```
 
* **Error Response:**

  * **Code:** 400 BAD REQUEST <br />
    **Content:** `Failed. ${Error.message}` 

  OR

  * **Code:** 401 UNAUTHORIZED <br />
    **Content:** `Error: User ${username} is not authorized to make this request.`

<div align="right">
    <a href="#table-of-contents">Back to top</a>
 </div>

### Create User Playlist

  Create a new playlist from one user. Uses Passport authentication middleware and checks username and admin rights to make request. Checks if song IDs in { playlist.songs } are valid song IDs, ignores invalid song IDs.

* **URL**

  /api/users/:username/playlists

* **Method:**

  `POST`
  
* **URL Params**

  `username: String`

* **Data Params**

  ```
  {
    "playlist": {
        "title": String,
        "description": String,
        "songs": Array["songId1"= songId, ...]
    }
  }
  ```

* **Authorization method**

  Bearer Token

* **Authorization level**
  
  `is_admin = 1` OR `req.params.username === JWT.user.username`

* **Success Response:**

  * **Code:** 201 <br />
    **Content:** `Created the playlist with title ${title}!`
 
* **Error Response:**

  * **Code:** 400 BAD REQUEST <br />
    **Content:** `Failed. ${Error.message} Owner has to be a valid user id.` 

  OR

  * **Code:** 401 UNAUTHORIZED <br />
    **Content:** `Error: User ${username} is not authorized to make this request.`

<div align="right">
    <a href="#table-of-contents">Back to top</a>
 </div>

### Update User Playlist

  Update one playlist from one user. Uses Passport authentication middleware and checks username and admin rights to make request. Checks if song IDs in { playlist.songs } are valid song IDs, ignores invalid song IDs.

* **URL**

  /api/users/:username/playlists/:playlistId

* **Method:**

  `PUT`
  
* **URL Params**

  `username: String`

  `playlistId: String(uuidv4)`

* **Data Params**

  ```
  {
    "playlist": {
        "title": String,
        "description": String,
        "songs": Array["songId1" = songId, ...]
    }
  }
  ```

* **Authorization method**

  Bearer Token

* **Authorization level**
  
  `is_admin = 1` OR `req.params.username === JWT.user.username`

* **Success Response:**

  * **Code:** 201 <br />
    **Content:** `Updated the playlist with title ${title}!`
 
* **Error Response:**

  * **Code:** 400 BAD REQUEST <br />
    **Content:** `Failed. ${Error.message}` 

  OR

  * **Code:** 401 UNAUTHORIZED <br />
    **Content:** `Error: User ${username} is not authorized to make this request.`

<div align="right">
    <a href="#table-of-contents">Back to top</a>
 </div>

### Delete User Playlist

  Delete one playlist from one user. Uses Passport authentication middleware and checks username and admin rights to make request. 

* **URL**

  /api/users/:username/playlists/:playlistId

* **Method:**

  `DELETE`
  
* **URL Params**

  `username: String`

  `playlistId: String(uuidv4)`

* **Data Params**

  None

* **Authorization method**

  Bearer Token

* **Authorization level**
  
  `is_admin = 1` OR `req.params.username === JWT.user.username`

* **Success Response:**

  * **Code:** 201 <br />
    **Content:** `Deleted the playlist with title ${title}!`
 
* **Error Response:**

  * **Code:** 400 BAD REQUEST <br />
    **Content:** `Failed. ${Error.message}` 

  OR

  * **Code:** 401 UNAUTHORIZED <br />
    **Content:** `Error: User ${username} is not authorized to make this request.`

<div align="right">
    <a href="#table-of-contents">Back to top</a>
 </div>

**Songs**
---
### Show Songs

  Returns json data about all songs.

* **URL**

  /api/songs

* **Method:**

  `GET`
  
* **URL Params**

  None

* **Data Params**

  None

* **Authorization method**

  None

* **Authorization level**
  
  Public

* **Success Response:**

  * **Code:** 200 <br />
    **Content:** 
    ```
    [
      [
        {
            "id": "9769a275-22da-4b52-9b62-d869d29768dc",
            "title": "Man Next Door",
            "artist": "Massive Attack",
            "uri": "spotify:track:2Tz5THgkMOQeaW6DlqAlIa",
            "date_created": 1617028305979
        },
        {
            "id": "74e0a999-b3d5-454a-ad85-7da457c3f308",
            "title": "Dissolved Girl",
            "artist": "Massive Attack",
            "uri": "spotify:track:0oeEqyEAavgPfFxDYvjAP6",
            "date_created": 1617028305980
        },
        {
            ...
        }
      ]
    ```
 
* **Error Response:**

  * **Code:** 404 NOT FOUND <br />
    **Content:** `Failed. ${Error.message}`


<div align="right">
    <a href="#table-of-contents">Back to top</a>
 </div>

### Show Song

  Returns json data about one song.

* **URL**

  /api/songs/:songId

* **Method:**

  `GET`
  
* **URL Params**

  `songId: String(uuidv4)`

* **Data Params**

  None

* **Authorization method**

  None

* **Authorization level**
  
  Public

* **Success Response:**

  * **Code:** 200 <br />
    **Content:** 
    ```
      {
        "id": "9769a275-22da-4b52-9b62-d869d29768dc",
        "title": "Man Next Door",
        "artist": "Massive Attack",
        "uri": "spotify:track:2Tz5THgkMOQeaW6DlqAlIa",
        "date_created": 1617028305979
      }
    ```
 
* **Error Response:**

  * **Code:** 404 NOT FOUND <br />
    **Content:** `Failed. ${Error.message}`

<div align="right">
    <a href="#table-of-contents">Back to top</a>
 </div>

### Create Song

  Create a new song. Uses Passport authentication middleware and checks admin rights to make request. Checks if song URI matches regular expression for Spotify track URI.

* **URL**

  /api/songs

* **Method:**

  `POST`
  
* **URL Params**

  None

* **Data Params**

  ```
  {
    "song": {
      "title": String,
      "artist": String,
      "uri": String.prototype.match(/^spotify\:track\:[a-zA-Z0-9]{22}/),
    }
  }
  ```

* **Authorization method**

  Bearer Token

* **Authorization level**
  
  `is_admin = 1`

* **Success Response:**

  * **Code:** 200 <br />
    **Content:** `Created song ${title} by ${artist}!`
 
* **Error Response:**

  * **Code:** 500 INTERNAL SERVER ERROR <br />
    **Content:** `Failed. ${Error.message}` 

<div align="right">
    <a href="#table-of-contents">Back to top</a>
 </div>

### Update Song

  Updates one song with songId. Uses Passport authentication middleware and checks admin rights to make request. Checks if song URI matches regular expression for Spotify track URI.

* **URL**

  /api/songs/:songId

* **Method:**

  `PUT`
  
* **URL Params**

  `songId: String(uuidv4)`

* **Data Params**

  ```
    {
      "song": {
        "artist": String, // OPTIONAL
        "title": String, // OPTIONAL
        "uri": String.prototype.match(/^spotify\:track\:[a-zA-Z0-9]{22}/) // OPTIONAL
      }
    }
  ```

* **Authorization method**

  Bearer Token

* **Authorization level**
  
  `is_admin = 1` 

* **Success Response:**

  * **Code:** 200 <br />
    **Content:** `Updated the song with id ${songId}!`
 
* **Error Response:**

  * **Code:** 401 UNAUTHORIZED <br />
    **Content:** `Error: User ${username} is not authorized to make this request.`

  OR

  * **Code:** 400 BAD REQUEST <br />
    **Content:** `Failed. ${Error.message}` 

<div align="right">
    <a href="#table-of-contents">Back to top</a>
 </div>

### Delete Song

  Delete one song with songId. Uses Passport authentication middleware and checks admin rights to make request. 

* **URL**

  /api/songs/:songId

* **Method:**

  `DELETE`
  
* **URL Params**

  `songId: String(uuidv4)`

* **Data Params**

  None

* **Authorization method**

  Bearer Token

* **Authorization level**
  
  `is_admin = 1` 

* **Success Response:**

  * **Code:** 200 <br />
    **Content:** `Deleted the song with id ${songId}!`
 
* **Error Response:**

  * **Code:** 401 UNAUTHORIZED <br />
    **Content:** `Error: User ${username} is not authorized to make this request.`

  OR

  * **Code:** 500 INTERNAL SERVER ERROR <br />
    **Content:** `Failed. ${Error.message}` 

<div align="right">
    <a href="#table-of-contents">Back to top</a>
 </div>

**Playlists**
---
### Show Playlists

  Returns json data about all songs. Uses Passport authentication middleware and checks admin rights to make request. 

* **URL**

  /api/playlists

* **Method:**

  `GET`
  
* **URL Params**

  None

* **Data Params**

  None

* **Authorization method**

  Bearer Token

* **Authorization level**
  
  `is_admin = 1`

* **Success Response:**

  * **Code:** 200 <br />
    **Content:** 
    ```
    [
      { 
        "id": "4eaa86f3-21cc-4e43-86ee-5130157a4970",
        "title": "Amazing playlist",
        "description": "Very amazing and bigly playlist with songs.",
        "owner": {
            "id": "4d16cfd7-a467-417e-966b-d16abdea2e7b",
            "username": "pinkfluffyunicorns",
            "password": "$2b$12$I3/9VAtcU8ylr2l63nUN5OyU0sYsF7.oh0dOpGST8cZ6wCim6.WbS",
            "is_admin": 1,
            "email": "iliketurtles@email.com"
        },
        "dateCreated": 1618153317157,
        "dateModified": 1618153317157,
        "songs": [
            {
                "id": "9769a275-22da-4b52-9b62-d869d29768dc",
                "title": "Man Next Door",
                "artist": "Massive Attack",
                "uri": "spotify:track:2Tz5THgkMOQeaW6DlqAlIa",
                "date_created": 1617028305979
            },
            {
                "id": "74e0a999-b3d5-454a-ad85-7da457c3f308",
                "title": "Dissolved Girl",
                "artist": "Massive Attack",
                "uri": "spotify:track:0oeEqyEAavgPfFxDYvjAP6",
                "date_created": 1617028305980
            },
            {
                "id": "fdce8a0c-444d-4cc8-b3ba-b67fb214f2db",
                "title": "Risingson",
                "artist": "Massive Attack",
                "uri": "spotify:track:6ggJ6MceyHGWtUg1KLp3M1",
                "date_created": 1617028305980
            }
        ]
      },
      {
        ...
      }
    ]
    ```
 
* **Error Response:**

  * **Code:** 404 NOT FOUND <br />
    **Content:** `Failed. ${Error.message}`

  OR 

  * **Code:** 401 UNAUTHORIZED <br />
    **Content:** `Error: User ${username} is not authorized to make this request.`

  <div align="right">
    <a href="#table-of-contents">Back to top</a>
 </div>

### Show Playlist

  Returns json data about one playlist. Uses Passport authentication middleware and checks admin rights to make request. 

* **URL**

  /api/playlists/:playlistId

* **Method:**

  `GET`
  
* **URL Params**

  `playlistId: String(uuidv4)`

* **Data Params**

  None

* **Authorization method**

  Bearer Token

* **Authorization level**
  
  `is_admin = 1`

* **Success Response:**

  * **Code:** 200 <br />
    **Content:** 
    ```
    {
        "id": "4eaa86f3-21cc-4e43-86ee-5130157a4970",
        "title": "Amazing playlist",
        "description": "Very amazing and bigly playlist with songs.",
        "owner": {
            "id": "4d16cfd7-a467-417e-966b-d16abdea2e7b",
            "username": "pinkfluffyunicorns",
            "password": "$2b$12$I3/9VAtcU8ylr2l63nUN5OyU0sYsF7.oh0dOpGST8cZ6wCim6.WbS",
            "is_admin": 1,
            "email": "iliketurtles@email.com"
        },
        "dateCreated": 1618153317157,
        "dateModified": 1618153317157,
        "songs": [
            {
                "id": "9769a275-22da-4b52-9b62-d869d29768dc",
                "title": "Man Next Door",
                "artist": "Massive Attack",
                "uri": "spotify:track:2Tz5THgkMOQeaW6DlqAlIa",
                "date_created": 1617028305979
            },
            {
                "id": "74e0a999-b3d5-454a-ad85-7da457c3f308",
                "title": "Dissolved Girl",
                "artist": "Massive Attack",
                "uri": "spotify:track:0oeEqyEAavgPfFxDYvjAP6",
                "date_created": 1617028305980
            },
            {
                "id": "fdce8a0c-444d-4cc8-b3ba-b67fb214f2db",
                "title": "Risingson",
                "artist": "Massive Attack",
                "uri": "spotify:track:6ggJ6MceyHGWtUg1KLp3M1",
                "date_created": 1617028305980
            }
        ]
    }
    ```
 
* **Error Response:**

  * **Code:** 400 BAD REQUEST <br />
    **Content:** `Failed. ${Error.message}`

  OR 

  * **Code:** 401 UNAUTHORIZED <br />
    **Content:** `Error: User ${username} is not authorized to make this request.`

  <div align="right">
    <a href="#table-of-contents">Back to top</a>
  </div>

### Create Playlist

  Create a new playlist. Uses Passport authentication middleware and checks admin rights to make request. Checks if song IDs in { playlist.songs } are valid song IDs, ignores invalid song IDs.

* **URL**

  /api/playlists

* **Method:**

  `POST`
  
* **URL Params**

  None

* **Data Params**

  ```
  {
    "playlist": {
        "title": String,
        "description": String,
        "owner": String(username),
        "songs": Array[String(songId),...]
    }
  }
  ```

* **Authorization method**

  Bearer Token

* **Authorization level**
  
  `is_admin = 1`

* **Success Response:**

  * **Code:** 201 CREATED<br />
    **Content:** `Created the playlist with title ${title}!`
 
* **Error Response:**

  * **Code:** 500 INTERNAL SERVER ERROR <br />
    **Content:** `Failed. ${Error.message}` 

<div align="right">
    <a href="#table-of-contents">Back to top</a>
 </div>

### Update Playlist

  Updates one playlist with playlistId. Uses Passport authentication middleware and checks admin rights to make request. Checks if song IDs in { playlist.songs } are valid song IDs, ignores invalid song IDs.

* **URL**

  /api/playlists/:playlistId

* **Method:**

  `PUT`
  
* **URL Params**

  `playlistId: String(uuidv4)`

* **Data Params**

  ```
    {
      "playlist": {
        "title": String, // OPTIONAL
        "description": String, // OPTIONAL
        "songs": Array["songId": String(uuidv4), ...] // OPTIONAL
      }
    }
  ```

* **Authorization method**

  Bearer Token

* **Authorization level**
  
  `is_admin = 1` 

* **Success Response:**

  * **Code:** 200 <br />
    **Content:** `Updated the playlist with id ${playlistId}!`
 
* **Error Response:**

  * **Code:** 401 UNAUTHORIZED <br />
    **Content:** `Error: User ${username} is not authorized to make this request.`

  OR

  * **Code:** 400 BAD REQUEST <br />
    **Content:** `Failed. ${Error.message}` 

<div align="right">
    <a href="#table-of-contents">Back to top</a>
 </div>

### Delete Playlist

  Delete one playlist with playlistId. Uses Passport authentication middleware and checks admin rights to make request.

* **URL**

  /api/playlists/:playlistId

* **Method:**

  `DELETE`
  
* **URL Params**

  `playlistId: String(uuidv4)`

* **Data Params**

  None

* **Authorization method**

  Bearer Token

* **Authorization level**
  
  `is_admin = 1` 

* **Success Response:**

  * **Code:** 200 <br />
    **Content:** `Deleted the playlist with id ${playlistId}!`
 
* **Error Response:**

  * **Code:** 401 UNAUTHORIZED <br />
    **Content:** `Error: User ${username} is not authorized to make this request.`

  OR

  * **Code:** 500 INTERNAL SERVER ERROR <br />
    **Content:** `Failed. ${Error.message}` 
<div align="right">
    <a href="#table-of-contents">Back to top</a>
 </div>

## Files
### Server
* **Path:** /src/index.js
* **Description:** Initializes **Express** server on port **6001**. Uses *cors* middleware  for API endpoints. Uses authentication with *Passport* for auth endpoints.

<div align="right">
    <a href="#table-of-contents">Back to top</a>
 </div>

 ### DB
 * **Database filepath:** /db/music.sqlite3
 * **Knex File:** /db/knexMusic.js
 * **Description:** Database file and initializes database connection through Knex configuration.

<div align="right">
    <a href="#table-of-contents">Back to top</a>
 </div>

 ### Logs
 * **Combined log:** /combined.log
 * **Error log:** /error.log
 * **Description:** Log files generated by Logger service, after creating Winston Logger. Combined log contains info and error logs.

<div align="right">
    <a href="#table-of-contents">Back to top</a>
 </div>

 ### Seeders
 * **Seed Users**
   * **Filepath:** /src/utils/seedUsers.js
   * **Script for seeder:** `npm run seeder`
   * **Description:** Generates any amount of users using *Faker* and creates database entries for created users.

* **Seed Songs**
  * **Filepath:** /src/utils/seedSongs.js
  * **Data source:** /src/utils/tracks.json
  * **Description:** Reads track info from `tracks.json` and parses it into new Song objects. Creates database entries for created songs. <br>**IMPORTANT:  IN ORDER FOR THIS SEEDER TO WORK, ADD BOTH `seedSongs.js` AND `tracks.json` TO THE `/db/` FOLDER.**

<div align="right">
    <a href="#table-of-contents">Back to top</a>
 </div>

### Services
* **Authentication Service**
  * **Filepath:** /src/utils/auth.js
  * **Description:** Configures local *Passport*  authentication strategy. Checks if the password is valid through *bcrypt*. Defines endpoint for login to generate *JWT* to enable access to API.
* **Helper Service**
  * **Filepath:** /src/utils/helper.js
  * **Description** Hashes password using *bcrypt*.
* **Logger service**
  * **Filepath:** /src/utils/logger.js
  * **Description** Creates a new Winston Logger with custom formatting. Outputs logs to console and log files. See: [Logs](#logs).

<div align="right">
    <a href="#table-of-contents">Back to top</a>
 </div>

### API
#### Routes API
* **Filepath:** /src/api/routes.js
* **Description:** Defines *Express* Router endpoints and requests for API endpoints `/api/`. Links middleware and controllers for endpoints to handle requests.
#### Controllers API
  * **Playlist Controller**
    * **Filepath:** /src/api/controllers/playlistController.js
    * **Description:** 
      * **getPlaylists:** fetches all playlists. Fetches owner. Fetches songs by song id.
      * **getPlaylistById:** fetches a playlist by id. Fetches owner. Fetches songs by song id.
      * **getPlaylistByUsername:** fetches all playlists for a single user by username. Fetches owner. Fetches songs by song id.
      * **createPlaylist:** creates a new playlist.
      * **createPlaylistByUsername:** creates a new playlist for owner with username.
      * **updatePlaylist:** updates a playlist by id.
      * **updatePlaylistByUsername:** updates a playlist by id and username.
      * **deletePlaylist:** deletes a playlist by id.
      * **deletePlaylistByUsername:** deletes a playlist by id and username.
  * **Song Controller**
    * **Filepath:** /src/api/controllers/songController.js
    * **Description:** 
      * **getSongs:** fetches all songs.
      * **getSongById:** fetches a song by id.
      * **createSong:** creates a new song.
      * **updateSong:** updates a song by id.
      * **deleteSong:** deletes a song by id.
  * **User Controller**
    * **Filepath:** /src/api/controllers/userController.js
    * **Description:** 
      * **getUsers:** fetches all users.
      * **getUserById:** fetches a user by id.
      * **createUser:** creates a new user.
      * **updateUser:** updates a user by id.
      * **deleteUser:** deletes a user by id.

<div align="right">
    <a href="#table-of-contents">Back to top</a>
 </div>

#### Services API
* **Playlist Service**
  * **Filepath:** /src/api/services/playlistService.js
  * **Description:** Uses *Knex* to make database queries to 'playlists' table.
    * **getPlaylists:** does a database search query for all playlists.
    * **getPlaylistById:** does a database search query for a playlist with id.
    * **getPlaylistByOwner:** does a database search query for playlists with owner.
    * **createPlaylist:** does a database insert query with playlist.
    * **updatePlaylist:** does a database update query with playlist and id.
    * **deletePlaylist:** does a database delete query with id.

* **Song Service**
  * **Filepath:** /src/api/services/songService.js
  * **Description:** Uses *Knex* to make database queries to 'songs' table.
    * **getSongs:** does a database search query for all songs.
    * **getSongById:** does a database search query for a song with id.
    * **createSong:** does a database insert query with song.
    * **updateSong:** does a database update query with song and id.
    * **deleteSong:** does a database delete query with id.

* **User Service**
  * **Filepath:** /src/api/services/userService.js
  * **Description:** Uses *Knex* to make database queries to 'users' table.
    * **getUsers:** does a database search query for all users.
    * **getUserById:** does a database search query for a user with id.
    * **createUser:** does a database insert query with user.
    * **updateUser:** does a database update query with user and id.
    * **deleteUser:** does a database delete query with id.

<div align="right">
    <a href="#table-of-contents">Back to top</a>
 </div>

#### Models API

* **Playlist Model:**
  * **Filepath:** /src/api/models/Playlist.js
  * **Description:**
    * **id**: String
    * **title**: String
    * **description**: String
    * **owner**: String
    * **dateCreated**: Date
    * **dateModified**: Date
    * **songs**: Array
* **Song Model:**
  * **Filepath:** /src/api/models/Song.js
  * **Description:**
    * **id**: String
    * **title**: String
    * **artist**: String
    * **uri**: String
    * **dateCreated**: Date
* **User Model:**
  * **Filepath:** /src/api/models/User.js
  * **Description:**
    * **id**: String
    * **username**: String
    * **password**: hashPassword(String) [See: helpers](#services)
    * **is_admin**: Number [0-1]
    * **email**: String

<div align="right">
    <a href="#table-of-contents">Back to top</a>
 </div>

#### Middleware API

* **Authentication Middleware**
  * **Filepath:** /src/api/middleware/auth.js
  * **Description:** 
    * Uses *Passport* *JWT* strategy to read out user details.
    * **isUserAuthenticated** checks jwt data for known user
    * **isAdminAuthenticated** checks jwt data for known user and checks if user is admin.
    * **isUserAuthorizedToView** checks jwt data for known user. Checks if user is admin or username is equal to request path.
* **Song ID Middleware**
  * **Filepath:** /src/api/middleware/songId.js
  * **Description:**
    * Loops through playlist songs to check if the song id exists in the database. Ignores unknown song ids.
* **Spotify URI Middleware**
  * **Filepath:** /src/api/middleware/uri.js
  * **Description:** Checks if song uri matches the correct pattern for a Spotify track uri.

<div align="right">
    <a href="#table-of-contents">Back to top</a>
 </div>

----
**Congratulations! You have made it to the end of this README file.**

[Node]: https://www.nodejs.com
[Express]: https://www.expressjs.org
[JWT]: https://jwt.io
[SQLite]: https://www.sqlite.org/index.html
[Knex]: https://knexjs.org/
[Passport]: http://www.passportjs.org/
[bcrypt]: https://www.npmjs.com/package/bcrypt
[dotenv]: https://www.npmjs.com/package/dotenv
[Jest]: https://jestjs.io/
[Babel]: https://babeljs.io
[Supertest]: https://www.npmjs.com/package/supertest
[Cors]: https://www.npmjs.com/package/cors
[Winston]: https://www.npmjs.com/package/winston