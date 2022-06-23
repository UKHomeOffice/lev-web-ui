.PHONY: all test clean

clean:
	rm -rf node_modules/ public/

install:
	npm install

test:
	npm test

build:
	npm run build

dev:
	npm run dev

start-docker:
	docker compose up --build

stop-docker:
	docker compose down

start-docker-local:
	docker compose -f docker-compose-local.yml up --build

stop-docker-local:
	docker compose -f docker-compose-local.yml down

all: clean install test
