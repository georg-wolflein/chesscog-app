FROM node:15.2.0

RUN mkdir -p /app
WORKDIR /app
COPY package-lock.json package.json tsconfig.json ./
RUN npm install
COPY .env .env

VOLUME /app/src
VOLUME /app/public

CMD npm start