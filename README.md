# Redtetris

React and Node Typescript based boilerplate made with Babel, Webpack, Jest, Express, Semantic-Ui, Css-loader, TypeStyle implemented also a lil bit of ❤ ready to use and already config.

## client usage

### `npm start`

Runs the app in the development mode.<br />
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.<br />
You will also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.<br />
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.<br />
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.<br />
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `npm run tslint`

Runs tslint on all files inside the project and check if all files are valid or not.<br />
(tslint will only match .tsx .jsx files check `tslint.config.json` for more details).

## server usage

### Available commands for the server.

- Run the server in development mode: `npm run start:dev`.
- Run all unit-tests: `npm test`.
- Run a single unit-test: `npm test -- --testFile="name of test file" (i.e. --testFile=Users)`.
- Check for linting errors: `npm run lint`.
- Build the project for production: `npm run build`.
- Run the production build: `npm start`.
- Run production build with a different env file `npm start -- --env="name of env file" (default is production)`.
- Run jest tests: `npm run test`
- Run jest tests coverage: `npm run test-cov`

## docker usage

### Start project with `npm run dc-build`

Create docker images and containers. <br />
You can edit the config in the docker-compose.yml and inside the `client|server`/Dockerfile

- Run this command for run the server without rebuild container: `docker-compose up`.
