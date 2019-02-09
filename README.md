# Currency exchange test task

The goal was to make a React application that simulates the currency exchange screen functionality of the given application:
https://www.youtube.com/watch?v=c0zPSiKYipc&t=29s

The task is described more detailed here:
https://docs.google.com/document/d/1xzUc-OAC-R7_i1DDoTnJ9wcjivK1S4b5Z-liiZurfPo/edit

## How to run the application

The application supports all the modern browsers (IE is not in the party).

1. Download the repository
2. [Get an Open Exchange Rates app ID](https://openexchangerates.org/signup/free) and add it your environment variables under the name `REACT_APP_OPEN_EXCHANGE_RATES_APP_ID`.
    You can do it by creating a `.env.local` file with a content like this:

    ```
    REACT_APP_OPEN_EXCHANGE_RATES_APP_ID=your-app-id-here
    ```
3. Open a terminal and go to the project directory
4. Run `npm install`
5. Run `npm start`
6. Open http://localhost:3000 in a browser

If you want to deploy it on a server, do steps 1-4 and then run `npm run build`.
A `build` directory will be created in the project directory. Serve the content of the directory with your web server.

## How to test

Some checks are performed during `npm start` and `npm run build`. But there are also explicit tests.
Before the first run, make an empty `.env.test.local` file and add an Open Exchange Rates app ID there (like described above).
Run `npm test` to run the tests.

## Architecture concepts

- [Redux](http://redux.js.org) is used to manage the application state
- [Redux-Saga](redux-saga.js.org) is used to manage asynchronous actions because it allows to write very testable code
