FROM node:15-alpine

WORKDIR /app

COPY package*.json ./

ARG NODE_ENV
RUN if [ "$NODE_ENV" = "development" ]; \
         then npm install; \
         else npm install --only=production; \
         fi


COPY . ./

ARG DEFAULT_VALUE 8000
ENV  PORT $DEFAULT_VALUE
EXPOSE $PORT

CMD ["node","index.js"]
