import styles from './Option.module.scss'
import React from 'react'
import {
  ConnectionType,
  checkIfCoinbaseWalletInstalled,
  checkIfMetaMaskInstalled,
  checkIfProviderInstalled,
  connectionTypeToNetworkName,
  getConnection,
  tryActivateConnector,
  tryDeactivateConnector
} from '../../connectors'
import classNames from 'classnames'
import { toast } from 'react-toastify'
import { useWeb3React } from '@web3-react/core'
import { APP_ENV } from '../../../config'

export type ConnectionMode = 'connect' | 'disconnect'

export type OptionWrapperProps = {
  className?: string
  disabledClass: string
  connectionMode?: ConnectionMode
  isEnabled?: boolean
  isConnected: boolean
  ethereumInstalled: boolean
  activeConnectionType: ConnectionType | null
  connectionType: ConnectionType | null
  // eslint-disable-next-line no-unused-vars
  onActivate: (connectionType: ConnectionType) => void
  // eslint-disable-next-line no-unused-vars
  onDeactivate: (connectionType: null) => void
  onClick?: Function
  children?: React.ReactNode
}

// wrapper
export const OptionWrapper: React.FunctionComponent<OptionWrapperProps> = ({
  className,
  disabledClass,
  isEnabled = false,
  connectionMode = 'connect',
  ethereumInstalled,
  isConnected,
  activeConnectionType,
  connectionType,
  onActivate,
  onDeactivate,
  onClick = () => {},
  children,
}) => {
  const [optionWalletInstalled, setOptionWalletInstalled] =
    React.useState<boolean>(false)

  // wrapper for web3 connection compoennt
  const handleWalletConnect = async () => {
    // get connector
    if (isConnected) return toast.error('Already connected to this provider')
    if (!connectionType)
      return toast.error('Must specify connection provider to connect to')
    const activate = await tryActivateConnector(
      getConnection(connectionType).connector
    )
    if (!activate) return

    // activate
    onActivate(activate)
    return toast.success('Successfully connected!')
  }

  // disconnect
  const handleWalletDisconnect = async () => {
    if (isConnected) {
      // try to deactiate
      if (!connectionType)
        return toast.error('Must be connected first to disconnect')
      const deactivate = await tryDeactivateConnector(
        getConnection(connectionType).connector
      )
      // failure
      if (deactivate === undefined) return
      onDeactivate(deactivate)
      // remove local storage
      localStorage.removeItem(APP_ENV.CONNECTOR_TYPE_STORAGE)
      return toast.success('Successfully disconnected!')
    }
  }

  const handleOnClick = () => {
    if (!ethereumInstalled) {
      return toast.error('Please install a wallet provider before continuing.')
    }
    if (connectionMode === 'disconnect' && !connectionType) {
      return toast.error('Must connect to a provider before disconnecting.')
    }
    if (!optionWalletInstalled) {
      return toast.error(
        `${connectionTypeToNetworkName(
          connectionType
        )} not installed, please install and try again.`
      )
    }
    if (!isEnabled && activeConnectionType !== connectionType) {
      return toast.error(
        'Please disconnect from current provider before trying again.'
      )
    }
    if (!isEnabled) {
      return toast.error('Provider is unavailable, please try another one.')
    }

    // determine if connect or disconnect
    connectionMode === 'connect'
      ? handleWalletConnect()
      : handleWalletDisconnect()

    // finally handle other functions
    onClick()
  }

  // cases to check
  const checkIfDisabled = () => {
    // if outright disabled
    if (!isEnabled) return true

    // disconnect button not connected case
    if (connectionMode === 'disconnect' && !connectionType && !isConnected)
      return true

    // chosen wallet not installed
    if (!optionWalletInstalled) return true

    // any other connection
    return isConnected && connectionMode !== 'disconnect'
  }

  const checkIfOptionInstalled = async (ethereum: any) => {
    const check = await checkIfProviderInstalled(ethereum, connectionType)
    setOptionWalletInstalled(check)
  }

  React.useEffect(() => {
    const { ethereum }: any = window
    checkIfOptionInstalled(ethereum)
  }, [window.ethereum, connectionType, optionWalletInstalled])

  // classes
  const disabledClasses = classNames(styles.disabled, disabledClass)
  const classes = classNames(
    styles.option,
    className,
    checkIfDisabled() && disabledClasses
  )

  return (
    <div
      className={classes}
      onClick={() => handleOnClick()}
    >
      {children}
    </div>
  )
}
