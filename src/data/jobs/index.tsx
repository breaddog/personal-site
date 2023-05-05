import { JobPosition } from '../../shared/interfaces'

import unimelbSVG from '../../assets/logos/unimelb.svg'

export const JOB_POSITIONS: JobPosition[] = [
  {
    title: 'University Of Melbourne',
    logo: unimelbSVG,
    logoAlt: 'unimelb',
    start: 'July 2018',
    end: 'December 2021',
    sections: [
      {
        title: 'Degree',
        info: ['Bachelor of Science', 'Computing and Software Systems'],
      },
      {
        title: 'Concepts Learnt',
        info: [
          'Full Stack Web Development',
          'SCRUM/AGILE Planning',
          'Algorithms and Data Structures',
          'Object Oriented Programming',
          'Source Control (Git/Github)',
          'Japanese Language Studies',
        ],
      },
      {
        title: 'More Info',
        info: [
          'Pivoted towards a web-development focus, with my capstone project being a Client-Resource Management app and having built a food-truck ordering platform for another subject.',
          'Sparked my interest in UI/UX and aiming to be engagive in designing bespoke websites tailored towards a given client\'s needs.',
        ],
        isText: true,
      },
    ],
  },
]
