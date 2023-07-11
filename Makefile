.PHONY: all test clean

clean:
	rm -rf node_modules/ package-lock.json

install:
	npm install

test:
	sleep 21
	docker build -t "lev-web-ui-image" .
	docker build -t "cypress-image" -f Dockerfile-e2e .
	docker run -d --name "lev-web-ui" lev-web-ui-image
	docker run -d --name lev-api-mock --net "container:lev-web-ui" --env 'MOCK=true' quay.io/ukhomeofficedigital/lev-api:0.18
	docker run --net "container:lev-web-ui" cypress-image
	docker rm -vf "lev-web-ui" "lev-api-mock"

build:
	npm run build

dev:
	npm run dev

start-docker:
	docker compose up --build

stop-docker:
	docker compose down

start-docker-e2e:
	docker compose -f docker-compose-e2e.yml up --build

stop-docker-e2e:
	docker compose -f docker-compose-e2e.yml down

all: clean install test
