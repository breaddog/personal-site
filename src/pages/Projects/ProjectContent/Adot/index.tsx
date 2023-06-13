import textStyles from '../../Components/Text/Text.module.scss'
import { BodyContentProps } from '../../types'
import { Hyperlink } from '../../../../shared/components'

export const ADOT_LINKS: {
  [key: string]: string
} = {
  main: 'https://adotmarketplace.io',
  crown: 'https://crowntoken.io',
}

export const BODY_CONTENT_ADOT: BodyContentProps[] = [
  {
    type: 'top',
    props: {
      content: (
        <>
          <p>
            A NFT marketplace hub that provides boundless possibilities,
            utilities and crowd participation, connecting IPs, digital &
            entertainment media and technologies to the metaverse.
          </p>
          <p>
            Launched by Thailand's leading entertainment company T&B Media
            Global and developed by VUCA Digital in partnership with Pellar,
            ADOT Marketplace and its utility token Crown Token aims to diversify
            and develop an ecosystem for individuals and brands to improve their
            utility and connect with the Metaverse via NFT's. This also includes
            their own metaverse, Translucia which is currently in development.
          </p>
          <p>
            Through ADOT Marketplace, users will be able to view/list
            collections and buy/sell NFT's. Besides this, through Crown Tokens
            they will be able to participate in the ecosystem by vote on topics
            using their tokens as "voting power" or stake them for incentives
            and rewards, alongside receiving airdrops and other privelleages.
          </p>
          <p className={textStyles.nomargin}>
            During my tenure at Pellar, I was involved in the development of
            ADOT Marketplace and Crown Token in the following ways:
          </p>
          <ul>
            <li>Building bespoke components for the website</li>
            <li>Assisting with development of Admin related systems</li>
            <li>Client Liaisoning and Project Management</li>
            <li>
              Systems planing and development based on business requirements
            </li>
            <li>Smart contract development</li>
            <li>Team management and proritisation</li>
          </ul>
        </>
      ),
    },
  },
  {
    type: 'topdown',
    props: {
      title: 'Responsibilities and Innovations',
      image: {
        placement: 'top',
        single: {
          src: 'images/projects/adot/adot-roadmap.jpg',
          alt: 'adot roadmap',
          caption: 'Roadmap taken from the Adot Marketplace site',
        },
      },
      content: (
        <>
          <p>
            Most of the development was done in tandem with the input from the
            team at VUCA Digital. My role in the team under Pellar was to help
            co-ordinate and understand the hard requirements provided by the
            clients from a high level and extrapolate that into set technical
            specifications for the team, often acting as a representative of the
            developers from Pellar.
          </p>
          <p>
            In practice, this meant that I had full visibility over and
            contributed towards not only the website, but also some server side,
            admin and smart contract components as well, assisting with
            questions and clarifying requirements wherever needed, and most
            importantly keeping the clients informed with progress whilst being
            receptive to feedback.
          </p>
          <p>
            Naturally with such a complex system, we had our fair share of
            challenges but managed to overcome them through multiple
            discussions, brainstorming sessions with my team members and
            proposals/suggestions that were vetted and approved by the VUCA
            Digital team. We designed this with expandability and accomodation
            in mind, as the platform is still new and growing.
          </p>
          <p>
            One particular example was surrounding the staking system on the
            ADOT website, generally with staking mutliple factors had to be
            encounted for such as growth overtime, annual percentage rate and
            most importantly how to accurately keep track of staking periods and
            reward calculations. We managed to developed a fully on-chain
            staking smart contract that operates by block, requires less gas on
            stake/unstake and keeps itself mostly up to date. In a nutshell,
            allowing for an autonomous staking solution on-chain that can be
            adapted to multiple reward token types and time periods on the ADOT
            marketplace platform.
          </p>
        </>
      ),
    },
  },
  {
    type: 'header',
    props: {
      content: 'Afterthoughts',
    },
  },
  {
    type: 'imagemulti',
    props: {
      image: {
        multi: [
          {
            src: 'images/projects/adot/adot-staking.jpg',
            alt: 'adot staking',
            caption: 'Staking section of the ADOT Marketplace site',
          },
          {
            src: 'images/projects/adot/adot-voting.jpg',
            alt: 'adot voting',
            caption:
              'Voting section where users can vote on topics related to anything',
          },
        ],
      },
    },
  },
  {
    type: 'text',
    props: {
      content: (
        <>
          <p>
            I'll admit its not everyday you get to work with such large clients
            at this level, and it was a humbling experience and honour being a
            part of the team that played a part in building an up and coming,
            revolutionary platform with great promise like this. What's even
            greater was being able to meet some of these individuals in person
            in Bangkok, as they all are very innovative, passionate and
            professional personalities that are great to be around.
          </p>
          <p>
            Although development was challenging and we had to build everything
            from the ground up, we viewed these as opportunities to show off our
            skillset and team synergy, keeping an open mind not only to
            suggestions but also alternatives that could enhance any aspect of
            the platform, show-casing the engineering prowess we had on our
            side.
          </p>
          <p className={textStyles.nomargin}>
            Links to the relevant sites and pages can be found below:
          </p>
          <ul>
            <li>
              <Hyperlink>
                <a
                  href={ADOT_LINKS.main}
                  target='_blank'
                  rel='noopener noreferrer'
                >
                  ADOT Marketplace
                </a>
              </Hyperlink>
            </li>
            <li>
              <Hyperlink>
                <a
                  href={ADOT_LINKS.crown}
                  target='_blank'
                  rel='noopener noreferrer'
                >
                  Crown Token Site
                </a>
              </Hyperlink>
            </li>
          </ul>
        </>
      ),
    },
  },
]
