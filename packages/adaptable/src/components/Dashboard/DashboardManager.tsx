import React, { useMemo } from 'react';
import { DragDropContext, Draggable, Droppable, DropResult } from 'react-beautiful-dnd';
import SimpleButton from '../SimpleButton';
import { Icon } from '../icons';
import { AdaptableDashboardToolbar } from '../../PredefinedConfig/Common/Types';
import { DashboardTab } from '../../PredefinedConfig/DashboardState';

function TabList({
  tabs,
  onRemoveTab,
  onRemoveToolbar,
  onChangeTabName,
}: {
  tabs: DashboardTab[];
  onRemoveTab: (tabIndex: number) => void;
  onRemoveToolbar: (tabIndex: number, toolbarIndex: number) => void;
  onChangeTabName: (tabIndex: number, tabName: string) => void;
}) {
  return (
    <Droppable droppableId="MAIN" type="TAB" direction="horizontal">
      {provided => (
        <div ref={provided.innerRef} {...provided.droppableProps} style={{ display: 'flex' }}>
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
  );
}

function TabItem({
  tab,
  tabIndex,
  onRemove,
  onRemoveToolbar,
  onChangeTabName,
}: {
  tab: DashboardTab;
  tabIndex: number;
  onRemove: () => void;
  onRemoveToolbar: (toolbarIndex: number) => void;
  onChangeTabName: (tabName: string) => void;
}) {
  return (
    <Draggable draggableId={String(tabIndex)} index={tabIndex}>
      {provided => (
        <div
          ref={provided.innerRef}
          {...provided.draggableProps}
          style={{
            ...provided.draggableProps.style,
            boxSizing: 'border-box',
            border: '1px solid #ccc',
            borderRadius: 4,
            marginRight: 6,
            width: 160,
            display: 'flex',
            flexDirection: 'column',
            backgroundColor: 'white',
          }}
        >
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              padding: 4,
              borderBottom: '1px solid #ccc',
            }}
          >
            <div {...provided.dragHandleProps} style={{}}>
              <Icon name="drag" />
            </div>

            <input
              type="text"
              value={tab.Name}
              style={{ flex: 1, width: '100%', border: 'none', marginLeft: 4, marginRight: 4 }}
              onChange={event => {
                onChangeTabName(event.target.value);
              }}
            />
            <SimpleButton icon="delete" variant="text" onClick={onRemove} />
          </div>

          <ToolbarList
            toolbars={tab.Toolbars}
            droppableId={String(tabIndex)}
            onRemove={onRemoveToolbar}
          />
        </div>
      )}
    </Draggable>
  );
}

function ToolbarList({
  toolbars,
  droppableId,
  onRemove,
}: {
  toolbars: AdaptableDashboardToolbar[];
  droppableId: string;
  onRemove: (toolbarIndex: number) => void;
}) {
  return (
    <Droppable droppableId={droppableId} type="TOOLBAR">
      {(provided, snapshot) => (
        <div
          ref={provided.innerRef}
          {...provided.droppableProps}
          style={{
            flex: 1,
            padding: 4,
            paddingBottom: 0,
            background: snapshot.isDraggingOver ? 'skyblue' : '',
            minHeight: 200,
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
  );
}

function ToolbarItem({
  toolbar,
  toolbarIndex,
  onRemove,
}: {
  toolbar: AdaptableDashboardToolbar;
  toolbarIndex: number;
  onRemove: () => void;
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
            display: 'flex',
            alignItems: 'center',
            backgroundColor: snapshot.isDragging ? 'lightgreen' : '#ddd',
            paddingLeft: 4,
            marginBottom: 4,
          }}
        >
          <div style={{ flex: 1 }}>{toolbar}</div>
          <SimpleButton icon="clear" variant="text" padding={1} onClick={onRemove} />
        </div>
      )}
    </Draggable>
  );
}

function UnusedPanel({ toolbars }: { toolbars: AdaptableDashboardToolbar[] }) {
  return (
    <div
      style={{
        border: '1px solid #ccc',
        borderRadius: 4,
        marginBottom: 6,
        backgroundColor: 'white',
      }}
    >
      <div style={{ padding: 6 }}>Unused Toolbars</div>
      <UnusedToolbarList toolbars={toolbars} />
    </div>
  );
}

