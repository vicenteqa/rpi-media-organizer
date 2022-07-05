FROM node:14.19.0

WORKDIR /rpi-media-organizer

COPY ./ ./

VOLUME /torrent

VOLUME /media

RUN npm install

EXPOSE 3000

CMD [ "node", "src/index.js" ]