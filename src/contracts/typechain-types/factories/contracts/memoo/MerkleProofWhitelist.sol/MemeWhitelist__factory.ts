/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */
import {
  Contract,
  ContractFactory,
  ContractTransactionResponse,
  Interface,
} from "ethers";
import type { Signer, ContractDeployTransaction, ContractRunner } from "ethers";
import type { NonPayableOverrides } from "../../../../common";
import type {
  MemeWhitelist,
  MemeWhitelistInterface,
} from "../../../../contracts/memoo/MerkleProofWhitelist.sol/MemeWhitelist";

const _abi = [
  {
    inputs: [],
    stateMutability: "nonpayable",
    type: "constructor",
  },
  {
    inputs: [],
    name: "AccessControlBadConfirmation",
    type: "error",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "account",
        type: "address",
      },
      {
        internalType: "bytes32",
        name: "neededRole",
        type: "bytes32",
      },
    ],
    name: "AccessControlUnauthorizedAccount",
    type: "error",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "target",
        type: "address",
      },
    ],
    name: "AddressEmptyCode",
    type: "error",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "account",
        type: "address",
      },
    ],
    name: "AddressInsufficientBalance",
    type: "error",
  },
  {
    inputs: [],
    name: "EnforcedPause",
    type: "error",
  },
  {
    inputs: [],
    name: "ExpectedPause",
    type: "error",
  },
  {
    inputs: [],
    name: "FailedInnerCall",
    type: "error",
  },
  {
    inputs: [],
    name: "InvalidInitialization",
    type: "error",
  },
  {
    inputs: [],
    name: "NotInitializing",
    type: "error",
  },
  {
    inputs: [],
    name: "ReentrancyGuardReentrantCall",
    type: "error",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "token",
        type: "address",
      },
    ],
    name: "SafeERC20FailedOperation",
    type: "error",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: "address",
        name: "token",
        type: "address",
      },
      {
        indexed: false,
        internalType: "address",
        name: "to",
        type: "address",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "count",
        type: "uint256",
      },
    ],
    name: "ClaimToken",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: "uint64",
        name: "version",
        type: "uint64",
      },
    ],
    name: "Initialized",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: "address",
        name: "account",
        type: "address",
      },
    ],
    name: "Paused",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "bytes32",
        name: "role",
        type: "bytes32",
      },
      {
        indexed: true,
        internalType: "bytes32",
        name: "previousAdminRole",
        type: "bytes32",
      },
      {
        indexed: true,
        internalType: "bytes32",
        name: "newAdminRole",
        type: "bytes32",
      },
    ],
    name: "RoleAdminChanged",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "bytes32",
        name: "role",
        type: "bytes32",
      },
      {
        indexed: true,
        internalType: "address",
        name: "account",
        type: "address",
      },
      {
        indexed: true,
        internalType: "address",
        name: "sender",
        type: "address",
      },
    ],
    name: "RoleGranted",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "bytes32",
        name: "role",
        type: "bytes32",
      },
      {
        indexed: true,
        internalType: "address",
        name: "account",
        type: "address",
      },
      {
        indexed: true,
        internalType: "address",
        name: "sender",
        type: "address",
      },
    ],
    name: "RoleRevoked",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: "address",
        name: "account",
        type: "address",
      },
    ],
    name: "Unpaused",
    type: "event",
  },
  {
    inputs: [],
    name: "DEFAULT_ADMIN_ROLE",
    outputs: [
      {
        internalType: "bytes32",
        name: "",
        type: "bytes32",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "PAUSER_ROLE",
    outputs: [
      {
        internalType: "bytes32",
        name: "",
        type: "bytes32",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "WHITELIST_SETTER_ROLE",
    outputs: [
      {
        internalType: "bytes32",
        name: "",
        type: "bytes32",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "token",
        type: "address",
      },
      {
        internalType: "address",
        name: "to",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "count",
        type: "uint256",
      },
    ],
    name: "claimToken",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "bytes32",
        name: "role",
        type: "bytes32",
      },
    ],
    name: "getRoleAdmin",
    outputs: [
      {
        internalType: "bytes32",
        name: "",
        type: "bytes32",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "bytes32",
        name: "role",
        type: "bytes32",
      },
      {
        internalType: "address",
        name: "account",
        type: "address",
      },
    ],
    name: "grantRole",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "bytes32",
        name: "role",
        type: "bytes32",
      },
      {
        internalType: "address",
        name: "account",
        type: "address",
      },
    ],
    name: "hasRole",
    outputs: [
      {
        internalType: "bool",
        name: "",
        type: "bool",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "defaultAdmin",
        type: "address",
      },
      {
        internalType: "address",
        name: "pauser",
        type: "address",
      },
      {
        internalType: "address",
        name: "whitelistSetter",
        type: "address",
      },
    ],
    name: "initialize",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [],
    name: "pause",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [],
    name: "paused",
    outputs: [
      {
        internalType: "bool",
        name: "",
        type: "bool",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "bytes32",
        name: "role",
        type: "bytes32",
      },
      {
        internalType: "address",
        name: "callerConfirmation",
        type: "address",
      },
    ],
    name: "renounceRole",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "bytes32",
        name: "role",
        type: "bytes32",
      },
      {
        internalType: "address",
        name: "account",
        type: "address",
      },
    ],
    name: "revokeRole",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "meme",
        type: "address",
      },
      {
        internalType: "bytes32[]",
        name: "roots",
        type: "bytes32[]",
      },
      {
        internalType: "bool",
        name: "reset",
        type: "bool",
      },
    ],
    name: "setWhitelist",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "bytes4",
        name: "interfaceId",
        type: "bytes4",
      },
    ],
    name: "supportsInterface",
    outputs: [
      {
        internalType: "bool",
        name: "",
        type: "bool",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "unpause",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "meme",
        type: "address",
      },
      {
        internalType: "address",
        name: "user",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "count",
        type: "uint256",
      },
      {
        internalType: "bytes32[]",
        name: "merkleProof",
        type: "bytes32[]",
      },
    ],
    name: "verify",
    outputs: [
      {
        internalType: "bool",
        name: "verified",
        type: "bool",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
] as const;

const _bytecode =
  "0x608060405234801561001057600080fd5b5061001961001e565b6100d0565b7ff0c57e16840df040f15088dc2f81fe391c3923bec73e23a9662efc9c229c6a00805468010000000000000000900460ff161561006e5760405163f92ee8a960e01b815260040160405180910390fd5b80546001600160401b03908116146100cd5780546001600160401b0319166001600160401b0390811782556040519081527fc7f505b2f371ae2175ee4913f4499e1f2633a7b5936321eed1cdaeb6115181d29060200160405180910390a15b50565b61117e806100df6000396000f3fe608060405234801561001057600080fd5b50600436106101005760003560e01c80637833445611610097578063ae2cd52d11610066578063ae2cd52d146101f2578063c0c53b8b14610219578063d547741f1461022c578063e63ab1e91461023f57600080fd5b806378334456146101bc5780638456cb59146101cf57806391d14854146101d7578063a217fddf146101ea57600080fd5b806336568abe116100d357806336568abe146101765780633f4ba83a146101895780635c975abb14610191578063758737b8146101a957600080fd5b806301ffc9a714610105578063125bfb661461012d578063248a9ca3146101425780632f2ff15d14610163575b600080fd5b610118610113366004610db0565b610254565b60405190151581526020015b60405180910390f35b61014061013b366004610df6565b61028b565b005b610155610150366004610e32565b610347565b604051908152602001610124565b610140610171366004610e4b565b610369565b610140610184366004610e4b565b61038b565b6101406103c3565b6000805160206111298339815191525460ff16610118565b6101186101b7366004610e77565b6103e6565b6101406101ca366004610f44565b6104eb565b6101406105e1565b6101186101e5366004610e4b565b610601565b610155600081565b6101557fc575f9391abcc3218444dc8ff0b3d0b15dfe5a91373e834f97c04cb6baffb44381565b610140610227366004611025565b610639565b61014061023a366004610e4b565b6107a2565b6101556000805160206110e983398151915281565b60006001600160e01b03198216637965db0b60e01b148061028557506301ffc9a760e01b6001600160e01b03198316145b92915050565b6000610296816107be565b6001600160a01b038416156102be576102b96001600160a01b03851684846107c8565b6102f6565b6040516001600160a01b0384169083156108fc029084906000818181858888f193505050501580156102f4573d6000803e3d6000fd5b505b604080516001600160a01b038087168252851660208201529081018390527f7f94f93110499c9cb02fa9d1a5792b02f416866cce7d8752e9c5ec67cb8d8b299060600160405180910390a150505050565b6000908152600080516020611109833981519152602052604090206001015490565b61037282610347565b61037b816107be565b610385838361081a565b50505050565b6001600160a01b03811633146103b45760405163334bd91960e11b815260040160405180910390fd5b6103be82826108bf565b505050565b6000805160206110e98339815191526103db816107be565b6103e361093b565b50565b6040516bffffffffffffffffffffffff19606086901b1660208201526034810184905260009081906054016040516020818303038152906040528051906020012090506000915060005b6001600160a01b0388166000908152602081905260409020548110156104e0576104c085858080602002602001604051908101604052809392919081815260200183836020028082843760009201829052506001600160a01b038e1681526020819052604090208054909350869250821090506104af576104af61105f565b90600052602060002001548461099b565b156104ce57600192506104e0565b806104d881611075565b915050610430565b505095945050505050565b6104f36109b3565b7fc575f9391abcc3218444dc8ff0b3d0b15dfe5a91373e834f97c04cb6baffb44361051d816107be565b8115610571576001600160a01b038416600090815260208190526040812061054491610d32565b6001600160a01b038416600090815260208181526040909120845161056b92860190610d50565b50610385565b60005b83518110156105da576001600160a01b038516600090815260208190526040902084518590839081106105a9576105a961105f565b60209081029190910181015182546001810184556000938452919092200155806105d281611075565b915050610574565b5050505050565b6000805160206110e98339815191526105f9816107be565b6103e36109e6565b6000918252600080516020611109833981519152602090815260408084206001600160a01b0393909316845291905290205460ff1690565b7ff0c57e16840df040f15088dc2f81fe391c3923bec73e23a9662efc9c229c6a008054600160401b810460ff16159067ffffffffffffffff1660008115801561067f5750825b905060008267ffffffffffffffff16600114801561069c5750303b155b9050811580156106aa575080155b156106c85760405163f92ee8a960e01b815260040160405180910390fd5b845467ffffffffffffffff1916600117855583156106f257845460ff60401b1916600160401b1785555b6106fa610a2f565b610702610a3f565b61070d60008961081a565b506107266000805160206110e98339815191528861081a565b506107517fc575f9391abcc3218444dc8ff0b3d0b15dfe5a91373e834f97c04cb6baffb4438761081a565b50831561079857845460ff60401b19168555604051600181527fc7f505b2f371ae2175ee4913f4499e1f2633a7b5936321eed1cdaeb6115181d29060200160405180910390a15b5050505050505050565b6107ab82610347565b6107b4816107be565b61038583836108bf565b6103e38133610a47565b604080516001600160a01b038416602482015260448082018490528251808303909101815260649091019091526020810180516001600160e01b031663a9059cbb60e01b1790526103be908490610a89565b60006000805160206111098339815191526108358484610601565b6108b5576000848152602082815260408083206001600160a01b03871684529091529020805460ff1916600117905561086b3390565b6001600160a01b0316836001600160a01b0316857f2f8788117e7eff1d82e926ec794901d17c78024a50270940304540a733656f0d60405160405180910390a46001915050610285565b6000915050610285565b60006000805160206111098339815191526108da8484610601565b156108b5576000848152602082815260408083206001600160a01b0387168085529252808320805460ff1916905551339287917ff6391f5c32d9c69d2a47ea670b442974b53935d1edc7fd64eb21e047a839171b9190a46001915050610285565b610943610aec565b600080516020611129833981519152805460ff191681557f5db9ee0a495bf2e6ff9c91a7834c1ba4fdd244a5e8aa4e537bd38aeae4b073aa335b6040516001600160a01b03909116815260200160405180910390a150565b6000826109a88584610b1c565b1490505b9392505050565b6000805160206111298339815191525460ff16156109e45760405163d93c066560e01b815260040160405180910390fd5b565b6109ee6109b3565b600080516020611129833981519152805460ff191660011781557f62e78cea01bee320cd4e420270b5ea74000d11b0c9f74754ebdbfc544b05a2583361097d565b610a37610b69565b6109e4610bb2565b6109e4610b69565b610a518282610601565b610a855760405163e2517d3f60e01b81526001600160a01b0382166004820152602481018390526044015b60405180910390fd5b5050565b6000610a9e6001600160a01b03841683610bd3565b90508051600014158015610ac3575080806020019051810190610ac1919061109c565b155b156103be57604051635274afe760e01b81526001600160a01b0384166004820152602401610a7c565b6000805160206111298339815191525460ff166109e457604051638dfc202b60e01b815260040160405180910390fd5b600081815b8451811015610b6157610b4d82868381518110610b4057610b4061105f565b6020026020010151610be1565b915080610b5981611075565b915050610b21565b509392505050565b7ff0c57e16840df040f15088dc2f81fe391c3923bec73e23a9662efc9c229c6a0054600160401b900460ff166109e457604051631afcd79f60e31b815260040160405180910390fd5b610bba610b69565b600080516020611129833981519152805460ff19169055565b60606109ac83836000610c10565b6000818310610bfd5760008281526020849052604090206109ac565b60008381526020839052604090206109ac565b606081471015610c355760405163cd78605960e01b8152306004820152602401610a7c565b600080856001600160a01b03168486604051610c5191906110b9565b60006040518083038185875af1925050503d8060008114610c8e576040519150601f19603f3d011682016040523d82523d6000602084013e610c93565b606091505b5091509150610ca3868383610cad565b9695505050505050565b606082610cc257610cbd82610d09565b6109ac565b8151158015610cd957506001600160a01b0384163b155b15610d0257604051639996b31560e01b81526001600160a01b0385166004820152602401610a7c565b50806109ac565b805115610d195780518082602001fd5b604051630a12f52160e11b815260040160405180910390fd5b50805460008255906000526020600020908101906103e39190610d9b565b828054828255906000526020600020908101928215610d8b579160200282015b82811115610d8b578251825591602001919060010190610d70565b50610d97929150610d9b565b5090565b5b80821115610d975760008155600101610d9c565b600060208284031215610dc257600080fd5b81356001600160e01b0319811681146109ac57600080fd5b80356001600160a01b0381168114610df157600080fd5b919050565b600080600060608486031215610e0b57600080fd5b610e1484610dda565b9250610e2260208501610dda565b9150604084013590509250925092565b600060208284031215610e4457600080fd5b5035919050565b60008060408385031215610e5e57600080fd5b82359150610e6e60208401610dda565b90509250929050565b600080600080600060808688031215610e8f57600080fd5b610e9886610dda565b9450610ea660208701610dda565b935060408601359250606086013567ffffffffffffffff80821115610eca57600080fd5b818801915088601f830112610ede57600080fd5b813581811115610eed57600080fd5b8960208260051b8501011115610f0257600080fd5b9699959850939650602001949392505050565b634e487b7160e01b600052604160045260246000fd5b80151581146103e357600080fd5b8035610df181610f2b565b600080600060608486031215610f5957600080fd5b610f6284610dda565b925060208085013567ffffffffffffffff80821115610f8057600080fd5b818701915087601f830112610f9457600080fd5b813581811115610fa657610fa6610f15565b8060051b604051601f19603f83011681018181108582111715610fcb57610fcb610f15565b60405291825284820192508381018501918a831115610fe957600080fd5b938501935b8285101561100757843584529385019392850192610fee565b80975050505050505061101c60408501610f39565b90509250925092565b60008060006060848603121561103a57600080fd5b61104384610dda565b925061105160208501610dda565b915061101c60408501610dda565b634e487b7160e01b600052603260045260246000fd5b60006001820161109557634e487b7160e01b600052601160045260246000fd5b5060010190565b6000602082840312156110ae57600080fd5b81516109ac81610f2b565b6000825160005b818110156110da57602081860181015185830152016110c0565b50600092019182525091905056fe65d7a28e3265b37a6474929f336521b332c1681b933f6cb9f3376673440d862a02dd7bc7dec4dceedda775e58dd541e08a116c6c53815c0bd028192f7b626800cd5ed15c6e187e77e9aee88184c21f4f2182ab5827cb3b7e07fbedcd63f03300a2646970667358221220a466a588e3a621ed42d64ea41c032a6d5ed0ae1786d9ce0afe844527d6005ee064736f6c63430008140033";

type MemeWhitelistConstructorParams =
  | [signer?: Signer]
  | ConstructorParameters<typeof ContractFactory>;

const isSuperArgs = (
  xs: MemeWhitelistConstructorParams
): xs is ConstructorParameters<typeof ContractFactory> => xs.length > 1;

export class MemeWhitelist__factory extends ContractFactory {
  constructor(...args: MemeWhitelistConstructorParams) {
    if (isSuperArgs(args)) {
      super(...args);
    } else {
      super(_abi, _bytecode, args[0]);
    }
  }

  override getDeployTransaction(
    overrides?: NonPayableOverrides & { from?: string }
  ): Promise<ContractDeployTransaction> {
    return super.getDeployTransaction(overrides || {});
  }
  override deploy(overrides?: NonPayableOverrides & { from?: string }) {
    return super.deploy(overrides || {}) as Promise<
      MemeWhitelist & {
        deploymentTransaction(): ContractTransactionResponse;
      }
    >;
  }
  override connect(runner: ContractRunner | null): MemeWhitelist__factory {
    return super.connect(runner) as MemeWhitelist__factory;
  }

  static readonly bytecode = _bytecode;
  static readonly abi = _abi;
  static createInterface(): MemeWhitelistInterface {
    return new Interface(_abi) as MemeWhitelistInterface;
  }
  static connect(
    address: string,
    runner?: ContractRunner | null
  ): MemeWhitelist {
    return new Contract(address, _abi, runner) as unknown as MemeWhitelist;
  }
}