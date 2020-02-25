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
  toolbars: ToolbarName[]
}

type ToolbarName = string

function TabList({ tabs, onRemove }: { tabs: Tab[]; onRemove: (index: number) => void }) {
  return (
    <Droppable droppableId="MAIN" type="TAB" direction="horizontal">
      {(provided, snapshot) => (
        <div ref={provided.innerRef} {...provided.droppableProps} style={{ display: "flex" }}>
          {tabs.map((tab, index) =>
            index === 0 ? null : <Tab key={index} index={index} tab={tab} onRemove={onRemove} />
          )}
          {provided.placeholder}
        </div>
      )}
    </Droppable>
  )
}

function Tab({
  tab,
  index,
  onRemove
}: {
  tab: Tab
  index: number
  onRemove: (index: number) => void
}) {
  return (
    <Draggable draggableId={String(index)} index={index}>
      {(draggableProvided, draggableSnapshot) => (
        <div
          ref={draggableProvided.innerRef}
          {...draggableProvided.draggableProps}
          style={{
            ...draggableProvided.draggableProps.style,
            border: "1px solid #ccc",
            borderRadius: 4,
            marginRight: 10,
            width: 200,
            display: "flex",
            flexDirection: "column",
            backgroundColor: "white"
          }}
        >
          <h2 {...draggableProvided.dragHandleProps} style={{ textAlign: "center" }}>
            {tab.name}
            <button onClick={() => onRemove(index)}>x</button>
          </h2>
          <ToolbarList toolbars={tab.toolbars} droppableId={String(index)} />
        </div>
      )}
    </Draggable>
  )
}

function ToolbarList({ toolbars, droppableId }: { toolbars: ToolbarName[]; droppableId: string }) {
  return (
    <Droppable droppableId={droppableId} type="TOOLBAR">
      {(droppableProvided, droppableSnapshot) => (
        <div
          ref={droppableProvided.innerRef}
          {...droppableProvided.droppableProps}
          style={{
            flex: 1,
            padding: 10,
            background: droppableSnapshot.isDraggingOver ? "skyblue" : "white"
          }}
        >
          {toolbars.map((toolbarName, index) => (
            <Toolbar key={toolbarName} index={index} toolbarName={toolbarName} />
          ))}
          {droppableProvided.placeholder}
        </div>
      )}
    </Droppable>
  )
}

function Toolbar({ toolbarName, index }: { toolbarName: ToolbarName; index: number }) {
  return (
    <Draggable draggableId={toolbarName} index={index}>
      {(provided, snapshot) => (
        <div
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          style={{
            ...provided.draggableProps.style,
            backgroundColor: snapshot.isDragging ? "lightgreen" : "#ddd",
            padding: 10,
            marginBottom: 10
          }}
        >
          {toolbarName}
        </div>
      )}
    </Draggable>
  )
}

function UnusedToolbars({ toolbars }: { toolbars: ToolbarName[] }) {
  return (
    <div
      style={{
        border: "1px solid #ccc",
        borderRadius: 4,
        marginRight: 10,
        width: 200,
        display: "flex",
        flexDirection: "column",
        backgroundColor: "white"
      }}
    >
      <h2 style={{ textAlign: "center" }}>Unused</h2>
      <ToolbarList toolbars={toolbars} droppableId={String(0)} />
    </div>
  )
}

function DashboardManagement({
  tabs,
  onTabsChange,
  availableToolbars
}: {
  tabs: Tab[]
  onTabsChange: (tabs: Tab[]) => void
  availableToolbars: ToolbarName[]
}) {
  const [localTabs, setLocalTabs] = useState<Tab[]>(() => {
    const unusedToolbars = availableToolbars.filter(toolbarName => {
      return !tabs.some(tab => tab.toolbars.includes(toolbarName))
    })
    return [{ name: "Unused", toolbars: unusedToolbars }, ...tabs]
  })

  useEffect(() => {
    onTabsChange(localTabs.slice(1))
  }, [localTabs])

  const handleToolbarDragEnd = (result: DropResult) => {
    const { source, destination } = result

    if (!source || !destination) return

    const newLocalTabs = [...localTabs]

    const sourceTab = newLocalTabs[Number(source.droppableId)]
    const [removed] = sourceTab.toolbars.splice(source.index, 1)

    const destinationTab = newLocalTabs[Number(destination.droppableId)]
    destinationTab.toolbars.splice(destination.index, 0, removed)

    setLocalTabs(newLocalTabs)
  }

  const handleTabDragEnd = (result: DropResult) => {
    const { source, destination } = result

    if (!source || !destination) return

    const newLocalTabs = [...localTabs]

    const [removed] = newLocalTabs.splice(source.index, 1)
    newLocalTabs.splice(destination.index, 0, removed)

    setLocalTabs(newLocalTabs)
  }

  const handleTabRemove = (index: number) => {
    const newLocalTabs = [...localTabs]

    newLocalTabs.splice(index, 1)

    setLocalTabs(newLocalTabs)
  }

  const handleTabAdd = () => {
    setLocalTabs([...localTabs, { name: "New Tab", toolbars: [] }])
  }

  return (
    <DragDropContext
      onDragEnd={result => {
        if (result.type === "TAB") handleTabDragEnd(result)
        if (result.type === "TOOLBAR") handleToolbarDragEnd(result)
      }}
    >
      <div style={{ display: "flex", flex: 1 }}>
        <UnusedToolbars toolbars={localTabs[0].toolbars} />
        <TabList tabs={localTabs} onRemove={handleTabRemove} />
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
    <DashboardManagement
      availableToolbars={["T1", "T2", "T3", "T4", "T5"]}
      tabs={tabs}
      onTabsChange={setTabs}
    />
  )
}

Page.getInitialProps = () => {
  resetServerContext()
  return {}
}
