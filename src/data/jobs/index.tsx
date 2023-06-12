import { JobPosition } from '../../shared/interfaces'

import unimelbSVG from '../../assets/logos/unimelb.svg'
import onigiriSVG from '../../assets/icons/onigiri.svg'

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
          'JavaScript, HTML, CSS',
          'Python, C, Haskell',
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
          'Managing a team of international developers to align with project expectations',
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
    start: 'February 2023',
    end: 'Present',
    sections: [
      {
        title: 'Teaching Scope',
        info: [
          'Basic Coding Principles',
          'Simple Web Development',
          'Programming Logic',
          'Programmatic Thinking',
          'Language and Syntax',
          'Translating Logic to Code',
          'HTML, CSS, JavaScript, Python',
        ],
      },
      {
        title: 'Objectives',
        info: [
          'Aim to teach beginners basic coding principles (e.g. Foundations, Site Building...)',
          'Strive for students to learn to think programatically',
          'Teach students how to use basic HTML and CSS to build and style a simple website',
          'Provide unique and personalised examples to assist and further a students understanding',
        ],
      },
      {
        title: 'More Info',
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
]
