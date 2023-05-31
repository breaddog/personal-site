import styles from './Web3.module.scss'
import sectionStyles from '../../../../styles/section.module.scss'
import React from 'react'
import classNames from 'classnames'

import {
  GenericSubSectionForwardInterface,
  GenericForwardRefInterface
} from '../../../../shared/interfaces'
import {
  Hyperlink,
  SectionContainer,
  SectionHeader,
  Window,
  WindowHandle
} from '../../../../shared/components'

import ethereumSVG from '../../../../assets/icons/ethereum-bold.svg'
import { EXTERNAL_LINKS } from '../../../../shared'
import { useWeb3React } from '@web3-react/core'
import { chainIdToName } from '../../../../ethereum/utils'
import { AppContext } from '../../../../App'
import {
  WalletConnectButton,
  connectionTypeToNetworkName
} from '../../../../ethereum'

interface PortfolioWeb3Props extends GenericSubSectionForwardInterface {}

export const PortfolioWeb3: React.FunctionComponent<PortfolioWeb3Props> =
  React.forwardRef<GenericForwardRefInterface, PortfolioWeb3Props>(
    ({ className }, ref) => {
      const sectionRef = React.useRef<HTMLDivElement | null>(null)
      const web3WindowRef = React.useRef<WindowHandle>(null)

      const { connectionType, ethBalance, maticBalance } =
        React.useContext(AppContext)
      const { account, chainId } = useWeb3React()

      const classes = classNames(
        'sub-section__web3',
        sectionStyles['sub-section'],
        styles.web3,
        className
      )

      const determineEthWindowMessage = () => {
        if (!window.ethereum) {
          return 'Please install an ethereum wallet widget to proceed.'
        }

        if (!account) {
          return 'Please connect your wallet to continue'
        }

        return 'Connected'
      }

      React.useImperativeHandle(ref, () => ({
        element: sectionRef.current as Element,
      }))

      return (
        <section
          className={classes}
          ref={sectionRef}
        >
          <SectionContainer className={styles.container}>
            <SectionHeader
              className={styles.header}
              title='Web3 Enabled'
              src={ethereumSVG}
              alt='ethereum'
              backgroundColour='var(--purple-10)'
            />

            <div className={styles.body}>
              <div className={styles.left}>
                <h3 className={styles.subheader}>Buzzwords?</h3>
                <p className={styles.text}>
                  Putting the hot buzzwords aside, certain parts of the site are
                  Web3 enabled and engages with the <b>Ethereum Blockchain.</b>
                </p>
                <p className={styles.text}>
                  Some highlighted projects on this site have Web3 features,
                  indicated by the <b>Connect Wallet to View</b> prompt.
                  Supported wallet providers are listed below:
                  <ul>
                    <li>
                      <Hyperlink>
                        <a href={EXTERNAL_LINKS.metamask.download}>Metamask</a>
                      </Hyperlink>
                    </li>
                    <li>
                      <Hyperlink>
                        <a href={EXTERNAL_LINKS.coinbase.download}>Coinbase</a>
                      </Hyperlink>
                    </li>
                  </ul>
                </p>

                <h3 className={styles.subheader}>
                  Web3 Explained Like I'm Five
                </h3>
                <p className={styles.text}>
                  You can treat it as a platform where compared to a{' '}
                  <b>single person</b> confirming something, like a bank showing
                  how much you have. Web3 works by having{' '}
                  <b>multiple independent people</b> confirming that same amount
                  along with many other amounts and actions in a single{' '}
                  <b>block</b>, hence decentralised.
                </p>
                <h3 className={styles.subheader}>Ethereum? Ethereum.</h3>
                <p className={styles.text}>
                  Ethereum works off a <b>Proof of Stake</b> network, meaning
                  the more you stake in the network when starting a{' '}
                  <b>validator node (independent person)</b>, the higher chance
                  you have of being <b>selected</b>
                  as one of the validator nodes participating in the{' '}
                  <b>confirmation of a single block (answer)</b> and receiving a
                  cut of fees used in transactions.
                </p>

                <p className={styles.text}>
                  For more information on Ethereum, how it functions and its
                  uses, you can read more from{' '}
                  <Hyperlink>
                    <a
                      href={EXTERNAL_LINKS.ethereum.info}
                      target='_blank'
                      rel='noopener noreferrer'
                    >
                      their official site.
                    </a>
                  </Hyperlink>
                </p>
              </div>
              <div className={classNames(styles.right, 'web3__right')}>
                <Window
                  className={styles.window}
                  windowTitle='Ethereum Demonstrator'
                  windowStyle='dark'
                  referenceKey='2'
                  boundaryContainer='.sub-section__web3'
                  ref={web3WindowRef}
                >
                  <div className={styles.windowContainer}>
                    <h3 className={styles.title}>
                      View your Ethereum Account Details!
                    </h3>

                    <div className={styles.status}>
                      <div
                        className={classNames(
                          styles.row,
                          account && styles.connected
                        )}
                      >
                        <span className={styles.key}>STATUS:</span>
                        <span className={styles.value}>
                          {account ? 'Connected' : 'Not Connected'}
                        </span>
                      </div>
                      <div
                        className={classNames(
                          styles.row,
                          account && styles.connected
                        )}
                      >
                        <span className={styles.key}>MESSAGE:</span>
                        <span className={styles.value}>
                          {determineEthWindowMessage()}
                        </span>
                      </div>
                    </div>

                    <div className={styles.info}>
                      <div className={styles.row}>
                        <span className={styles.key}>Account:</span>
                        <span className={styles.value}>{account ?? '--'}</span>
                      </div>
                      <div className={styles.row}>
                        <span className={styles.key}>Network:</span>
                        <span className={styles.value}>
                          {chainId ? chainIdToName(chainId ?? 0) : '--'}
                        </span>
                      </div>
                      <div className={styles.row}>
                        <span className={styles.key}>ETH Balance:</span>
                        <span className={styles.value}>
                          {account ? `${ethBalance} ETH` : '--'}
                        </span>
                      </div>
                      <div className={styles.row}>
                        <span className={styles.key}>MATIC Balance:</span>
                        <span className={styles.value}>
                          {account ? `${maticBalance} MATIC` : '--'}
                        </span>
                      </div>
                      <div className={styles.row}>
                        <span className={styles.key}>Provider:</span>
                        <span className={styles.value}>
                          {account && connectionType
                            ? connectionTypeToNetworkName(connectionType)
                            : '--'}
                        </span>
                      </div>
                    </div>
                  </div>
                  <div className={styles.connect}>
                    <WalletConnectButton className={styles.button} />
                  </div>
                </Window>
              </div>
            </div>
          </SectionContainer>
        </section>
      )
    }
  )
