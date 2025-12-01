import styles from './Contacts.module.scss'
import sectionStyles from '../../../../styles/section.module.scss'
import React from 'react'
import classNames from 'classnames'

import { SectionContainer, SectionHeader } from '../../../../shared/components'

import { map } from 'lodash'
import { EXTERNAL_LINKS } from '../../../../shared'
import { ContactInfo, ContactInfoProps } from './Components'
import {
  GenericForwardRefInterface,
  GenericSubSectionForwardInterface,
} from '../../../../shared/interfaces'

import mailSVG from '../../../../assets/icons/mail.svg'
import githubSVG from '../../../../assets/logos/github.svg'
import linkedinSVG from '../../../../assets/logos/linkedin.svg'
import { AppContext } from '../../../../App'

interface PortfolioContactsProps extends GenericSubSectionForwardInterface {}

export const PortfolioContacts: React.FC<PortfolioContactsProps> =
  React.forwardRef<GenericForwardRefInterface, PortfolioContactsProps>(
    ({ className }, ref) => {
      // contact infos
      const CONTACT_INFOS: ContactInfoProps[] = [
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
          hoverText: 'Projects on Github',
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
          hoverText: <>Get in contact with me</>,
        },
      ]

      // generic params
      const CIRCULAR_ANIMATION_DURATION = 8000
      const CIRCULAR_ANIMATION_FONT_SIZE = '0.875rem'

      const { isMedium } = React.useContext(AppContext)
      const contactsRef = React.useRef<HTMLDivElement | null>(null)

      const classes = classNames(
        'portfolio__contacts',
        sectionStyles['sub-section'],
        styles.contacts,
        className
      )

      React.useImperativeHandle(ref, () => ({
        element: contactsRef.current as HTMLDivElement,
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
                title='Contacts'
                src={mailSVG}
                alt='mail'
                backgroundColour='var(--purple-20)'
              />
              <div className={styles.body}>
                <div className={styles.contacts}>
                  {map(
                    CONTACT_INFOS,
                    (props: ContactInfoProps, idx: number) => {
                      // add extra info
                      const _circularText = {
                        ...props.circularText,
                        duration: CIRCULAR_ANIMATION_DURATION,
                        fontSize: CIRCULAR_ANIMATION_FONT_SIZE,
                      }
                      props.circularText = _circularText
                      return (
                        <ContactInfo
                          {...props}
                          className={classNames(
                            styles.contactBox,
                            props.className
                          )}
                          // disable on medium to be safe
                          disable={isMedium}
                          key={idx}
                          data-aos='fade-down'
                          data-aos-delay={200 + 200 * idx}
                        />
                      )
                    }
                  )}
                </div>
              </div>
            </SectionContainer>
          </section>
        </>
      )
    }
  )
