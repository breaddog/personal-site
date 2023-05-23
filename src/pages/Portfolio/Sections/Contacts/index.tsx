import styles from './Contacts.module.scss'
import sectionStyles from '../../../../styles/section.module.scss'
import React from 'react'
import classNames from 'classnames'

import { EXTERNAL_LINKS } from '../../../../shared/links'

import { SectionContainer, SectionHeader } from '../../../../shared/components'

import mailSVG from '../../../../assets/icons/mail.svg'
import resumeSVG from '../../../../assets/icons/resume.svg'
import githubSVG from '../../../../assets/logos/github.svg'
import linkedinSVG from '../../../../assets/logos/linkedin.svg'
import { ContactInfo } from './Components'
import {
  GenericForwardRefInterface,
  GenericSubSectionForwardInterface
} from '../../../../shared/interfaces'

interface PortfolioContactsProps extends GenericSubSectionForwardInterface {}

export const PortfolioContacts: React.FC<PortfolioContactsProps> =
  React.forwardRef<GenericForwardRefInterface, PortfolioContactsProps>(
    ({ className }, ref) => {
      const CIRCULAR_ANIMATION_DURATION = 8
      const CIRCULAR_ANIMATION_FONT_SIZE = '0.875rem'

      const contactsRef = React.useRef<HTMLDivElement | null>(null)

      const classes = classNames(
        'portfolio__contacts',
        sectionStyles['sub-section'],
        styles.contacts,
        className
      )

      React.useImperativeHandle(ref, () => ({
        element: contactsRef.current as Element,
      }))

      return (
        <>
          <section
            className={classes}
            ref={contactsRef}
          >
            <SectionContainer className={styles.container}>
              <SectionHeader
                className={styles.header}
                title='Contact Me'
                src={mailSVG}
                alt='mail'
                backgroundColour='var(--purple-special)'
              />
              <div className={styles.body}>
                <div className={styles.contacts}>
                  <ContactInfo
                    className={styles.contactBox}
                    contactType='linkedin'
                    link={EXTERNAL_LINKS.linkedin}
                    icon={{
                      src: linkedinSVG,
                      alt: 'linkedin',
                    }}
                    circularText={{
                      text: 'Linkedin',
                      spacing: 3,
                      repetitions: 3,
                      direction: 'clockwise',
                      duration: CIRCULAR_ANIMATION_DURATION,
                      fontSize: CIRCULAR_ANIMATION_FONT_SIZE,
                    }}
                    hoverText='View my Job Portfolio Page'
                  />

                  <ContactInfo
                    className={styles.contactBox}
                    contactType='github'
                    link={EXTERNAL_LINKS.github}
                    icon={{
                      src: githubSVG,
                      alt: 'github',
                    }}
                    circularText={{
                      text: 'Github',
                      spacing: 6,
                      repetitions: 3,
                      direction: 'clockwise',
                      duration: CIRCULAR_ANIMATION_DURATION,
                      fontSize: CIRCULAR_ANIMATION_FONT_SIZE,
                    }}
                    hoverText='Projects and Stuff on Github'
                  />
                  <ContactInfo
                    className={styles.contactBox}
                    contactType='email'
                    link={`mailto:${EXTERNAL_LINKS.email}`}
                    icon={{
                      src: mailSVG,
                      alt: 'mail',
                    }}
                    circularText={{
                      text: 'Email',
                      spacing: 8,
                      repetitions: 3,
                      direction: 'clockwise',
                      duration: CIRCULAR_ANIMATION_DURATION,
                      fontSize: CIRCULAR_ANIMATION_FONT_SIZE,
                    }}
                    hoverText={
                      <>
                        Get in contact with me
                        <br />
                        <span>tienfoong@gmail.com</span>
                      </>
                    }
                  />

                  <ContactInfo
                    className={styles.contactBox}
                    contactType='resume'
                    link={EXTERNAL_LINKS.resume}
                    icon={{
                      src: resumeSVG,
                      alt: 'resume',
                    }}
                    circularText={{
                      text: 'Resume',
                      spacing: 4,
                      repetitions: 3,
                      direction: 'clockwise',
                      duration: CIRCULAR_ANIMATION_DURATION,
                      fontSize: CIRCULAR_ANIMATION_FONT_SIZE,
                    }}
                    hoverText='Download my Resume'
                  />
                </div>

                {/* submission form */}
                {/* <div className={styles.form}>
              <div className={styles.formHeader}>
                Alternatively you can fill this up.
              </div>
            </div> */}
              </div>
            </SectionContainer>
          </section>
        </>
      )
    }
  )
