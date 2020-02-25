import React, { useState, ReactNode, useEffect, useMemo } from "react"
import {
  DragDropContext,
  Draggable,
  Droppable,
  DropResult,
  resetServerContext
} from "react-beautiful-dnd"

type Tab = {
  name: string
  toolbars: Toolbar[]
}

type Toolbar = string

function TabList({
  tabs,
  onRemoveTab,
  onRemoveToolbar,
  onChangeTabName
}: {
  tabs: Tab[]
  onRemoveTab: (tabIndex: number) => void
  onRemoveToolbar: (tabIndex: number, toolbarIndex: number) => void
  onChangeTabName: (tabIndex: number, tabName: string) => void
}) {
  return (
    <Droppable droppableId="MAIN" type="TAB" direction="horizontal">
      {provided => (
        <div ref={provided.innerRef} {...provided.droppableProps} style={{ display: "flex" }}>
          {tabs.map((tab, tabIndex) => (
            <TabItem
              key={tabIndex}
              tabIndex={tabIndex}
              tab={tab}
              onRemove={() => onRemoveTab(tabIndex)}
              onRemoveToolbar={toolbarIndex => onRemoveToolbar(tabIndex, toolbarIndex)}
              onChangeTabName={tabName => onChangeTabName(tabIndex, tabName)}
            />
          ))}
          {provided.placeholder}
        </div>
      )}
    </Droppable>
  )
}

function TabItem({
  tab,
  tabIndex,
  onRemove,
  onRemoveToolbar,
  onChangeTabName
}: {
  tab: Tab
  tabIndex: number
  onRemove: () => void
  onRemoveToolbar: (toolbarIndex: number) => void
  onChangeTabName: (tabName: string) => void
}) {
  return (
    <Draggable draggableId={String(tabIndex)} index={tabIndex}>
      {provided => (
        <div
          ref={provided.innerRef}
          {...provided.draggableProps}
          style={{
            ...provided.draggableProps.style,
            boxSizing: "border-box",
            border: "1px solid #ccc",
            borderRadius: 4,
            marginRight: 10,
            width: 200,
            display: "flex",
            flexDirection: "column",
            backgroundColor: "white"
          }}
        >
          <div
            style={{
              display: "flex",
              alignItems: "center",
              padding: 10,
              borderBottom: "1px solid #ccc"
            }}
          >
            <div
              {...provided.dragHandleProps}
              style={{ width: 16, height: 16, background: "black", marginRight: 10 }}
            />
            <input
              type="text"
              value={tab.name}
              style={{ flex: 1, width: "100%", border: "none" }}
              onChange={event => {
                onChangeTabName(event.target.value)
              }}
            />
            <button onClick={onRemove} style={{ appearance: "none" }}>
              x
            </button>
          </div>

          <ToolbarList
            toolbars={tab.toolbars}
            droppableId={String(tabIndex)}
            onRemove={onRemoveToolbar}
          />
        </div>
      )}
    </Draggable>
  )
}

function ToolbarList({
  toolbars,
  droppableId,
  onRemove
}: {
  toolbars: Toolbar[]
  droppableId: string
  onRemove: (toolbarIndex: number) => void
}) {
  return (
    <Droppable droppableId={droppableId} type="TOOLBAR">
      {(provided, snapshot) => (
        <div
          ref={provided.innerRef}
          {...provided.droppableProps}
          style={{
            flex: 1,
            padding: 10,
            background: snapshot.isDraggingOver ? "skyblue" : "white"
          }}
        >
          {toolbars.map((toolbar, toolbarIndex) => (
            <ToolbarItem
              key={toolbar}
              toolbar={toolbar}
              toolbarIndex={toolbarIndex}
              onRemove={() => onRemove(toolbarIndex)}
            />
          ))}
          {provided.placeholder}
        </div>
      )}
    </Droppable>
  )
}

function ToolbarItem({
  toolbar,
  toolbarIndex,
  onRemove
}: {
  toolbar: Toolbar
  toolbarIndex: number
  onRemove: () => void
}) {
  return (
    <Draggable draggableId={toolbar} index={toolbarIndex}>
      {(provided, snapshot) => (
        <div
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          style={{
            ...provided.draggableProps.style,
            display: "flex",
            alignItems: "center",
            backgroundColor: snapshot.isDragging ? "lightgreen" : "#ddd",
            padding: 10,
            marginBottom: 10
          }}
        >
          <div style={{ flex: 1 }}>{toolbar}</div>
          <button onClick={onRemove}>x</button>
        </div>
      )}
    </Draggable>
  )
}

function UnusedPanel({ toolbars }: { toolbars: Toolbar[] }) {
  return (
    <div
      style={{
        border: "1px solid #ccc",
        borderRadius: 4,
        marginBottom: 10,
        backgroundColor: "white"
      }}
    >
      <div style={{ padding: 10 }}>Unused</div>
      <UnusedToolbarList toolbars={toolbars} />
    </div>
  )
}

