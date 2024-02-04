FROM node:16-alpine as development

RUN apk --no-cache add --virtual .builds-deps build-base python3

ARG NODE_ENV=dev
ENV NODE_ENV=${NODE_ENV}

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm ci
RUN npm rebuild bcrypt --build-from-source

COPY . .

# RUN npm run build

FROM node:16-alpine as production

ARG NODE_ENV=prod
ENV NODE_ENV=${NODE_ENV}

WORKDIR /usr/src/app

COPY package.json ./

RUN npm install

COPY . .

RUN npm run build 

CMD ["npm", "run", "start:prod"]