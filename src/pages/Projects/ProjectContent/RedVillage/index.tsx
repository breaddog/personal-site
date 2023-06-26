import redvillageStyles from './RedVillage.module.scss'
import styles from '../../Project.module.scss'
import React from 'react'
import classNames from 'classnames'

import { PROJECTS, ProjectObject } from '../../../../data/projects'
import { RequestFactory } from '../../../../requests'
import { useWeb3React } from '@web3-react/core'

import { REDVILLAGE_LINKS, BODY_CONTENT_REDVILLAGE } from './content'
import { map } from 'lodash'
import {
  BodyContentProps,
  ExtraInfoWrapperProps,
  ExtraInfoInterface
} from '../../types'
import { generateProjectBodyElement } from '../../helpers'
import {
  REDVILLAGE_GENESIS_CONTRACT_ADDRESS,
  REDVILLAGE_MYSTICS_CONTRACT_ADDRESS,
  REDVILLAGE_SUMMONING_CONTRACT_ADDRESS
} from '../../../../contracts/RedVillage'

interface RedVillageProjectProps {
  key?: string
}

// for artball its more efficient to make it a custom one due to multi-project
export const RedVillageProject: React.FunctionComponent<
  RedVillageProjectProps
> = ({ key }) => {
  const project: ProjectObject = PROJECTS.redvillage

  // classes
  const classes = classNames(redvillageStyles.artball, styles.container)

  const genesisRequest = RequestFactory.getRequest('ERC721Request', {
    address: REDVILLAGE_GENESIS_CONTRACT_ADDRESS,
    network: 'polygon',
    unique: true,
  })
  const mysticsRequest = RequestFactory.getRequest('ERC721Request', {
    address: REDVILLAGE_MYSTICS_CONTRACT_ADDRESS,
    network: 'polygon',
    unique: true,
  })
  const summonRequest = RequestFactory.getRequest('ERC721Request', {
    address: REDVILLAGE_SUMMONING_CONTRACT_ADDRESS,
    network: 'polygon',
    unique: true,
  })

  // web3
  const { account } = useWeb3React()
  // balance
  const [balanceGenesis, setBalanceGenesis] = React.useState<number>(-1)
  const [balanceMystics, setBalanceMystics] = React.useState<number>(-1)
  const [balanceSummoned, setBalanceSummoned] = React.useState<number>(-1)

  // supply
  const [totalSupplyGenesis, setTotalSupplyGenesis] = React.useState<number>(0)
  const [totalSupplyMystics, setTotalSupplyMystics] = React.useState<number>(0)
  const [totalSupplySummoned, setTotalSupplyummoned] = React.useState<number>(0)

  // top extra information
  const extraWeb3Info: ExtraInfoInterface[] = [
    {
      title: 'WEB3 INFORMATION',
      isHeader: true,
      value: null,
    },
    {
      title: 'TRV Champions on Opensea',
      value: 'View Here',
      isLink: true,
      link: {
        url: project?.eth?.opensea ?? '',
        title: 'Champions on Opensea',
      },
    },
    {
      title: 'TRV Summoned on Opensea',
      value: 'View Here',
      isLink: true,
      link: {
        url: REDVILLAGE_LINKS.openseaSummon,
        title: 'Summoned on Opensea',
      },
    },
    {
      title: 'Total Supply Genesis',
      value: `${totalSupplyGenesis}`,
    },
    {
      title: 'Total Supply Mystics',
      value: `${totalSupplyMystics}`,
    },
    {
      title: 'Total Amount Summoned',
      value: `${totalSupplySummoned}`,
    },
    {
      title: 'Genesis Champions Owned',
      value: `${
        balanceGenesis < 0 ? 'Connect Wallet To View' : balanceGenesis
      }`,
    },
    {
      title: 'Mystics Champions Owned',
      value: `${
        balanceMystics < 0 ? 'Connect Wallet To View' : balanceMystics
      }`,
    },
    {
      title: 'Summoned Champions Owned',
      value: `${
        balanceSummoned < 0 ? 'Connect Wallet To View' : balanceSummoned
      }`,
    },
  ]

  // extra info wrapper
  const extraRedVillageInfo: ExtraInfoWrapperProps[] = [
    {
      type: 'top',
      content: extraWeb3Info,
    },
  ]

  // WEB3 GETTERS
  const getTRVBalances = async (_account: string) => {
    try {
      if (!_account) return
      const _genesis = await genesisRequest.getBalanceOf(_account)
      const _mystics = await mysticsRequest.getBalanceOf(_account)
      const _summon = await summonRequest.getBalanceOf(_account)

      setBalanceGenesis(_genesis)
      setBalanceMystics(_mystics)
      setBalanceSummoned(_summon)
    } catch (err) {
      console.log(err)
    }
  }

  const getTRVTotalSupplies = async () => {
    const _genesis = await genesisRequest.getTotalSupply()
    const _mystics = await mysticsRequest.getTotalSupply()
    const _summon = await summonRequest.getTotalSupply()

    setTotalSupplyGenesis(_genesis)
    setTotalSupplyMystics(_mystics)
    setTotalSupplyummoned(_summon)
  }

  const resetWalletState = () => {
    setBalanceGenesis(-1)
    setBalanceMystics(-1)
    setBalanceSummoned(-1)
  }

  const reinstantiateContract = async () => {
    await genesisRequest.reinstantiateContract()
    await mysticsRequest.reinstantiateContract()
    await summonRequest.reinstantiateContract()
  }

  React.useEffect(() => {
    getTRVTotalSupplies()
    reinstantiateContract()
  }, [])

  React.useEffect(() => {
    if (account) {
      getTRVBalances(account)
    } else {
      resetWalletState()
    }
  }, [account])

  // main
  return (
    <div
      className={classes}
      key={key}
    >
      {map(BODY_CONTENT_REDVILLAGE, (body: BodyContentProps, idx: number) => {
        return generateProjectBodyElement({
          body,
          project,
          key: idx,
          extraInfo: extraRedVillageInfo,
        })
      })}
    </div>
  )
}
