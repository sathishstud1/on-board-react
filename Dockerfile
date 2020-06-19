FROM node:alpine

WORKDIR /app

#ENV PORT 80

COPY package.json ./

COPY package-lock.json ./

RUN npm ci

COPY . /app

CMD ["npm", "start"]
