import Web3 from "web3";

import Web3Modal from "web3modal";

import WalletConnectProvider from "@walletconnect/web3-provider";

import CoinbaseWalletSDK from "@coinbase/wallet-sdk";

import { ethRpc } from "./config";

const saveProvider = (provider) => {
  window.provider = provider;
};

export const getProvider = () => {
  return window?.provider;
};

export const connectUser = async () => {
  if (window?.ethereum) {
    let providerOptions = {
      walletconnect: {
        package: WalletConnectProvider, // required
        options: {
          rpc: {
            1: ethRpc,
            5: ethRpc,
          },
        },
      },

      coinbasewallet: {
        package: CoinbaseWalletSDK,
        options: {
          appName: "MEMEMASTER PRESALE",
          rpc: {
            1: ethRpc,
            5: ethRpc,
          },
        },
      },
    };

    const modalProps = {
      cacheProvider: true, // optional
      providerOptions, // required
      theme: "dark",
      // disableInjectedProvider: true,
    };

    const web3Modal = new Web3Modal(modalProps);

    const provider = await web3Modal.connect();

    const web3 = new Web3(provider);
    
    saveProvider(web3);
  }
};
