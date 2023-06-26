import { ERC1155_INTERFACE } from '../../contracts'
import { GenericContractInterface } from '../../ethereum/utils'

import { map } from 'lodash'
import { ContractRequest } from '../ContractRequest'

// generalised erc1155 request, can be extended
// meant for a contract by contract basis
export class ERC1155Request extends ContractRequest {
  // infers network from props and appends query methods
  constructor(props: GenericContractInterface) {
    super({
      ...props,
      abi: props.abi ?? ERC1155_INTERFACE,
      defaultAbi: ERC1155_INTERFACE,
    })
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
