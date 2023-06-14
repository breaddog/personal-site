import styles from './PopupModal.module.scss'
import React from 'react'
import classNames from 'classnames'

import ReactModal from 'react-modal'

import crossSVG from '../../../assets/icons/cross.svg'

const REACT_MODAL_STYLES = {
  overlay: {
    backgroundColor: 'rgba(0, 0, 0, 0.75)',
    display: 'flex',
    zIndex: 256883,
  },
}

export interface PopupModalProps {
  className?: string
  id?: string
  isOpen?: boolean
  contentLabel?: string
  onRequestCloseActive?: boolean
  onClose?: Function
  children?: React.ReactNode
}

export const PopupModal: React.FunctionComponent<PopupModalProps> = ({
  className,
  id = '',
  isOpen = false,
  contentLabel,
  onRequestCloseActive = true,
  onClose = () => {},
  children,
}) => {
  const classes = classNames(styles.popupModal, className)

  const handleModalClose = () => {
    onClose()
  }

  return (
    <ReactModal
      id={id}
      isOpen={isOpen}
      contentLabel={contentLabel}
      ariaHideApp={false}
      className={classes}
      onRequestClose={() => {
        if (!onRequestCloseActive) return
        onClose()
      }}
      style={REACT_MODAL_STYLES}
    >
      <>
        <div className={styles.top}>
          <img
            className={styles.close}
            src={crossSVG}
            alt='close'
            onClick={() => handleModalClose()}
          />
        </div>
        {children}
      </>
    </ReactModal>
  )
}
