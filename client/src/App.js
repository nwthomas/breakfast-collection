import * as React from "react";
import styled from "styled-components";
import GlobalStyles from "./styles";
import { ethers } from "ethers";
import breakfastCollectionNft from "./ABIs/BreakfastCollectionNFT.json";

const CONTRACT_ADDRESS = "0xEBd3f51DfBDdC0005a1936Dd337f95FC9989C2b3";
const TWITTER_HANDLE = "nwthomas_";
const TWITTER_URL = `https://www.twitter.com/${TWITTER_HANDLE}`;

function App() {
  const [isConnected, setIsConnected] = React.useState(false);
  const [currentAccount, setCurrentAccount] = React.useState("");
  const [isMining, setIsMining] = React.useState(false);
  const [isMinedSuccessfully, setIsMinedSuccessfully] = React.useState(false);
  const [isMiningError, setIsMiningError] = React.useState(false);
  const [openSeaUrl, setOpenSeaUrl] = React.useState("");

  const checkIfWalletIsConnected = async () => {
    const { ethereum } = window;

    if (ethereum) {
      const accounts = await ethereum.request({ method: "eth_accounts" });
      setIsConnected(true);

      if (accounts.length > 0) {
        const firstAccount = accounts[0];
        setCurrentAccount(firstAccount);
        setupEventListener();
      }
    }
  };

  React.useEffect(() => {
    checkIfWalletIsConnected();
  }, []);

  const setupEventListener = async () => {
    try {
      const { ethereum } = window;

      if (ethereum) {
        // Same stuff again
        const provider = new ethers.providers.Web3Provider(ethereum);
        const signer = provider.getSigner();
        const connectedContract = new ethers.Contract(
          CONTRACT_ADDRESS,
          breakfastCollectionNft.abi,
          signer
        );

        connectedContract.on(
          "NewBreakfastCollectionNFTMinted",
          (from, tokenId) => {
            setIsMining(false);
            setIsMinedSuccessfully(true);
            setOpenSeaUrl(
              `https://testnets.opensea.io/assets/${CONTRACT_ADDRESS}/${tokenId.toNumber()}`
            );
          }
        );
      } else {
        console.error("Ethereum object doesn't exist!");
      }
    } catch (error) {
      setIsMining(false);
      setIsMinedSuccessfully(false);
      setIsMiningError(true);
    }
  };

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
      setupEventListener();
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

        setIsMining(true);
        setIsMiningError(false);
        setIsMinedSuccessfully(false);
        setOpenSeaUrl("");

        let nftTxn = await connectedContract.makeNFT();

        await nftTxn.wait();
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
        {(isMiningError || isMinedSuccessfully) && !isMining ? (
          <NewTransaction>
            {isMinedSuccessfully ? (
              <a href={openSeaUrl}>
                CONGRATS! Here's your new NFT on OpenSea 🎉
              </a>
            ) : (
              <p>There was an error mining your transaction. 😞</p>
            )}
          </NewTransaction>
        ) : null}
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

const NewTransaction = styled.div`
  background: white;
  border-radius: 15px;
  margin-top: 30px;
  padding: 40px 5%;
  width: 80%;
  -webkit-box-shadow: 0px 6px 26px -10px rgba(0, 0, 0, 0.44);
  -moz-box-shadow: 0px 6px 26px -10px rgba(0, 0, 0, 0.44);
  box-shadow: 0px 6px 26px -10px rgba(0, 0, 0, 0.44);

  > a {
    color: black;
  }
`;

export default App;
