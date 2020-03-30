# Development stage
FROM node:12-alpine AS dev
WORKDIR /code
COPY package-lock.json package.json ./
RUN npm ci
COPY . .
RUN npm run build && npm run buildServer
RUN rm -r src && rm -r template

#Build state
FROM node:12-alpine AS build
WORKDIR /code
COPY --from=dev /code .
RUN npm i --production

# Runtime stage

FROM alpine:3.10
RUN apk add --update nodejs
RUN addgroup -S node && adduser -S service -G node
USER service
RUN mkdir /home/service/src
WORKDIR /homer/service/src
COPY --from=build --chown=service:node /code .
EXPOSE 3000
CMD ["node","server/index.js"]