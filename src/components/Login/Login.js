import { useState , useEffect} from "react";
import Card from "../UI/Card/Card";
import classes from "./Login.module.css";

function Login(props) {
  const [isConnecting, setIsConnecting] = useState(false);
  const [provider ,setProvider] = useState(window.ethereum);
  const [isMetaMaskInstalled,setIsMetaMaskInstalled] =useState(false);

  useEffect(() =>{
      setProvider(detectProvider());
  },[])

  useEffect(() => {
    if (provider) {
        if (provider !== window.ethereum) {
          console.error(
            "Not window.ethereum provider. Do you have multiple wallet installed ?"
          );
        }
        setIsMetaMaskInstalled(true);
    }
  },[provider])

  const detectProvider = () => {
    let provider;
    if (window.ethereum) {
      provider = window.ethereum;
    } else if (window.web3) {
      provider = window.web3.currentProvider;
    } else {
      console.warn("No Ethereum browser detected! Check out MetaMask");
    }
    return provider;
  };

  const onLoginHandler = async () => {
    const provider = detectProvider();
    if (provider) {
      if (provider !== window.ethereum) {
        console.error(
          "Not window.ethereum provider. Do you have multiple wallet installed ?"
        );
      }
      setIsConnecting(true);
      await provider.request({
        method: "eth_requestAccounts",
      });
      setIsConnecting(false);
    }
    props.onLogin(provider);
  };

  return (
    <Card className={classes.login}>
        {isMetaMaskInstalled &&
            <button onClick={onLoginHandler} className={classes.button} type="button">
        {!isConnecting && "Log In"}
        {isConnecting && "Loading..."}
      </button>}
      {!isMetaMaskInstalled &&
      <p>
          <a href="/">Install Metamask</a>
      </p>
      } 
      
      
    </Card>
  );
};

export default Login;