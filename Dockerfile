FROM node:alpine
WORKDIR /app


COPY package.json ./

COPY package-lock.json ./

RUN npm ci

COPY . /app

CMD ["npm", "start"]
