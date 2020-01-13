FROM node:8-alpine

RUN mkdir /cart
WORKDIR /cart

COPY package.json package.json
COPY package-lock.json package-lock.json

RUN npm install

COPY app app
COPY scripts scripts
