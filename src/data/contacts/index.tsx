export interface ContactProps {
  title: string
  url: string
  alt: string
}

export const CONTACTS: ContactProps[] = [
  {
    title: 'Email',
    url: 'mailto:tienfoong@gmail.com',
    alt: 'Gmail',
  },
  {
    title: 'LinkedIn',
    url: 'https://linkedin.com',
    alt: 'linkedin',
  },
  {
    title: 'Github',
    url: 'https://github.com/breaddog',
    alt: 'github',
  },
]
