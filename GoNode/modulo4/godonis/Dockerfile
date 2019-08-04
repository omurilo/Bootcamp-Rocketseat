FROM node:alpine

WORKDIR /app

ADD .env /app

EXPOSE ${PORT}

ADD package.json /app

RUN npm i -g @adonisjs/cli

COPY . /app

RUN yarn install --ignore-engines --silent

CMD ["adonis", "serve"]
