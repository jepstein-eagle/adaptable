import React, { ReactElement, ReactNode, Dispatch, SetStateAction, CSSProperties } from 'react';
import usePropState from '../utils/usePropState';
import useDraggable from '../utils/useDraggable';
import SimpleButton from '../SimpleButton';
import { DashboardTabProps } from './DashboardTab';
import join from '../utils/join';

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

        // if (newPosition.y < snapThreshold) {
        //   setFloating(false);
        //   return oldPosition;
        // }

        return newPosition;
      });
    },
  });

  const floatingStyle: CSSProperties = {
    position: 'absolute',
    left: position.x,
    top: position.y,
  };

  const renderTabs = () => (
    <div className="ab-Dashboard__tabs">
      {React.Children.map(children, (child, index) => (
        <button
          className={join(
            'ab-Dashboard__tab',
            !collapsed && activeTab === index ? 'ab-Dashboard__tab--active' : ''
          )}
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
          {child.props.title}
        </button>
      ))}
    </div>
  );

  return (
    <div
      // @ts-ignore
      ref={targetRef}
      className={join(
        'ab-Dashboard',
        collapsed ? 'ab-Dashboard--collapsed' : '',
        floating ? 'ab-Dashboard--floating' : ''
      )}
      style={floating ? floatingStyle : undefined}
    >
      <div
        className="ab-Dashboard__bar"
        onDoubleClick={event => {
          const target = event.target as HTMLElement;
          // ignore double clicks on buttons, inputs and their children
          if (target.closest('button, input')) return;
          setFloating(!floating);
        }}
      >
        <div className="ab-Dashboard__bar-left">
          {left}
          {!floating && renderTabs()}
        </div>
        {floating ? (
          <div
            className="ab-Dashboard__title"
            ref={handleRef}
            key="title-drag"
            style={{ cursor: 'move' }}
          >
            {title}
          </div>
        ) : (
          <div className="ab-Dashboard__title" key="title">
            {title}
          </div>
        )}
        <div className="ab-Dashboard__bar-right">
          {right}
          <SimpleButton
            icon={floating ? 'arrow-right' : 'arrow-left'}
            variant="text"
            style={{ color: 'white', fill: 'currentColor' }}
            onClick={() => setFloating(!floating)}
            ml={2}
          />
        </div>
      </div>
      {!floating && !collapsed && (
        <div className="ab-Dashboard__content">
          <div className="ab-Dashboard__content-inner">{children[activeTab].props.children}</div>
          <SimpleButton
            icon="triangle-up"
            variant="text"
            onClick={() => setCollapsed(true)}
            m={2}
          />
        </div>
      )}
    </div>
  );
}
