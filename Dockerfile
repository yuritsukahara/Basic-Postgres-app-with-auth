FROM oven/bun:1.1.8
WORKDIR /the/workdir/path
COPY ./package.json .
RUN bun install
COPY . .
CMD [ "bun", "run", "prod" ]