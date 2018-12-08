FROM node:alpine

ADD package.json package-lock.json /code/
WORKDIR /code

RUN npm install

ADD . /code

CMD npm run build && npm start
