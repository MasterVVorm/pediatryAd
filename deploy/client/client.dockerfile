FROM nginx:alpine
COPY frontend/dist/ /usr/share/nginx/html
COPY deploy/client/nginx.conf /etc/nginx/conf.d/client.conf
