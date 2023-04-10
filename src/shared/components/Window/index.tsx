import styles from './Window.module.scss'
import React from 'react'
import classNames from 'classnames'

import gsap from 'gsap'
import { Draggable } from 'gsap/all'

interface WindowProps {
  className?: string,
  windowTitle?: string,
  windowStyle?: 'light' | 'dark'
  referenceKey: string,
  boundaryContainer?: string,
  children?: React.ReactNode
}

export const Window: React.FC<WindowProps> = ({
  className,
  windowTitle,
  windowStyle = 'light',
  referenceKey,
  boundaryContainer,
  children,
}) => {
  const classes = classNames(styles.window, styles[windowStyle], className)

  // proxy created
  const [proxyCreated, setProxyCreated] = React.useState<boolean>(false)

  // coords
  const leftPrevX = React.useRef<number>(0)
  const rightPrevX = React.useRef<number>(0)
  const topPrevY = React.useRef<number>(0)
  const bottomPrevY = React.useRef<number>(0)

  // initialise
  leftPrevX.current = 0
  rightPrevX.current = 0
  topPrevY.current = 0
  bottomPrevY.current = 0

  // draggable
  const draggableRef = React.useRef<any | null>(null)

  // refs
  const topRef = React.useRef<any | null>(null)
  const bottomRef = React.useRef<any | null>(null)
  const leftRef = React.useRef<any | null>(null)
  const rightRef = React.useRef<any | null>(null)

  // container
  const containerRef = React.useRef<any | null>(null)

  // constraints
  const MIN_HEIGHT = 400
  const MIN_WIDTH = 240

  // check for min, for max the behaviour is similar and instilled
  const checkWindowConstraints = (
    isHeight: boolean = false,
    diffValue: number = 0,
    add: boolean = true,
  ) => {
    const modifier = (diffValue * (add ? 1 : -1))
    if (isHeight) {
      return containerRef.current.clientHeight + modifier < MIN_HEIGHT
    } else {
      return containerRef.current.clientWidth + modifier < MIN_WIDTH
    }
  }

  // draggable
  React.useLayoutEffect(() => {
    gsap.registerPlugin(Draggable)
    if (!containerRef.current) return

    // proxy draggers
    if (!proxyCreated) {
      topRef.current = document.createElement('div')
      bottomRef.current = document.createElement('div')
      leftRef.current = document.createElement('div')
      rightRef.current = document.createElement('div')

      setProxyCreated(true)
    }

    // right side
    const rightDraggable = new Draggable(rightRef.current, {
      trigger: `#right-${referenceKey}, #topRight-${referenceKey}, #bottomRight-${referenceKey}`,
      cursor: 'e-resize',
      onDrag: function (this) {
        const diffX = this.x - rightPrevX.current
        if (checkWindowConstraints(false, diffX, true)) {
          draggableRef.current.disable()
        } else {
          gsap.set(containerRef.current, {
            width: `+=${diffX}`
          })
          rightPrevX.current = this.x
        }
      },
      onPress: function (this) {
        rightPrevX.current = this.x
        if (draggableRef.current) {
          draggableRef.current.disable()
        }
      },
      onRelease: function () {
        if (draggableRef.current) {
          draggableRef.current.enable()
        }
      }
    })

    // left side
    const leftDraggable = new Draggable(leftRef.current, {
      trigger: `#left-${referenceKey}, #topLeft-${referenceKey}, #bottomLeft-${referenceKey}`,
      cursor: 'w-resize',
      onDrag: function (this) {
        const diffX = this.x - leftPrevX.current
        if (checkWindowConstraints(false, diffX, false)) {
          draggableRef.current.disable()
        } else {
          gsap.set(containerRef.current, {
            width: `-=${diffX}`,
            x: `+=${diffX}`
          })
          leftPrevX.current = this.x
        }
      },
      onPress: function (this) {
        leftPrevX.current = this.x
        if (draggableRef.current) {
          draggableRef.current.disable()
        }
      },
      onRelease: function (this) {
        if (draggableRef.current) {
          draggableRef.current.enable()
        }
      }
    })

    // top side
    const topDraggable = new Draggable(topRef.current, {
      trigger: `#top-${referenceKey}, #topRight-${referenceKey}, #topLeft-${referenceKey}`,
      cursor: 'n-resize',
      onDrag: function (this) {
        const diffY = this.y - topPrevY.current
        if (checkWindowConstraints(true, diffY, false)) {
          draggableRef.current.disable()
        } else {
          gsap.set(containerRef.current, {
            height: `-=${diffY}`,
            y: `+=${diffY}`
          })
          topPrevY.current = this.y
        }
      },
      onPress: function (this) {
        topPrevY.current = this.y
        if (draggableRef.current) {
          draggableRef.current.disable()
        }
      },
      onRelease: function (this) {
        if (draggableRef.current) {
          draggableRef.current.enable()
        }
      }
    })

    const bottomDraggable = new Draggable(bottomRef.current, {
      trigger: `#bottom-${referenceKey}, #bottomRight-${referenceKey}, #bottomLeft-${referenceKey}`,
      cursor: 's-resize',
      onDrag: function (this) {
        const diffY = this.y - bottomPrevY.current
        if (checkWindowConstraints(true, diffY, true)) {
          draggableRef.current.disable()
        } else {
          gsap.set(containerRef.current, {
            height: `+=${diffY}`,
          })
          bottomPrevY.current = this.y
        }
      },
      onPress: function (this) {
        bottomPrevY.current = this.y
        if (draggableRef.current) {
          draggableRef.current.disable()
        }
      },
      onRelease: function (this) {
        if (draggableRef.current) {
          draggableRef.current.enable()
        }
      }
    })

    return () => {
      topDraggable.kill()
      bottomDraggable.kill()
      leftDraggable.kill()
      rightDraggable.kill()
      if (draggableRef.current) {
        draggableRef.current.kill()
      }
    }
  }, [
    // refs
    containerRef,
    leftRef,
    rightRef,
    topRef,
    bottomRef,
    draggableRef,
    // check
    proxyCreated,
    // values,
    leftPrevX,
    rightPrevX,
    topPrevY,
    bottomPrevY,
    // main
    referenceKey
  ])


  // registration to drag
  React.useLayoutEffect(() => {

    // main dragger
    if (containerRef.current && !draggableRef.current) {
      const mainWindow = new Draggable(containerRef.current, {
        trigger: `#window-header-${referenceKey}`,
        type: 'x,y',
        edgeResistance: 1,
        bounds: boundaryContainer,
      })
      // for reference
      draggableRef.current = mainWindow
    }
  }, [containerRef, draggableRef, referenceKey])

  return <div id={`window-main-${referenceKey}`} className={classes} ref={containerRef}>
    <div id={`window-header-${referenceKey}`} className={styles.header}>
      <div className={styles.title}>
        {windowTitle}
      </div>
      <div className={styles.buttons}>
        <div className={styles.button} />
        <div className={styles.button} />
        <div className={styles.button} />
      </div>
    </div>
    <div className={styles.body}>
      {children}
    </div>
    <div className={styles.nav}>
    </div>

    {/* resiable hidden sides */}
    <div id={`top-${referenceKey}`} className={classNames(styles.edge, styles.top)} />
    <div id={`bottom-${referenceKey}`} className={classNames(styles.edge, styles.bottom)} />
    <div id={`left-${referenceKey}`} className={classNames(styles.edge, styles.left)} />
    <div id={`right-${referenceKey}`} className={classNames(styles.edge, styles.right)} />


    {/* resizable hidden ones */}
    <div
      id={`topLeft-${referenceKey}`}
      className={classNames(styles.box, styles.topLeft)}
    />
    <div
      id={`topRight-${referenceKey}`}
      className={classNames(styles.box, styles.topRight)}
    />
    <div
      id={`bottomLeft-${referenceKey}`}
      className={classNames(styles.box, styles.bottomLeft)}
    />
    <div
      id={`bottomRight-${referenceKey}`}
      className={classNames(styles.box, styles.bottomRight)}
    />

  </div>

}