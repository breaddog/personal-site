import { ERC20_INTERFACE } from '../../contracts'
import {
  GenericContractInterface,
  createContractObject
} from '../../ethereum/utils'

import { ethers } from 'ethers'
import { ContractRequest } from '../ContractRequest'

export class ERC20Request extends ContractRequest {
  ADDRESS: string
  CONTRACT: ethers.Contract
  INTERFACE: ethers.Interface
  DECIMALS: number
  SYMBOL: string

  constructor(props: GenericContractInterface) {
    super(props.network)
    this.CONTRACT = createContractObject({
      ...props,
      abi: props.abi ?? ERC20_INTERFACE,
    })
    this.ADDRESS = props.address
    this.INTERFACE = new ethers.Interface(ERC20_INTERFACE)
    this.DECIMALS = props.decimals ?? 18
    this.SYMBOL = props.symbol ?? ''
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
