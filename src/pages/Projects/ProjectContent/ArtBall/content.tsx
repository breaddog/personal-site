import textStyles from '../../Components/Text/Text.module.scss'
import { map } from 'lodash'
import { Hyperlink } from '../../../../shared/components'
import { BodyContentProps } from '../../types'
import { capitaliseText } from '../../../../shared'

export const ARTBALL_LINKS: {
  [key: string]: string
} = {
  main: 'https://ao.artball.io',
  opensea: 'https://opensea.io/collection/ao-artball',
  matchpoints: 'https://ao-2023-matchpoints.artball.io',
  groundpass: 'https://ao-2023.groundpass.artball.io/',
}

export const BODY_CONTENT_ARTBALL: BodyContentProps[] = [
  {
    type: 'top',
    props: {
      content: (
        <>
          <p>
            PLAY BALL! The ArtBall Project is a yearly NFT Art Project tie in
            with the Australian Open (AO) since 2022 that aims to link live
            court data with uniquely generated artistic tennis styled balls in
            display cases that exist on the Ethereum Blockchain throughout the
            two-week event.
          </p>

          <p>
            Each ArtBall assigned randomly to 1 of 9230 unique plots on a
            virtual tennis court. Winning shots that land on a given plot each
            round determined by HawkEye trajectory data will be assigned a
            "sticker" and match information. This data is updated daily
            throughout the event, usually staggered by a day to account for data
            processing.
          </p>

          <p>My role in the two years of the ArtBall project was to:</p>
          <ul>
            <li>
              Assemble the intial instances of ArtBalls using the assets
              provided
            </li>
            <li>
              Update the ArtBalls with processed match data programatically to
              be reflected on chain
            </li>
            <li>
              Build and develop websites associated with the project (e.g. Match
              points, Main Site, ArtBall Ticket Redemption...)
            </li>
            <li>
              Communicate and work with the clients on hard/soft requirements
              and update on progress
            </li>
            <li>
              Manage and keep the team informed to ensure the event runs
              smoothly and targets are met
            </li>
          </ul>
        </>
      ),
    },
  },
  {
    type: 'topdown',
    props: {
      title: 'Asset Generation',
      content: (
        <>
          <p>
            The script that was used to generate the assets was fully built with
            modularity and variability in mind, with the process being fully
            automated for all initial 6776 ArtBalls for the AO22, and 9230
            ArtBalls for AO23.
          </p>

          <p>
            This allowed for customisability and more importantly, a streamlined
            and extendable process of updating ArtBalls associated with winning
            plots by adding stickers or frame changes once the data is avaialble
            to be processed (see above image for examples).
          </p>

          <p>
            Metadata for each ArtBall is also enriched with information from
            each winning match point on each update, allowing for a correlation
            between each ArtBall/Plot and a live match played during the event.
            Such information can be correlated/queried on the{' '}
            <Hyperlink
              colour='var(--purple-10)'
              highlightColour='var(--purple-30)'
            >
              <a
                href={ARTBALL_LINKS.matchpoints}
                rel='noopener noreferrer'
                target='_blank'
              >
                Official ArtBall Matchpoints Site.
              </a>
            </Hyperlink>{' '}
          </p>
        </>
      ),
      image: {
        placement: 'top',
        single: {
          src: '/images/projects/artball/artball-opensea-v1.jpg',
          alt: 'artball opensea collection',
          caption: 'Opensea showcase of the ArtBall collection',
        },
      },
    },
  },
  {
    type: 'leftright',
    props: {
      title: 'Building the Website(s)',
      content: (
        <>
          <p>
            My involvement was not only limited to assets but also being a part
            of the team that built the websites for the AO23 event. Being tasked
            as the lead engineer and project manager, this was a big test
            towards my coding and management skills.
          </p>

          <p className={textStyles.nomargin}>
            For AO23 we had a few requirements which included websites to:
          </p>
          <ul className={textStyles.margin}>
            <li>Redeem groundpasses to the event for AO22 ArtBall Owners.</li>
            <li>Serve as the main event/minting page for the AO23.</li>
            <li>
              Show all ArtBalls and their associated match data from the event.
            </li>
          </ul>
        </>
      ),
      image: {
        placement: 'right',
        single: {
          src: '/images/projects/artball/artball-matchpoints.jpg',
          alt: 'artball opensea collection',
          caption: 'Sample screenshot of the MatchPoints site',
        },
      },
    },
  },
  {
    type: 'text',
    props: {
      content: (
        <>
          <p>
            These all came with their own technical challenges and difficulties,
            with the most difficult being the Matchpoints site, as we had to
            integrate the site with both Web3 data and a unity plugin. This had
            to be done to allow for a unique experience to view the trajectory
            of the winning shot taken from HawkEye data and its corresponding
            ArtBall with match information.
          </p>
          <p>
            Besides that technical hurdle which we had to solve, we also had the
            privilleage of working on the aformentioned redemption page and main
            mint page. As the lead engineer, this empowered me to strategise and
            discuss with my team members on server and front-end requirements,
            evolving and enhancing proposals into a streamlined process that
            abided by the hard requirements set out by the client.
          </p>

          <p>
            Active care was given to ensuring the client and developers were
            kept on the same page through active updates and discussions,
            resulting in a more refined product.
          </p>
        </>
      ),
    },
  },
  {
    type: 'imagemulti',
    props: {
      image: {
        multi: [
          {
            src: '/images/projects/artball/artball-groundpass.jpg',
            alt: 'artball groundpass site',
            caption: 'Ground Pass Redemption Site',
          },
          {
            src: '/images/projects/artball/artball-main-3.jpg',
            alt: 'artball main site ticket',
            caption: 'AO23 ArtBall main site section',
          },
        ],
      },
    },
  },
  {
    type: 'header',
    props: {
      content: 'Final Thoughts and Links',
    },
  },
  {
    type: 'text',
    props: {
      content: (
        <>
          <p>
            In the end given everyone's herculean effort, we managed to pull off
            two AO ArtBall events with many new innovations and things learnt
            along the way.
          </p>

          <p>
            Personally this project will always be one that I am happy to
            discuss about as not only does it highlight the first marraige of
            live sports data and the Ethereum Blockchain, but also from the
            innovations made along the way which were innovated and developed
            alongside the team. I will always be grateful to have been given the
            opportunity to work alongside great inviduals as a part of one of
            the four Grand Slams in the tennis world.
          </p>
          <p className={textStyles.nomargin}>
            You can find the links to each of the sites below:
          </p>
          <ul>
            <li>
              <Hyperlink
                colour='var(--purple-10)'
                highlightColour='var(--purple-30)'
              >
                <a
                  href={ARTBALL_LINKS.main}
                  target='_blank'
                  rel='noopener noreferrer'
                >
                  Main Site
                </a>
              </Hyperlink>
            </li>
            <li>
              <Hyperlink
                colour='var(--purple-10)'
                highlightColour='var(--purple-30)'
              >
                <a
                  href={ARTBALL_LINKS.opensea}
                  target='_blank'
                  rel='noopener noreferrer'
                >
                  Opensea Page
                </a>
              </Hyperlink>
            </li>
            <li>
              <Hyperlink
                colour='var(--purple-10)'
                highlightColour='var(--purple-30)'
              >
                <a
                  href={ARTBALL_LINKS.matchpoints}
                  target='_blank'
                  rel='noopener noreferrer'
                >
                  Matchpoints Site
                </a>
              </Hyperlink>
            </li>
            <li>
              <Hyperlink
                colour='var(--purple-10)'
                highlightColour='var(--purple-30)'
              >
                <a
                  href={ARTBALL_LINKS.groundpass}
                  target='_blank'
                  rel='noopener noreferrer'
                >
                  Ground Pass Site
                </a>
              </Hyperlink>
            </li>
          </ul>
        </>
      ),
    },
  },
]
