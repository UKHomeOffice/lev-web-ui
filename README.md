# lev-web-ui
Life Event Verification User Interface

## Getting Started

### To build the application and run all tests
```shell
nvm use
make all
```

### Linting
To execute the linter run:
```shell
npm run lint
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

### Testing Against Environment

Tests can be run locally against an environment. Note that the user used must have the no-mfa role and you must be connected to the EBSA VPN.

`docker build -t lev-web-ui-e2e -f Dockerfile-e2e .`

`docker run --name lev-web-ui-e2e -e 'SMOKE_TEST=true' -e 'ENV=ENVIROMENT' -e 'KEYCLOAK_URL=KC_ENV_URL' -e 'TEST_URL=SERVICE_URL'  -e 'TEST_USERNAME=USERNAME' -e 'TEST_PASSWORD=PASSWORD' --net host lev-web-ui-e2e`

### iam-api integration

Syops is tied to the iam-api as the syops agreement check, is against the iam-api. The docker-compose envs are set up with a 
MOCK env variable that sets the bypassSyops variable to bypass the check. 

If running the ui with npm against an iam environment, this env variable can be set 
in the command or an .env file can be used. The IAM_USER variable should be set to the same user that the iam env is using, to 
enable access. 