const nodeType = import.meta.env.VITE_NODE_TYPE;

export const NOVA_CHAIN_ID = nodeType === 'nexus-goerli' ? 810182 : 810180;
