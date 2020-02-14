import Input from "../../src/components/Input"
import HomeIcon from "../../src/components/icons/home"
import SimpleButton from "../../src/components/SimpleButton"
import { Box, Flex } from "rebass"
import React, {
  useState,
  ReactNode,
  ReactElement,
  Dispatch,
  SetStateAction,
  useRef,
  useEffect,
  useCallback,
  CSSProperties
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

function useDraggable(onDrop: (dx: number, dy: number) => void) {
  const startRef = useRef({ x: 0, y: 0 })
  const handleRef = useRef<HTMLElement>()
  const targetRef = useRef<HTMLElement>()

  const handleRefCallback = useCallback(newNode => {
    const oldNode = handleRef.current

    if (oldNode) {
      oldNode.removeEventListener("mousedown", handleMouseDown)
    }

    if (newNode) {
      newNode.addEventListener("mousedown", handleMouseDown)
    }

    handleRef.current = newNode
  }, [])

  const applyTransform = (dx: number, dy: number) => {
    if (!targetRef.current) return
    targetRef.current.style.transform = `translate3d(${dx}px, ${dy}px, 0)`
  }

  const handleMouseDown = (event: MouseEvent) => {
    startRef.current.x = event.pageX
    startRef.current.y = event.pageY
    document.addEventListener("mouseup", handleMouseUp)
    document.addEventListener("mousemove", handleMouseMove)
  }

  const handleMouseUp = (event: MouseEvent) => {
    applyTransform(0, 0)
    onDrop(event.pageX - startRef.current.x, event.pageY - startRef.current.y)
    document.removeEventListener("mouseup", handleMouseUp)
    document.removeEventListener("mousemove", handleMouseMove)
  }

  const handleMouseMove = (event: MouseEvent) => {
    applyTransform(event.pageX - startRef.current.x, event.pageY - startRef.current.y)
  }

  return { handleRef: handleRefCallback, targetRef }
}

type DashboardPosition = {
  x: number
  y: number
}

type DashboardProps = {
  title: string
  activeTab?: number
  onActiveTabChange?: Dispatch<SetStateAction<number>>
  collapsed?: boolean
  onCollapsedChange?: Dispatch<SetStateAction<boolean>>
  floating?: boolean
  onFloatingChange?: Dispatch<SetStateAction<boolean>>
  position?: DashboardPosition
  onPositionChange?: Dispatch<SetStateAction<DashboardPosition>>
  snapThreshold?: number
  children: ReactElement<DashboardTabProps>[]
}
function Dashboard({
  title,
  activeTab: controlledActiveTab,
  onActiveTabChange: onControlledActiveTabChange,
  collapsed: controlledCollapsed,
  onCollapsedChange: onControlledCollapsedChange,
  floating: controlledFloating,
  onFloatingChange: onControlledFloatingChange,
  position: controlledPosition,
  onPositionChange: onControlledPositionChange,
  snapThreshold = 20,
  children
}: DashboardProps) {
  const [activeTab, setActiveTab] = usePropState(
    controlledActiveTab,
    onControlledActiveTabChange,
    0
  )
  const [collapsed, setCollapsed] = usePropState(
    controlledCollapsed,
    onControlledCollapsedChange,
    false
  )
  const [floating, setFloating] = usePropState(
    controlledFloating,
    onControlledFloatingChange,
    false
  )
  const [position, setPosition] = usePropState(controlledPosition, onControlledPositionChange, {
    x: 0,
    y: 0
  })

  const { handleRef, targetRef } = useDraggable((dx, dy) => {
    setPosition(oldPosition => {
      const newPosition = { x: oldPosition.x + dx, y: oldPosition.y + dy }

      if (newPosition.y < snapThreshold) {
        setFloating(false)
        return oldPosition
      }

      return newPosition
    })
  })

  const floatingStyle: CSSProperties = {
    position: "absolute",
    left: position.x,
    top: position.y
  }

  return (
    <>
      <Flex
        ref={targetRef}
        bg="accent"
        color="white"
        p={2}
        alignItems="center"
        style={floating ? floatingStyle : undefined}
      >
        <Flex flex={1} justifyContent="flex-start">
          <SimpleButton
            icon="home"
            variant="text"
            style={{ color: "white", fill: "currentColor" }}
          />
          {!floating &&
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
            ))}
        </Flex>
        {floating ? (
          <Box
            mx={2}
            ref={handleRef}
            key="title-drag"
            style={{ cursor: "move" }}
            onDoubleClick={() => setFloating(false)}
          >
            {title}
          </Box>
        ) : (
          <Box mx={2} key="title">
            {title}
          </Box>
        )}
        <Flex flex={1} justifyContent="flex-end">
          <Input placeholder="Quick Search" mr={2} />
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
  return (
    <>
      <Dashboard title="Playground">
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
