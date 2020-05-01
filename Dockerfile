FROM node:10-alpine

ADD package.json yarn.lock /code/
WORKDIR /code

RUN yarn

ADD . /code

ENV NODE_ENV=production
RUN npm run build
CMD node server.js
