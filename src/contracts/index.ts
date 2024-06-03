const network = import.meta.env.NODE_TYPE;

const TestnetContracts = {
  MemooManage: '',
};

const MainnetContracts = {
  MemooManage: '',
};

export const Contracts = network === 'mainnet' ? MainnetContracts : TestnetContracts;
