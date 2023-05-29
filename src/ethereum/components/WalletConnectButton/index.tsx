import styles from './WalletConnectButton.module.scss'
import React from 'react'
import classNames from 'classnames'

import { Button } from '../../../shared/components'
import { useWeb3React } from '@web3-react/core'

interface WalletConnectButtonProps {
  className?: string
  onClick?: Function
  text?: {
    connected?: string
    disconnected?: string
  }
}

export const WalletConnectButton: React.FunctionComponent<
  WalletConnectButtonProps
> = ({ className, onClick = () => {}, text = {} }) => {
  const { account } = useWeb3React()
  const {
    connected = 'Connect ETH Wallet',
    disconnected = 'Disconnect ETH Wallet',
  } = text

  const classes = classNames(styles.button, 'effects--hoverPop', className)

  return (
    <Button
      className={classes}
      onClick={() => onClick()}
    >
      {account ? disconnected : connected}
    </Button>
  )
}
