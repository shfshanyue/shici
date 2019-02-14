FROM node:alpine

ADD package.json package-lock.json /code/
WORKDIR /code

RUN npm install

ADD . /code

RUN npm run build
CMD npm start
