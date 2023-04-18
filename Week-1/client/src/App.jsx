import Wallet from './Wallet';
import Transfer from './Transfer';
import connectToMetaMask from './metamask';
import server from './server';
import './App.scss';
import { useState, useEffect } from 'react';

function App() {
  const [balance, setBalance] = useState(0);
  const [account, setAccount] = useState('');

  useEffect(() => {
    const getUserAccount = async () => {
      try {
        const account = await connectToMetaMask();
        setAccount(account.toLowerCase());
      } catch (error) {
        console.error(error);
      }
    };
    getUserAccount();
    window.ethereum.on('accountsChanged', (accounts) => {
      setAccount(accounts[0]);
    });
  }, []);

  return (
    <div className='app'>
      <Wallet
        balance={balance}
        setBalance={setBalance}
        account={account}
        setAccount={setAccount}
      />
      <Transfer setBalance={setBalance} account={account} />
    </div>
  );
}

export default App;
