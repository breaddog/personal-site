import { Hyperlink } from '../../../../shared/components'
import { BodyContentProps } from '../../types'

export const REDVILLAGE_LINKS: {
  [key: string]: string
} = {
  main: 'https://theredvillage.com',
  opensea: 'https://opensea.io/collection/theredvillagechampions',
  openseaSummon: 'https://opensea.io/collection/theredvillagesummonedchampions',
  hawku:
    'https://trv.hawku.com/c/trv/trv_champion?selected_mode=grid&selected_tab=listings',
}

export const BODY_CONTENT_REDVILLAGE: BodyContentProps[] = [
  {
    type: 'top',
    props: {
      content: (
        <>
          <p>Blood is Coming.</p>
          <br />
          <p>
            The Red Village (TRV) is a dark-fantasy themed turn-based battle
            arena game on Polygon where characters (champions) battle until a
            victor is determined. Each champion is represented by an NFT and is
            randomly generated, categorised by five different classes as of the
            time this article is written.
          </p>
          <br />
          <p>
            The game is play and earn, revolving around building one's barracks
            to be the strongest with champions to participate in tournaments
            held in various arenas to win prizes. Players either pay an entry
            fee in WETH to enter their champions into tournaments to win a
            portion of the prize pool, participate in a free tournament or a 1v1
            "To The Death" challenge.
          </p>
          <br />
          {/* <p>
          By entering tournaments, a champion's battle class and win rate can be increased, allowing them to enter higher tiered tournaments with higher prize pools
          and other tournaments with specific entry requirements. In the case of 1v1's this would affect a champion's ranking ELO.
        </p>
        <br /> */}
          <p>
            There is also a champion breeding system called summoning where
            champions breed during a "summoning cycle" to produce a summoned
            champion. Allowing for the summoning of a new champion with
            desirable battle traits and statistics.
          </p>
          <br />
          <p>
            My roles as a part of the development of the game from initial
            stages until Summoning are:
          </p>
          <ul>
            <li>Front-end engineer assisting with site updates</li>
            <li>
              Team managment and project-specification planner based on
              requirements
            </li>
            <li>Platform and game maintenance</li>
            <li>Lead engineer assisting with third-party integrations</li>
            <li>Integration Web3 Components and Game into Front-end</li>
            <li>CI/CD deployments</li>
            <li>Asset uploading and management</li>
            <li>Testing and Quality Control of new features</li>
          </ul>
        </>
      ),
    },
  },
  {
    type: 'header',
    props: {
      content: 'Devloping a Strong Rubust Platform',
    },
  },
  {
    type: 'imagemulti',
    props: {
      image: {
        multi: [
          {
            src: '/images/projects/redvillage/redvillage-classes.png',
            alt: 'redvillage champion classes',
            caption:
              'Champions can either be a Wizard, Paladin, Barbarian, Ranger or Druid',
          },
          {
            src: '/images/projects/redvillage/redvillage-tournament.png',
            alt: 'redvillage tournament classes',
            caption: 'A screenshot showing gameplay via the tournaments page',
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
            We worked with the team over at TRV to help them develop, integrate
            and refine the hard logic behind tournaments and UI/UX designs into
            reality. These came with their own set of challenges as most of the
            game information had to be on-chain, meaning that an entirely new
            and innovative game logic system had to be developed to achieve
            those goals. A support system was also made available to aid with
            more technical matters related to the game, providing robust system
            with clear information and support available overtime in the event
            of downtimes or network issues.
          </p>
          <br />
          <p>
            A part I played was team manager, helping with extrapolation and
            transposing of the client's specifications into hard development
            requirements at a high level of understanding. With roles such as
            directing the development team on the right path via either
            psuedo-code or logic diagrams and examples whilst also assisting in
            various coding aspects from front-end, back-end and smart contract
            development. This high level of understanding allowed me to have a
            greater overview of progress and to solve or identify logic issues
            to present to and provide solutions to the clients, ensuring a
            transparent and accurate development cycle.
          </p>
          <br />
          <p>
            This was cruicial during the development of the "Summoning" feature
            of the game, where an entirely new system with multiple working
            components had to be planned out, tested and implemented. Many
            innovations in blockchain gaming were made by shifting most of the
            information and logic on chain wherever possible, requiring a vastly
            different way of planning and thinking. With the team's sheer effort
            and contributions over an intense development period and an
            unfortunate release delay for the sake of quality, we were able to
            iron out all details and logic on all fronts and work towards a well
            recieved launch.
          </p>
          <br />
          <p>
            Another notable challenge core to the platform was the integration
            of the game client, website and web3 components. To simply put it
            "Imagine integration with extra steps and a hurdle". We managed to
            with the coordination of the game developers come to a solution that
            allows for smooth game playback of current and past tournaments,
            making the foundation of the game a reality.
          </p>
        </>
      ),
    },
  },
  {
    type: 'topdown',
    props: {
      title: 'Building the Main Platform',
      image: {
        placement: 'top',
        single: {
          src: '/images/projects/redvillage/redvillage-barracks.png',
          alt: 'redvillage hawku',
          caption: 'Example page showing one Player\'s Barracks',
        },
      },
      content: (
        <>
          <p>
            Alongside logic building, simultaneous development of the website
            was also executed as being one of the other crucial aspect of the
            platform, without an interface, the game of course could not be
            played and blood will not be shed.
          </p>
          <br />
          <p>
            We took key wireframes and translated them into functional
            components, providing suggestions and tweaks that improve on UI/UX
            whilst being true to the TRV design and philosophy. Whilst appearing
            to be standard front-end development, the challenges would arise
            during integration of backend logic, on-chain components and third
            party elements all together to work synchronously. Alongisde this,
            concise documentation also had to be prepared for third party
            platforms that would like to feature/interact with the game as it
            strives towards mainstream blockchain gaming popularity.
          </p>
        </>
      ),
    },
  },
  {
    type: 'header',
    props: {
      content: 'Afterwords and Thoughts',
    },
  },
  {
    type: 'imagemulti',
    props: {
      title: 'Strengthening, Refining, Training',
      image: {
        multi: [
          {
            src: '/images/projects/redvillage/redvillage-hawku.png',
            alt: 'redvillage hawku',
            caption: 'The official TRV Marketplace on Hawku',
          },
          {
            src: '/images/projects/redvillage/redvillage-champion.png',
            alt: 'champion preview',
            caption:
              'Statistics for the Champion "Swiftfury" on the champion preview page',
          },
        ],
      },
      content: <></>,
    },
  },
  {
    type: 'text',
    props: {
      content: (
        <>
          <p>
            I personally learnt a lot about UI/UX through these implementations
            as games require concise, easy to understand and fool proof
            interfaces, interactions and messaging. Being able to develop and
            present these concepts and bringing them into reality made me
            understand the ideas of prominence, simplicity and "make it
            straightforward" philosophy which I strive to carry forward in any
            development project I participate in.
          </p>
          <br />
          <p>
            Besides also honing my developer skills, it also taught me valuable
            lessons in team, client and community management, mostly on the
            communication aspect where keeping them informed of technical
            challenges whilst also providing solutions improves transparency,
            allowing mutual understandings to arise in development as we all
            strive to push the envelope on what's feasible. This would not have
            been possible without the higher level understanding, knowledge and
            input from the team.
          </p>
          <br />
          <p>
            Even though the game is about 1 year in, I believe that TRV will
            become one of the faces of blockchain gaming not only innovation
            wise but community management wise. They are if not one of the best
            gaming community out there, promoting competitiveness, achievements
            and outreach to foster a healthy and strong environment.
          </p>
          <br />
          <p>
            A massive shoutout to Lucien, Matan and Brendo and wishing the TRV
            team all the best with future updates and endeavours.
          </p>
          <p>More information related to The Red Village can be found below:</p>
          <ul>
            <li>
              <span>Main Site:</span>
              &nbsp;
              <Hyperlink>
                <a
                  href={REDVILLAGE_LINKS.main}
                  target='_blank'
                  rel='noopener noreferrer'
                >
                  {REDVILLAGE_LINKS.main}
                </a>
              </Hyperlink>
            </li>
            <li>
              <span>The Red Village Champions on Opensea:</span>
              &nbsp;
              <Hyperlink>
                <a
                  href={REDVILLAGE_LINKS.opensea}
                  target='_blank'
                  rel='noopener noreferrer'
                >
                  {REDVILLAGE_LINKS.opensea}
                </a>
              </Hyperlink>
            </li>
            <li>
              <span>The Red Village Summoned Champions on Opensea:</span>
              &nbsp;
              <Hyperlink>
                <a
                  href={REDVILLAGE_LINKS.openseaSummon}
                  target='_blank'
                  rel='noopener noreferrer'
                >
                  {REDVILLAGE_LINKS.openseaSummon}
                </a>
              </Hyperlink>
            </li>
            <li>
              <span>Official Marketplace:</span>
              &nbsp;
              <Hyperlink>
                <a
                  href={REDVILLAGE_LINKS.hawku}
                  target='_blank'
                  rel='noopener noreferrer'
                >
                  {REDVILLAGE_LINKS.hawku}
                </a>
              </Hyperlink>
            </li>
          </ul>
        </>
      ),
    },
  },
]
