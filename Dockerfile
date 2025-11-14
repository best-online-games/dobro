FROM node:20-alpine

RUN apk add --no-cache git

# Кладём текущий проект внутрь контейнера в /dobro
WORKDIR /mam
RUN mkdir -p /mam/bog/dobro
COPY . /mam/bog/dobro

RUN npm exec mam /bog/dobro

EXPOSE 9080
