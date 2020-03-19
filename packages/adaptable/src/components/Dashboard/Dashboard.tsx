import { ReactElement, ReactNode, Dispatch, SetStateAction, CSSProperties, useRef } from 'react';
import * as React from 'react';
import usePropState from '../utils/usePropState';
import useDraggable from '../utils/useDraggable';
import SimpleButton from '../SimpleButton';
import { DashboardTabProps } from './DashboardTab';
import join from '../utils/join';
import useProperty from '../utils/useProperty';
import { Box } from 'rebass';
import { DashboardToolbar } from './DashboardToolbar';
import Dropdown from '../Dropdown';
import ArrayExtensions from '../../Utilities/Extensions/ArrayExtensions';

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
  // inline
  inline?: boolean;
  defaultInline?: boolean;
  onInlineChange?: Dispatch<SetStateAction<boolean>>;
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
  const [inline, setInline] = useProperty(props, 'inline', false);
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

  const renderTabsDropdown = () => (
    <Dropdown
      style={{
        border: 'none',
        marginLeft: 4,
      }}
      disabled={children && children.length == 1}
      value={String(activeTab)}
      onChange={tab => setActiveTab(Number(tab))}
      showEmptyItem={false}
      options={
        children
          ? React.Children.map(children, (child, index) => ({
              value: String(index),
              label: child.props.title,
            }))
          : []
      }
      showClearButton={false}
    />
  );

  const renderBar = () => (
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
      <div className="ab-Dashboard__bar-right">{right}</div>
    </div>
  );

  const renderHomeToolbar = () => (
    <DashboardToolbar
      className="ab-Dashboard__home-toolbar"
      title={title}
      onConfigure={onShowDashboardPopup}
    >
      {left}
      {right}
      {renderTabsDropdown()}
    </DashboardToolbar>
  );

  return (
    <div
      // @ts-ignore
      ref={targetRef}
      className={join(
        'ab-Dashboard',
        collapsed ? 'ab-Dashboard--collapsed' : '',
        floating ? 'ab-Dashboard--floating' : '',
        inline ? 'ab-Dashboard--inline' : ''
      )}
      style={floating ? floatingStyle : undefined}
    >
      {inline && !floating && !collapsed ? renderHomeToolbar() : renderBar()}
      {children && children.length && !floating && !collapsed ? (
        <div className="ab-Dashboard__content">
          {children[activeTab] ? children[activeTab].props.children : null}
        </div>
      ) : null}
    </div>
  );
}
