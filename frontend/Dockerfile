FROM node:20 as builder

WORKDIR /var/www/frontend

COPY frontend/ .

RUN yarn install

RUN yarn build

FROM nginx:latest as prod

COPY --from=builder /var/www/frontend/build /usr/share/nginx/html
COPY frontend/nginx/nginx.conf /etc/nginx/nginx.conf

EXPOSE 80/tcp

CMD ["/usr/sbin/nginx", "-g", "daemon off;"]