export const presaleAddress = "0x542fd6f47DBB8a58EEde8402Ce9bF4fCfabEFD19";

export const ethRpc =
  parseInt(import.meta.env.VITE_NETWORK_ID) === 5
    ? `https://rpc.ankr.com/eth_goerli`
    : `https://eth.llamarpc.com`;
