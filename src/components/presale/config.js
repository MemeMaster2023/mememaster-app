export const presaleAddress = "0x4D5939b0D552d4C4d6A02B0166B324a042640469";

export const ethRpc =
  parseInt(import.meta.env.VITE_NETWORK_ID) === 5
    ? `https://rpc.ankr.com/eth_goerli`
    : `https://eth.llamarpc.com`;