function UnusedToolbarList({ toolbars }: { toolbars: Toolbar[] }) {
  return (
    <Droppable droppableId="UNUSED" type="TOOLBAR" isDropDisabled={true} direction="horizontal">
      {provided => (
        <div
          ref={provided.innerRef}
          {...provided.droppableProps}
          style={{
            display: "flex",
            flexDirection: "row",
            paddingLeft: 10,
            paddingRight: 10
          }}
        >
          {toolbars.map((toolbar, toolbarIndex) => (
            <UnusedToolbarItem key={toolbar} toolbar={toolbar} toolbarIndex={toolbarIndex} />
          ))}
          {provided.placeholder}
        </div>
      )}
    </Droppable>
  )
}

function UnusedToolbarItem({ toolbar, toolbarIndex }: { toolbar: Toolbar; toolbarIndex: number }) {
  return (
    <Draggable draggableId={toolbar} index={toolbarIndex}>
      {(provided, snapshot) => (
        <div
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          style={{
            ...provided.draggableProps.style,
            backgroundColor: snapshot.isDragging ? "lightgreen" : "#ddd",
            padding: 10,
            marginRight: 10,
            marginBottom: 10
          }}
        >
          {toolbar}
        </div>
      )}
    </Draggable>
  )
}

function DashboardManagement({
  tabs,
  onTabsChange,
  availableToolbars
}: {
  tabs: Tab[]
  onTabsChange: (tabs: Tab[]) => void
  availableToolbars: Toolbar[]
}) {
  const unusedToolbars = useMemo(
    () =>
      availableToolbars.filter(toolbar => {
        return !tabs.some(tab => tab.toolbars.includes(toolbar))
      }),
    [tabs, availableToolbars]
  )

  const handleToolbarDragEnd = (result: DropResult) => {
    const { source, destination, draggableId } = result

    if (!source || !destination) return

    if (source.droppableId !== "UNUSED") {
      const sourceTabToolbars = tabs[Number(source.droppableId)].toolbars
      sourceTabToolbars.splice(source.index, 1)
    }

    if (destination.droppableId !== "UNUSED") {
      const destinationTabToolbars = tabs[Number(destination.droppableId)].toolbars
      destinationTabToolbars.splice(destination.index, 0, draggableId)
    }

    onTabsChange([...tabs])
  }

  const handleTabDragEnd = (result: DropResult) => {
    const { source, destination } = result

    if (!source || !destination) return

    const [removed] = tabs.splice(source.index, 1)
    tabs.splice(destination.index, 0, removed)

    onTabsChange([...tabs])
  }

  const handleRemoveTab = (tabIndex: number) => {
    onTabsChange([...tabs].filter((_, index) => index !== tabIndex))
  }

  const handleTabAdd = () => {
    onTabsChange([...tabs, { name: "New Tab", toolbars: [] }])
  }

  const handleRemoveToolbar = (tabIndex: number, toolbarIndex: number) => {
    onTabsChange(
      tabs.map((tab, index) => {
        if (index !== tabIndex) return tab
        return {
          ...tab,
          toolbars: [...tab.toolbars].filter((_, index) => index !== toolbarIndex)
        }
      })
    )
  }

  const handleChangeTabName = (tabIndex: number, tabName: string) => {
    onTabsChange(
      tabs.map((tab, index) => {
        if (index !== tabIndex) return tab
        return {
          ...tab,
          name: tabName
        }
      })
    )
  }

  return (
    <DragDropContext
      onDragEnd={result => {
        if (result.type === "TAB") handleTabDragEnd(result)
        if (result.type === "TOOLBAR") handleToolbarDragEnd(result)
      }}
    >
      <UnusedPanel toolbars={unusedToolbars} />
      <div style={{ display: "flex", flex: 1 }}>
        <TabList
          tabs={tabs}
          onRemoveTab={handleRemoveTab}
          onRemoveToolbar={handleRemoveToolbar}
          onChangeTabName={handleChangeTabName}
        />
        <button onClick={handleTabAdd}>Add Tab</button>
      </div>
    </DragDropContext>
  )
}

export default function Page() {
  const [tabs, setTabs] = useState<Tab[]>([
    { name: "Tab 1", toolbars: ["T1"] },
    { name: "Tab 2", toolbars: ["T4", "T5"] },
    { name: "Tab 3", toolbars: [] }
  ])
  return (
    <>
      <DashboardManagement
        availableToolbars={["T1", "T2", "T3", "T4", "T5", "T6", "T7"]}
        tabs={tabs}
        onTabsChange={setTabs}
      />
      {/* <pre>{JSON.stringify(tabs, null, 2)}</pre> */}
    </>
  )
}

Page.getInitialProps = () => {
  resetServerContext()
  return {}
}
