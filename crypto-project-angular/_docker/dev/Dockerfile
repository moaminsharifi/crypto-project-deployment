# dev stage
FROM node:lts-alpine

COPY resources/startup.sh /usr/local/bin/startup.sh
RUN chmod 777 /usr/local/bin/startup.sh

RUN npm install -g @angular/cli@latest

WORKDIR /app

VOLUME ["/app"]

EXPOSE 4200
CMD ["sh", "/usr/local/bin/startup.sh"]
