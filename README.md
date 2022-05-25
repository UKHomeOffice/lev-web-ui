# lev-web-ui
Life Event Verification User Interface

## Getting Started

### To build the application and run all tests
```shell
make all
```

### To start the application locally
```shell
npm start
```

### To start the application locally in dev mode
```shell
npm run dev
```

### To run the application in Docker
The application can be run locally using Docker containers with a single command:
```shell
docker-compose up
```

### Mock Data
```text
-- Test data
--
--   123456789: Original testing record
--   999999901: First non-unique record for automated tests
--   999999902: Second non-unique record for automated tests
--   999999903: Third non-unique record for automated tests
--   999999910: Unique record for automated tests
--   999999920: Blocked
--   999999921: Cancelled
--   999999922: Caution mark
--   999999923: Court order
--   999999924: Fictitious birth
--   999999925: Re-registered
--   999999926: All the flags!
--   999999930: Subsequently married
--   999999931: Subsequently married
```
