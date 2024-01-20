FROM node:20 as builder

ARG user

RUN mkdir -p /var/www/nodeapi/node_modules && chown -R node:node /var/www/nodeapi

WORKDIR /var/www/nodeapi

COPY /nodeapi/package.json .

RUN npm install

COPY /nodeapi .

COPY --chown=node:node . .

EXPOSE 3333

CMD ["npm", "run", "production"]