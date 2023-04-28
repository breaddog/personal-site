import './index.scss'
import React from 'react'
import classNames from 'classnames'

// import Modal from 'react-modal'

interface ModalBoxProps {
  className?: string
  id?: string
  modalKey?: string
  onClose?: Function
  children?: React.ReactNode
}

export const ModalBox: React.FC<ModalBoxProps> = ({
  id,
  className,
  onClose = () => {},
  modalKey,
  children,
}) => {
  const classes = classNames('modal__box', className)

  return (
    <div
      id={id}
      key={modalKey}
      className={classes}
      onClick={() => onClose()}
    >
      {children ? (
        children
      ) : (
        <>
          <div className={classNames('modal__header', `${className}__header`)}>
            Header
          </div>
          <div className={classNames('modal__body', `${className}__body`)}>
            Body goes header
            <br />
            You can customise the css also
          </div>
        </>
      )}
    </div>
  )
}
