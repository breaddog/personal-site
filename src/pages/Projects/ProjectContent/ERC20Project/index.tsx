import erc20Styles from './ERC20Project.module.scss'
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

export interface ERC20ProjectProps {
  className?: string
  componentkey?: string
  project: ProjectObject
  extraInfo?: ExtraInfoWrapperProps[]
  overrideExtraInfo?: boolean
}

export const ERC20Project: React.FunctionComponent<ERC20ProjectProps> = ({
  className,
  componentkey,
  project,
  extraInfo = [],
  overrideExtraInfo = false,
}) => {
  const { account } = useWeb3React()

  const classes = classNames(erc20Styles.project, styles.container, className)

  const erc20Request = RequestFactory.getRequest('ERC20Request', {
    address: project.eth?.address ?? '',
    decimals: project.eth?.decimals ?? 18,
    symbol: project.eth?.symbol ?? '',
    network: project.eth?.network ?? 'ethereum',
    unique: true,
  })

  const [balance, setBalance] = React.useState<number>(-1)
  const [totalSupply, setTotalSupply] = React.useState<number>(0)

  const extraWeb3Info: ExtraInfoInterface[] = [
    {
      title: 'Total Supply',
      value: `${totalSupply} ${project?.eth?.symbol}`,
    },
    {
      title: 'Owned',
      value:
        balance < 0
          ? 'Connect Wallet to View'
          : `${balance} ${project?.eth?.symbol}`,
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
      const _supply = await erc20Request.getTotalSupply()
      setTotalSupply(_supply)
    } catch (err) {
      console.log(err)
    }
  }

  const getBalance = async (account: string | null) => {
    if (!account) return
    try {
      const _balance = await erc20Request.getBalanceOf(account)
      setBalance(_balance)
    } catch (err) {
      console.log(err)
    }
  }

  const resetWalletState = () => {
    setBalance(-1)
  }

  const reinstantiateContract = async () => {
    await erc20Request.reinstantiateContract({
      address: project.eth?.address ?? '',
      decimals: project.eth?.decimals ?? 18,
      symbol: project.eth?.symbol ?? '',
      network: project.eth?.network ?? 'ethereum',
      unique: true,
    })
  }

  React.useEffect(() => {
    reinstantiateContract()
    getTotalSupply()
  }, [project])

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
