# Blank server template (wip)
---
## TODO

- manage queries with tanstack

## Tech Stack

This project uses Bun, Hono, Vite, Tanstack (router, query and form), MUI, Tailwind, Zod, Drizzle, Postgres, Hono JWT and Bcrypt, to create a simple project as a Template for future projects.

For default creates a simple user permissions and a database to manage users and grant protected routes and profile customizations.

Is required to have an .env file to setup Postgres and JWT secret:

```
DB_URL= "127.0.0.1:5432"
DATABASE_PASSWORD="postgres"
DATABASE_USER="postgres"
DATABASE_HOST="127.0.0.1"
DATABASE_PORT="5432"
DATABASE_NAME="postgres"
VITE_JWT_TOKEN_SECRET='MIGfMA0GCSqGSIb3DQEBAQUAA4GNADCBiQKBgQC01bEvI5n7L4pPLdF32nVJbqSQ
22tydhsdiBwWAr0CY047TO99wfZVGseRLpo4zmT0QWRvUnG5S2sbdhZ3YTV3YIVm
NLfFicngOs8WNUPAkrnGWFxDRXuWtNE5NT+qycqJ81qDfsmGihPdKevMZbXnDy84
1DkBZyNQ8x1/f7PSGwIDAQAB'
```
## Folder structure

The frontend app lives in frontend folder
-.\frontend

The backend on server folder
.\server

The server app handles the frontend routes for convenience on deploy. The base path is '/'

Api route is setup to '/api'

For nice user experience any routes not defined goes to frontend 404 page

In order to maintain concise use of Types, the backend and frontend uses zod and are shared.

1. To create schemas go to .\server\db\schemas
2. Add then to .\server\db\schemas\index.ts
3. Finally to server\sharedTypes.ts

The available bun scripts are:
```js
"dev": "bun run --watch server/index.ts",
"studio": "bunx drizzle-kit studio",
"generate": "bunx drizzle-kit generate",
"migrate": "bunx server/db/migrate.ts",
"drop": "bunx drizzle-kit drop"
"startAdminUser": "bun run server/startAdminUser.ts", //run just once
```
   
## Running the app

### Frontend
1. cd into .\frontend and install packages
```
cd ./frontend
bun install
```
2. create frontend build
```
bun build
```

### Backend
1. run Postgres server 
```
docker-compose up
```

2. install bun server packages
```
bun install
```

3. make drizzle migrations and apply
```
bun generate
bun migrate
```
4. create the first users user:password admin:admin basic:basic and assign groups, just do that once

```
bun run startUsers
```

5. check if db is up
```
bun run studio
```

### API 

#### API


#### API Calls
Any api calls on authorized routes by groups must have the JWT token in the request.
You can get the authorization token via localhost:3000/api/getToken with the credentials in json on body

```js
const myHeaders = new Headers();
myHeaders.append("Content-Type", "application/json");

const raw = JSON.stringify({
  "user": "admin",
  "password": "admin"
});

const requestOptions = {
  method: "POST",
  headers: myHeaders,
  body: raw,
  redirect: "follow"
};

fetch("localhost:3000/api/getToken", requestOptions)
  .then((response) => response.text())
  .then((result) => console.log(result))
  .catch((error) => console.error(error));
````

### Modifications

Use as your will :D

## Credits

Thanks to
- [Sam Meech-Ward](https://www.youtube.com/watch?v=jXyTIQOfTTk), who made this project possible with his incredible walkthrough.
- [Cosden Solutions](https://www.youtube.com/watch?v=AcYF18oGn6Y), for the JWT guide.
- [Tiago Tsukahara](https://www.linkedin.com/in/tiagotsukahara/), for the support during the project.
