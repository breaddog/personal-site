import styles from './WalletConnectModal.module.scss'
import React from 'react'
import classNames from 'classnames'
import {
  PopupModal,
  PopupModalProps
} from '../../../shared/components/PopupModal'

import { ConnectionType, connectionTypeToNetworkName } from '../../connectors'
import { omit } from 'lodash'
import { OptionWrapper } from '../Option'
import { useWeb3React } from '@web3-react/core'
import { EXTERNAL_LINKS } from '../../../shared'

import {
  chainIdToName,
  getNetworkNameFromProvider,
  shortenAddress
} from '../../utils'

import metamaskSVG from '../../../assets/logos/metamask.svg'
import coinbaseSVG from '../../../assets/logos/coinbase.svg'

import logoutSVG from '../../../assets/icons/logout.svg'

interface WalletConnectModalProps extends PopupModalProps {
  activeConnectionType: ConnectionType | null
  connectionActive: boolean
  // eslint-disable-next-line
  onActivate: (_connectionType: ConnectionType) => void
  // eslint-disable-next-line
  onDeactivate: (connectionType: null) => void
}

export const WalletConnectModal: React.FunctionComponent<
  WalletConnectModalProps
> = (props) => {
  const classes = classNames(styles.walletConnect, props.className)
  const walletProps = {
    ...omit(props, [
      'activeConnectionType',
      'connectionActive',
      'onActivate',
      'onDeactivate',
    ]),
    id: 'wallet-connect-modal',
    contentLabel: 'wallet-connect-modal',
    className: classes,
  }

  const [networkName, setNetworkName] = React.useState<string>('')
  // eslint-disable-next-line
  const { activeConnectionType, connectionActive, onActivate, onDeactivate } =
    props
  const { account, isActive, chainId, provider } = useWeb3React()

  // ethereum must be active
  const ethereumInstalled = window.ethereum !== undefined
  const isNoOptionActive =
    ethereumInstalled &&
    (!isActive || (isActive && activeConnectionType === null))
  // network name display
  const handleGetNetworkName = async () => {
    if (!provider) return
    const name: string = await getNetworkNameFromProvider(provider)
    setNetworkName(name)
  }

  React.useEffect(() => {
    if (provider) {
      handleGetNetworkName()
    }

    if (!provider && networkName.length) {
      setNetworkName('')
    }
  }, [provider])

  // TO DO: change for majority of window.ethereum to use browser's
  return (
    <PopupModal {...walletProps}>
      <div className={styles.body}>
        <h3 className={styles.header}>Connect your Ethereum Wallet</h3>

        <div className={styles.status}>
          <div className={styles.row}>
            <div className={styles.title}>Wallet:</div>
            <div className={styles.value}>
              {account
                ? shortenAddress({
                    address: account ?? '',
                    length: 10,
                    tail: false,
                  })
                : 'Not Connected'}
            </div>
          </div>
          <div className={styles.row}>
            <div className={styles.title}>Network:</div>
            <div className={styles.value}>
              {chainId ? chainIdToName(chainId ?? 0) : 'Not Connected'}
            </div>
          </div>
          <div className={styles.row}>
            <div className={styles.title}>Chain ID:</div>
            <div className={styles.value}>{chainId ?? 'Not Connected'}</div>
          </div>
          <div className={styles.row}>
            <div className={styles.title}>Provider:</div>
            <div
              className={classNames(
                styles.value,
                account && provider && styles.capitalise
              )}
            >
              {account && activeConnectionType
                ? connectionTypeToNetworkName(activeConnectionType)
                : 'Not Connected'}
            </div>
          </div>
          {/* future: error handling if adding more complex behaviour */}
          {/* <div className={classNames(styles.row, styles.error)}>
            <div className={styles.title}>Error:</div>
            <div className={styles.value}>
              Insert error message formatted here
            </div>
          </div> */}
        </div>

        {window.ethereum && (
          <div className={classNames(styles.info)}>
            <b>NOTE:&nbsp;</b>An Ethereum supported wallet widget is required to
            continue, here are widgets currently supported by this site:{' '}
            <a href={EXTERNAL_LINKS.metamask.download}>Metamask</a>,{' '}
            <a href={EXTERNAL_LINKS.coinbase.download}>Coinbase.</a>
          </div>
        )}
        {/* 
          <div className={styles.info}>
            Text here will be used to display: errors, base information about eth wallets, etc...
          </div> 
        */}
        {/* TO DO: change metamask injector */}
        <div className={styles.options}>
          <OptionWrapper
            className={classNames(styles.option, 'effect--hoverPop')}
            disabledClass={styles.disabled}
            isEnabled={
              isNoOptionActive ||
              activeConnectionType === ConnectionType.COINBASE_WALLET
            }
            activeConnectionType={activeConnectionType}
            ethereumInstalled={ethereumInstalled}
            isConnected={
              activeConnectionType === ConnectionType.COINBASE_WALLET
            }
            connectionType={ConnectionType.COINBASE_WALLET}
            onActivate={onActivate}
            onDeactivate={onDeactivate}
          >
            <img
              className={classNames(styles.logo, styles.coinbase)}
              src={coinbaseSVG}
              alt='coinbase'
            />
            <div className={styles.name}>Coinbase</div>
          </OptionWrapper>

          {/* <div className={styles.option}>
          <img
            className={classNames(styles.logo, styles.walletconnect)}
            src={walletConnectSVG}
            alt='walletconnect'
          />
          <div className={styles.name}>
            WalletConnect
          </div>
        </div> */}

          <OptionWrapper
            className={classNames(styles.option, 'effect--hoverPop')}
            disabledClass={styles.disabled}
            ethereumInstalled={ethereumInstalled}
            isEnabled={
              isNoOptionActive ||
              activeConnectionType === ConnectionType.METAMASK
            }
            isConnected={activeConnectionType === ConnectionType.METAMASK}
            activeConnectionType={activeConnectionType}
            connectionType={ConnectionType.METAMASK}
            onActivate={onActivate}
            onDeactivate={onDeactivate}
          >
            <img
              className={styles.logo}
              src={metamaskSVG}
              alt='metamask'
            />
            <div className={styles.name}>
              Metamask{' '}
              {activeConnectionType === ConnectionType.METAMASK &&
                '(Connected)'}
            </div>
          </OptionWrapper>

          <OptionWrapper
            className={classNames(styles.option, 'effect--hoverPop')}
            disabledClass={styles.disabled}
            ethereumInstalled={ethereumInstalled}
            isEnabled={activeConnectionType !== undefined}
            isConnected={activeConnectionType !== null}
            activeConnectionType={activeConnectionType}
            connectionType={activeConnectionType ?? null}
            connectionMode='disconnect'
            onActivate={onActivate}
            onDeactivate={onDeactivate}
          >
            <img
              className={classNames(styles.logo, styles.logout)}
              src={logoutSVG}
              alt='logout'
            />
            <div className={styles.name}>Disconnect Wallet</div>
          </OptionWrapper>
        </div>
      </div>
    </PopupModal>
  )
}
