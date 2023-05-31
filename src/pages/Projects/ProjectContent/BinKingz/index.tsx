import binkingzStyles from './BinKingz.module.scss'
import styles from '../../Project.module.scss'
import React from 'react'
import classNames from 'classnames'

import { PROJECTS, ProjectObject } from '../../../../data/projects'
import { RequestFactory } from '../../../../requests'
import { BINKINGZ_CONTRACT_ADDRESS } from '../../../../contracts'
import { useWeb3React } from '@web3-react/core'

import { BINKINGZ_LINKS, BODY_CONTENT_BINKINGZ } from './content'
import { map } from 'lodash'
import {
  BodyContentProps,
  ExtraInfoWrapperProps,
  ExtraInfoInterface
} from '../../types'
import { generateProjectBodyElement } from '../../helpers'

interface BinKingzProjectProps {
  key?: string
}

export const BinKingzProject: React.FunctionComponent<BinKingzProjectProps> = ({
  key,
}) => {
  const project: ProjectObject = PROJECTS.binkingz
  const binkingzRequest = RequestFactory.getRequest('ERC721Request', {
    address: BINKINGZ_CONTRACT_ADDRESS,
  })

  const classes = classNames(binkingzStyles.binkingz, styles.container)

  const { account } = useWeb3React()

  const [balance, setBalance] = React.useState<number>(-1)
  const [totalSupply, setTotalSupply] = React.useState<number>(-1)

  const extraWeb3Info: ExtraInfoInterface[] = [
    {
      title: 'Opensea Collection:',
      value: 'View Here',
      isLink: true,
      link: {
        url: BINKINGZ_LINKS.opensea,
        title: 'ArtBall Collection on Opensea',
      },
    },
    {
      title: 'Total Sold:',
      value: `${totalSupply}`,
    },
    {
      title: 'Owned:',
      value: balance < 0 ? 'Connect Wallet to View' : balance,
    },
  ]

  const extraBinkingzInfo: ExtraInfoWrapperProps[] = [
    {
      type: 'top',
      content: extraWeb3Info,
    },
  ]

  const getBinKingzTotalSupply = async () => {
    try {
      const _supply = await binkingzRequest.getTotalSupply()
      setTotalSupply(_supply)
    } catch (err) {
      console.log(err)
    }
  }

  const getBinkingzBalance = async (account: string | null) => {
    if (!account) return
    try {
      const _balance = await binkingzRequest.getBalanceOf(account)
      setBalance(_balance)
    } catch (err) {
      console.log(err)
    }
  }

  const resetWalletState = () => {
    setBalance(-1)
  }

  React.useEffect(() => {
    getBinKingzTotalSupply()
  }, [])

  // BEFORE DEPLOY: reactive web3
  // React.useEffect(() => {
  //   if (account) {
  //     getBinkingzBalance(account)
  //   } else {
  //     resetWalletState()
  //   }
  // }, [account])

  return (
    <div
      className={classes}
      key={key}
    >
      {map(BODY_CONTENT_BINKINGZ, (body: BodyContentProps, idx: number) => {
        return generateProjectBodyElement({
          body,
          project,
          key: idx,
          extraInfo: extraBinkingzInfo,
        })
      })}
    </div>
  )
}
