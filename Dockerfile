# cat Dockerfile 
FROM nginx
COPY dist /usr/share/nginx/html
COPY assets/nginx.conf /etc/nginx/