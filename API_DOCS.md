# NoteX API Documentation

- **Local**: `http://localhost:5000/api`
- **Production**: `https://scalable-crud-portal-1.onrender.com/api`

## Authentication

### Sign Up
`POST /auth/signup`
- Body: `{ "name": "...", "email": "...", "password": "..." }`
- Response: `201 Created` with token and user info.

### Login
`POST /auth/login`
- Body: `{ "email": "...", "password": "..." }`
- Response: `200 OK` with token and user info.

### Get Profile
`GET /auth/profile`
- Header: `Authorization: Bearer <token>`
- Response: `200 OK` with user details.

### Update Profile
`PUT /auth/profile`
- Header: `Authorization: Bearer <token>`
- Body: `{ "name": "...", "email": "..." }`
- Response: `200 OK` with updated user details.

## Notes

### List Notes
`GET /notes`
- Header: `Authorization: Bearer <token>`
- Query Params:
  - `search`: Search string for title/content
  - `tag`: Filter by specific tag
- Response: `200 OK` with list of notes.

### Create Note
`POST /notes`
- Header: `Authorization: Bearer <token>`
- Body: `{ "title": "...", "content": "...", "tags": ["...", "..."] }`
- Response: `201 Created` with the new note.

### Update Note
`PUT /notes/:id`
- Header: `Authorization: Bearer <token>`
- Body: `{ "title": "...", "content": "...", "tags": ["...", "..."] }`
- Response: `200 OK` with the updated note.

### Delete Note
`DELETE /notes/:id`
- Header: `Authorization: Bearer <token>`
- Response: `200 OK` with success message.
