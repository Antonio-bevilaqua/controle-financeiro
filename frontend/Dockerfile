FROM node:20 as builder

WORKDIR /var/www/frontend

COPY frontend/ .

RUN yarn install

EXPOSE 3000

CMD [ "yarn", "start" ]