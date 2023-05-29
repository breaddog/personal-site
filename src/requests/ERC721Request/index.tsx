import { ERC721_INTERFACE } from '../../contracts'
import {
  GenericContractInterface,
  createContractObject
} from '../../ethereum/utils'

import { ethers } from 'ethers'
import { ContractRequest } from '../ContractRequest'

// generalised erc721 request, can be extended from for custom ones
// meant for a contract by contract basis
export class ERC721Request extends ContractRequest {
  ADDRESS: string
  CONTRACT: ethers.Contract
  INTERFACE: ethers.Interface

  // infers network from props and appends query methods
  constructor(props: GenericContractInterface) {
    super(props.network)
    this.CONTRACT = createContractObject({
      ...props,
      abi: props.abi ?? ERC721_INTERFACE,
    })
    this.ADDRESS = props.address
    this.INTERFACE = new ethers.Interface(ERC721_INTERFACE)
  }

  // balance
  async getBalanceOf(wallet: string) {
    try {
      const balance = await this.CONTRACT.balanceOf(wallet)
      return Number(balance.toString())
    } catch (err) {
      console.log('balance 721 error', this.ADDRESS)
      return 0
    }
  }

  // owned tokens
  async getOwnedTokens(wallet: string) {
    try {
      const ownedTokens = await this.QUERY_CONTRACT.getTokensByAccount(
        this.ADDRESS,
        wallet
      )
      return ownedTokens
    } catch (err) {
      return []
    }
  }

  async getTotalSupply() {
    try {
      const totalSupply = await this.CONTRACT.totalSupply()
      console.log(await this.CONTRACT.getAddress())
      return Number(totalSupply)
    } catch (err) {
      console.log('totalsupply 721 error', this.ADDRESS)
      return 0
    }
  }
}
