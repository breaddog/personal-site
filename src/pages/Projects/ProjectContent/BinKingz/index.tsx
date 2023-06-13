import projectStyles from '../../Project.module.scss'
import textStyles from '../../Components/Text/Text.module.scss'
import { Hyperlink } from '../../../../shared/components'
import { BodyContentProps } from '../../types'

export const BINKINGZ_LINKS: {
  [key: string]: string
} = {
  main: 'https://binkingz.com',
  opensea: 'https://opensea.io/collection/binkingz',
  artist: 'https://scottmarsh.com.au/',
}

export const BODY_CONTENT_BINKINGZ: BodyContentProps[] = [
  {
    type: 'top',
    props: {
      content: (
        <>
          <p>
            The Ibis Bird, also known colloquially as the "Bin Chicken". From
            pecking around your bins to now fabulously dressed out in the
            Metaverse and unapologetically Aussie.
          </p>

          <p>
            Syndey based grafitti artist Scott Marsh launched this project based
            around Australia's most known avian (outsite of KFC), giving each
            Bin Chicken or "Bin King" a unique randomly generated look with
            unique traits.
          </p>

          <p>
            The project also had a tie in with a local beer company to produce a
            limited run edition of a fruity-tasting beer dubbed, you guessed it.
            Bin Juice.
          </p>

          <p>The main roles I contributed towards the collection are:</p>
          <ul>
            <li>
              Lead team on site-rework as front-end lead and project manager.
            </li>
            <li>
              Developed and built bespoke animations/components for the
              site-rework.
            </li>
          </ul>
        </>
      ),
    },
  },
  {
    type: 'topdown',
    props: {
      title: 'Livid with Animations',
      className: projectStyles.small,
      content: (
        <>
          <p>
            The site was envisioned by the clients with a lively and
            animated/action filled experience to put it in my own words. With
            each section having its own flair, from parallax to SVG scroll
            triggered animations.
          </p>
          <p>
            If I were to list down my top three favourite sections based on the
            development experience, I would create the following list:
          </p>
          <ol>
            <li>Roadmap Section</li>
            <li>Landing Section</li>
            <li>About Artist Section</li>
          </ol>
          <p>
            The reasonings behind which will be explained through each
            subsequent paragraph following the same order.
          </p>
        </>
      ),
      image: {
        placement: 'bottom',
        single: {
          src: '/images/projects/binkingz/binkingz-map.jpg',
          alt: 'binkingz mint page',
          caption: 'My personal favourite section, the Roadmap section.',
        },
      },
    },
  },
  {
    type: 'text',
    props: {
      className: projectStyles.small,
      content: (
        <>
          <h3>Roadmap Section</h3>

          <p>
            At the same time, the most complex and time consuming yet the most
            satisfying section. The main challenges were mostly around the
            scroll triggered "red treasure path" and getting it to time with
            various milestones to give it the traversing effect.
          </p>

          <p>
            After some trial and error, thanks to the GSAP Animation package, a
            solution was crafted allowing for the intended smooth path tracing
            as the user scrolls. On mobile, instead of a path, we have devised a
            zoom in effect to compensate for the size of the map, giving an
            "adventure" feel similar to going around treasure island.
          </p>
        </>
      ),
    },
  },
  {
    type: 'leftright',
    props: {
      className: projectStyles.nomargin,
      content: (
        <>
          <h3>Landing Section</h3>

          <p>
            Although one of the more simple looking ones, the parallax effect as
            you scroll where the bin chickens and their props "explode" apart as
            you scroll down is pretty cool. Besides that, the text boxes do
            provide some interesting flavour and personality to these lovable
            (subjective) chooks.
          </p>

          <p>
            They always say first-impressions are important, and with the GIF
            text-boxes and parallax it invites you to continue browsing.
          </p>
        </>
      ),
      image: {
        placement: 'right',
        single: {
          src: '/images/projects/binkingz/binkingz-mint.jpg',
          alt: 'binkingz mint page',
          caption:
            'Honourable mention to the mint section with the infinite vertical scrollers',
        },
      },
    },
  },
  {
    type: 'text',
    props: {
      content: (
        <>
          <h3>About Artist Section</h3>

          <p>
            Personally, I like black as a colour, very neutral and classy which
            is what the artist section gives off. Basic at first glance but not
            many users would know that if you hover your cursor over the images,
            they{' '}
            <s>
              <i>glitch out.</i>
            </s>
          </p>

          <p>
            Really like the retro vibe and finding a solution to achieve that
            effect without eating up the browser's memory was a fun challenge.
            In the end a SVG based implementation was discovered, giving a
            efficient and well performing effect.
          </p>
        </>
      ),
    },
  },
  {
    type: 'topdown',
    props: {
      title: 'Final Thoughts',
      content: (
        <>
          <p>
            This was one of the most fun and interesting projects doing a
            full-site rework based on existing code, with a million kudos' to
            the design team that conceptualised the designs and of course Scott
            Marsh himself for the awesome Aussie styled Chooks that are smokin'.
          </p>

          <p>
            These Bin Kingz are still availalble for grabs if you wish at just
            0.069ETH (nice) for one, mintable from the main site, or if you
            fancy getting an existing one for sale on Opensea.
          </p>

          <p className={textStyles.nomargin}>Links:</p>
          <ul>
            <li>
              <Hyperlink
                colour='var(--purple-10)'
                highlightColour='var(--purple-30)'
              >
                <a
                  href={BINKINGZ_LINKS.main}
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
                  href={BINKINGZ_LINKS.opensea}
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
                  href={BINKINGZ_LINKS.opensea}
                  target='_blank'
                  rel='noopener noreferrer'
                >
                  Scott Marsh's Site
                </a>
              </Hyperlink>
            </li>
          </ul>
        </>
      ),
      image: {
        placement: 'top',
        single: {
          src: '/images/projects/binkingz/binkingz-opensea.jpg',
          alt: 'binkingz opensea collection',
          caption: 'All the chooks you can view on Opensea...',
        },
      },
    },
  },
]
