FROM node:14.19.0

WORKDIR /rpi-media-organizer

COPY ./ ./

RUN mkdir /torrent

RUN mkdir /media

RUN npm install

# EXPOSE 3000

CMD [ "node", "src/index.js" ]