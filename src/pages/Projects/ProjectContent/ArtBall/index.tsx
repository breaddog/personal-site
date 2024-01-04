import artballStyles from './ArtBall.module.scss'
import styles from '../../Project.module.scss'
import React from 'react'
import classNames from 'classnames'

import { PROJECTS, ProjectObject } from '../../../../data/projects'
import { RequestFactory } from '../../../../requests'
import {
  ARTBALL_22_CONTRACT_ADDRESS,
  ARTBALL_23_CONTRACT_ADDRESS,
} from '../../../../contracts'
// import { useWeb3React } from '@web3-react/core'

import { ARTBALL_LINKS, BODY_CONTENT_ARTBALL } from './content'
import { map } from 'lodash'
import {
  BodyContentProps,
  ExtraInfoWrapperProps,
  ExtraInfoInterface,
} from '../../types'
import { generateProjectBodyElement } from '../../helpers'

interface ArtBallProjectProps {
  key?: string
}

// for artball its more efficient to make it a custom one due to multi-project
export const ArtBallProject: React.FunctionComponent<ArtBallProjectProps> = ({
  key,
}) => {
  const project: ProjectObject = PROJECTS.artball
  const artball22Request = RequestFactory.getRequest('ERC721Request', {
    address: ARTBALL_22_CONTRACT_ADDRESS,
  })
  const artball23Request = RequestFactory.getRequest('ERC721Request', {
    address: ARTBALL_23_CONTRACT_ADDRESS,
    unique: true,
  })

  // classes
  const classes = classNames(artballStyles.artball, styles.container)

  // web3
  // const { account } = useWeb3React()
  // balance
  // const [balance22, setBalance22] = React.useState<number>(-1)
  // const [balance23, setBalance23] = React.useState<number>(-1)
  // supply
  const [totalSupply22, setTotalSupply22] = React.useState<number>(0)
  const [totalSupply23, setTotalSupply23] = React.useState<number>(0)

  // top extra information
  const extraWeb3Info: ExtraInfoInterface[] = [
    {
      title: 'Opensea Collection',
      value: 'View Here',
      isLink: true,
      link: {
        url: ARTBALL_LINKS.opensea,
        title: 'ArtBall Collection on Opensea',
      },
    },
    {
      title: "Total Sold '22",
      value: `${totalSupply22}`,
    },
    {
      title: "Total Sold '23",
      value: totalSupply23,
    },
    // {
    //   title: '\'22 ArtBalls Owned',
    //   value: balance22 < 0 ? 'Connect Wallet to View' : balance22,
    // },
    // {
    //   title: '\'23 ArtBalls Owned',
    //   value: balance23 < 0 ? 'Connect Wallet to View' : balance23,
    // },
  ]

  // extra info wrapper
  const extraArtballInfo: ExtraInfoWrapperProps[] = [
    {
      type: 'top',
      content: extraWeb3Info,
    },
  ]

  // WEB3 GETTERS
  const getArtballTotalSupplies = async () => {
    try {
      const _supply22 = await artball22Request.getTotalSupply()
      const _supply23 = await artball23Request.getTotalSupply()
      setTotalSupply22(_supply22)
      setTotalSupply23(_supply23)
    } catch (err) {
      console.log(err)
    }
  }

  // const getArtballBalances = async (account: string | null) => {
  //   if (!account) return
  //   try {
  //     const _balance22 = await artball22Request.getBalanceOf(account)
  //     const _balance23 = await artball23Request.getBalanceOf(account)
  //     // setBalance22(_balance22)
  //     // setBalance23(_balance23)
  //   } catch (err) {
  //     console.log(err)
  //   }
  // }

  // const resetWalletState = () => {
  //   setBalance22(-1)
  //   setBalance23(-1)
  // }

  const reinstantiateContract = async () => {
    await artball22Request.reinstantiateContract()
    await artball23Request.reinstantiateContract()
  }

  // BEFORE DEPLOY: reactive web3
  React.useEffect(() => {
    reinstantiateContract()
    getArtballTotalSupplies()
  }, [])

  // React.useEffect(() => {
  //   if (account) {
  //     getArtballBalances(account)
  //   } else {
  //     resetWalletState()
  //   }
  // }, [account])

  // main
  return (
    <div
      className={classes}
      key={key}
    >
      {map(BODY_CONTENT_ARTBALL, (body: BodyContentProps, idx: number) => {
        return generateProjectBodyElement({
          body,
          project,
          key: idx,
          extraInfo: extraArtballInfo,
        })
      })}
    </div>
  )
}
