import { initializeConnector } from '@web3-react/core'
import { MetaMask } from '@web3-react/metamask'

import { Connection, ConnectionType, onConnectionError } from './connectors'

export const buildMetamaskConnector = () => {
  const [web3MetamaskWallet, web3MetamaskWalletHooks] =
    initializeConnector<MetaMask>(
      (actions) => new MetaMask({ actions, onError: onConnectionError })
    )

  const metamaskConnection: Connection = {
    connector: web3MetamaskWallet,
    hooks: web3MetamaskWalletHooks,
    type: ConnectionType.METAMASK,
  }

  return metamaskConnection
}
