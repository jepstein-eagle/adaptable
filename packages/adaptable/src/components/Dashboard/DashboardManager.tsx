import React, { useMemo, useContext, createContext } from 'react';
import { DragDropContext, Draggable, Droppable, DropResult } from 'react-beautiful-dnd';
import SimpleButton from '../SimpleButton';
import { Icon } from '../icons';
import { DashboardTab } from '../../PredefinedConfig/DashboardState';
import { AdaptableDashboardToolbar } from '../../PredefinedConfig/Common/Types';

export interface DashboardToolbar {
  Id: AdaptableDashboardToolbar | string;
  Title: string;
}

const DashboardManagerContext = createContext<{
  availableToolbars: DashboardToolbar[];
}>({
  availableToolbars: [],
});

const getToolbarTitle = (availableToolbars: DashboardToolbar[], toolbarId: string) => {
  const found = availableToolbars.find(t => t.Id === toolbarId);
  return found ? found.Title : toolbarId;
};

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
            border: '1px solid var(--ab-color-primarydark)',
            borderRadius: 'var(--ab__border-radius)',
            marginRight: 'var(--ab-space-2)',
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
              padding: 'var(--ab-space-1)',
              borderBottom: '1px solid var(--ab-color-primarydark)',
            }}
          >
            <div {...provided.dragHandleProps} style={{}}>
              <Icon name="drag" />
            </div>

            <input
              type="text"
              value={tab.Name}
              style={{
                flex: 1,
                width: '100%',
                border: 'none',
                marginLeft: 'var(--ab-space-1)',
                marginRight: 'var(--ab-space-1)',
                alignSelf: 'stretch',
              }}
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
  toolbars: string[];
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
  toolbar: string;
  toolbarIndex: number;
  onRemove: () => void;
}) {
  const { availableToolbars } = useContext(DashboardManagerContext);
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
            border: '1px solid var(--ab-color-primary)',
            backgroundColor: snapshot.isDragging ? 'lightgreen' : 'var(--ab-color-primarylight)',
            paddingLeft: 'var(--ab-space-1)',
            marginBottom: 'var(--ab-space-1)',
          }}
        >
          <div style={{ flex: 1 }}>{getToolbarTitle(availableToolbars, toolbar)}</div>
          <SimpleButton icon="clear" variant="text" padding={1} onClick={onRemove} />
        </div>
      )}
    </Draggable>
  );
}

function UnusedPanel({ toolbars }: { toolbars: string[] }) {
  return (
    <div
      style={{
        border: '1px solid var(--ab-color-primarydark)',
        borderRadius: 'var(--ab__border-radius)',
        marginBottom: 'var(--ab-space-2)',
        backgroundColor: 'var(--ab-color-defaultbackground)',
      }}
    >
      <div style={{ padding: 6 }}>Unused Toolbars</div>
      <UnusedToolbarList toolbars={toolbars} />
    </div>
  );
}

function UnusedToolbarList({ toolbars }: { toolbars: string[] }) {
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
            paddingLeft: 'var(--ab-space-2)',
            paddingRight: 'var(--ab-space-2)',
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

function UnusedToolbarItem({ toolbar, toolbarIndex }: { toolbar: string; toolbarIndex: number }) {
  const { availableToolbars } = useContext(DashboardManagerContext);
  return (
    <Draggable draggableId={toolbar} index={toolbarIndex}>
      {(provided, snapshot) => (
        <div
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          style={{
            ...provided.draggableProps.style,
            border: '1px solid var(--ab-color-primary)',
            backgroundColor: snapshot.isDragging ? 'lightgreen' : 'var(--ab-color-primarylight)',
            padding: 'var(--ab-space-1) var(--ab-space-2)',
            marginRight: 'var(--ab-space-1)',
            marginBottom: 'var(--ab-space-1)',
          }}
        >
          {getToolbarTitle(availableToolbars, toolbar)}
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
  availableToolbars: DashboardToolbar[];
}) {
  const contextValue = useMemo(
    () => ({
      availableToolbars,
    }),
    [availableToolbars]
  );

  const unusedToolbars = useMemo(
    () =>
      availableToolbars
        .map(t => t.Id)
        .filter(toolbar => {
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
      <DashboardManagerContext.Provider value={contextValue}>
        <div style={{ display: 'flex', flexDirection: 'column' }}>
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
        </div>
      </DashboardManagerContext.Provider>
    </DragDropContext>
  );
}

export default DashboardManager;
