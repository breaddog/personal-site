import styles from './Web3.module.scss'
import sectionStyles from '../../../../styles/section.module.scss'
import React from 'react'
import classNames from 'classnames'

import {
  GenericSubSectionForwardInterface,
  GenericForwardRefInterface
} from '../../../../shared/interfaces'
import {
  CollapsibleFAQ,
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
      // refs
      const sectionRef = React.useRef<HTMLDivElement | null>(null)
      const web3WindowRef = React.useRef<WindowHandle>(null)

      const flexMediaMatcher = window.matchMedia('(max-width: 1050px)')
      const isColumnRef = React.useRef<boolean>(false)

      // props
      const {
        connectionType,
        ethBalance,
        maticBalance,
        web3ModalActive,
        setWeb3ModalActive,
      } = React.useContext(AppContext)
      const { account, chainId } = useWeb3React()

      // classes
      const classes = classNames(
        'sub-section__web3',
        sectionStyles['sub-section'],
        styles.web3,
        className
      )

      // message
      const determineEthWindowMessage = () => {
        if (!window.ethereum) {
          return 'Please install an ethereum wallet to proceed.'
        }

        if (!account) {
          return 'Please connect your wallet to view information'
        }

        return 'Connected'
      }

      const invalidateAllWindowProps = ({
        width,
        height,
      }: {
        width?: string
        height?: string
      }) => {
        if (!web3WindowRef.current) return
        web3WindowRef.current.invalidateWindow()
        web3WindowRef.current.resetWindow({
          width,
          height,
        })
      }

      // window related stuff
      const flexDetectionHandler = () => {
        if (flexMediaMatcher.matches && !isColumnRef.current) {
          isColumnRef.current = true
          invalidateAllWindowProps({})
        }

        if (!flexMediaMatcher.matches && isColumnRef.current) {
          isColumnRef.current = false
          invalidateAllWindowProps({ width: '80%', height: '540px' })
        }
      }

      React.useEffect(() => {
        flexDetectionHandler()
        window.addEventListener('resize', flexDetectionHandler)
        return () => {
          window.addEventListener('resize', flexDetectionHandler)
        }
      }, [isColumnRef, flexMediaMatcher])

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
                <div className={styles.top}>
                  <h3 className={classNames(styles.subheader, styles.main)}>
                    Buzzwords?
                  </h3>
                  <div className={styles.text}>
                    <p>
                      Putting the hot buzzwords aside, certain parts of the site
                      are Web3 enabled and engages with the{' '}
                      <b>Ethereum Blockchain.</b>
                    </p>
                    <br />
                    <p>
                      Some of my experience derrives from various NFT and DeFi
                      (Decentralised Finance) projects with clients such as
                      Tennis Australia, T&B Media Global, and artists like
                      Shintaro Kago, Vhils, Scott Marsh and Lushux to name a
                      few.
                    </p>
                    <br />

                    <p>
                      A number of projects on this site have Web3 features,
                      indicated by the <b>Connect Wallet to View</b> prompt and
                      the obvious <b>Connect Eth Wallet</b> button in the
                      header. Supported wallet providers are listed below:
                    </p>
                    <ul className={styles.wallets}>
                      <li>
                        <Hyperlink>
                          <a href={EXTERNAL_LINKS.metamask.download}>
                            Metamask
                          </a>
                        </Hyperlink>
                      </li>
                      <li>
                        <Hyperlink>
                          <a href={EXTERNAL_LINKS.coinbase.download}>
                            Coinbase
                          </a>
                        </Hyperlink>
                      </li>
                    </ul>
                  </div>
                </div>

                <div className={styles.faq}>
                  <h3 className={classNames(styles.subheader, styles.main)}>
                    A Small FAQ!
                  </h3>
                  <CollapsibleFAQ
                    title={{
                      classname: styles.subheader,
                      content: 'Web3 Explained Like I\'m Five',
                    }}
                    bodyclassname={styles.text}
                  >
                    <p>
                      You can treat it as a platform where compared to a{' '}
                      <b>single person</b> confirming something, like a bank
                      showing how much you have. Web3 works by having{' '}
                      <b>multiple independent people</b> confirming that same
                      amount along with many other amounts, transactions and
                      actions in a single <b>block</b>, hence decentralised as
                      there is no main person.
                    </p>
                  </CollapsibleFAQ>

                  <CollapsibleFAQ
                    title={{
                      classname: styles.subheader,
                      content: 'Blockchain? Is that Lego?',
                    }}
                    bodyclassname={styles.text}
                  >
                    <p>
                      Blocks can be treated as a <b>group of proofs</b> that
                      confirm events in the form of <b>transactions.</b>{' '}
                      Transactions could be anything from interactions,
                      transfers or creations to name a few.
                    </p>
                    <br />
                    <p>
                      Each block is provided with a <b>sequential number</b> and
                      a <b>mathematical hash value</b> calculated from the
                      block's contents and <b>data from the previous block.</b>
                    </p>
                    <br />
                    <p>
                      If all validators arrive at the <b>same hash value</b>,
                      the block is confirmed and added to the{' '}
                      <b>chain of blocks</b>, hence the term blockchain.
                    </p>
                    <br />
                    <p>
                      This means that{' '}
                      <b>tampering with previous data will be impossible</b> as
                      it will affect future calculations, providing a level of{' '}
                      <b>immutability and security</b> as all validators would
                      need to arrive at the same hash value when validating a
                      block.
                    </p>
                  </CollapsibleFAQ>

                  <CollapsibleFAQ
                    title={{
                      classname: styles.subheader,
                      content: 'Ethereum? Ethereum.',
                    }}
                    bodyclassname={styles.text}
                  >
                    <p>
                      Ethereum works off a <b>Proof of Stake</b> network,
                      meaning the more you stake in the network when starting a{' '}
                      <b>validator node (independent person)</b>, the higher
                      chance you have of being <b>selected</b> as one of the
                      validator nodes participating in the{' '}
                      <b>validation of a single block</b> and receiving a cut of
                      fees used in transactions from the block.
                    </p>
                    <br />
                    <p>
                      A popular use on the Ethereum Blockchain is the use of
                      tokens to represent a variety of concepts/ideas. Tokens
                      can either be <b>fungible (multiple)</b> or{' '}
                      <b>non-fungible (unique).</b>
                    </p>
                    <br />
                    <p>There exists three popular standards for tokens:</p>
                    <ul className={styles.wallets}>
                      <li>
                        <b>ERC-20</b>: Fungible, popular with currency/points
                        based applications.
                      </li>
                      <li>
                        <b>ERC-721</b>: Non-fungible, NFT stands for
                        Non-Fungible Token.
                      </li>
                      <li>
                        <b>ERC-1155</b>: Can be both, used for
                        variable/versatile applications.
                      </li>
                    </ul>
                    <br />
                    <p>
                      Each one of these tokens are <b>minted</b> from a platform
                      on the Ethereum Network called a <b>Smart Contract</b>
                    </p>
                  </CollapsibleFAQ>
                </div>

                <CollapsibleFAQ
                  title={{
                    classname: styles.subheader,
                    content: 'Confusing? TL;DR? Check Here!',
                  }}
                  bodyclassname={styles.text}
                >
                  <p>
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
                </CollapsibleFAQ>
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

                    <div
                      className={classNames(
                        styles.status,
                        account && styles.connected
                      )}
                    >
                      <div className={styles.row}>
                        <span className={styles.key}>STATUS:</span>
                        <span className={styles.value}>
                          {account ? 'Connected' : 'Not Connected'}
                        </span>
                      </div>
                      <div className={styles.row}>
                        <span className={styles.key}>MESSAGE:</span>
                        <span className={styles.value}>
                          {determineEthWindowMessage()}
                        </span>
                      </div>
                    </div>

                    <div
                      className={classNames(
                        styles.info,
                        account && styles.connected
                      )}
                    >
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
                        <span className={styles.key}>Provider:</span>
                        <span className={styles.value}>
                          {account && connectionType
                            ? connectionTypeToNetworkName(connectionType)
                            : '--'}
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
                    </div>

                    <div className={styles.connect}>
                      <WalletConnectButton
                        className={classNames(
                          styles.button,
                          !account && styles.connect
                        )}
                        onClick={() => setWeb3ModalActive(!web3ModalActive)}
                      />
                    </div>
                  </div>
                </Window>
              </div>
            </div>
          </SectionContainer>
        </section>
      )
    }
  )
