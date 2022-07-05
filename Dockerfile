FROM node:14.19.0

WORKDIR /rpi-media-organizer

RUN mkdir -p /torrent
RUN mkdir -p /media

COPY ./ ./

RUN npm install

EXPOSE 3000

CMD [ "node", "src/index.js" ]