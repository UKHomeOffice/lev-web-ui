FROM 113355358853.dkr.ecr.eu-west-1.amazonaws.com/ho/hmpo/lev/bac/lev-node:latest AS base

RUN apk add --no-cache ca-certificates \
 && apk upgrade --no-cache

RUN addgroup -S app \
 && adduser -S app -G app -u 31337 -h /app/ \
 && chown -R app:app /app/
USER app
WORKDIR /app

COPY --chown=app:app package.json package-lock.json /app/
COPY --chown=app:app assets/ /app/assets/
RUN mkdir "logs"

FROM base AS test
RUN npm ci --legacy-peer-deps
COPY --chown=app:app . /app
RUN npm run test

FROM base AS prod

ENV NODE_ENV=production
RUN npm ci --legacy-peer-deps --only=production
COPY --chown=app:app . /app

USER 31337
CMD ["node", "."]
