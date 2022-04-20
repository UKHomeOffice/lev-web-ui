FROM node:16-alpine3.15

RUN apk add --no-cache ca-certificates \
 && apk upgrade --no-cache \
 && addgroup -S app \
 && adduser -S app -G app -u 31337 -h /app/ \
 && chown -R app:app /app/

USER app
WORKDIR /app
ENV NODE_ENV production

COPY --chown=node:node package.json package-lock.json /app/
COPY --chown=node:node assets/ /app/assets/

RUN npm ci --only=production

COPY --chown=node:node . /app

USER 31337

CMD ["node", "."]
