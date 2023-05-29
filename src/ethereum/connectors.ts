// https:// github.com/Uniswap/examples/blob/main/web3-react
import { Web3ReactHooks } from '@web3-react/core'
import { AddEthereumChainParameter, Connector } from '@web3-react/types'

import { CHAIN_INFO } from './constants'

import { buildCoinbaseWalletConnector } from './coinbase'
import { buildNetworkConnector } from './network'
import { buildMetamaskConnector } from './metamask'
import { buildWalletConnectConnector } from './wallet-connect'
import { APP_ENV } from '../config'
import { toast } from 'react-toastify'
import { capitaliseText } from '../shared'

/* eslint-disable no-unused-vars */
export enum ConnectionType {
  COINBASE_WALLET = 'COINBASE_WALLET',
  METAMASK = 'METAMASK',
  NETWORK = 'NETWORK',
  WALLET_CONNECT = 'WALLET_CONNECT',
}
/* eslint-disable no-unused-vars */

export interface Connection {
  connector: Connector
  hooks: Web3ReactHooks
  type: ConnectionType
}

export type ConnectorProps = {
  [key in ConnectionType]: Connection
}

// generic functions
function getIsBraveWallet(): boolean {
  const ethereum = window?.ethereum as any
  return ethereum?.isMetaMask ?? false
}

export function getHasMetaMaskExtensionInstalled(): boolean {
  const ethereum = window?.ethereum as any
  return (ethereum.isMetaMask ?? false) && !getIsBraveWallet()
}

export function onConnectionError(error: Error) {
  console.debug(`web3-react error: ${error}`)
}

// connectors we want
export const PRIORITIZED_CONNECTORS: ConnectorProps = {
  [ConnectionType.METAMASK]: buildMetamaskConnector(),
  [ConnectionType.COINBASE_WALLET]: buildCoinbaseWalletConnector(),
  [ConnectionType.WALLET_CONNECT]: buildWalletConnectConnector(),
  [ConnectionType.NETWORK]: buildNetworkConnector(),
}

export const connectionTypeToNetworkName = (
  connectionType: ConnectionType | null
) => {
  switch (connectionType) {
    case ConnectionType.METAMASK:
      return 'Metamask'
    case ConnectionType.COINBASE_WALLET:
      return 'Coinbase Wallet'
    case ConnectionType.WALLET_CONNECT:
      return 'Wallet Connect'
    case ConnectionType.NETWORK:
      return 'Network Provider'
    default:
      return 'Unknown Provider'
  }
}

// get connection
export function getConnection(c: Connector | ConnectionType) {
  if (c instanceof Connector) {
    const connection = Object.values(PRIORITIZED_CONNECTORS).find(
      (connection) => connection.connector === c
    )
    if (!connection) {
      throw Error('Unsupported Connector')
    }
    return connection
  } else {
    switch (c) {
      case ConnectionType.METAMASK:
        return PRIORITIZED_CONNECTORS[ConnectionType.METAMASK]
      case ConnectionType.COINBASE_WALLET:
        return PRIORITIZED_CONNECTORS[ConnectionType.COINBASE_WALLET]
      case ConnectionType.WALLET_CONNECT:
        return PRIORITIZED_CONNECTORS[ConnectionType.WALLET_CONNECT]
      case ConnectionType.NETWORK:
        return PRIORITIZED_CONNECTORS[ConnectionType.NETWORK]
    }
  }
}

// switch network
export const switchNetwork = async (
  chainId: number,
  connectionType: ConnectionType | null
) => {
  if (!connectionType) {
    return
  }

  const { connector } = getConnection(connectionType)

  if (
    connectionType === ConnectionType.WALLET_CONNECT ||
    connectionType === ConnectionType.NETWORK
  ) {
    await connector.activate(chainId)
    return
  }

  const chainInfo = CHAIN_INFO[chainId]
  const addChainParameter: AddEthereumChainParameter = {
    chainId,
    chainName: chainInfo.label,
    rpcUrls: [chainInfo.rpcUrl],
    nativeCurrency: chainInfo.nativeCurrency,
    blockExplorerUrls: [chainInfo.explorer],
  }
  await connector.activate(addChainParameter)
}

// check if available
export const checkIfAnyWalletInstalled = (ethereum: any) => {
  return ethereum !== undefined
}

export const checkIfMetaMaskInstalled = (ethereum: any) => {
  return ethereum.isMetaMask || false
}

export const checkIfCoinbaseWalletInstalled = (ethereum: any) => {
  return ethereum.isCoinbaseBrowser || ethereum.isCoinbaseWallet
}

export const checkIfProviderInstalled = async (
  ethereum: any,
  connectionType: ConnectionType | null
) => {
  switch (connectionType) {
    // metamask
    case ConnectionType.METAMASK:
      return checkIfMetaMaskInstalled(ethereum)
    case ConnectionType.COINBASE_WALLET:
      return checkIfCoinbaseWalletInstalled(ethereum)
    default:
      return false
  }
}

// activate/deactivate
export const tryActivateConnector = async (
  connector: Connector
): Promise<ConnectionType | undefined> => {
  await connector.activate()
  const connectionType = getConnection(connector).type
  return connectionType
}

export const tryDeactivateConnector = async (
  connector: Connector
): Promise<null | undefined> => {
  connector.deactivate?.()
  connector.resetState()
  return null
}

export const tryAutoReconnect = async (onActivate: Function) => {
  try {
    // fetch from storage
    const connectionType = localStorage.getItem(APP_ENV.CONNECTOR_TYPE_STORAGE)
    if (!connectionType) return
    // check if supported
    if (!Object.keys(ConnectionType).includes(connectionType as ConnectionType))
      return
    // get connector
    const { connector } = getConnection(connectionType as ConnectionType)
    // activate
    const activate = await tryActivateConnector(connector)
    // if failed remove and reset to avoid issues
    if (!activate)
      return localStorage.removeItem(APP_ENV.CONNECTOR_TYPE_STORAGE)

    // else activate as is
    onActivate(activate)
    // otherwise set item for future ease
    toast.success(
      `Successfully auto connected with ${capitaliseText(
        String(connectionType)
      )}!`
    )
    localStorage.setItem(APP_ENV.CONNECTOR_TYPE_STORAGE, connectionType)
  } catch (err: any) {
    // console.log('auto connection error', err.name)
    return localStorage.removeItem(APP_ENV.CONNECTOR_TYPE_STORAGE)
  }
}
