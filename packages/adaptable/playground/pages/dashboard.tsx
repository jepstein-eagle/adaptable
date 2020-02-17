import Input from "../../src/components/Input"
import SimpleButton from "../../src/components/SimpleButton"
import { Box, Flex } from "rebass"
import React, {
  useState,
  ReactNode,
  ReactElement,
  Dispatch,
  SetStateAction,
  useRef,
  useCallback,
  CSSProperties,
  SyntheticEvent
} from "react"

function usePropState<S>(
  state: S | undefined,
  setState: Dispatch<SetStateAction<S>> | undefined,
  initialState: S | (() => S)
): [S, Dispatch<SetStateAction<S>>] {
  const [localState, setLocalState] = useState<S>(initialState)
  return [
    state !== undefined ? state : localState,
    setState !== undefined ? setState : setLocalState
  ]
}

function clamp(num: number, min: number, max: number) {
  return num <= min ? min : num >= max ? max : num
}

function useDraggable({
  onMove,
  onDrop,
  getBoundingRect = () => document.body.getBoundingClientRect()
}: {
  onMove?: (event: MouseEvent) => void
  onDrop?: (dx: number, dy: number) => void
  getBoundingRect?: () => DOMRect
}) {
  const startRef = useRef<{
    pageX: number
    pageY: number
    bounds: { left: number; right: number; top: number; bottom: number }
  }>()
  const handleRef = useRef<HTMLElement>()
  const targetRef = useRef<HTMLElement>()

  const handleRefCallback = useCallback(newNode => {
    const oldNode = handleRef.current

    if (oldNode) {
      oldNode.removeEventListener("mousedown", handleMouseDown)
    }

    if (newNode) {
      newNode.addEventListener("mousedown", handleMouseDown)
      boundInitialPosition()
    }

    handleRef.current = newNode
  }, [])

  const applyTransform = (dx: number, dy: number) => {
    if (!targetRef.current) return
    targetRef.current.style.transform = `translate3d(${dx}px, ${dy}px, 0)`
  }

  const getTranslation = (event: MouseEvent) => {
    if (!startRef.current) return { dx: 0, dy: 0 }

    const { pageX, pageY, bounds } = startRef.current

    return {
      dx: clamp(event.pageX - pageX, bounds.left, bounds.right),
      dy: clamp(event.pageY - pageY, bounds.top, bounds.bottom)
    }
  }

  const getTranslationBounds = (targetRect: DOMRect, boundingRect: DOMRect) => {
    const left = boundingRect.x - targetRect.x
    const right = left + boundingRect.width - targetRect.width
    const top = boundingRect.y - targetRect.y
    const bottom = top + boundingRect.height - targetRect.height

    return { left, right, top, bottom }
  }

  const handleMouseDown = (event: MouseEvent) => {
    if (!targetRef.current) return

    event.preventDefault()
    document.addEventListener("mouseup", handleMouseUp)
    document.addEventListener("mousemove", handleMouseMove)

    const targetRect = targetRef.current.getBoundingClientRect()
    const boundingRect = getBoundingRect()

    startRef.current = {
      pageX: event.pageX,
      pageY: event.pageY,
      bounds: getTranslationBounds(targetRect, boundingRect)
    }
  }

  const handleMouseUp = (event: MouseEvent) => {
    event.preventDefault()
    document.removeEventListener("mouseup", handleMouseUp)
    document.removeEventListener("mousemove", handleMouseMove)

    const { dx, dy } = getTranslation(event)

    applyTransform(0, 0)
    onDrop && onDrop(dx, dy)
  }

  const handleMouseMove = (event: MouseEvent) => {
    event.preventDefault()

    const { dx, dy } = getTranslation(event)

    applyTransform(dx, dy)
    onMove && onMove(event)
  }

  const boundInitialPosition = () => {
    if (!targetRef.current) return

    const targetRect = targetRef.current.getBoundingClientRect()
    const boundingRect = getBoundingRect()

    const bounds = getTranslationBounds(targetRect, boundingRect)
    const dx = clamp(0, bounds.left, bounds.right)
    const dy = clamp(0, bounds.top, bounds.bottom)

    if (onDrop && (dx !== 0 || dy !== 0)) onDrop(dx, dy)
  }

  return { handleRef: handleRefCallback, targetRef }
}

type DashboardPosition = {
  x: number
  y: number
}

