import Input from "../../src/components/Input"
import HomeIcon from "../../src/components/icons/home"
import SimpleButton from "../../src/components/SimpleButton"
import { Box, Flex } from "rebass"
import React, { useState, Children, ReactNode, ReactElement, Dispatch, SetStateAction } from "react"

function useProxyState<S>(
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

type DashboardProps = {
  title: string
  activeTab?: number | null
  setActiveTab?: Dispatch<SetStateAction<number | null>>
  floating?: boolean
  setFloating?: Dispatch<SetStateAction<boolean>>
  children: ReactElement<DashboardTabProps>[]
}
function Dashboard({
  title,
  activeTab,
  setActiveTab,
  floating,
  setFloating,
  children
}: DashboardProps) {
  const [activeTabProxy, setActiveTabProxy] = useProxyState(activeTab, setActiveTab, 0)
  const [floatingProxy, setFloatingProxy] = useProxyState(floating, setFloating, false)

  return (
    <>
      <Flex
        bg="accent"
        color="white"
        p={2}
        alignItems="center"
        style={{
          position: floatingProxy ? "absolute" : "static"
        }}
      >
        <Flex flex={1} justifyContent="flex-start">
          <SimpleButton
            icon="home"
            variant="text"
            style={{ color: "white", fill: "currentColor" }}
          />
          {floatingProxy === false &&
            Children.map(children, (child, index) => (
              <button
                key={index}
                onClick={() => {
                  setActiveTabProxy(activeTabProxy !== index ? index : null)
                }}
              >
                {child.props.title} {activeTabProxy === index && "(x)"}
              </button>
            ))}
        </Flex>
        <Box mx={2}>{title}</Box>
        <Flex flex={1} justifyContent="flex-end">
          <Input placeholder="Quick Search" mr={2} />
          <SimpleButton
            icon="arrow-left"
            variant="text"
            style={{ color: "white", fill: "currentColor" }}
            onClick={() => setFloatingProxy(!floatingProxy)}
          />
        </Flex>
      </Flex>
      {activeTabProxy !== null && floatingProxy === false && (
        <Flex bg="primary" p={2}>
          {children[activeTabProxy].props.children}
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
