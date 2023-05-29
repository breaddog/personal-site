import React from 'react'
import { EXTERNAL_LINKS } from '../../../../shared'
import { ContactInfoProps } from './Components'

import mailSVG from '../../../../assets/icons/mail.svg'
import resumeSVG from '../../../../assets/icons/resume.svg'
import githubSVG from '../../../../assets/logos/github.svg'
import linkedinSVG from '../../../../assets/logos/linkedin.svg'

export const CONTACT_INFOS: ContactInfoProps[] = [
  {
    type: 'linkedin',
    link: EXTERNAL_LINKS.linkedin,
    icon: {
      src: linkedinSVG,
      alt: 'linkedin',
    },
    circularText: {
      text: 'LinkedIn',
      spacing: 5,
      repetitions: 3,
      direction: 'clockwise',
    },
    hoverText: 'View my Job Portfolio Page',
  },
  {
    type: 'github',
    link: EXTERNAL_LINKS.github,
    icon: {
      src: githubSVG,
      alt: 'github',
    },
    circularText: {
      text: 'GitHub',
      spacing: 7,
      repetitions: 3,
      direction: 'clockwise',
    },
    hoverText: 'Projects and Stuff on Github',
  },
  {
    type: 'email',
    link: `mailto:${EXTERNAL_LINKS.email}`,
    icon: {
      src: mailSVG,
      alt: 'mail',
    },
    circularText: {
      text: 'Email',
      spacing: 10,
      repetitions: 3,
      direction: 'clockwise',
    },
    hoverText: (
      <>
        Get in contact with me
        <br />
        <span>tienfoong@gmail.com</span>
      </>
    ),
  },
  {
    type: 'resume',
    link: EXTERNAL_LINKS.resume,
    icon: {
      src: resumeSVG,
      alt: 'resuume',
    },
    circularText: {
      text: 'Resume',
      spacing: 7,
      repetitions: 3,
      direction: 'clockwise',
    },
    hoverText: 'Download my Resume',
  },
]
