FROM node:14.19.0

RUN mkdir -p /torrent
RUN mkdir -p /media

WORKDIR /rpi-media-organizer

COPY ./ ./

RUN npm install

EXPOSE 3000

CMD [ "node", "src/index.js" ]