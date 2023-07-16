import { JobPosition } from '../../shared/interfaces'
import unimelbSVG from '../../assets/logos/unimelb.svg'
import onigiriSVG from '../../assets/icons/onigiri.svg'

export const JOB_POSITIONS: JobPosition[] = [
  {
    company: 'Pellar Technology',
    title: 'Associate Engineer',
    logo: 'images/logos/pellar.jpg',
    logoAlt: 'pellar',
    start: 'August 2021',
    end: 'February 2023',
    sections: [
      {
        title: 'Responsibilities',
        info: [
          <>
            Assisted with the company's daily operations by overseeing project
            development progress with an international based team.
            <br />
            <br />
            Engaged with clients all over the world to help understand and plan
            development specifications for web, server, blockchain and
            deployment requirements based on their schedule.
            <br />
            <br />
            Flexibly switched between a project management, planning and
            developer roles depending on needs and assisting team members where
            needed.
            <br />
            <br />
            Primarily planned and create bespoke full-platforms (Web, Server,
            Web3) and co-operating with the client to achieve a satisfactory
            deployment.
            <br />
            <br />
            Developed custom scripts to automate various processes from
            deployment, asset generating and blockchain querying.
          </>,
        ],
        isText: true,
      },
    ],
  },
  {
    company: 'Freelance Tutoring',
    title: 'Programming & Coding Tutor',
    logo: onigiriSVG,
    logoAlt: 'onigiri',
    start: 'December 2021',
    end: 'Present',
    sections: [
      {
        title: 'Responsibilities',
        info: [
          <>
            Took up opportunity to assist people in their efforts to make a
            start/learn how to code.
            <br />
            <br />
            Mostly word of mouth and between friends and relatives, empowered
            students to perform active thinking and assisted them towards
            understanding solutions and principles.
            <br />
            <br />
            All sessions are workshop styled, with custom tailored examples
            provided to further understanding in a correct and unique way suited
            to the students learning style.
          </>,
        ],
        isText: true,
      },
    ],
  },
  {
    company: 'University Of Melbourne',
    title: 'Bachelor of Science',
    logo: unimelbSVG,
    logoAlt: 'unimelb',
    start: 'July 2018',
    end: 'December 2021',
    sections: [
      {
        title: 'Other Learnings',
        info: [
          <>
            Pivoted towards a web - development focus, with my capstone project
            being a Client-Resource Management app and having built a food -
            truck ordering platform for another subject.
            <br />
            <br />
            Sparked my interest in UI/ UX and aiming to be engagive in designing
            and developing bespoke websites tailored towards a given client's
            needs.
            <br />
            <br />
            Also took 5 semesters of Japanese Language Studies based on my
            interest in Japanese culture and anime.
          </>,
        ],
        isText: true,
      },
    ],
  },
]
