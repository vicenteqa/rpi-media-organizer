FROM node:14.19-slim

WORKDIR /rpi-media-organizer

COPY ./ ./

RUN npm install

CMD [ "node", "src/index.js" ]