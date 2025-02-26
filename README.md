# Message System Prototype Client

This is the client repository of the message system prototype. For more details about this project, please check [this repository](https://github.com/cytsunny/labster-take-home-test-backend)

## Set Up
For setup of the backend, please check [this repository](https://github.com/cytsunny/labster-take-home-test-backend)

### Prerequisite
#### Node 18.19.1
Angular 19.1.8 is used in this project, and it is the official requirement. For reference, Node 19.8.1 is used during development.

### Steps to set up
1. Run the [set up of the backend](https://github.com/cytsunny/labster-take-home-test-backend?tab=readme-ov-file#set-up)
2. If you have multiple version of node installed, please switch to the correct node version as listed above.
3. Run `npm install` to install the required package.
4. If you have ports changed for backend, you may need to change the API link base URL in the environment settings under `src/environments`
5. Run `ng serve` and it would tell you the link to the client. (Usually it is http://localhost:4200/ )
6. Input the link into browser and you should see the client.

## Running tests

To execute tests, run `ng test` .

As there are not much complicated logic in the project, the tests are mainly integration test.
