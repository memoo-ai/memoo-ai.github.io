const nodeType = import.meta.env.VITE_NODE_TYPE;
const chainId = import.meta.env.VITE_NODE_CHAIN_ID;

export const CHAIN_ID = chainId;

export const ZERO_ADDRESS = `0x${String(0).repeat(40)}`;
