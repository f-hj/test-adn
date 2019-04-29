FROM node:12

COPY . /app
WORKDIR /app
RUN yarn install

ENV API_PORT 80
EXPOSE 80

HEALTHCHECK --interval=5m --timeout=3s \
  CMD curl -f http://localhost:80/health || exit 

ENTRYPOINT [ "yarn", "start" ]