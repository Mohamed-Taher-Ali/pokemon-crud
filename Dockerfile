FROM node:20.9.0

WORKDIR /pokemon
COPY package.json .
RUN yarn
COPY . .
CMD yarn start
