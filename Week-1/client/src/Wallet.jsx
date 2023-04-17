import server from './server';
import { useEffect } from 'react';

function Wallet({ account, setAccount, balance, setBalance }) {
  useEffect(() => {
    const getBalance = async () => {
      const { data: { balance } } = await server.get(`balance/${account}`);
      setBalance(balance);
    };

    getBalance();
  }, [account]);

  return (
    <div className='container wallet'>
      <h1>Your Wallet</h1>

      <label>
        Wallet Address
        <input
          placeholder='Type an address, for example: 0x1'
          value={account}
          disabled
        ></input>
      </label>

      <div className='balance'>Balance: {balance}</div>
    </div>
  );
}

export default Wallet;
