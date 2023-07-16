import styles from './Web3.module.scss'
import sectionStyles from '../../../../styles/section.module.scss'
import React from 'react'
import classNames from 'classnames'

import {
  GenericSubSectionForwardInterface,
  GenericForwardRefInterface
} from '../../../../shared/interfaces'
import {
  CollapsibleSection,
  Hyperlink,
  SectionContainer,
  SectionHeader,
  Window,
  WindowHandle
} from '../../../../shared/components'

import ethereumSVG from '../../../../assets/icons/ethereum-bold.svg'
import { EXTERNAL_LINKS } from '../../../../shared'
import { useWeb3React } from '@web3-react/core'
import { chainIdToName, shortenAddress } from '../../../../ethereum/utils'
import { AppContext } from '../../../../App'
import {
  WalletConnectButton,
  connectionTypeToNetworkName
} from '../../../../ethereum'
import { map } from 'lodash'
import { WEB3_FAQ, Web3FaqProps } from './FAQ'

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
        element: sectionRef.current as HTMLDivElement,
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
                  <h3
                    className={classNames(styles.subheader, styles.main)}
                    data-aos='fade-right'
                    data-aos-delay='100'
                  >
                    Buzzwords?
                  </h3>
                  <div
                    className={styles.text}
                    data-aos='fade-right'
                    data-aos-delay='150'
                  >
                    <p>
                      Putting the hot buzzwords aside, certain parts of the site
                      are <b>Web3 enabled</b> and engages with the{' '}
                      <b>Ethereum Blockchain.</b>
                    </p>
                    <br />
                    <p>
                      Some of my experience derives from various NFT and DeFi
                      (Decentralised Finance) projects with clients such as
                      Tennis Australia, T&B Media Global, and artists like
                      Shintaro Kago, Vhils and Scott Marsh under development
                      partnerships to name a few.
                    </p>
                    <br />

                    <p>
                      A number of projects on this site have Web3 features,
                      indicated by a <b>Connect Wallet to View</b> prompt and
                      the{' '}
                      <Hyperlink
                        colour='var(--purple-10)'
                        onClick={() => setWeb3ModalActive(!web3ModalActive)}
                      >
                        <b>Connect Eth Wallet</b>
                      </Hyperlink>{' '}
                      button in the header or in the{' '}
                      <b>"Ethereum Demonstrator"</b> window in this section.
                      Supported wallet providers are listed below:
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
                  <h3
                    className={classNames(styles.subheader, styles.main)}
                    data-aos='fade-right'
                    data-aos-delay='250'
                  >
                    A Small FAQ!
                  </h3>
                  {map(WEB3_FAQ, (faq: Web3FaqProps, idx: number) => (
                    <CollapsibleSection
                      key={idx}
                      componentkey={idx}
                      className={styles.faqObject}
                      title={{
                        classname: classNames(styles.subheader),
                        content: faq.title,
                      }}
                      bodyclassname={styles.faqContent}
                      data-aos='fade-right'
                      data-aos-delay={200 + 10 * idx}
                    >
                      {faq.content}
                    </CollapsibleSection>
                  ))}
                  {/* separate due to some nested import bug */}
                  <CollapsibleSection
                    className={styles.faqObject}
                    title={{
                      classname: classNames(styles.subheader),
                      content: 'Confusing? TL;DR? Check Here!',
                    }}
                    bodyclassname={styles.faqContent}
                    data-aos='fade-right'
                    data-aos-delay={200 + 10 * WEB3_FAQ.length}
                  >
                    <p>
                      If you'd like to read up more on Web3, you can read{' '}
                      <Hyperlink>
                        <a
                          href='https://www.investopedia.com/web-20-web-30-5208698'
                          target='_blank'
                          rel='noopener noreferrer'
                        >
                          this short article.
                        </a>
                      </Hyperlink>
                    </p>
                    <br />
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
                  </CollapsibleSection>
                </div>
              </div>

              <div
                className={classNames(styles.right, 'web3__right')}
                data-aos='zoom-in-left'
                data-aos-offset='125'
                data-aos-delay={200 + 25 * WEB3_FAQ.length}
              >
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
                        <span className={styles.value}>
                          {account
                            ? shortenAddress({
                                address: account,
                                length: 6,
                                tail: true,
                              })
                            : '--'}
                        </span>
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
