import { useAddress, useDisconnect, useMetamask, useNFTs, useContract } from '@thirdweb-dev/react';
import { ethers } from 'ethers';
import type { NextPage } from 'next';
import { useEffect, useState } from 'react';

const Home: NextPage = () => {
  const address = useAddress();
  const connectWithMetamask = useMetamask();
  const disconnectWallet = useDisconnect();

  const { contract } = useContract (
    "0x4E561826050B97C9386f276B55230DC5e40296A0",
  );

  const fetchInfo = async () => {
    if(contract && address) {
     const infor = await contract.functions.userStakeInfo(address);
      console.log(infor);
    }
  };

  const claim = async() => {
    if(contract && address) {
      const tx = await contract.functions.claimRewards();
      await tx.wait();
      console.log(tx);
    }
  };

  return (
    <div>
      {address ? (
        <>
          <button onClick={disconnectWallet}>Disconnect Wallet</button>
          <p>Your address: {address}</p>
        </>
      ) : (
        <button onClick={connectWithMetamask}>Connect with Metamask</button>
      )}
    </div>
  );
};

export default Home;
