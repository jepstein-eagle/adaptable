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
  activeTab?: number
  setActiveTab?: Dispatch<SetStateAction<number>>
  children: ReactElement<DashboardTabProps>[]
}
function Dashboard({ children, activeTab, setActiveTab }: DashboardProps) {
  const [activeTabProxy, setActiveTabProxy] = useProxyState<number>(activeTab, setActiveTab, 0)
  return (
    <>
      <Flex bg="accent" color="white" p={2} alignItems="center">
        <Flex flex={1} justifyContent="flex-start">
          <SimpleButton
            icon="home"
            variant="text"
            style={{ color: "white", fill: "currentColor" }}
          />
          {Children.map(children, (child, index) => (
            <button key={index} onClick={() => setActiveTabProxy(index)}>
              {child.props.title} {activeTabProxy === index && "(x)"}
            </button>
          ))}
        </Flex>
        <Box>Center</Box>
        <Flex flex={1} justifyContent="flex-end">
          <Input placeholder="Quick Search" mr={2} />
          <SimpleButton
            icon="arrow-left"
            variant="text"
            style={{ color: "white", fill: "currentColor" }}
          />
        </Flex>
      </Flex>
      <Flex bg="primary" p={2}>
        {children[activeTabProxy].props.children}
      </Flex>
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
  const [activeTab, setActiveTab] = useState(2)
  return (
    <>
      <Dashboard activeTab={activeTab} setActiveTab={setActiveTab}>
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
