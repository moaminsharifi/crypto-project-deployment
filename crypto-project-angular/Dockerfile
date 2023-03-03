FROM node:lts-alpine AS dev

WORKDIR /app

COPY --chown=node:node package.json ./
RUN npm install -g @angular/cli@latest
RUN npm install
RUN npm install @angular-devkit/build-angular


VOLUME ["/app"]

EXPOSE 3000
CMD npm run serve:dev
