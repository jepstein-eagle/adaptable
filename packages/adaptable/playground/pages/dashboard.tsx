import Input from "../../src/components/Input"
import SimpleButton from "../../src/components/SimpleButton"
import { Dashboard, DashboardTab, DashboardToolbar } from "../../src/components/Dashboard"

export default function() {
  const left = (
    <SimpleButton icon="home" variant="text" style={{ color: "white", fill: "currentColor" }} />
  )
  const right = (
    <>
      <SimpleButton
        icon="alert"
        variant="text"
        style={{ color: "white", fill: "currentColor" }}
        mr={2}
      />
      <Input placeholder="Quick Search" />
    </>
  )

  return (
    <>
      <Dashboard title="Playground" left={left} right={right}>
        <DashboardTab title="Tab 1">
          <DashboardToolbar title="Toolbar 1-1">
            <SimpleButton icon="alert" variant="text" />
            <SimpleButton icon="info" variant="text" />
            <SimpleButton icon="play" variant="text" />
            <SimpleButton icon="plus" variant="text" />
            <SimpleButton icon="save" variant="text" />
          </DashboardToolbar>
          <DashboardToolbar title="Toolbar 1-2">
            <SimpleButton icon="spark-line" variant="text" />
            <SimpleButton icon="build" variant="text" />
            <SimpleButton icon="chart" variant="text" />
            <SimpleButton icon="check" variant="text" />
            <SimpleButton icon="clear" variant="text" />
          </DashboardToolbar>
          <DashboardToolbar title="Toolbar 1-3">
            <SimpleButton icon="error" variant="text" />
            <SimpleButton icon="login" variant="text" />
            <SimpleButton icon="fast-forward" variant="text" />
            <SimpleButton icon="folder" variant="text" />
            <SimpleButton icon="layout" variant="text" />
            <SimpleButton icon="comment" variant="text" />
          </DashboardToolbar>
        </DashboardTab>
        <DashboardTab title="Tab 2">
          <DashboardToolbar title="Toolbar 2-1">
            <SimpleButton icon="error" variant="text" />
            <SimpleButton icon="login" variant="text" />
            <SimpleButton icon="fast-forward" variant="text" />
            <SimpleButton icon="folder" variant="text" />
            <SimpleButton icon="layout" variant="text" />
            <SimpleButton icon="comment" variant="text" />
          </DashboardToolbar>
        </DashboardTab>
        <DashboardTab title="Tab 3">
          <DashboardToolbar title="Toolbar 3-1">
            <SimpleButton icon="spark-line" variant="text" />
            <SimpleButton icon="build" variant="text" />
            <SimpleButton icon="chart" variant="text" />
            <SimpleButton icon="check" variant="text" />
            <SimpleButton icon="clear" variant="text" />
          </DashboardToolbar>
          <DashboardToolbar title="Toolbar 3-2">
            <SimpleButton icon="error" variant="text" />
            <SimpleButton icon="login" variant="text" />
            <SimpleButton icon="fast-forward" variant="text" />
            <SimpleButton icon="folder" variant="text" />
            <SimpleButton icon="layout" variant="text" />
            <SimpleButton icon="comment" variant="text" />
          </DashboardToolbar>
        </DashboardTab>
      </Dashboard>
    </>
  )
}
