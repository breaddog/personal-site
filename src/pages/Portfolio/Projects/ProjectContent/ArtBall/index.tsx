import artballStyles from './ArtBall.module.scss'
import styles from '../../Project.module.scss'
import React from 'react'
import classNames from 'classnames'

import { PROJECTS, ProjectObject } from '../../../../../data/projects'
import {
  ExtraInfoInterface,
  LeftRightProjectSection,
  TopDownProjectSection,
  TopProjectSection
} from '../../Components'
import { RequestFactory } from '../../../../../requests'
import {
  ARTBALL_22_CONTRACT_ADDRESS,
  ARTBALL_23_CONTRACT_ADDRESS
} from '../../../../../contracts'

interface ArtBallProjectProps {
  key?: string
}

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

  // balance
  const [balance22, setBalance22] = React.useState<number>(0)
  const [balance23, setBalance23] = React.useState<number>(0)
  // supply
  const [totalSupply22, setTotalSupply22] = React.useState<number>(0)
  const [totalSupply23, setTotalSupply23] = React.useState<number>(0)

  const classes = classNames(artballStyles.artball, styles.container)

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

  const getArtballBalances = async () => {
    try {
      const _balance22 = await artball22Request.getBalanceOf('')
      const _balance23 = await artball23Request.getBalanceOf('')
      setBalance22(_balance22)
      setBalance23(_balance23)
    } catch (err) {
      console.log(err)
    }
  }

  const extraWeb3Info: ExtraInfoInterface[] = [
    {
      title: 'Total Sold \'22:',
      value: `${totalSupply22}`,
    },
    {
      title: 'Total Sold \'23:',
      value: totalSupply23,
    },
    {
      title: 'Owned \'22:',
      value: balance22,
    },
    {
      title: 'Owned \'23:',
      value: balance23,
    },
  ]

  React.useEffect(() => {
    // getArtballTotalSupplies()
  }, [])
  return (
    <div
      className={classes}
      key={key}
    >
      <TopProjectSection
        project={project}
        extraInfo={extraWeb3Info}
      />
      <TopDownProjectSection
        project={project}
        imagePlacement='bottom'
      />

      <LeftRightProjectSection
        project={project}
        imagePlacement='left'
      />
    </div>
  )
}
