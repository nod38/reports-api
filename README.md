# REPORTS-API

## Table of contents:

- [Requirements](#requirements)
- [Setup](#setup)
- [API docs](#api-endpoints)

### Requirements

- NodeJS >= v12.22.1
- Docker

### Setup

1. Copy content of the `.env.example` to the `.env` and set configuration.
2. Run `npm install`.
3. Run `npm run start:dev:db` or `bash ./start-db.sh`.
4. Run `npm run migration:run`.
5. Run `npm run start:dev`.
6. Make a request to the `http://localhost:PORT` (where PORT is defined in `.env` - if not set, 3000 will be used by default).

### Api-endpoints

`POST /reports`
`POST /reports/:reportId/answer`
`POST /reports/:reportId/attachment`
`PATCH /reports/:reportId/commit`
`GET /reports/:reportId/verify`
