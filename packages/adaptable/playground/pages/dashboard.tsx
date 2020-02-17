import Input from "../../src/components/Input"
import SimpleButton from "../../src/components/SimpleButton"
import { Dashboard, DashboardTab, DashboardToolbar } from "../../src/components/Dashboard"

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
