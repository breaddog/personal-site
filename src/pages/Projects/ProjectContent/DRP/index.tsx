import projectStyles from '../../Project.module.scss'
import textStyles from '../../Components/Text/Text.module.scss'
import { Hyperlink } from '../../../../shared/components'
import { BodyContentProps } from '../../types'

import { Link } from 'react-router-dom'
import { ROUTES } from '../../../../routes'
import { LAYERS_LINKS } from '../Layers/content'
import { SHINTARO_LINKS } from '../Shintaro/content'

export const DRP_LINKS: {
  [key: string]: string
} = {
  main: 'https://drp.gallery/',
  opensea: 'https://opensea.io/drp-engine',
  skeleton: 'https://opensea.io/collection/drp-skeletonkings',
}

export const BODY_CONTENT_DRP: BodyContentProps[] = [
  {
    type: 'top',
    props: {
      content: (
        <>
          <p>
            The frontier where contemporary art and technology of the future
            intersect.
          </p>

          <p>
            Founded in Melbourne by Alexander Mitchell (KOAN) and Elle
            Anastasiou (softbrutalist), DRP as a community driven platform
            strives to pioneer the integration of blockchain technology into
            artwork through ambitious multi-media projects in both physical and
            digital worlds.
          </p>

          <p>
            Since its inception, DRP has collaborated with many artists of
            various disciplines around the world such as Gary Baseman, Shintaro
            Kago, Vhils, Shohei Otomo, Lu Yang and of course themselves being
            artists as well.
          </p>
          <p>
            The majority of their projects called "drops" revolving around
            digital art and collectibles. They are also working in collaboration
            with Shintaro Kago to fund a movie fully funded by the sales of his
            NFT artworks.
          </p>

          <p>
            During my tenure at Pellar, under a partnership with DRP I had
            worked in collaboration on many projects since 2021 assuming
            multiple roles and responsibilities.
          </p>

          <p className={textStyles.nomargin}>
            Some of those roles are as follows:
          </p>
          <ul>
            <li>Lead Engineer</li>
            <li>Project Planning and Management</li>
            <li>Client Liasoning</li>
            <li>Website Development</li>
            <li>Backend Server and API Development</li>
            <li>Asset Engineering and Deployment</li>
            <li>Server Development and Handling</li>
            <li>Customer Support and Service</li>
            <li>Smart Contract Development</li>
            <li>Quality Control</li>
          </ul>
        </>
      ),
    },
  },
  {
    type: 'leftright',
    props: {
      title: 'Community Driven, Artistic Inspired',
      image: {
        placement: 'right',
        single: {
          src: '/images/projects/drp/drp-shintaro.jpg',
          alt: 'shintaro kago page',
          caption: 'Artist page of Shintaro Kago',
        },
      },
      content: (
        <>
          <p>
            Each project with an artist under DRP is called a "drop" which
            promotes the sales of a digital art collection, usually in the form
            of an ERC721 or ERC1155 token. A bespoke website is either designed
            by the DRP team or based on a requested design will be used and
            hooked to a smart contract on the Ethereum blockchain.
          </p>

          <p>
            Through that as the lead engineer and project manager, I would
            through DRP understand the requirements on a higher level,
            encompassing the front-end, back-end, smart contract and sale
            mechanics that were pre-discussed and relaying said requirements to
            team members in the form of either pseudo-code, logic diagrams or
            concisely written documentation.
          </p>

          <p>
            An example would be going through with the client on sale
            requiements such as whitelists, sales prices, quantity and sales
            windows, as we would need to also reflect that on all aspects of the
            platform (web, server, smart contract). With the smart contract
            aspect being the most important and what we usually synchronise with
            as any value on-chain is usually taken to be the most trustworthy.
          </p>

          <p>
            From a coding perspective, I would mostly be flexible across all
            ends of the project, helping out wherever required but mainly on
            client liasoning, front-end website building and integration, asset
            management (images handling etc...) and automated deployments.
          </p>
        </>
      ),
    },
  },
  {
    type: 'text',
    props: {
      content: (
        <>
          <p>
            This high level understanding ensures that any issues in design,
            logic or behaviour will be caught and fixed before presenting for
            feedback, whilst also ensuring the main aestethic and vision of the
            project stays true.
          </p>
          <p>
            Under this partnership and process, I have enagaged and assisted in
            developing, launching and maintaining multiple projects from various
            artists that are well received by the communities represented by
            them and within the DRP circle, forming a strong community and
            welcoming new curators to the platform. Below you can find some
            examples of projects that I find to be of noteworthiness where I had
            a hand on:
          </p>
        </>
      ),
    },
  },
  {
    type: 'header',
    props: {
      content: 'Brief Explainers',
    },
  },
  {
    type: 'text',
    props: {
      content: (
        <>
          <p>
            Some short explainers to highlight notable contributions during my
            time being partnered with DRP under Pellar.
          </p>
        </>
      ),
    },
  },
  {
    type: 'leftright',
    props: {
      image: {
        placement: 'left',
        single: {
          src: '/images/projects/layers/layers.jpg',
          alt: 'layers',
          caption: 'LAYERS by Vhils, released in partnership with DRP',
        },
      },
      content: (
        <>
          <h3>
            <b>LAYERS</b>
          </h3>

          <p>
            An interactive billboard artwork NFT project that evolves and has
            various utility. Done in collaboration with Portugese street artist
            Vhils. I contributed towards the development of the site, planning
            of the functional component of the artwork, R&D and script building
            for the artwork, team management and client liasoning.
            <br />
            <ul>
              <li>
                <Hyperlink>
                  <Link to={`${ROUTES.projects.parentPath}/vhils`}>
                    Project Article on this site
                  </Link>
                </Hyperlink>
              </li>
              <li>
                <Hyperlink>
                  <Link to={LAYERS_LINKS.main}>Official LAYERS Site</Link>
                </Hyperlink>
              </li>
              <li>
                <Hyperlink>
                  <Link to={LAYERS_LINKS.artistDRP}>
                    Project Article on this site
                  </Link>
                </Hyperlink>
              </li>
              <li>
                <Hyperlink>
                  <Link to={LAYERS_LINKS.opensea}>LAYERS on Opensea</Link>
                </Hyperlink>
              </li>
            </ul>
          </p>
        </>
      ),
    },
  },
  {
    type: 'leftright',
    props: {
      image: {
        placement: 'left',
        single: {
          src: '/images/projects/shintaro/shintaro-eroguro.jpg',
          alt: 'shintaro kago',
          caption: 'Various drops under the Ero Guro artist Shintaro Kago',
        },
      },
      content: (
        <>
          <h3>
            <b>Shintaro Kago</b>
          </h3>

          <p>
            An interactive billboard artwork NFT project that evolves and has
            various utility. Done in collaboration with Portugese street artist
            Vhils. I contributed towards the development of the site, planning
            of the functional component of the artwork, R&D and script building
            for the artwork, team management and client liasoning.
            <br />
            <ul>
              <li>
                <Hyperlink>
                  <Link to={`${ROUTES.projects.parentPath}/vhils`}>
                    Project Article on this site
                  </Link>
                </Hyperlink>
              </li>
              <li>
                <Hyperlink>
                  <Link to={LAYERS_LINKS.main}>Official LAYERS Site</Link>
                </Hyperlink>
              </li>
              <li>
                <Hyperlink>
                  <Link to={LAYERS_LINKS.artistDRP}>
                    Project Article on this site
                  </Link>
                </Hyperlink>
              </li>
              <li>
                <Hyperlink>
                  <Link to={LAYERS_LINKS.opensea}>LAYERS on Opensea</Link>
                </Hyperlink>
              </li>
            </ul>
          </p>
        </>
      ),
    },
  },
  {
    type: 'leftright',
    props: {
      image: {
        placement: 'left',
        single: {
          src: '/images/projects/drp/drp-synthia.jpg',
          alt: 'synthia',
          caption:
            'An NFT Collection revolving around a stable diffusion art bot on Discord called Synthia',
        },
      },
      content: (
        <>
          <h3>
            <b>Synthia</b>
          </h3>
          <p>
            Synthia is an AI artist bot on Discord that produces art based off
            prompts using a stable diffusion, and is trained using a natural
            language GPT model. This NFT collection aims to fund the improvement
            of her capabilities and provide exclusive benefits and early access
            to holders and partners. I was involved in the asset generation,
            site building, web3 integration and deployment of the project.
            <br />
            <ul>
              <li>
                <Hyperlink>
                  <a
                    href={'https://drp.io/drops/synthia'}
                    target='_blank'
                    rel='noopener noreferrer'
                  >
                    Mint Page
                  </a>
                </Hyperlink>
              </li>
              <li>
                <Hyperlink>
                  <a
                    href={'https://discord.com/invite/meetsynthia'}
                    target='_blank'
                    rel='noopener noreferrer'
                  >
                    Synthia's Discord Server: Synthetic Playground
                  </a>
                </Hyperlink>
              </li>
              <li>
                <Hyperlink>
                  <a
                    href={'https://opensea.io/collection/synthia'}
                    target='_blank'
                    rel='noopener noreferrer'
                  >
                    Founders Edition on Opensea
                  </a>
                </Hyperlink>
              </li>
              <li>
                <Hyperlink>
                  <a
                    href={'https://opensea.io/collection/synthia-society'}
                    target='_blank'
                    rel='noopener noreferrer'
                  >
                    Synthia Society on Opensea
                  </a>
                </Hyperlink>
              </li>
            </ul>
          </p>
        </>
      ),
    },
  },
  {
    type: 'header',
    props: {
      content: 'Epiphanys, Improvements, Developments',
    },
  },
  {
    type: 'leftright',
    props: {
      image: {
        placement: 'right',
        single: {
          src: '/images/projects/drp/drp-profile.jpg',
          alt: 'drp profile page',
          caption:
            'Profile page on DRP showing collections released in collaboration',
        },
      },
      content: (
        <>
          <p>
            Initially coming from a pure computer science and web developer
            background, the world of art seemed very new and foreign to me,
            going with a standard "requirements in, product out" without any
            kind of thought to their meaning, thoughts or concept.
          </p>

          <p>
            However through the various projects and overtime exposure to the
            inner understandings/thinkings of the clients and their projects, an
            ephiphany hit in a new method of creative expression, creativity
            through UI/UX inspired by the main artwork(s) and being able to
            convey that through the medium of code.
          </p>

          <p>
            Through the requirements, specifications and feedback provided, much
            appreciated insight was provided allowing for a more personalised
            and engaging development process. This encouraged me to also try and
            get the client as informed and involved in the design process,
            offering advice and opinions on feasibilities wherever applicable to
            ensure that the products are to standard.
          </p>
        </>
      ),
    },
  },
  {
    type: 'header',
    props: {
      content: 'Afterthoughts and Reflections',
    },
  },
  {
    type: 'text',
    props: {
      content: (
        <>
          <p>
            I would like to first take a moment to give my utmost thanks and
            appreication towards the creative minds at DRP, Alex and Elle. Being
            one of the first few client's that I have worked with, there has
            been nothing but professionalism and shared mutual interest towards
            a successful collection launch along with great memories, hardships
            and celebrations shared. I am glad to have been able to been a part
            of the team that in partnership, brought many innovate and
            collaborative collections that pioneered in the art and web3 spheres
            of influence. Wishing nothing but the best you guys!
          </p>
          <p>To view more about DRP, there are a few links below:</p>
          <ul>
            <li>
              <span>Main Site:</span>
              &nbsp;
              <Hyperlink>{DRP_LINKS.main}</Hyperlink>
            </li>
            <li>
              <span>Opensea Profile:</span>
              &nbsp;
              <Hyperlink>{DRP_LINKS.opensea}</Hyperlink>
            </li>
            <li>
              <span>The Halls of Skeleton Kings by KOAN:</span>
              &nbsp;
              <Hyperlink>{DRP_LINKS.skeleton}</Hyperlink>
            </li>
          </ul>
        </>
      ),
    },
  },
]
