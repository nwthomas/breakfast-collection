const hre = require("hardhat");

const main = async () => {
  const nftContractFactory = await hre.ethers.getContractFactory(
    "BreakfastCollectionNFT"
  );

  // These will deploy the contract again
  const nftContract = await nftContractFactory.deploy();
  await nftContract.deployed();
  console.log("Contract deployed to:", nftContract.address);

  // This will add another NFT
  // const nftContract = await nftContractFactory.attach(
  //   "0xA4370BCc88528f1296BC919Ac5B89374E45585AF"
  // );

  let txn = await nftContract.makeNFT();
  await txn.wait();
  console.log("Minted an NFT");

  txn = await nftContract.makeNFT();
  await txn.wait();
  console.log("Minted an NFT");

  txn = await nftContract.makeNFT();
  await txn.wait();
  console.log("Minted an NFT");
};

const runMain = async () => {
  try {
    await main();
    process.exit(0);
  } catch (error) {
    console.log(error);
    process.exit(1);
  }
};

runMain();
