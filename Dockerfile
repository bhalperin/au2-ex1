FROM jitesoft/node-yarn AS build
# FROM mcr.microsoft.com/devcontainers/base:alpine-3.19
WORKDIR /app
COPY package.json .
COPY yarn.lock .
RUN yarn install
COPY . .
RUN yarn build
# EXPOSE 9000
# RUN yarn start
# CMD [ "yarn", "start" ]

FROM nginx:alpine
COPY --from=build /app/dist /usr/share/nginx/html
EXPOSE 9000
CMD [ "nginx", "-g", "daemon off;" ]
