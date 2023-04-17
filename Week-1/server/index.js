const express = require('express');
const app = express();
const cors = require('cors');
const port = 3042;

app.use(cors());
app.use(express.json());

const balances = {};

app.post('/addAccount/:account', (req, res) => {
  const { account } = req.params;
  // Update the balances object with the new account
  if (!balances.hasOwnProperty(account)) {
    balances[account] = 100; // Set initial balance to 0
  }
  res.send({ success: true });
});

app.get('/balance/:account', (req, res) => {
  const { account } = req.params;
  const balance = balances[account] || 0;
  res.send({ balance });
});

app.post('/send', (req, res) => {
  const { sender, recipient, amount } = req.body;

  setInitialBalance(sender);
  setInitialBalance(recipient);

  if (balances[sender] < amount) {
    res.status(400).send({ message: 'Not enough funds!' });
  } else {
    balances[sender] -= amount;
    balances[recipient] += amount;
    res.send({ balance: balances[sender] });
  }
});

app.listen(port, () => {
  console.log(`Listening on port ${port}!`);
});

function setInitialBalance(account) {
  if (!balances[account]) {
    balances[account] = 0;
  }
}
