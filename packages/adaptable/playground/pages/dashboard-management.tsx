import { DragDropContext, Draggable, Droppable, resetServerContext } from "react-beautiful-dnd"
import { useState } from "react"

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

function List({ tab }: { tab: Tab }) {
  return (
    <Droppable droppableId={tab.name}>
      {(provided, snapshot) => (
        <div
          style={{
            border: "1px solid #ccc",
            borderRadius: 4,
            marginRight: 10,
            width: 200,
            display: "flex",
            flexDirection: "column",
            background: snapshot.isDraggingOver ? "skyblue" : "white"
          }}
        >
          <h2 style={{ textAlign: "center" }}>{tab.name}</h2>

          <div
            ref={provided.innerRef}
            {...provided.droppableProps}
            style={{ flex: 1, padding: 10 }}
          >
            {tab.toolbars.map((toolbar, index) => (
              <Item key={toolbar} index={index} toolbar={toolbar} />
            ))}
            {provided.placeholder}
          </div>
        </div>
      )}
    </Droppable>
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
  return (
    <DragDropContext
      onDragEnd={result => {
        const { source, destination } = result

        if (!source || !destination) return

        const sourceToolbars = data.find(tab => tab.name === source.droppableId)!.toolbars
        const destinationToolbars = data.find(tab => tab.name === destination.droppableId)!.toolbars

        const [removed] = sourceToolbars.splice(result.source.index, 1)
        destinationToolbars.splice(result.destination!.index, 0, removed)

        setData(data)
      }}
    >
      <div style={{ display: "flex", flex: 1 }}>
        {data.map((tab, index) => (
          <List key={tab.name} tab={tab} />
        ))}
      </div>
    </DragDropContext>
  )
}

DashboardManagement.getInitialProps = () => {
  resetServerContext()
  return {}
}
