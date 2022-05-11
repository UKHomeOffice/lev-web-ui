FROM node:16-alpine3.15 as base

RUN apk add --no-cache ca-certificates \
 && apk upgrade --no-cache

RUN addgroup -S app \
 && adduser -S app -G app -u 31337 -h /app/ \
 && chown -R app:app /app/
USER app
WORKDIR /app

COPY --chown=app:app package.json package-lock.json /app/
COPY --chown=app:app assets/ /app/assets/

FROM cypress/browsers:node16.14.0-chrome99-ff97 as cypress

RUN apt-get update --quiet -y \
 && apt-get upgrade --quiet -y \
 && apt-get install g++ build-essential -y \
 && apt-get install ca-certificates -y

RUN addgroup --system app \
 && adduser --system --home /app/ --uid 31337 --ingroup app app \
 && chown -R app:app /app/
USER app
WORKDIR /app

COPY --chown=app:app package.json package-lock.json /app/
COPY --chown=app:app assets/ /app/assets/

FROM cypress as test
RUN npm ci
COPY --chown=app:app . /app
ENV PORT=8001
RUN npm run test

FROM base as prod

ENV NODE_ENV production
RUN npm ci --only=production
COPY --chown=app:app . /app

USER 31337
ENV PORT=8001
CMD ["node", "."]
