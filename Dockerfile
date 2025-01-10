FROM node:20.5.1-slim

RUN npm install -g @adonisjs/cli@latest

USER node
WORKDIR /home/node/app

CMD ["tail", "-f", "/dev/null"]
