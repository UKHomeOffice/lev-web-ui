FROM node:20-alpine3.16 as base

RUN apk add --no-cache ca-certificates \
 && apk upgrade --no-cache

RUN addgroup -S app \
 && adduser -S app -G app -u 31337 -h /app/ \
 && chown -R app:app /app/
USER app
WORKDIR /app

COPY --chown=app:app package.json package-lock.json /app/
COPY --chown=app:app assets/ /app/assets/

FROM base as test
RUN npm ci
COPY --chown=app:app . /app
RUN npm run test

FROM base as prod

ENV NODE_ENV production
RUN npm ci --only=production
COPY --chown=app:app . /app

USER 31337
CMD ["node", "."]
