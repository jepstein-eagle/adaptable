import * as React from 'react';

import { useState, useRef, ReactNode } from 'react';
import { BoxProps, Flex } from 'rebass';
import join from '../utils/join';
import useProperty from '../utils/useProperty';
import { ButtonBase } from '../../View/Components/Buttons/ButtonBase';

import Arrows from './Arrows';
import SimpleButton from '../SimpleButton';

export type DropdownOption = {
  label: string;
  value: string;
};

export type DropdownProps = Omit<BoxProps, 'onChange'> & {
  bsSize?: string;
  bsStyle?: string;

  autoFocus?: boolean;
  expanded?: boolean;
  disabled?: boolean;
  multiple?: boolean;
  allowSearch?: boolean;
  emptyText?: string;
  placeholder?: ReactNode;
  clearButtonProps?: any;

  renderLabel?: (label?: string, option?: DropdownOption) => ReactNode;

  name?: string;
  showEmptyItem?: boolean;
  options: (DropdownOption | string)[] | (() => (DropdownOption | string)[]);
  defaultExpanded?: boolean;
  showClearButton?: boolean;
  onChange?: (value: any, e?: React.SyntheticEvent, option?: DropdownOption) => void;
  onCollapse?: () => void | Function;
  onExpand?: () => void | Function;
  onSelect?: () => void | Function;
};

const baseClassName = 'ab-Dropdown';

const Dropdown = (props: DropdownProps) => {
  let {
    options,
    multiple,
    name,
    autoFocus,
    showEmptyItem = true,
    showClearButton,
    disabled,
    allowSearch,
    clearButtonProps,
    value: _,
    onChange: __,
    style,
    onExpand,
    ...boxProps
  } = props;

  if (showClearButton !== false) {
    showClearButton = true;
  }
  let [value, setValue] = useProperty<any>(props, 'value', undefined, {
    onChange: props.onChange,
  });

  let selectedOption: DropdownOption | null = null;
  let [lazyOptions, setLazyOptions] = useState<(DropdownOption | string)[]>([]);

  let onMouseDown = () => {
    if (onExpand) {
      onExpand();
    }
  };

  if (typeof options === 'function') {
    const lazyOptionsFn: () => (DropdownOption | string)[] = options;

    onMouseDown = () => {
      const newOptions: (DropdownOption | string)[] = lazyOptionsFn();
      setLazyOptions(newOptions);
      if (onExpand) {
        onExpand();
      }
    };

    options = lazyOptions;
  }

  let placeholder = props.emptyText || props.placeholder || 'Please select an option';

  const finalOptions: DropdownOption[] = (options as (DropdownOption | string)[]).map(
    (option: DropdownOption | string): DropdownOption => {
      if (typeof option === 'string') {
        option = {
          label: option,
          value: option,
        };
      }
      if (value === option.value) {
        selectedOption = option;
      }

      return option;
    }
  );

  if (showEmptyItem)
    finalOptions.splice(0, 0, {
      label: placeholder,
      value: '',
    });

  const onChange = (option: DropdownOption, e?: React.SyntheticEvent) => {
    setValue(option ? option.value : option, e, option);
  };

  const selectRef = useRef(null);
  const domRef = useRef(null);
  const [focused, setFocused] = useState(false);
  const onFocus = (e: any) => {
    if (e.target === selectRef.current) {
      setFocused(true);
      return;
    }
    if (e.target === domRef.current) {
      selectRef.current.focus();
    }
  };
  const onBlur = () => {
    setFocused(false);
  };

  const defaultLabel = selectedOption! ? selectedOption.label : null;
  let selectedText = props.renderLabel
    ? props.renderLabel(defaultLabel, selectedOption!)
    : defaultLabel;

  if (!selectedOption) {
    selectedText = placeholder;
  }

  const renderClearButton = () => (
    <SimpleButton
      variant="text"
      icon="clear"
      tone="none"
      tooltip="Clear"
      iconSize={20}
      px={0}
      py={0}
      marginRight={1}
      {...clearButtonProps}
      style={{
        zIndex: 10,
        color: 'inherit',
        ...(clearButtonProps ? clearButtonProps.style : null),
      }}
      onClick={(e: React.SyntheticEvent) => {
        e.preventDefault();
        onChange(null, e);
      }}
    />
  );
  return (
    <Flex
      ref={domRef}
      flexDirection="row"
      alignItems="center"
      {...boxProps}
      className={join(
        props.className,
        baseClassName,
        !selectedOption ? `${baseClassName}--empty` : `${baseClassName}--not-empty`,
        focused ? `${baseClassName}--focused` : `${baseClassName}--not-focused`
      )}
      style={style}
      tabIndex={focused ? -1 : props.tabIndex || 0}
      onFocus={onFocus}
      onBlur={onBlur}
    >
      <div style={{ display: 'inline-block' }} className={`${baseClassName}__text`}>
        {selectedText}

        <Arrows />
      </div>
      <select
        ref={selectRef}
        tabIndex={-1}
        disabled={disabled}
        value={value == null ? '' : value}
        onChange={(e: React.SyntheticEvent<HTMLSelectElement>) => {
          const selected = finalOptions.filter(o => o.value == (e.target as any).value)[0];
          onChange(selected, e);
        }}
        style={{ opacity: 0, width: '100%', height: '100%', top: 0, left: 0, zIndex: 1 }}
        onMouseDown={onMouseDown}
        name={name}
        multiple={multiple}
        autoFocus={autoFocus}
      >
        {finalOptions.map((o: DropdownOption) => {
          return (
            <option key={o.value} value={o.value}>
              {o.label}
            </option>
          );
        })}
      </select>
      {showClearButton && selectedOption ? renderClearButton() : null}
    </Flex>
  );
};

export default Dropdown;
