HTTP_PROXY := ""
HTTPS_PROXY := ""

.PHONY: all test clean

clean:
	rm -rf node_modules/ package-lock.json

install:
	npm install

test:
	npm install && npm run test
	docker-compose -f docker-compose-e2e.yml build --build-arg HTTP_PROXY=$(HTTP_PROXY) --build-arg HTTPS_PROXY=$(HTTPS_PROXY)
	docker-compose -f docker-compose-e2e.yml up --exit-code-from acceptance

build:
	npm run build

dev:
	npm run dev

start-docker:
	docker-compose up --build

stop-docker:
	docker-compose down

start-docker-e2e:
	docker-compose -f docker-compose-e2e.yml up --build

stop-docker-e2e:
	docker-compose -f docker-compose-e2e.yml down

all: clean install test
