FROM 14.19-alpine3.15

WORKDIR /rpi-media-organizer

COPY ./ ./

RUN npm install

CMD [ "node", "src/index.js" ]