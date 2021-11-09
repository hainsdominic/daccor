import Housing from './contracts/Housing.json';

const options = {
  web3: {
    block: false,
    fallback: {
      type: 'ws',
      url: 'ws://localhost:8545',
    },
  },
  contracts: [Housing],
  events: {
    Housing: ['LeaseCreated', 'PaidRent'],
  },
};

export default options;
