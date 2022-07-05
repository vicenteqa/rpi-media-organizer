FROM node:14.19.0

WORKDIR /rpi-media-organizer

COPY ./ ./

RUN npm install

VOLUME ./torrent

VOLUME ./media

CMD [ "node", "src/index.js" ]