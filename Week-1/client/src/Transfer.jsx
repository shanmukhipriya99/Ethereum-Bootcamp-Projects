import { useState } from 'react';
import server from './server';
import Web3 from 'web3';
import { utf8ToBytes, toHex, hexToBytes } from 'ethereum-cryptography/utils';
import { keccak256 } from 'ethereum-cryptography/keccak';
import * as secp from 'ethereum-cryptography/secp256k1';

function Transfer({ account, setBalance }) {
  const [sendAmount, setSendAmount] = useState('');
  const [recipient, setRecipient] = useState('');
  const web3 = new Web3(window.ethereum);

  const setValue = (setter) => (evt) => setter(evt.target.value.toLowerCase());

  async function transfer(evt) {
    evt.preventDefault();
    try {
      const msg = `Sending ${sendAmount} from ${account} to ${recipient}`;
      const hashedMsg = toHex(keccak256(utf8ToBytes(msg)));
      let sign = await web3.eth.personal.sign(msg, account);
      const {
        data: { balance },
      } = await server.post(`send`, {
        sender: account,
        amount: parseInt(sendAmount),
        recipient,
        hashedMsg,
        sign,
      });
      setBalance(balance);
    } catch (error) {
      console.error(error);
      alert(error.response.data.message);
    }
  }

  return (
    <form className='container transfer' onSubmit={transfer}>
      <h1>Send Transaction</h1>

      <label>
        Send Amount
        <input
          placeholder='1, 2, 3...'
          value={sendAmount}
          onChange={setValue(setSendAmount)}
        ></input>
      </label>

      <label>
        Recipient
        <input
          placeholder='Type an account, for example: 0x2'
          value={recipient}
          onChange={setValue(setRecipient)}
        ></input>
      </label>

      <input type='submit' className='button' value='Transfer' />
    </form>
  );
}

export default Transfer;
