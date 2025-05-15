export const disperse = {
  abi: [
    {
      name: "disperseEther",
      type: "function",
      stateMutability: "payable",
      inputs: [
        { name: "recipients", type: "address[]" },
        { name: "values", type: "uint256[]" },
      ],
      outputs: [],
    },
    {
      name: "disperseToken",
      type: "function",
      stateMutability: "nonpayable",
      inputs: [
        { name: "token", type: "address" },
        { name: "recipients", type: "address[]" },
        { name: "values", type: "uint256[]" },
      ],
      outputs: [],
    },
    {
      name: "disperseTokenSimple",
      type: "function",
      stateMutability: "nonpayable",
      inputs: [
        { name: "token", type: "address" },
        { name: "recipients", type: "address[]" },
        { name: "values", type: "uint256[]" },
      ],
      outputs: [],
    },
  ] as const,
  address: {
    1: "0xc1d40b0883f590AaBB67FF10C6aD9FDB708BbCc2", // mainnet
    3: "0xc1d40b0883f590AaBB67FF10C6aD9FDB708BbCc2", // ropsten
    4: "0xc1d40b0883f590AaBB67FF10C6aD9FDB708BbCc2", // rinkeby
    5: "0xc1d40b0883f590AaBB67FF10C6aD9FDB708BbCc2", // goerli
    42: "0xc1d40b0883f590AaBB67FF10C6aD9FDB708BbCc2", // kovan
    56: "0xc1d40b0883f590AaBB67FF10C6aD9FDB708BbCc2", // bsc mainnet
    77: "0xc1d40b0883f590AaBB67FF10C6aD9FDB708BbCc2", // poa sokol
    99: "0xc1d40b0883f590AaBB67FF10C6aD9FDB708BbCc2", // poa network
    100: "0xc1d40b0883f590AaBB67FF10C6aD9FDB708BbCc2", // xdai chain
    137: "0xc1d40b0883f590AaBB67FF10C6aD9FDB708BbCc2", // matic
    163: "0xc1d40b0883f590AaBB67FF10C6aD9FDB708BbCc2", // lightstreams
    250: "0xc1d40b0883f590AaBB67FF10C6aD9FDB708BbCc2", // fantom
    5777: "0x5b1869d9a4c187f2eaa108f3062412ecf0526b24", // ganache-cli
    42161: "0xc1d40b0883f590AaBB67FF10C6aD9FDB708BbCc2", // arbitrum one
    4689: "0xe3122e446Bf31036DA212375803f24b3dE96D0c9", // iotex
    1284: "0xc1d40b0883f590AaBB67FF10C6aD9FDB708BbCc2", // moonbeam
    1285: "0xc1d40b0883f590AaBB67FF10C6aD9FDB708BbCc2", // moonriver
    42220: "0xc1d40b0883f590AaBB67FF10C6aD9FDB708BbCc2", // celo
    1666600000: "0xc1d40b0883f590AaBB67FF10C6aD9FDB708BbCc2", // harmony
    60: "0xc1d40b0883f590AaBB67FF10C6aD9FDB708BbCc2", // gochain
    128: "0xc1d40b0883f590AaBB67FF10C6aD9FDB708BbCc2", // huobi
    66: "0xc1d40b0883f590AaBB67FF10C6aD9FDB708BbCc2", // okex
    10: "0xc1d40b0883f590AaBB67FF10C6aD9FDB708BbCc2", // optimism
    84531: "0xc1d40b0883f590AaBB67FF10C6aD9FDB708BbCc2", // base goerli
    1101: "0xc1d40b0883f590AaBB67FF10C6aD9FDB708BbCc2", // polygon zkevm
    8453: "0xc1d40b0883f590AaBB67FF10C6aD9FDB708BbCc2", // base mainnet
    11155111: "0xc1d40b0883f590AaBB67FF10C6aD9FDB708BbCc2", // sepolia
    314: "0xc1d40b0883f590AaBB67FF10C6aD9FDB708BbCc2", // filecoin
  } as const,
};

export const erc20 = {
  abi: [
    {
      name: "name",
      type: "function",
      stateMutability: "view",
      inputs: [],
      outputs: [{ name: "", type: "string" }],
    },
    {
      name: "symbol",
      type: "function",
      stateMutability: "view",
      inputs: [],
      outputs: [{ name: "", type: "string" }],
    },
    {
      name: "decimals",
      type: "function",
      stateMutability: "view",
      inputs: [],
      outputs: [{ name: "", type: "uint8" }],
    },
    {
      name: "balanceOf",
      type: "function",
      stateMutability: "view",
      inputs: [{ name: "account", type: "address" }],
      outputs: [{ name: "", type: "uint256" }],
    },
    {
      name: "allowance",
      type: "function",
      stateMutability: "view",
      inputs: [
        { name: "owner", type: "address" },
        { name: "spender", type: "address" },
      ],
      outputs: [{ name: "", type: "uint256" }],
    },
    {
      name: "approve",
      type: "function",
      stateMutability: "nonpayable",
      inputs: [
        { name: "spender", type: "address" },
        { name: "amount", type: "uint256" },
      ],
      outputs: [{ name: "", type: "bool" }],
    },
  ] as const,
};

export const ds_token = {
  abi: [
    {
      name: "name",
      type: "function",
      stateMutability: "view",
      inputs: [],
      outputs: [{ name: "", type: "bytes32" }],
    },
    {
      name: "symbol",
      type: "function",
      stateMutability: "view",
      inputs: [],
      outputs: [{ name: "", type: "bytes32" }],
    },
    {
      name: "decimals",
      type: "function",
      stateMutability: "view",
      inputs: [],
      outputs: [{ name: "", type: "uint8" }],
    },
    {
      name: "balanceOf",
      type: "function",
      stateMutability: "view",
      inputs: [{ name: "src", type: "address" }],
      outputs: [{ name: "", type: "uint256" }],
    },
    {
      name: "allowance",
      type: "function",
      stateMutability: "view",
      inputs: [
        { name: "owner", type: "address" },
        { name: "spender", type: "address" },
      ],
      outputs: [{ name: "", type: "uint256" }],
    },
    {
      name: "approve",
      type: "function",
      stateMutability: "nonpayable",
      inputs: [
        { name: "spender", type: "address" },
        { name: "amount", type: "uint256" },
      ],
      outputs: [{ name: "", type: "bool" }],
    },
  ] as const,
};
