import { ethers } from 'ethers'
import {
  GenericContractInterface,
  NetworkType,
  createContractObject
} from '../ethereum/utils'
import { BaseRequest } from './BaseRequest'

// generic contract interface
// query contract is deployed by Pellar
export class ContractRequest extends BaseRequest {
  CONTRACT_PROPS: any
  CONTRACT: ethers.Contract
  DECODER: ethers.AbiCoder = new ethers.AbiCoder()
  ADDRESS: string
  NETWORK: NetworkType
  INTERFACE: ethers.Interface
  DEFAULT_ABI: ethers.InterfaceAbi

  // create based on network
  constructor(
    props: GenericContractInterface & { defaultAbi: ethers.InterfaceAbi }
  ) {
    super()
    this.CONTRACT_PROPS = props
    this.CONTRACT = createContractObject(props)
    this.INTERFACE = new ethers.Interface(props.abi)
    this.ADDRESS = props.address
    this.NETWORK = props.network
    this.DEFAULT_ABI = props.defaultAbi
  }

  setContractProps(props: GenericContractInterface) {
    this.CONTRACT_PROPS = props
    this.ADDRESS = props.address
    this.NETWORK = props.network
  }

  // eslint-disable-next-line
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
}
