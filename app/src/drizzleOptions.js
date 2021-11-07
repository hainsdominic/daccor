import Web3 from 'web3';
import Housing from './contracts/Housing.json';

const options = {
  web3: {
    block: false,
    customProvider: new Web3('ws://localhost:8545'),
  },
  contracts: [Housing],
  events: {
    Housing: ['PaidRent'],
  },
};

export default options;
