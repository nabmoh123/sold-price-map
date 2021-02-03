# Sold Price Map Backend 

This project spins up a NodeJS Back end which exposes an express API. This api allows for operations against an in memory Database which stores entries for the property map.

An in memory DB was chosen to allow for a simpler solution and to remove the dependency of having to start a MongoDB application to connect to.

The entries are stored in the database as {x: ,y:, price: }

Jest was used for testing the application because in comparison to mocha Jest provides all the required dependencies for mocking this project and requires very little setup.

## Running the Backend
NPM is required to install the dependencies for the project and start the application.

Install the node_modules required for this project:
### `npm install`

Start the Node application:
### `npm start`

Run the unit tests
### `npm test`