type DashboardProps = {
  title: string
  snapThreshold?: number
  children: ReactElement<DashboardTabProps>[]
  left: ReactNode
  right: ReactNode
  // activeTab
  activeTab?: number
  defaultActiveTab?: number
  onActiveTabChange?: Dispatch<SetStateAction<number>>
  // collapsed
  collapsed?: boolean
  defaultCollapsed?: boolean
  onCollapsedChange?: Dispatch<SetStateAction<boolean>>
  // floating
  floating?: boolean
  defaultFloating?: boolean
  onFloatingChange?: Dispatch<SetStateAction<boolean>>
  // position
  position?: DashboardPosition
  defaultPosition?: DashboardPosition
  onPositionChange?: Dispatch<SetStateAction<DashboardPosition>>
}
function Dashboard(props: DashboardProps) {
  const { title, snapThreshold = 20, children, left, right } = props

  const [activeTab, setActiveTab] = usePropState(
    props.activeTab,
    props.onActiveTabChange,
    props.defaultActiveTab ?? 0
  )
  const [collapsed, setCollapsed] = usePropState(
    props.collapsed,
    props.onCollapsedChange,
    props.defaultCollapsed ?? false
  )
  const [floating, setFloating] = usePropState(
    props.floating,
    props.onFloatingChange,
    props.defaultFloating ?? false
  )
  const [position, setPosition] = usePropState(
    props.position,
    props.onPositionChange,
    props.defaultPosition ?? { x: 0, y: 0 }
  )

  const { handleRef, targetRef } = useDraggable({
    onDrop(dx, dy) {
      setPosition(oldPosition => {
        const newPosition = { x: oldPosition.x + dx, y: oldPosition.y + dy }

        if (newPosition.y < snapThreshold) {
          setFloating(false)
          return oldPosition
        }

        return newPosition
      })
    }
  })

  const floatingStyle: CSSProperties = {
    position: "absolute",
    left: position.x,
    top: position.y
  }

  const renderTabs = () =>
    React.Children.map(children, (child, index) => (
      <button
        key={index}
        onClick={() => {
          if (activeTab === index) {
            setCollapsed(!collapsed)
          } else {
            setActiveTab(index)
            setCollapsed(false)
          }
        }}
      >
        {child.props.title} {!collapsed && activeTab === index && "(x)"}
      </button>
    ))

  return (
    <>
      <Flex
        ref={targetRef}
        bg="accent"
        color="white"
        p={2}
        alignItems="center"
        style={floating ? floatingStyle : undefined}
        onDoubleClick={event => {
          const target = event.target as HTMLElement
          // ignore double clicks on buttons, inputs and their children
          if (target.closest("button, input")) return
          setFloating(!floating)
        }}
      >
        <Flex flex={1} justifyContent="flex-start">
          {left}
          {!floating && renderTabs()}
        </Flex>
        {floating ? (
          <Box mx={2} ref={handleRef} key="title-drag" style={{ cursor: "move" }}>
            {title}
          </Box>
        ) : (
          <Box mx={2} key="title">
            {title}
          </Box>
        )}
        <Flex flex={1} justifyContent="flex-end">
          {right}
          <SimpleButton
            icon={floating ? "arrow-right" : "arrow-left"}
            variant="text"
            style={{ color: "white", fill: "currentColor" }}
            onClick={() => setFloating(!floating)}
          />
        </Flex>
      </Flex>
      {!floating && !collapsed && (
        <Flex bg="primary" p={2}>
          <Flex flex={1}>{children[activeTab].props.children}</Flex>
          <SimpleButton icon="triangle-up" variant="text" onClick={() => setCollapsed(true)} />
        </Flex>
      )}
    </>
  )
}

type DashboardTabProps = {
  title: string
  children: ReactNode
}
function DashboardTab(props: DashboardTabProps) {
  return null
}

type DashboardToolbarProps = {
  title: string
  children: ReactNode
}
function DashboardToolbar(props: DashboardToolbarProps) {
  return (
    <Flex flexDirection="column" mr={4}>
      {props.children}
      <b>{props.title}</b>
    </Flex>
  )
}

export default function() {
  const left = (
    <SimpleButton
      icon="home"
      variant="text"
      style={{ color: "white", fill: "currentColor" }}
      mr={2}
    />
  )
  const right = (
    <>
      <SimpleButton
        icon="alert"
        variant="text"
        style={{ color: "white", fill: "currentColor" }}
        mr={2}
      />
      <Input placeholder="Quick Search" mr={2} />
    </>
  )

  return (
    <>
      <Dashboard title="Playground" left={left} right={right}>
        <DashboardTab title="Tab 1">
          <DashboardToolbar title="Toolbar 1-1">Content 1-1</DashboardToolbar>
          <DashboardToolbar title="Toolbar 1-2">Content 1-2</DashboardToolbar>
          <DashboardToolbar title="Toolbar 1-3">Content 1-3</DashboardToolbar>
        </DashboardTab>
        <DashboardTab title="Tab 2">
          <DashboardToolbar title="Toolbar 2-1">Content 2-1</DashboardToolbar>
        </DashboardTab>
        <DashboardTab title="Tab 3">
          <DashboardToolbar title="Toolbar 3-1">Content 3-1</DashboardToolbar>
          <DashboardToolbar title="Toolbar 3-2">Content 3-2</DashboardToolbar>
        </DashboardTab>
      </Dashboard>
    </>
  )
}
