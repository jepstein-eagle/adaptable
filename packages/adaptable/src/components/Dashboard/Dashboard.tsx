import { ReactElement, ReactNode, Dispatch, SetStateAction, CSSProperties, useRef } from 'react';
import * as React from 'react';
import usePropState from '../utils/usePropState';
import useDraggable from '../utils/useDraggable';
import SimpleButton from '../SimpleButton';
import { DashboardTabProps } from './DashboardTab';
import join from '../utils/join';
import useProperty from '../utils/useProperty';
import { Box } from 'rebass';

export type DashboardPosition = {
  x: number;
  y: number;
};

export type DashboardProps = {
  title: string;
  children: ReactElement<DashboardTabProps>[];
  left: ReactNode;
  right: ReactNode;
  onShowDashboardPopup?: () => void;
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
  const { title, children, left, right, onShowDashboardPopup } = props;

  const [activeTab, setActiveTab] = useProperty(props, 'activeTab', 0);
  const [collapsed, setCollapsed] = useProperty(props, 'collapsed', false);
  const [floating, setFloating] = useProperty(props, 'floating', false);
  const [position, setPosition] = useProperty(props, 'position', { x: 0, y: 0 });

  const { handleRef, targetRef } = useDraggable({
    onDrop(dx: number, dy: number) {
      setPosition(({ x, y }) => {
        return { x: x + dx, y: y + dy };
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
      {children &&
        React.Children.map(children, (child, index) => (
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
          {right}{' '}
          {onShowDashboardPopup && (
            <SimpleButton
              icon="settings"
              variant="text"
              tone="accent"
              onClick={() => onShowDashboardPopup()}
              tooltip="Configure Dashboard"
              ml={2}
            />
          )}
          <SimpleButton
            icon={floating ? 'arrow-right' : 'arrow-left'}
            variant="text"
            tone="accent"
            onClick={() => setFloating(!floating)}
          />
        </div>
      </div>
      {children && children.length && !floating && !collapsed ? (
        <div className="ab-Dashboard__content">
          <div className="ab-Dashboard__content-inner">
            {children[activeTab] ? children[activeTab].props.children : null}
          </div>
          <div className="ab-Dashboard__content-buttons">
            <SimpleButton
              icon="clear"
              variant="text"
              onClick={() => setCollapsed(true)}
              tooltip="Collapse Dashboard"
              mb={1}
            />
            {onShowDashboardPopup && (
              <SimpleButton
                icon="settings"
                variant="text"
                onClick={() => onShowDashboardPopup()}
                tooltip="Configure Dashboard"
              />
            )}
          </div>
        </div>
      ) : null}
    </div>
  );
}