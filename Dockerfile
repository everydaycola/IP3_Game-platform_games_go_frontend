FROM node:24 AS build
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build

FROM nginx:alpine

COPY --from=build /app/dist /usr/share/nginx/html

RUN printf 'server {\n\
    listen 80;\n\
    server_name localhost;\n\
    root /usr/share/nginx/html;\n\
    index index.html;\n\
    add_header "Access-Control-Allow-Origin" "https://team14-platform-frontend.civato.org" always;\n\
    add_header "Access-Control-Allow-Methods" "GET, POST, PUT, DELETE, PATCH, OPTIONS" always;\n\
    add_header "Access-Control-Allow-Headers" "*" always;\n\
    add_header "Access-Control-Allow-Credentials" "true" always;\n\
    add_header "Access-Control-Expose-Headers" "*" always;\n\
    location / {\n\
        try_files $uri $uri/ /index.html;\n\
        if ($request_method = OPTIONS) {\n\
            add_header "Access-Control-Allow-Origin" "https://team14-platform-frontend.civato.org";\n\
            add_header "Access-Control-Allow-Methods" "GET, POST, PUT, DELETE, PATCH, OPTIONS";\n\
            add_header "Access-Control-Allow-Headers" "*";\n\
            add_header "Access-Control-Allow-Credentials" "true";\n\
            add_header "Access-Control-Max-Age" 1728000;\n\
            add_header "Content-Type" "text/plain; charset=utf-8";\n\
            add_header "Content-Length" 0;\n\
            return 204;\n\
        }\n\
    }\n\
}\n' > /etc/nginx/conf.d/default.conf

EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
