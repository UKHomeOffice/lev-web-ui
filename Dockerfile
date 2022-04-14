FROM node:16-alpine3.15

ENV NODE_ENV production

WORKDIR /app

COPY --chown=node:node package.json package-lock.json /app/
COPY --chown=node:node assets/ /app/assets/

RUN npm ci --only=production

COPY --chown=node:node . /app

USER node

CMD ["node", "."]
