import { ERC721_INTERFACE } from '../../contracts'
import { GenericContractInterface } from '../../ethereum/utils'

import { ContractRequest } from '../ContractRequest'
import { map } from 'lodash'

// generalised erc721 request, can be extended from for custom ones
// meant for a contract by contract basis
export class ERC721Request extends ContractRequest {
  // infers network from props and appends query methods
  constructor(props: GenericContractInterface) {
    super({
      ...props,
      abi: props.abi ?? ERC721_INTERFACE,
      defaultAbi: ERC721_INTERFACE,
    })
  }

  // balance
  async getBalanceOf(wallet: string) {
    try {
      const balance = await this.CONTRACT.balanceOf(wallet)
      return Number(balance.toString())
    } catch (err) {
      console.log(err)
      console.log('balance 721 error', this.ADDRESS)
      return 0
    }
  }

  // owned tokens
  async getOwnedTokens(wallet: string) {
    try {
      const _balance = await this.getBalanceOf(wallet)
      const ownedTokens = await Promise.all(
        map([...Array(_balance).keys()], (idx: number) =>
          this.CONTRACT.tokenOfOwnerByIndex(wallet, idx)
        )
      )
      return ownedTokens
    } catch (err) {
      console.log(err)
      return []
    }
  }

  async getTotalSupply() {
    try {
      const totalSupply = await this.CONTRACT.totalSupply()
      return Number(totalSupply)
    } catch (err) {
      console.log(err)
      console.log('totalsupply 721 error', this.ADDRESS)
      return 0
    }
  }
}
