import textStyles from '../../Components/Text/Text.module.scss'
import projectStyles from '../../Project.module.scss'
import { Hyperlink } from '../../../../shared/components'
import { BodyContentProps } from '../../types'

export const LAYERS_LINKS: {
  [key: string]: string
} = {
  main: 'https://drp.io/drops/vhils',
  opensea: 'https://opensea.io/collection/drp-vhils',
  openseaTears: 'https://opensea.io/collection/drp-vhils-layers-tears',
  artistDRP: 'https://drp.io/artists/vhils',
  artist: 'https://vhils.com/',
}

export const BODY_CONTENT_LAYERS: BodyContentProps[] = [
  {
    type: 'top',
    props: {
      content: (
        <>
          <p>
            Artwork that evolves, is interactive and expresses itself, all
            revealed layer by layer.
          </p>

          <p>
            Portugese street artist Alexander Farto (Vhils) expresses his
            artistic language through portraits carved into walls and surfaces,
            revealing a story etched into the urban canvas of the mordern cities
            we live in.
          </p>

          {/* <p>
            His urban and regional inspired artwork can be seen all over Lisbon
            and some parts of the world, in various global exhibitions, and as
            of last year, the Ethereum Blockchain.
          </p>
           */}
          <p>
            In collaboration with DRP, a collection of generative NFT's (LAYERS)
            based on his billboard pieces was launched early 2022, where users
            are invited to be a part of the artistic process.
          </p>

          <p>
            Each NFT is an interactive billboard, starting fully covered,
            inviting the owner to optionally "tear" using one of two utility
            tear tokens.
          </p>

          <p>
            Various traits and glimpses of the artwork will be made visible with
            each tear, with three tears required to fully reveal the billboard
            artwork. Each LAYER and how it tears is unique and randomly set.
          </p>

          <p className={textStyles.nomargin}>
            My roles as a part of the development of this collection are:
          </p>
          <ul>
            <li>
              Lead Engineer from Project Conceptualisation up until the launch
              of Staking
            </li>
            <li>Building the scripts to generate all assets in Photoshop</li>
            <li>
              Engaging in discussions with clients on refining the process
            </li>
            <li>
              Managing team expectations and ensuring front and back-end
              requirements are met
            </li>
            <li>
              Collaborating on website building and integrating Web3 features
            </li>
          </ul>
        </>
      ),
    },
  },
  {
    type: 'topdown',
    props: {
      title: 'Peeling Back the Process',
      image: {
        placement: 'top',
        single: {
          src: 'images/projects/layers/layers-opensea-narrow-v2.jpg',
          alt: 'LAYERS Opensea',
          caption: 'Various LAYERS at different stages of tearing',
        },
      },
      content: (
        <>
          <p>
            The assembly process was the largest technical hurdle as unlike
            traditional component based random asset generation, extra post
            touch-up effects applied to each component. This was an artistic
            decision by the design team and the client to provide more realism
            and texture for each LAYER to be executed on Photoshop.
          </p>

          <p>
            Photoshop scripting does exist and runs on ExtendScript, based on
            ES3 JavaScript and in my opinion, writes like if you had C's
            compilation for JavaScript. However, Adobe's documentation on their
            own language was lacking and some functions/features of Photoshop
            can't be controlled programatically, limitations and functions of
            the language relative to requirements had to be figured out or
            innovated on the fly.
          </p>

          <p>
            In the end I developed a script that after setup, could run the
            assembley on Photoshop of multiple unique LAYERS with tweakable
            script parameters to generate any amount of LAYERS and all four of
            their states. This factors in random transformations of components
            such as scaling, rotation, translation and colour changes, which is
            also applied to the patterns of the tears as well.
          </p>

          <p>
            The randomisation resulted in some very interesting outputs which
            coupled with the amazing and intricate assets and design choices,
            gives us the variety of LAYERS, each with their own story to tell,
            reveal and discover amongst the collection.
          </p>
        </>
      ),
    },
  },
  {
    type: 'leftright',
    props: {
      className: projectStyles.smallmargin,
      title: 'Leadership, Management, Development',
      image: {
        placement: 'right',
        single: {
          src: 'images/projects/layers/layers-staking.jpg',
          alt: 'revealling page',
          caption: 'Exerpt of the staking section',
        },
      },
      content: (
        <>
          <p>
            Being also tasked with managing the team, I ensured that the team
            was familiar with the specifications required, translating them into
            hard technical requirements in the form of concepts, logic rules or
            actual pseudo-code and helping out when needed.
          </p>

          <p>
            This was applied during the development of various utilities related
            to LAYERS such as Revealling and Staking, where it was cruicial to
            confirm details and intricacies related to them especially Smart
            Contract logic related ones. As once deployed on-chain, it cannot be
            fixed unless redeployed due to the nature of the Blockchain.
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
            The flexibility and high level knowledge as a result of management
            helped me to identify tweaks, issues and imporvements that could be
            put forward as suggestions, and guiding and utilising the team
            towards understanding the client's requirements and vice versa.
          </p>
        </>
      ),
    },
  },
  {
    type: 'topdown',
    props: {
      title: 'Final Thoughts and Memories',
      image: {
        placement: 'top',
        single: {
          src: 'images/projects/layers/layers-jose.jpg',
          alt: 'layer individual view',
          caption: 'Exerpt of a section from the main site\'s artist section',
        },
      },
      content: (
        <>
          <p>
            I am proud to say that this project will be one of my favourite
            projects that I have been able to work on alongside talented
            individuals such as Vhils and his team. Would also like to take this
            space here to personally thank Alex from the DRP team whom I had
            worked alongside throughout the LAYERS project from
            conceptualisation, many fond memories have been shared and will
            remain.
          </p>

          <p></p>
          <p>
            With innovations such as discovering further ways to bring and
            create art with a higher level of detail and utility to the Web3
            space and making the seeming impossible possible, it was a pleasure
            to have been a part of the development process from
            conceptualisation. With best wishes personally to the project's
            ongoing developments and community.
          </p>

          <p className={textStyles.nomargin}>
            If you are interested in finding out more about the collection, you
            can visit these links below:
          </p>
          <ul>
            <li>
              <Hyperlink
                colour='var(--purple-10)'
                highlightColour='var(--purple-30)'
              >
                <a
                  href={LAYERS_LINKS.main}
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
                  href={LAYERS_LINKS.opensea}
                  target='_blank'
                  rel='noopener noreferrer'
                >
                  LAYERS on Opensea
                </a>
              </Hyperlink>
            </li>
            <li>
              <Hyperlink
                colour='var(--purple-10)'
                highlightColour='var(--purple-30)'
              >
                <a
                  href={LAYERS_LINKS.openseaTears}
                  target='_blank'
                  rel='noopener noreferrer'
                >
                  Tears on Opensea
                </a>
              </Hyperlink>
            </li>
            <li>
              <Hyperlink
                colour='var(--purple-10)'
                highlightColour='var(--purple-30)'
              >
                <a
                  href={LAYERS_LINKS.artist}
                  target='_blank'
                  rel='noopener noreferrer'
                >
                  Vhils' Artist Page
                </a>
              </Hyperlink>
            </li>
          </ul>
        </>
      ),
    },
  },
]
