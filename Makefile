.PHONY: all test clean

clean:
	rm -rf node_modules/ public/

install:
	npm install

test:
	npm test

dev:
	npm run dev

all: clean install test
