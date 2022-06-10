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

docker:
	docker compose up --build

docker-local:
	docker compose -f docker-compose-local.yml up --build

all: clean install test
