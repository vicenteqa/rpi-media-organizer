FROM node:14.19.0

WORKDIR /rpi-media-organizer

COPY ./ ./

RUN npm install

CMD [ "node", "src/index.js" ]