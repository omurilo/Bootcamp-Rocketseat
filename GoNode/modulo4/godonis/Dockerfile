FROM node:alpine

WORKDIR /app

ADD .env /app

EXPOSE ${PORT}

ADD package.json /app

RUN npm install

COPY . /app

CMD ["npm", "start"]
