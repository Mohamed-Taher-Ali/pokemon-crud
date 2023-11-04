FROM node:18.0.0

WORKDIR /home/node/app
COPY package.json .
RUN npm i
COPY . .
RUN npm run build

CMD npm start
