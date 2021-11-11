import axios from 'axios';

const weiToUSD = async (wei) => {
  const ticker = await axios.get('https://api.kraken.com/0/public/Ticker?pair=ETHUSDT');
  let price = parseFloat(ticker.data.result.ETHUSDT.c[0]);
  const value = price * wei * Math.pow(10, -18);
  return `$${value} USD @ $${price} USD/ETH`;
};

export default weiToUSD;
