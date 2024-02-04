
# Nest JS GraphQL and REST API

This project is a Nest JS application that combines both GraphQL and REST APIs, along with Swagger documentation. Before starting the server, create a `.env` file in the project root and add the following variables:

```bash
# Example .env file

JWT_SECRET=n5zBfUwRfAH14pn9
JWT_EXPIRATION=7d
REDIS_HOST=redis
POSTGRES_HOST=postgres
POSTGRES_PASSWORD=mysecretpassword
POSTGRES_USER=postgres
POSTGRES_DB=postgres


```

## Installation

Make sure Docker and Docker Compose are installed on your system.

```bash
$ npm install
```

## Running the app

```bash
# development
$ npm run dev

# production mode
$ npm run docker:prod
```

## Test

```bash
# unit tests
$ npm run test

# e2e tests
$ npm run test:e2e

# test coverage
$ npm run test:cov
```

## License

Nest is [MIT licensed](LICENSE).
