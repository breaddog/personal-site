import styles from './Window.module.scss'
import React from 'react'
import classNames from 'classnames'
import { every, max } from 'lodash'

import gsap from 'gsap'
import { Draggable } from 'gsap/all'
import { PortfolioDevContext } from '../../../pages/Portfolio/Sections'

import { AppContext } from '../../../App'

export interface WindowHandle {
  resetWindow: Function
  enableWindowFunctions: Function
  disableWindowFunctions: Function
  invalidateWindow: Function
}
interface WindowProps {
  className?: string
  windowTitle?: string
  windowStyle?: 'light' | 'dark'
  referenceKey: string
  boundaryContainer?: string
  children?: React.ReactNode
  onResize?: Function
  ref?: React.ForwardedRef<WindowHandle>
}

export const Window: React.FC<WindowProps> = React.forwardRef<
  WindowHandle,
  WindowProps
>(
  (
    {
      className,
      windowTitle,
      windowStyle = 'light',
      referenceKey,
      boundaryContainer,
      onResize = () => {},
      children,
    },
    ref
  ) => {
    // classes
    const classes = classNames(
      styles.window,
      styles[windowStyle],
      'portfolio__window__dev',
      className
    )

    // context
    const { highestZIndex, setHighestZIndex } =
      React.useContext(PortfolioDevContext)
    const { isMobile } = React.useContext(AppContext)

    // setters
    const [proxyCreated, setProxyCreated] = React.useState<boolean>(false)
    const [interactivityEnabled, setInteractivityEnabled] =
      React.useState<boolean>(true)

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

    // edges
    const leftDraggable = React.useRef<any>(null)
    const rightDraggable = React.useRef<any>(null)
    const topDraggable = React.useRef<any>(null)
    const bottomDraggable = React.useRef<any>(null)

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

    const DRAGGABLE_REFS_TO_CHECK = [
      draggableRef,
      topDraggable,
      bottomDraggable,
      leftDraggable,
      rightDraggable,
    ]

    // disable and reset on small screen sizes
    // const interactivityDisabled = window.matchMedia(mobileMediaQuery)

    // z-index override for click on any part of container
    const handleFocus = () => {
      let _foundHighestZIndex
      // first one will always be a search, the rest will be O(1)
      if (0 === highestZIndex) {
        const _windows = gsap.utils.toArray('.portfolio__window__dev') as any[]
        const _zIndexes = _windows.map((window: any) =>
          Number(window.style['z-index'])
        )
        _foundHighestZIndex = max(_zIndexes) as number
      } else {
        _foundHighestZIndex = highestZIndex
      }

      // set based on + 1
      const newZIndex = _foundHighestZIndex + 2
      setHighestZIndex(newZIndex)
      gsap.set(containerRef.current, {
        zIndex: newZIndex,
      })
    }

    // check for min, for max the behaviour is similar and instilled
    const checkWindowConstraints = (
      isHeight: boolean = false,
      diffValue: number = 0,
      add: boolean = true
    ) => {
      const modifier = diffValue * (add ? 1 : -1)
      if (isHeight) {
        return containerRef.current.clientHeight + modifier > MIN_HEIGHT
      } else {
        return containerRef.current.clientWidth + modifier > MIN_WIDTH
      }
    }

    // draggable resize
    React.useLayoutEffect(() => {
      gsap.registerPlugin(Draggable)
      if (!containerRef.current || isMobile) return

      // proxy draggers
      if (!proxyCreated) {
        topRef.current = document.createElement('div')
        bottomRef.current = document.createElement('div')
        leftRef.current = document.createElement('div')
        rightRef.current = document.createElement('div')

        setProxyCreated(true)
      }

      // top side
      const _topDraggable = new Draggable(topRef.current, {
        trigger: `#top-${referenceKey}, #topRight-${referenceKey}, #topLeft-${referenceKey}`,
        cursor: 'n-resize',
        onDrag: function () {
          if (!interactivityEnabled) return
          const diffY = this.y - topPrevY.current
          if (checkWindowConstraints(true, diffY, false)) {
            gsap.set(containerRef.current, {
              height: `-=${diffY}`,
              y: `+=${diffY}`,
            })
            topPrevY.current = this.y
          }
        },
        onPress: function () {
          topPrevY.current = this.y
          draggableRef.current.disable()
        },
        onRelease: function () {
          draggableRef.current.enable()
        },
      })

      const _bottomDraggable = new Draggable(bottomRef.current, {
        trigger: `#bottom-${referenceKey}, #bottomRight-${referenceKey}, #bottomLeft-${referenceKey}`,
        cursor: 's-resize',
        onDrag: function () {
          if (!interactivityEnabled) return

          const diffY = this.y - bottomPrevY.current
          if (checkWindowConstraints(true, diffY, true)) {
            gsap.set(containerRef.current, {
              height: `+=${diffY}`,
            })
            bottomPrevY.current = this.y
          }
        },
        onPress: function () {
          bottomPrevY.current = this.y
          draggableRef.current.disable()
        },
        onRelease: function () {
          draggableRef.current.enable()
        },
      })

      // left side
      const _leftDraggable = new Draggable(leftRef.current, {
        trigger: `#left-${referenceKey}, #topLeft-${referenceKey}, #bottomLeft-${referenceKey}`,
        cursor: 'w-resize',
        onDrag: function () {
          if (!interactivityEnabled) return

          const diffX = this.x - leftPrevX.current
          if (checkWindowConstraints(false, diffX, false)) {
            gsap.set(containerRef.current, {
              width: `-=${diffX}`,
              x: `+=${diffX}`,
            })
            leftPrevX.current = this.x
          }
        },
        onPress: function () {
          leftPrevX.current = this.x
          draggableRef.current.disable()
        },
        onRelease: function () {
          draggableRef.current.enable()
        },
      })

      // right side
      const _rightDraggable = new Draggable(rightRef.current, {
        trigger: `#right-${referenceKey}, #topRight-${referenceKey}, #bottomRight-${referenceKey}`,
        cursor: 'e-resize',
        onDrag: function () {
          if (!interactivityEnabled) return
          const diffX = this.x - rightPrevX.current
          if (checkWindowConstraints(false, diffX, true)) {
            gsap.set(containerRef.current, {
              width: `+=${diffX}`,
            })
            rightPrevX.current = this.x
          }
        },
        onPress: function () {
          rightPrevX.current = this.x
          draggableRef.current.disable()
        },
        onRelease: function () {
          draggableRef.current.enable()
        },
      })

      // then assign
      topDraggable.current = _topDraggable
      bottomDraggable.current = _bottomDraggable
      leftDraggable.current = _leftDraggable
      rightDraggable.current = _rightDraggable
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
      referenceKey,
      highestZIndex,
      isMobile,
      interactivityEnabled,
    ])

    // registration to drag
    React.useLayoutEffect(() => {
      gsap.registerPlugin(Draggable)

      // main dragger
      if (containerRef.current && !draggableRef.current) {
        const mainWindow = new Draggable(containerRef.current, {
          trigger: `#window-header-${referenceKey}`,
          type: 'x,y',
          edgeResistance: 1,
          bounds: boundaryContainer,
          onClick: function () {
            handleFocus()
          },
        })
        // for reference
        draggableRef.current = mainWindow
        draggableRef.current.enable()
      }
    }, [containerRef, draggableRef, referenceKey, boundaryContainer, isMobile])

    // INTERACTIVITY
    const resetWindow = (
      params: {
        width?: string
        height?: string
      } = { width: '100%', height: '100%' }
    ) => {
      const { width, height } = params
      console.log('test', width, height)
      gsap.set(containerRef.current, {
        width,
        height,
        x: 0,
        y: 0,
      })
    }

    const invalidateWindow = () => {
      if (!checkIfRefsSet()) return
      topPrevY.current = 0
      bottomPrevY.current = 0
      leftPrevX.current = 0
      rightPrevX.current = 0
    }

    // check for refs
    const checkIfRefsSet = () => {
      return every(
        DRAGGABLE_REFS_TO_CHECK,
        (ref: React.MutableRefObject<HTMLDivElement>) => ref.current
      )
    }

    const enableWindowFunctions = () => {
      if (!checkIfRefsSet()) return
      draggableRef.current.enable()
      topDraggable.current.enable()
      bottomDraggable.current.enable()
      leftDraggable.current.enable()
      rightDraggable.current.enable()

      draggableRef.current.update()
      topDraggable.current.update()
      bottomDraggable.current.update()
      leftDraggable.current.update()
      rightDraggable.current.update()
    }

    const disableWindowFunctions = () => {
      if (!checkIfRefsSet()) return
      draggableRef.current.disable()
      topDraggable.current.disable()
      bottomDraggable.current.disable()
      leftDraggable.current.disable()
      rightDraggable.current.disable()
    }

    // listener for resize and disable functions
    const handleInteractivityCheck = () => {
      // if should be disabled and not set to mobile yet
      if (isMobile && interactivityEnabled) {
        setInteractivityEnabled(false)
        resetWindow()
        onResize()
        disableWindowFunctions()
      }
      // going back to desktop there shouldnt be a need to reset
      // if it doesnt match and its still set to mobile
      if (!isMobile && !interactivityEnabled) {
        setInteractivityEnabled(true)
        onResize()
        enableWindowFunctions()
      }
    }

    React.useEffect(() => {
      handleInteractivityCheck()
      window.addEventListener('resize', handleInteractivityCheck)
      return () => {
        window.removeEventListener('resize', handleInteractivityCheck)
      }
    }, [
      isMobile,
      interactivityEnabled,
      draggableRef,
      topDraggable,
      bottomDraggable,
      leftDraggable,
      rightDraggable,
    ])

    // props to access if a ref is provided
    React.useImperativeHandle(ref, () => ({
      resetWindow,
      enableWindowFunctions,
      disableWindowFunctions,
      invalidateWindow,
    }))

    return (
      <div
        id={`window-main-${referenceKey}`}
        className={classes}
        ref={containerRef}
        onClick={() => handleFocus()}
      >
        <div
          id={`window-header-${referenceKey}`}
          className={styles.header}
        >
          <div className={styles.title}>{windowTitle}</div>
          <div className={styles.buttons}>
            <div className={styles.button} />
            <div className={styles.button} />
            <div className={styles.button} />
          </div>
        </div>
        <div className={styles.body}>{children}</div>
        <div className={styles.nav}></div>

        {/* resiable hidden sides */}
        <div
          id={`top-${referenceKey}`}
          className={classNames(styles.edge, styles.top)}
        />
        <div
          id={`bottom-${referenceKey}`}
          className={classNames(styles.edge, styles.bottom)}
        />
        <div
          id={`left-${referenceKey}`}
          className={classNames(styles.edge, styles.left)}
        />
        <div
          id={`right-${referenceKey}`}
          className={classNames(styles.edge, styles.right)}
        />

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
    )
  }
)