function UnusedToolbarList({ toolbars }: { toolbars: AdaptableDashboardToolbar[] }) {
  return (
    <Droppable droppableId="UNUSED" type="TOOLBAR" isDropDisabled={true} direction="horizontal">
      {provided => (
        <div
          ref={provided.innerRef}
          {...provided.droppableProps}
          style={{
            display: 'flex',
            flexDirection: 'row',
            flexWrap: 'wrap',
            paddingLeft: 6,
            paddingRight: 6,
          }}
        >
          {toolbars.map((toolbar, toolbarIndex) => (
            <UnusedToolbarItem key={toolbar} toolbar={toolbar} toolbarIndex={toolbarIndex} />
          ))}
          {provided.placeholder}
        </div>
      )}
    </Droppable>
  );
}

function UnusedToolbarItem({
  toolbar,
  toolbarIndex,
}: {
  toolbar: AdaptableDashboardToolbar;
  toolbarIndex: number;
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
            backgroundColor: snapshot.isDragging ? 'lightgreen' : '#ddd',
            padding: 4,
            marginRight: 4,
            marginBottom: 4,
          }}
        >
          {toolbar}
        </div>
      )}
    </Draggable>
  );
}

function DashboardManager({
  tabs,
  onTabsChange,
  availableToolbars,
}: {
  tabs: DashboardTab[];
  onTabsChange: (tabs: DashboardTab[]) => void;
  availableToolbars: AdaptableDashboardToolbar[];
}) {
  const unusedToolbars = useMemo(
    () =>
      availableToolbars.filter(toolbar => {
        return !tabs.some(tab => tab.Toolbars.includes(toolbar));
      }),
    [tabs, availableToolbars]
  );

  const handleToolbarDragEnd = (result: DropResult) => {
    const { source, destination, draggableId } = result;

    if (!source || !destination) return;

    if (source.droppableId !== 'UNUSED') {
      const sourceTabToolbars = tabs[Number(source.droppableId)].Toolbars;
      sourceTabToolbars.splice(source.index, 1);
    }

    if (destination.droppableId !== 'UNUSED') {
      const destinationTabToolbars = tabs[Number(destination.droppableId)].Toolbars;
      destinationTabToolbars.splice(destination.index, 0, draggableId as AdaptableDashboardToolbar);
    }

    onTabsChange([...tabs]);
  };

  const handleTabDragEnd = (result: DropResult) => {
    const { source, destination } = result;

    if (!source || !destination) return;

    const [removed] = tabs.splice(source.index, 1);
    tabs.splice(destination.index, 0, removed);

    onTabsChange([...tabs]);
  };

  const handleRemoveTab = (tabIndex: number) => {
    onTabsChange(tabs.filter((_, index) => index !== tabIndex));
  };

  const handleTabAdd = () => {
    onTabsChange([...tabs, { Name: 'New Tab', Toolbars: [] }]);
  };

  const handleRemoveToolbar = (tabIndex: number, toolbarIndex: number) => {
    onTabsChange(
      tabs.map((tab, index) => {
        if (index !== tabIndex) return tab;
        return {
          ...tab,
          Toolbars: tab.Toolbars.filter((_, index) => index !== toolbarIndex),
        };
      })
    );
  };

  const handleChangeTabName = (tabIndex: number, tabName: string) => {
    onTabsChange(
      tabs.map((tab, index) => {
        if (index !== tabIndex) return tab;
        return {
          ...tab,
          Name: tabName,
        };
      })
    );
  };

  return (
    <DragDropContext
      onDragEnd={result => {
        if (result.type === 'TAB') handleTabDragEnd(result);
        if (result.type === 'TOOLBAR') handleToolbarDragEnd(result);
      }}
    >
      <UnusedPanel toolbars={unusedToolbars} />
      <div style={{ display: 'flex', flex: 1 }}>
        <TabList
          tabs={tabs}
          onRemoveTab={handleRemoveTab}
          onRemoveToolbar={handleRemoveToolbar}
          onChangeTabName={handleChangeTabName}
        />
        <SimpleButton onClick={handleTabAdd} px={3}>
          Add Tab
        </SimpleButton>
      </div>
    </DragDropContext>
  );
}

export default DashboardManager;
