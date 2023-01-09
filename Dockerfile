FROM node:19.4

WORKDIR /usr/src/app

COPY ./ /usr/src/app

ENV NODE_ENV production
ENV PORT 80

RUN npm install

EXPOSE 80
CMD [ "npm", "build" ]
CMD [ "npm", "start" ]
