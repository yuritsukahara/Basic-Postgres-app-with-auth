# Blank server template 
---

## Tech Stack

This project uses Bun, Hono, Vite, Tanstack (router, query and form), ShadCn, Tailwind, Zod, Drizzle, Postgres and JWT, to create a simple project as a Template for future projects.

For default creates a simple user permissions and a database to manage users and grant protected routes and profile customizations.

Is required to have an .env file to setup Postgres:

```
DB_URL= "127.0.0.1:5432"
DATABASE_PASSWORD="postgres"
DATABASE_USER="postgres"
DATABASE_HOST="127.0.0.1"
DATABASE_PORT="5432"
DATABASE_NAME="postgres"
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
```
"dev": "bun run --watch server/index.ts",
"build": "bun run vite build",
"studio": "bunx drizzle-kit studio",
"generate": "bunx drizzle-kit generate",
"migrate": "bunx server/db/migrate.ts",
"drop": "bunx drizzle-kit drop"
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
4. create the first user using drizle-studio
```
bun studio
```
### Modifications

Use as your will :D

## Credits

Thanks to
- [Sam Meech-Ward](https://www.youtube.com/watch?v=jXyTIQOfTTk), who made this project possible with his incredible walkthrough.
- [Cosden Solutions](https://www.youtube.com/watch?v=AcYF18oGn6Y), for the JWT guide.
- [Tiago Tsukahara](https://www.linkedin.com/in/tiagotsukahara/), for the support during the project.