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
      // same wallet anyway
      const balances = await this.CONTRACT.balanceOfBatch(
        [...Array(tokenIds.length).fill(wallet)],
        tokenIds
      )

      return map(balances, (el: string | number) => Number(el))
    } catch (err) {
      console.log('balanceOfBatch by query error', this.ADDRESS)
      return []
    }
  }
}
