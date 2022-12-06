# overchain-web-api

## Description

​
API responsible to provide data for the Overchain APP

## Docs
​
We have additional documentation at the [docs folder](./docs), explaining more about the endpoints.
We are also covered by the [OpenAPI specification](https://swagger.io/specification/), and you can take a look at these links:
​

- <http://localhost:5000/docs/>
​

## How to run

You can launch the docker instance:

```bash
docker-compose up --build -d -V overchain-web-api
```


Our Docker image is based on the [official node image](https://hub.docker.com/_/node).
The API is served at `localhost:8080` by default.
In dev environment we have auto-reload enabled, so you can modify files and see the changes in real-time
​

## For Developers
​
You can also run our service outside the docker, if you want to test the application behavior in your own environment
​

### Prerequisites
​
You will need the following things properly installed on your computer.
​

- [Node 16 (LTS)](https://nodejs.org/en/download/)
  ​

### Installation

1.  Make sure you have `node` installed and added to your `PATH`.
2.  Install and sync all dependencies with `npm install`
3.  Get a coffee, it can take a few minutes depending on your internet connection. And don't despair if don't get all the environment working on the first try.
    ​

### Running the app

This API uses connections with Firestore, Firebase Admin and have a Google Cloud Storage client, so you need to create a .env file including a proper configuration for the connections. [Here](./docs/envs.md) you can learn more about how to create and configure the .env file.
​

```bash
# development
❯ npm run start

# watch mode
❯ npm run start:dev

# debug mode
❯ npm run start:debug

# production mode
❯ npm run start:prod
```

And then test your app at <http://localhost:5000/>.

### Adding dependences

[package.json](./package.json) and [package-lock.json](./package-lock.json) will be automatically updated during

```bash
❯ npm install <dependency>
```

### Code style

- Our .ts code is formatted with [Prettier](https://prettier.io/) and [ESlint](https://eslint.org/). Configuration for both are stored inside [.prettierrc.js](./.prettierrc.js) and [.eslintrc.js](./.eslintrc.js).
### Pre-commit hooks
We use [Husky](https://typicode.github.io/husky/#/), powered by [Git Hooks](https://www.git-scm.com/book/en/v2/Customizing-Git-Git-Hooks).

  - All configuration is stored inside _[.husky](./.husky)_ ;
  - Husky will run locally before each commit;
  - Install and prepare the environment to use the hooks:
    https://typicode.github.io/husky/#/

```bash
# this will initialize the git hooks
❯ npm run prepare

# maybe you'll have to install husky globally, if this happen:
❯ npm install husky -g
```

The expected behavior here is that the pre-commit is performed and only goes through all the hooks with a 'passed' status. But If the modifications that you did broke some pattern, it will fail on the related hook.

### Tests

Tests are located at the [tests](./tests) directory and inside application folders, with the pattern `'*.spec.ts'`.

```bash
# run unit tests
❯ npm run test

# run unit tests
❯ npm run test

# run e2e tests
❯ npm run test:e2e

# run test coverage
❯ npm run test:cov
```

---