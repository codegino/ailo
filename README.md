# How to run the application

> IMPORTANT! Make sure to go to the root directory of the project before running the steps below

### When node.js(14.16.0 or latest) is installed in you computer

```bash
npm install
npm run build
npm run start OR npm start
```

### When Docker is installed in you computer

```bash
docker build . -t ailo/zombie-app
docker run -it ailo/zombie-app
```

> NOTE: Make sure to enter correct format when inputting values via CLI. I did not invest much time in parsing user input due to reason mentioned below.

### Running tests

> NOTE: When running test, if version is below the specified above you will experience a dependency error

```bash
npm install
npm run test, npm test, OR npm t
```

### To get coverage report

```bash
npm run test:coverage
```

> Go to `coverage/lcov-report/src` then open `index.html` to see the coverage result

> NOTE: I intentionally did not add unit tests and check edge cases for the `main.js` and `printing map function` as they are mostly utilities for demo purposes. For REAL projects these will surely be tested.
