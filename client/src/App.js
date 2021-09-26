import * as React from "react";
import styled from "styled-components";
import GlobalStyles from "./styles";
import { ethers } from "ethers";
import breakfastCollectionNft from "./ABIs/BreakfastCollectionNFT.json";

const CONTRACT_ADDRESS = "0xA4370BCc88528f1296BC919Ac5B89374E45585AF";
const TWITTER_HANDLE = "nwthomas_";
const TWITTER_URL = `https://www.twitter.com/${TWITTER_HANDLE}`;

function App() {
  const [isConnected, setIsConnected] = React.useState(false);
  const [currentAccount, setCurrentAccount] = React.useState("");

  const checkIfWalletIsConnected = async () => {
    const { ethereum } = window;

    if (ethereum) {
      const accounts = await ethereum.request({ method: "eth_accounts" });
      setIsConnected(true);

      if (accounts.length > 0) {
        const firstAccount = accounts[0];
        setCurrentAccount(firstAccount);
      }
    }
  };

  React.useEffect(() => {
    checkIfWalletIsConnected();
  }, []);

  const connectToWallet = async () => {
    try {
      const { ethereum } = window;

      if (!ethereum) {
        alert("Please get MetaMask!");
        return;
      }

      const accounts = await ethereum.request({
        method: "eth_requestAccounts",
      });
      setCurrentAccount(accounts[0]);
    } catch (error) {
      console.error(error);
    }
  };

  const askContractToMintNFT = async () => {
    try {
      const { ethereum } = window;

      if (ethereum) {
        const provider = new ethers.providers.Web3Provider(ethereum);
        const signer = provider.getSigner();
        const connectedContract = new ethers.Contract(
          CONTRACT_ADDRESS,
          breakfastCollectionNft.abi,
          signer
        );

        console.log("Going to pop wallet now to pay gas...");
        let nftTxn = await connectedContract.makeNFT();

        console.log("Mining... please wait.");
        await nftTxn.wait();

        console.log(
          `Mined, see transaction: https://rinkeby.etherscan.io/tx/${nftTxn.hash}`
        );
      } else {
        alert("Please get MetaMask!");
      }
    } catch (error) {
      console.error(error);
    }
  };

  const renderCurrentAccount = () => {
    if (currentAccount) {
      const start = currentAccount.slice(0, 5);
      const end = currentAccount.slice(currentAccount.length - 6);
      return start + "...." + end;
    }
  };

  console.log("Account connected:", currentAccount);

  return (
    <>
      <GlobalStyles />
      <RootStyles className="App">
        <WalletAddress withCurrentAccount={!!currentAccount}>
          <p>{!!currentAccount ? "Connected" : "Not Connected"}</p>
          {currentAccount ? (
            <div>
              <p>{renderCurrentAccount()}</p>
            </div>
          ) : null}
        </WalletAddress>
        <h1>The Breakfast Collection NFTs</h1>
        <p>Enjoy some syrupy, breakfasty goodness in your life</p>
        <button
          onClick={currentAccount ? askContractToMintNFT : connectToWallet}
        >
          {isConnected && currentAccount ? "Mint Token" : "Connect Wallet"}
        </button>
        <a href={TWITTER_URL}>{`Built by ${TWITTER_HANDLE}`}</a>
      </RootStyles>
    </>
  );
}

const RootStyles = styled.div`
  align-items: center;
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  padding-top: 100px;
  position: relative;
  width: 100%;

  > button {
    margin-top: 35px;
  }

  > a {
    color: #161616;
    bottom: 0;
    margin-bottom: 50px;
    position: absolute;
  }
`;

const WalletAddress = styled.div`
  align-items: center;
  display: flex;
  margin-top: 20px;
  margin-right: 20px;
  position: absolute;
  top: 0;
  right: 0;

  > p {
    color: ${({ withCurrentAccount }) =>
      withCurrentAccount ? "green" : "red"};
    margin-right: 10px;
  }

  > div:nth-child(2) {
    align-items: center;
    display: flex;
    border-radius: 15px;
    background: #161616;
    display: flex;
    color: white;
    justify-content: center;
    padding: 6px 10px;
  }
`;

export default App;
