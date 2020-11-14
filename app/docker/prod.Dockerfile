# Build environment
FROM node:15.2.0 AS build
WORKDIR /app
ENV PATH /app/node_modules/.bin:$PATH

COPY package-lock.json package.json tsconfig.json ./
RUN npm install

COPY public/ public/
COPY src/ src/
RUN npm run build

# Production environment
FROM nginx:stable-alpine
RUN cat /etc/nginx/conf.d/default.conf
COPY docker/nginx.conf /etc/nginx/conf.d/default.conf
COPY --from=build /app/build /usr/share/nginx/html

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]