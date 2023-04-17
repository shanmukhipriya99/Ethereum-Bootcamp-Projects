const connectToMetaMask = async () => {
    // Check if the user has MetaMask installed and enabled
    if (window.ethereum) {
      // Request the user's permission to access their MetaMask wallet
      const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
      
      // Listen for changes to the user's account
      window.ethereum.on('accountsChanged', (newAccounts) => {
        // Handle changes to the user's account
        console.log('User account changed:', newAccounts[0]);
      });
      
      // Return the user's account
      return accounts[0];
    } else {
      console.log('MetaMask is not installed or enabled');
    }
  };
  
  export default connectToMetaMask;
  