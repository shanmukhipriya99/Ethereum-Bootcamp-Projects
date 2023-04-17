import server from './server';
import { useEffect } from 'react';

function Wallet({ account, setAccount, balance, setBalance }) {
  const getBalance = async () => {
    const {
      data: { balance },
    } = await server.get(`balance/${account}`);
    setBalance(balance);
  };
  useEffect(() => {
    if (account) {
      getBalance();
    }
  }, [account]);

  async function addAccount() {
    try {
      if (account) {
        await server.post(`addAccount/${account}`);
      }
      getBalance();
    } catch (error) {
      console.error(error);
    }
  }

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
      <button className='button' onClick={() => addAccount()}>
        Add Account
      </button>

      <div className='balance'>Balance: {balance}</div>
    </div>
  );
}

export default Wallet;
