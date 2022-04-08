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

all: clean install test
