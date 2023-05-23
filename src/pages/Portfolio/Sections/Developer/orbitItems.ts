import htmlSVG from '../../../../assets/logos/html.svg'
import cssSVG from '../../../../assets/logos/css.svg'
import jsSVG from '../../../../assets/logos/js.svg'
import tsSVG from '../../../../assets/logos/ts.svg'
import reactSVG from '../../../../assets/logos/react.svg'
import nodejsSVG from '../../../../assets/logos/nodejs-icon.svg'
import npmSVG from '../../../../assets/logos/npm.svg'
import s3SVG from '../../../../assets/logos/s3.svg'
import codebuildSVG from '../../../../assets/logos/codebuild.svg'
import codepipelineSVG from '../../../../assets/logos/codepipeline.svg'
import ethSVG from '../../../../assets/logos/eth.svg'
import githubSVG from '../../../../assets/logos/github.svg'
import userSVG from '../../../../assets/icons/user.svg'

export interface OrbitItemProps {
  src: string
  alt: string
  type: string
}
export const ORBIT_ITEMS: OrbitItemProps[] = [
  {
    src: htmlSVG,
    alt: 'html',
    type: 'language',
  },
  {
    src: cssSVG,
    alt: 'css',
    type: 'language',
  },
  {
    src: jsSVG,
    alt: 'javascript',
    type: 'language',
  },
  {
    src: tsSVG,
    alt: 'typescript',
    type: 'language',
  },
  {
    src: reactSVG,
    alt: 'react',
    type: 'web dev',
  },
  {
    src: nodejsSVG,
    alt: 'nodejs',
    type: 'web dev',
  },
  {
    src: npmSVG,
    alt: 'npm',
    type: 'web dev',
  },
  {
    src: s3SVG,
    alt: 'aws s3',
    type: 'storage',
  },
  {
    src: codebuildSVG,
    alt: 'codebuild',
    type: 'ci/cd',
  },
  {
    src: codepipelineSVG,
    alt: 'codepipeline',
    type: 'ci/cd',
  },
  {
    src: ethSVG,
    alt: 'solidity (eth)',
    type: 'web3',
  },
  {
    src: githubSVG,
    alt: 'git/github',
    type: 'source ctrl',
  },
  {
    src: userSVG,
    alt: 'tien',
    type: 'developer',
  },
]
