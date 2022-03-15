import { useState , useEffect } from "react";
import Home from "./components/Home/Home";
import Login from "./components/Login/Login";
import Web3 from "web3";

const App = () => {
  //Hooks
  const [isConnected, setIsConnected] = useState(false);
  const [currentAccount, setCurrentAccount] = useState(null);
 
  const [chainId,setChainId] =useState(null);
  const [provider ,setProvider] = useState(window.ethereum);
  const [web3,setWeb3]=useState(null);

  const NetworkIds = {
    1: "Ethereum Main Network",
    3: "Ropsten Test Network",
    4: "Rinkeby Test Network",
    5: "Goerli Test Network",
    42: "Kovan Test Network",
  };

  const onLogin = async (provider) => {
    const web3 = new Web3(provider);
    const accounts = await web3.eth.getAccounts();
    const chainId = await web3.eth.getChainId();
    if (accounts.length === 0) {
      console.log("Please connect to MetaMask!");
    } else if (accounts[0] !== currentAccount) {
      setProvider(provider);
      setWeb3(web3);
      setChainId(chainId);
      setCurrentAccount(accounts[0]);
      setIsConnected(true);
    

     
      
    }
  };

  useEffect(() => {
    const handleAccountsChanged = async (accounts) => {
      
      if (accounts.length === 0) {
        onLogout();
      } else if (accounts[0] !== currentAccount) {
        setCurrentAccount(accounts[0]);
        
  
        
      }
    };

    const handleChainChanged = async (chainId) => {
      const web3ChainId = await web3.eth.getChainId();
      setChainId(web3ChainId);
    };
     if(isConnected){
       provider.on("accountsChanged",handleAccountsChanged);
       provider.on("chainChanged",handleChainChanged);
     }
  

  return () => {
    if (isConnected) {
      provider.removeListener("accountsChanged", handleAccountsChanged);
      provider.removeListener("chainChanged", handleChainChanged);
    }
  };
}, [isConnected]);

  const onLogout = () => {
    setIsConnected(false);
    setCurrentAccount( null);
  };

  const getCurrentNetwork = (chainId) => {
    return NetworkIds[chainId];
  };

  let connection;
  if(!isConnected){
    connection = <Login onLogin={onLogin} onLogout={onLogout} />;
  }

  return (
    <div>
      <header className="main-header">
        <h1>Metamask Login</h1>
        <nav className="nav">
          <ul>
            <li>
              <a href="/">{currentAccount}</a>
            </li>
          </ul>
        </nav>
      </header>
      <main>
        {connection}
        {isConnected && (
          <Home currentAccount={currentAccount} currentNetwork={getCurrentNetwork(chainId)} />
        )}
      </main>
    </div>
  );
}

export default App;
