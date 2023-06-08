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
      value: 'amount',
    },
    {
      title: 'Total Supply Mystics',
      value: 'amount',
    },
    {
      title: 'Total Amount Summoned',
      value: 'amount',
    },
    {
      title: 'Owned Genesis Champions',
      value: 'amount',
    },
    {
      title: 'Owned Mystics Champions',
      value: 'amount',
    },
    {
      title: 'Owned Summoned Champions',
      value: 'amount',
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

  // BEFORE DEPLOY: reactive web3
  // React.useEffect(() => {
  //   getArtballTotalSupplies()
  // }, [])

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
