import React from 'react'
import { Web3ReactProvider } from '@web3-react/core'
import { Web3Provider } from '@ethersproject/providers'

import { PRIORITIZED_CONNECTORS } from '../..'

interface Web3ContextProviderProps {
  children?: React.ReactNode
}

export const Web3ContextProvider: React.FunctionComponent<
  Web3ContextProviderProps
> = ({ children }) => {
  const connectors = Object.values(PRIORITIZED_CONNECTORS)

  return (
    <Web3ReactProvider
      connectors={connectors.map((connector: any) => [
        connector.connector,
        connector.hooks,
      ])}
    >
      {children}
    </Web3ReactProvider>
  )
}
