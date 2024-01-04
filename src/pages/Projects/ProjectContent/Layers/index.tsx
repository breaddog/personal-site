import layersStyles from './Layers.module.scss'
import styles from '../../Project.module.scss'
import React from 'react'
import classNames from 'classnames'

import { PROJECTS, ProjectObject } from '../../../../data/projects'
import { RequestFactory } from '../../../../requests'
// import { useWeb3React } from '@web3-react/core'

import { LAYERS_LINKS, BODY_CONTENT_LAYERS } from './content'
import { map } from 'lodash'
import {
  BodyContentProps,
  ExtraInfoWrapperProps,
  ExtraInfoInterface,
} from '../../types'
import { generateProjectBodyElement } from '../../helpers'
import {
  // ALPHA_TEAR_TOKEN_ID,
  // BETA_TEAR_TOKEN_ID,
  LAYERS_CONTRACT_ADDRESS,
  TEARS_CONTRACT_ADDRESS,
} from '../../../../contracts'
interface LayersProjectProps {
  key?: string
}

// for artball its more efficient to make it a custom one due to multi-project
export const LayersProject: React.FunctionComponent<LayersProjectProps> = ({
  key,
}) => {
  const project: ProjectObject = PROJECTS.layers
  const layersRequest = RequestFactory.getRequest('ERC721Request', {
    address: LAYERS_CONTRACT_ADDRESS,
    unique: true,
    network: 'ethereum',
  })
  const tearsRequest = RequestFactory.getRequest('ERC1155Request', {
    address: TEARS_CONTRACT_ADDRESS,
    unique: true,
    network: 'ethereum',
  })

  // const TEARS_TOKEN_IDS = [ALPHA_TEAR_TOKEN_ID, BETA_TEAR_TOKEN_ID]
  // classes
  const classes = classNames(layersStyles.layers, styles.container)

  // // web3
  // const { account } = useWeb3React()
  // // balance
  // const [balanceLayers, setBalanceLayers] = React.useState<number>(-1)
  // const [balanceAlphaTears, setBalanceAlphaTears] = React.useState<number>(-1)
  // const [balanceBetaTears, setBalanceBetaTears] = React.useState<number>(-1)

  // supply
  const [totalSupplyLayers, setTotalSupplyLayers] = React.useState<number>(-1)

  // top extra information
  const extraWeb3Info: ExtraInfoInterface[] = [
    {
      title: 'LAYERS on Opensea',
      value: 'View Here',
      isLink: true,
      link: {
        url: project?.eth?.opensea ?? '',
        title: 'LAYERS on Opensea',
      },
    },
    {
      title: 'Tears on Opensea',
      value: 'View Here',
      isLink: true,
      link: {
        url: LAYERS_LINKS.openseaTears,
        title: 'Tears on Opensea',
      },
    },
    {
      title: 'LAYERS Total Supply',
      value:
        totalSupplyLayers > -1
          ? totalSupplyLayers || 'Error Loading, Please Refresh'
          : 'Please connect wallet to view',
    },
    // {
    //   title: 'LAYERS Owned',
    //   value:
    //     balanceLayers > -1 ? balanceLayers : 'Please connect wallet to view',
    // },
    // {
    //   title: 'Alpha Tears Owned',
    //   value:
    //     balanceAlphaTears > -1
    //       ? balanceAlphaTears
    //       : 'Please connect wallet to view',
    // },
    // {
    //   title: 'Beta Tears Owned',
    //   value:
    //     balanceBetaTears > -1
    //       ? balanceBetaTears
    //       : 'Please connect wallet to view',
    // },
  ]

  // extra info wrapper
  const extraLayersInfo: ExtraInfoWrapperProps[] = [
    {
      type: 'top',
      content: extraWeb3Info,
    },
  ]

  // WEB3 GETTERS
  // layers
  const getLayersTotalSupply = async () => {
    try {
      const layersSupply = await layersRequest.getTotalSupply()
      setTotalSupplyLayers(layersSupply)
    } catch (err) {
      setTotalSupplyLayers(0)
    }
  }

  // const getLayersBalance = async (_address: string) => {
  //   try {
  //     const balance = await layersRequest.getBalanceOf(_address)
  //     setBalanceLayers(balance)
  //   } catch (err) {
  //     setBalanceLayers(0)
  //   }
  // }

  // tears
  // const getTearsBalance = async (_address: string) => {
  //   try {
  //     const tearsBalances = await tearsRequest.getBalanceOfBatch(
  //       _address,
  //       TEARS_TOKEN_IDS
  //     )
  //     setBalanceAlphaTears(tearsBalances[0])
  //     setBalanceBetaTears(tearsBalances[1])
  //   } catch (err) {
  //     setBalanceAlphaTears(0)
  //     setBalanceBetaTears(0)
  //   }
  // }

  // const resetWalletState = () => {
  //   setBalanceAlphaTears(-1)
  //   setBalanceBetaTears(-1)
  //   setBalanceLayers(-1)
  // }

  const reinstantiateContract = async () => {
    await layersRequest.reinstantiateContract()
    await tearsRequest.reinstantiateContract()
  }

  React.useEffect(() => {
    reinstantiateContract()
    getLayersTotalSupply()
  }, [])

  // React.useEffect(() => {
  //   if (account) {
  //     getLayersBalance(account)
  //     getTearsBalance(account)
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
      {map(BODY_CONTENT_LAYERS, (body: BodyContentProps, idx: number) => {
        return generateProjectBodyElement({
          body,
          project,
          key: idx,
          extraInfo: extraLayersInfo,
        })
      })}
    </div>
  )
}
