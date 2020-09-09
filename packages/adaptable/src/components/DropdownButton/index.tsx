import * as React from 'react';

import { cloneElement, useRef, ReactNode } from 'react';
import { BoxProps } from 'rebass';
import join from '../utils/join';

import SimpleButton, { SimpleButtonProps } from '../SimpleButton';

import useExpanded, { ExpandedProps } from './useExpanded';
import renderItem from './renderItem';
import DropdownButtonItem from './DropdownButtonItem';
import OverlayTrigger, { OverlayTriggerProps } from '../OverlayTrigger';
import { Icon } from '../icons';

const ICON = (
  <svg width="20" height="20" viewBox="0 0 24 24">
    <path d="M7 10l5 5 5-5H7z" />
  </svg>
);

const spacer = <div style={{ flex: 1 }} />;

export type DropdownButtonProps = BoxProps &
  React.HTMLProps<HTMLElement> &
  SimpleButtonProps &
  ExpandedProps & {
    collapseOnItemClick?: boolean;

    columns?: string[];
    overlayProps?: OverlayTriggerProps;
    listOffset?: number;
    items?: DropdownButtonItem[];
    idProperty?: string;
    showClearButton?: boolean;
    onClear?: () => void;
    clearButtonProps?: SimpleButtonProps;
    listItemClassName?: string;
    listStyle?: React.CSSProperties;
    listMinWidth?: number;
    listItemStyle?:
      | React.CSSProperties
      | ((item: DropdownButtonItem, index: number) => React.CSSProperties);
    isItemDisabled?: (item: DropdownButtonItem) => boolean | undefined;
  };

const baseClassName = 'ab-DropdownButton';

const defaultListItemStyle = {
  padding: 'var(--ab-cmp-dropdownbutton-list-item__padding)',
};

const DropdownButton = (props: DropdownButtonProps) => {
  let {
    columns,
    overlayProps,
    listOffset = 10,
    collapseOnItemClick = true,

    idProperty = 'id',
    isItemDisabled,
    items,
    children,
    listMinWidth = 100,
    listStyle,
    listItemStyle,
    listItemClassName,
    constrainTo,
    showClearButton = false,
    onClear,
    clearButtonProps,
    ...domProps
  } = props;

  isItemDisabled = isItemDisabled || (item => item.disabled);

  if (!columns) {
    columns = ['icon', 'label'];
  }

  let content: ReactNode;

  if (Array.isArray(items)) {
    content = items.map((item, index) => {
      if (item.separator) {
        return (
          <tr className={`${baseClassName}__separator`} key={index}>
            <td colSpan={2}></td>
          </tr>
        );
      }
      if (typeof listItemStyle === 'function') {
        listItemStyle = listItemStyle(item, index);
      }

      const itemStyle = { ...defaultListItemStyle, ...listItemStyle };
      const itemClassName = join(
        `${baseClassName}__list-item`,
        item.clickable === false
          ? `${baseClassName}__list-item--not-clickable`
          : `${baseClassName}__list-item--clickable`,
        listItemClassName
      );
      const disabled = isItemDisabled!(item);

      const getItemHandler = (eventName: string) => {
        return (e: React.SyntheticEvent) => {
          if (!disabled) {
            if ((item as any)[eventName]) {
              (item as any)[eventName](e, item);
            }
          }
          if (collapseOnItemClick) {
            if (!disabled) {
              setExpanded(false);
            }
          } else {
            ((e.nativeEvent as unknown) as any).preventCollapse = true;
          }
        };
      };

      const domProps: any = {};
      if (item.onChange) {
        domProps.onChange = getItemHandler('onChange');
      }

      return renderItem({
        index,
        idProperty,
        onItemClick: getItemHandler('onClick'),
        domProps,
        className: itemClassName,
        style: itemStyle,
        item,
        columns: columns!,
      });
    });

    content = (
      <table className={`${baseClassName}__content`}>
        <tbody>{content}</tbody>
      </table>
    );
  }

  const className = join(props.className, baseClassName);

  const positionerRef = useRef<HTMLDivElement>(null);
  const { expanded, toggle, setExpanded, positionInfo } = useExpanded(props, positionerRef);

  const { maxHeight: maxListHeight, maxWidth: maxListWidth } = positionInfo;

  listStyle = {
    minWidth:
      typeof maxListWidth === 'number' ? Math.min(listMinWidth, maxListWidth) : listMinWidth,
    maxHeight: maxListHeight,
    maxWidth: maxListWidth,
    overflow: 'auto',

    border: 'var(--ab-cmp-dropdownbutton-list__border)',
    borderRadius: 'var(--ab-cmp-dropdownbutton-list__border-radius)',
    zIndex: ('var(--ab-cmp-dropdownbutton-list__z-index)' as unknown) as number,
    background: 'var(--ab-cmp-dropdownbutton-list__background)',
    ...listStyle,
  };
  let icon = expanded
    ? cloneElement(ICON, {
        style: {
          ...ICON.props.style,
          transform: 'rotate(180deg) translate3d(0px, -2px, 0px)',
        },
      })
    : ICON;

  const hasClearButton = onClear || showClearButton;

  const clearButton = hasClearButton ? (
    <SimpleButton
      disabled={domProps.disabled}
      onClick={event => {
        event.stopPropagation();
        if (onClear) {
          onClear();
        }
      }}
      ml={2}
      padding={0}
      variant={domProps.variant}
      icon="clear"
      {...clearButtonProps}
      style={{
        ...clearButtonProps?.style,
        visibility: showClearButton ? 'visible' : 'hidden',
      }}
    />
  ) : null;

  icon = (
    <>
      {spacer}
      {hasClearButton ? clearButton : null}
      {icon}
    </>
  );

  return (
    <OverlayTrigger
      visible={expanded}
      constrainTo={constrainTo}
      anchor="vertical"
      targetOffset={listOffset}
      render={() => {
        return (
          <div style={listStyle} className={`${baseClassName}__list`}>
            {content}
          </div>
        );
      }}
      {...overlayProps}
      target={domProps.tooltip ? node => node.previousSibling as HTMLElement : undefined}
    >
      <SimpleButton
        icon={icon}
        iconPosition="end"
        paddingRight={0}
        {...domProps}
        style={{ overflow: 'visible', ...domProps.style, outline: 'none' }}
        className={className}
        onClick={(e: any) => {
          if (domProps.onClick) {
            domProps.onClick(e);
          }
          if (e.nativeEvent.preventCollapse && expanded) {
            return;
          }
          toggle();
        }}
        onKeyDown={(e: any) => {
          if (domProps.onKeyDown) {
            domProps.onKeyDown(e);
          }
          if (expanded && e.key === 'Escape') {
            toggle();
          }
        }}
        onBlur={(e: any) => {
          if (domProps.onBlur) {
            domProps.onBlur(e);
          }

          setExpanded(false);
        }}
      >
        <div
          ref={positionerRef}
          tabIndex={-1}
          style={{
            position: 'absolute',
            height: '100%',
            width: '100%',
            zIndex: -1,
            pointerEvents: 'none',
            opacity: 0,
            top: 0,
            left: 0,
          }}
        />
        {children}
      </SimpleButton>
    </OverlayTrigger>
  );
};

export default DropdownButton;
