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
#### To run the application
```shell
docker compose up --build
```
#### To run the application & cypress:acceptance tests
```shell
docker compose -f docker-compose-local.yml up --build
```

### Mock Data
Whether running locally, or Docker, mock data is obtained from [lev-api/mock](https://github.com/UKHomeOffice/lev-api/tree/master/mock).
