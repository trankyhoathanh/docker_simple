FROM node:16-alpine

WORKDIR /app
COPY package.json ./
RUN yarn install --frozen-lockfile
COPY . .
RUN yarn build
COPY /src/views/* ./dist/js/views/