# lev-web-ui
Life Event Verification User Interface

## Getting Started

### To build the application and run all tests
```shell
nvm use
make all
```

### Local Development
#### To run the application 
```shell
npm run start:mockapi
npm start
```

#### To run the application in development mode
```shell
npm run start:mockapi
npm run dev
```

#### To run the application & cypress in development mode
```shell
npm run start:mockapi
npm run dev
npm run cypress
```

### Docker

Due to a re-platforming of the service, the location of Docker images has changed to Amazon ECR, which is not publicly available.

For local development, images that can be used locally have been left in the codebase but commented out. To run, they will need to temporarily replace the ERC images during testing.

Note that images like lev-api will not be up-to-date in quay. For running ui tests this should be fine but be aware that the current api behaviour may be different. 

The docker images also have some proxies that are used in the CI/CD pipeline - these will also need to be removed for local building of images. 

#### To run the application
```shell
docker compose up --build
```
#### To run the application & cypress:acceptance tests
```shell
docker compose -f docker-compose-e2e.yml up --build
```

### Mock Data
Whether running locally, or Docker, mock data is obtained from [lev-api/mock](https://github.com/UKHomeOffice/lev-api/tree/master/mock).
