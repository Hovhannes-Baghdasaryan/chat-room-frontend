FROM node:alpine as build

WORKDIR /app

COPY package*.json ./

RUN yarn

COPY . .

RUN yarn build

FROM node:alpine

WORKDIR /app

COPY --from=build /app/build ./build

EXPOSE 3000

CMD ["npx", "serve", "-s", "build"]
