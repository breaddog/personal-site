// query contract is deployed by Pellar
export const QUERY_CONTRACT_ADDRESS_ETHEREUM =
  '0x042D7f992f6BBDb5211755C437061e2bCB97f9AD'
export const QUERY_CONTRACT_ADDRESS_POLYGON =
  '0x3f5ab478f973c0a992149d9c2712dfce32e2f379'

export const QUERY_CONTRACT_ABI = [
  {
    inputs: [
      {
        components: [
          {
            internalType: 'address',
            name: 'contractAddress',
            type: 'address',
          },
          {
            internalType: 'bytes',
            name: 'bytesCaller',
            type: 'bytes',
          },
        ],
        internalType: 'struct Query.CallMapper[]',
        name: '_callers',
        type: 'tuple[]',
      },
    ],
    name: 'callContractsWith',
    outputs: [
      {
        internalType: 'bool[]',
        name: '',
        type: 'bool[]',
      },
      {
        internalType: 'bytes[]',
        name: '',
        type: 'bytes[]',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'address',
        name: '_contract',
        type: 'address',
      },
      {
        internalType: 'address',
        name: '_account',
        type: 'address',
      },
    ],
    name: 'getTokensByAccount',
    outputs: [
      {
        internalType: 'uint256[]',
        name: '',
        type: 'uint256[]',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
]
