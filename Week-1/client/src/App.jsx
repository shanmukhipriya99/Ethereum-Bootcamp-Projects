import Wallet from './Wallet';
import Transfer from './Transfer';
import connectToMetaMask from './metamask';
import './App.scss';
import { useState, useEffect } from 'react';

function App() {
  const [balance, setBalance] = useState(0);
  const [address, setAddress] = useState('');
  const [account, setAccount] = useState('');

  useEffect(() => {
    const getUserAccount = async () => {
      try {
        const account = await connectToMetaMask();
        setAccount(account);
      } catch (error) {
        console.error(error);
      }
    };
    getUserAccount();
  }, []);

  return (
    <div className='app'>
      <Wallet
        balance={balance}
        setBalance={setBalance}
        address={address}
        setAddress={setAddress}
      />
      <Transfer setBalance={setBalance} address={address} />
    </div>
  );
}

export default App;
