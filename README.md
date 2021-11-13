<h1 align="center">
  daccor
</h1>

## _A decentralised solution for transparent and fair lease management_

When a lease is signed, it is difficult to prevent forgery of the lease by any of the two parties. Special measures has to be taken such as making a copy of the signed lease. However, any of the two parties can be malicious during the process. This decentralized application focuses on providing a neutral and verifiable environment, obviously including the great tracability provided by the blockchain.

## Features

- Create a new lease in the smart contract by uploading the lease file (only the SHA-256 hash is saved in the blockchain) and specifying the rent amount.
- Pay the rent by specifying the lease ID number assigned at the creation of the lease.
- Verify that your copy of the contract is valid by uploading it. The software will verify if the hash matches the uploaded hash for a specific lease ID number.

## Tech

| Packages  | Description                 |
| --------- | --------------------------- |
| contracts | Solidity smart contracts    |
| test      | Mocha + Chai truffle tests  |
| app       | React front-end application |

## Development

daccor requires [Node.js](https://nodejs.org/) V10+ (and NPM) to run.

First, install the truffle dependencies, start the local blockchain, compile and migrate the contracts.

```sh
npm install
truffle develop
compile
migrate
```

Then, go into the app directory, install the front-end dependencies and run the app.

```sh
cd app
npm install
npm start
```

Note that to have the best user experience, install metamask and connecting it to local network is ideal.

## Team

Dominic Hains - Developer
