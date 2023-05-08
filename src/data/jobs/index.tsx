import { JobPosition } from '../../shared/interfaces'

import unimelbSVG from '../../assets/logos/unimelb.svg'

export const JOB_POSITIONS: JobPosition[] = [
  {
    company: 'University Of Melbourne',
    title: 'Bachelor of Science',
    logo: unimelbSVG,
    logoAlt: 'unimelb',
    start: 'July 2018',
    end: 'December 2021',
    sections: [
      {
        title: 'Major',
        info: ['Computing and Software Systems'],
        isText: true,
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
          <>
            Pivoted towards a web - development focus, with my capstone project
            being a Client-Resource Management app and having built a food -
            truck ordering platform for another subject.
            <br />
            <br />
            Sparked my interest in UI/ UX and aiming to be engagive in designing
            and developing bespoke websites tailored towards a given client's
            needs.
          </>,
        ],
        isText: true,
      },
    ],
  },
  {
    company: 'Pellar Technology',
    title: 'Associate Engineer',
    logo: './images/logos/pellar.jpg',
    logoAlt: 'pellar',
    start: 'August 2021',
    end: 'February 2023',
    sections: [
      {
        title: 'Job Scope',
        info: [
          'Web Development',
          'Web Design (UI/UX)',
          'Project Management and Planning',
          'Client Serivce and Liaising',
          'Software Development R&D',
          'Development Operations',
          'Blockchain (Ethereum) R&D',
          'Cryptocurrency R&D',
        ],
      },
      {
        title: 'Responsibilities',
        info: [
          'Creating Bespoke Sites with React (JS, TS)',
          'Conceptualising Development Specifications (Site, Server)',
          'Bridging communications between clients and developers',
          'Project Quality Control Assurance',
          'Building Smart Contracts (Solidity)',
          'API & Database Development (Express, MongoDB)',
          'Setting up Automated CI/CD Deployments (CodePipeline, CodeBuild)',
          'Site Deployment and Post Deployment Service',
          'Bespoke Script Development (JS, TS, ExtendScript [Adobe])',
          'Asset Hosting/Distribution (S3, IPFS)',
          'Internal Project Documentation and Organisation',
        ],
      },
      {
        title: 'More Info',
        info: [
          <>
            Assisted with the company's daily operations by overseeing project
            development progress with an international based team.
            <br />
            <br />
            Engaged with clients to help understand and plan development
            specifications for web, server, blockchain and deployment
            requirements based on their schedule.
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
]
