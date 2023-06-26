import { ERC20_INTERFACE } from '../../contracts'
import {
  GenericContractInterface,
  createContractObject
} from '../../ethereum/utils'

import { ethers } from 'ethers'
import { ContractRequest } from '../ContractRequest'

export class ERC20Request extends ContractRequest {
  DECIMALS: number
  SYMBOL: string

  constructor(props: GenericContractInterface) {
    super({
      ...props,
      abi: props.abi ?? ERC20_INTERFACE,
      defaultAbi: ERC20_INTERFACE,
    })
    this.DECIMALS = props.decimals ?? 18
    this.SYMBOL = props.symbol ?? ''
  }

  setContractProps(props: GenericContractInterface): void {
    // replace props as usual
    super.setContractProps(props)
    // extra ones for erc20
    this.DECIMALS = props.decimals ?? 18
    this.SYMBOL = props.symbol ?? ''
  }

  // refresh contract (override since erc20 has extra stuff)
  reinstantiateContract(props?: GenericContractInterface) {
    if (!this.CONTRACT) return
    // if props exist, replace them before reinstantiating
    if (props) {
      this.setContractProps(props)
    }
    // recreate
    this.CONTRACT = createContractObject({
      ...this.CONTRACT_PROPS,
      abi: this.CONTRACT_PROPS.abi ?? this.DEFAULT_ABI,
    })
  }

  // balance
  async getBalanceOf(wallet: string) {
    try {
      const balance = await this.CONTRACT.balanceOf(wallet)
      return Number(ethers.formatEther(balance))
    } catch (err) {
      console.log(err)
      console.log('balance 20 error', this.ADDRESS)
      return 0
    }
  }

  async getTotalSupply() {
    try {
      const totalSupply = await this.CONTRACT.totalSupply()
      return Number(ethers.formatEther(totalSupply))
    } catch (err) {
      console.log(err)
      console.log('totalsupply 20 error', this.ADDRESS)
      return 0
    }
  }

  async getDecimals() {
    try {
      const decimals = await this.CONTRACT.decimals()
      return Number(decimals)
    } catch (err) {
      return 0
    }
  }

  async getSymbol() {
    try {
      const symbol = await this.CONTRACT.symbol()
      return symbol
    } catch (err) {
      return null
    }
  }
}
