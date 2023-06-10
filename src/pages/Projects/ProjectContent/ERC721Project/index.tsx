import erc721Styles from './ERC721Project.module.scss'
import styles from '../../Project.module.scss'
import React from 'react'
import classNames from 'classnames'

import { ProjectObject } from '../../../../data/projects'
import { RequestFactory } from '../../../../requests'
import { useWeb3React } from '@web3-react/core'

import { map } from 'lodash'
import {
  BodyContentProps,
  ExtraInfoInterface,
  ExtraInfoWrapperProps
} from '../../types'
import { generateProjectBodyElement } from '../../helpers'

export interface ERC721ProjectProps {
  className?: string
  componentkey?: string
  project: ProjectObject
  extraInfo?: ExtraInfoWrapperProps[]
  overrideExtraInfo?: boolean
}

export const ERC721Project: React.FunctionComponent<ERC721ProjectProps> = ({
  className,
  componentkey,
  project,
  extraInfo = [],
  overrideExtraInfo = false,
}) => {
  const { account } = useWeb3React()

  const classes = classNames(erc721Styles.project, styles.container, className)

  const erc721Request = RequestFactory.getRequest('ERC721Request', {
    address: project.eth?.address ?? '',
  })

  const [balance, setBalance] = React.useState<number>(-1)
  const [totalSupply, setTotalSupply] = React.useState<number>(-1)

  const extraWeb3Info: ExtraInfoInterface[] = [
    {
      title: 'Opensea Collection',
      value: 'View Here',
      isLink: true,
      link: {
        title: 'View Collection on Opensea',
        url: project.eth?.opensea ?? '',
      },
    },
    {
      title: 'Total Sold',
      value: `${totalSupply}`,
    },
    {
      title: 'Owned',
      value: balance < 0 ? 'Connect Wallet to View' : balance,
    },
  ]

  const extraInfoCombined: ExtraInfoWrapperProps[] = [
    {
      type: 'top',
      content: extraWeb3Info,
    },
    ...extraInfo,
  ]

  const getTotalSupply = async () => {
    try {
      const _supply = await erc721Request.getTotalSupply()
      setTotalSupply(_supply)
    } catch (err) {
      console.log(err)
    }
  }

  const getBalance = async (account: string | null) => {
    if (!account) return
    try {
      const _balance = await erc721Request.getBalanceOf(account)
      setBalance(_balance)
    } catch (err) {
      console.log(err)
    }
  }

  const resetWalletState = () => {
    setBalance(-1)
  }

  React.useEffect(() => {
    getTotalSupply()
  }, [])

  React.useEffect(() => {
    if (account) {
      getBalance(account)
    } else {
      resetWalletState()
    }
  }, [account])

  return (
    <div
      className={classes}
      key={componentkey}
    >
      {map(project.body, (body: BodyContentProps, idx: number) => {
        return generateProjectBodyElement({
          body,
          project,
          key: idx,
          extraInfo: overrideExtraInfo ? extraInfo : extraInfoCombined,
        })
      })}
    </div>
  )
}
