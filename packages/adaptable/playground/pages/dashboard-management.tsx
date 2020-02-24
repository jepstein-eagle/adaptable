import React, { useState } from "react"
import {
  DragDropContext,
  Draggable,
  Droppable,
  DropResult,
  resetServerContext
} from "react-beautiful-dnd"

type Tab = {
  name: string
  toolbars: string[]
}

const initialData: Tab[] = [
  { name: "Unused", toolbars: ["T1", "T2", "T3"] },
  { name: "Tab 1", toolbars: [] },
  { name: "Tab 2", toolbars: [] },
  { name: "Tab 3", toolbars: [] }
]

function List({ tab, index }: { tab: Tab; index: number }) {
  const droppable = (
    <Droppable droppableId={tab.name} type="TOOLBAR">
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
          {tab.toolbars.map((toolbar, index) => (
            <Item key={toolbar} index={index} toolbar={toolbar} />
          ))}
          {droppableProvided.placeholder}
        </div>
      )}
    </Droppable>
  )

  return index === 0 ? (
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
      <h2 style={{ textAlign: "center" }}>{tab.name}</h2>
      {droppable}
    </div>
  ) : (
    <Draggable draggableId={tab.name} index={index}>
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
          </h2>
          {droppable}
        </div>
      )}
    </Draggable>
  )
}

function Item({ toolbar, index }: { toolbar: string; index: number }) {
  return (
    <Draggable draggableId={toolbar} index={index}>
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
          {toolbar}
        </div>
      )}
    </Draggable>
  )
}

export default function DashboardManagement() {
  const [data, setData] = useState(initialData)

  const handleToolbarDragEnd = (result: DropResult) => {
    const { source, destination } = result

    if (!source || !destination) return

    const sourceToolbars = data.find(tab => tab.name === source.droppableId)!.toolbars
    const destinationToolbars = data.find(tab => tab.name === destination.droppableId)!.toolbars

    const [removed] = sourceToolbars.splice(result.source.index, 1)
    destinationToolbars.splice(result.destination!.index, 0, removed)

    setData(data)
  }

  const handleTabDragEnd = (result: DropResult) => {
    const { source, destination } = result

    if (!source || !destination) return

    const [removed] = data.splice(source.index, 1)
    data.splice(destination.index, 0, removed)

    setData(data)
  }

  return (
    <DragDropContext
      onDragEnd={result => {
        if (result.type === "TAB") handleTabDragEnd(result)
        if (result.type === "TOOLBAR") handleToolbarDragEnd(result)
      }}
    >
      <Droppable droppableId="MAIN" type="TAB" direction="horizontal">
        {(provided, snapshot) => (
          <div
            ref={provided.innerRef}
            {...provided.droppableProps}
            style={{ display: "flex", flex: 1 }}
          >
            {data.map((tab, index) => (
              <List key={tab.name} index={index} tab={tab} />
            ))}
          </div>
        )}
      </Droppable>
    </DragDropContext>
  )
}

DashboardManagement.getInitialProps = () => {
  resetServerContext()
  return {}
}
