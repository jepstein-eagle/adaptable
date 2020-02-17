import { ReactElement, ReactNode, Dispatch, SetStateAction, CSSProperties } from 'react';
import usePropState from '../utils/usePropState';
import useDraggable from '../utils/useDraggable';
import React from 'react';
import { Flex, Box } from 'rebass';
import SimpleButton from '../SimpleButton';
import { DashboardTabProps } from './DashboardTab';

export type DashboardPosition = {
  x: number;
  y: number;
};

export type DashboardProps = {
  title: string;
  snapThreshold?: number;
  children: ReactElement<DashboardTabProps>[];
  left: ReactNode;
  right: ReactNode;
  // activeTab
  activeTab?: number;
  defaultActiveTab?: number;
  onActiveTabChange?: Dispatch<SetStateAction<number>>;
  // collapsed
  collapsed?: boolean;
  defaultCollapsed?: boolean;
  onCollapsedChange?: Dispatch<SetStateAction<boolean>>;
  // floating
  floating?: boolean;
  defaultFloating?: boolean;
  onFloatingChange?: Dispatch<SetStateAction<boolean>>;
  // position
  position?: DashboardPosition;
  defaultPosition?: DashboardPosition;
  onPositionChange?: Dispatch<SetStateAction<DashboardPosition>>;
};

export function Dashboard(props: DashboardProps) {
  const { title, snapThreshold = 20, children, left, right } = props;

  const [activeTab, setActiveTab] = usePropState(
    props.activeTab,
    props.onActiveTabChange,
    props.defaultActiveTab ?? 0
  );
  const [collapsed, setCollapsed] = usePropState(
    props.collapsed,
    props.onCollapsedChange,
    props.defaultCollapsed ?? false
  );
  const [floating, setFloating] = usePropState(
    props.floating,
    props.onFloatingChange,
    props.defaultFloating ?? false
  );
  const [position, setPosition] = usePropState(
    props.position,
    props.onPositionChange,
    props.defaultPosition ?? { x: 0, y: 0 }
  );

  const { handleRef, targetRef } = useDraggable({
    onDrop(dx, dy) {
      setPosition(oldPosition => {
        const newPosition = { x: oldPosition.x + dx, y: oldPosition.y + dy };

        if (newPosition.y < snapThreshold) {
          setFloating(false);
          return oldPosition;
        }

        return newPosition;
      });
    },
  });

  const floatingStyle: CSSProperties = {
    position: 'absolute',
    left: position.x,
    top: position.y,
  };

  const renderTabs = () =>
    React.Children.map(children, (child, index) => (
      <button
        key={index}
        onClick={() => {
          if (activeTab === index) {
            setCollapsed(!collapsed);
          } else {
            setActiveTab(index);
            setCollapsed(false);
          }
        }}
      >
        {child.props.title} {!collapsed && activeTab === index && '(x)'}
      </button>
    ));

  return (
    <>
      <Flex
        ref={targetRef}
        bg="accent"
        color="white"
        p={2}
        alignItems="center"
        style={floating ? floatingStyle : undefined}
        onDoubleClick={event => {
          const target = event.target as HTMLElement;
          // ignore double clicks on buttons, inputs and their children
          if (target.closest('button, input')) return;
          setFloating(!floating);
        }}
      >
        <Flex flex={1} justifyContent="flex-start">
          {left}
          {!floating && renderTabs()}
        </Flex>
        {floating ? (
          <Box mx={2} ref={handleRef} key="title-drag" style={{ cursor: 'move' }}>
            {title}
          </Box>
        ) : (
          <Box mx={2} key="title">
            {title}
          </Box>
        )}
        <Flex flex={1} justifyContent="flex-end">
          {right}
          <SimpleButton
            icon={floating ? 'arrow-right' : 'arrow-left'}
            variant="text"
            style={{ color: 'white', fill: 'currentColor' }}
            onClick={() => setFloating(!floating)}
          />
        </Flex>
      </Flex>
      {!floating && !collapsed && (
        <Flex bg="primary" p={2}>
          <Flex flex={1}>{children[activeTab].props.children}</Flex>
          <SimpleButton icon="triangle-up" variant="text" onClick={() => setCollapsed(true)} />
        </Flex>
      )}
    </>
  );
}
