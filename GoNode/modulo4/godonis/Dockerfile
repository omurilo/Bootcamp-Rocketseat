FROM node:alpine

WORKDIR /app

ADD .env /app

EXPOSE ${PORT}

ADD package.json /app

RUN npm install

COPY . /app

RUN node --harmony_proxies ace migration:run

RUN node --harmony_proxies ace kue:listen

CMD ["npm", "start"]
