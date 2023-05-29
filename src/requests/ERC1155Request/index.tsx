import { ERC1155_INTERFACE } from '../../contracts'
import {
  GenericContractInterface,
  createContractObject
} from '../../ethereum/utils'

import { map } from 'lodash'
import { ethers } from 'ethers'
import { ContractRequest } from '../ContractRequest'

// generalised erc1155 request, can be extended
// meant for a contract by contract basis
export class ERC1155Request extends ContractRequest {
  ADDRESS: string
  CONTRACT: ethers.Contract
  INTERFACE: ethers.Interface

  // infers network from props and appends query methods
  constructor(props: GenericContractInterface) {
    super(props.network)
    this.CONTRACT = createContractObject({
      ...props,
      abi: props.abi ?? ERC1155_INTERFACE,
    })
    this.ADDRESS = props.address
    this.INTERFACE = new ethers.Interface(ERC1155_INTERFACE)
  }

  // balance
  async getBalance(wallet: string, tokenId: number) {
    try {
      const balance = await this.CONTRACT.balanceOf(wallet, tokenId)
      return Number(balance.toString())
    } catch (err) {
      console.log('balance 1155 error', this.ADDRESS)
      return 0
    }
  }

  // by query
  async getBalanceOfBatch(wallet: string, tokenIds: number[]) {
    try {
      const Interface = new ethers.Interface(ERC1155_INTERFACE)
      const signatures = map(tokenIds, (number: string) => {
        return {
          contractAddress: this.ADDRESS,
          bytesCaller: Interface.encodeFunctionData('balanceOf', [
            wallet,
            number,
          ]),
        }
      })

      const res = await this.QUERY_CONTRACT.callsContractsWith(signatures)

      return map(res[1], (el: any, idx: number) => {
        const decoded = this.DECODER.decode(['uint256'], el)
        return {
          tokenId: tokenIds[idx],
          amount: decoded[0],
        }
      })
    } catch (err) {
      console.log('balanceOfBatch by query error', this.ADDRESS)
      return []
    }
  }
}
