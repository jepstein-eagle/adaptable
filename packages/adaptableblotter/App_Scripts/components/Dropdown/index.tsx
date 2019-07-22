import * as React from 'react';

import { useState, useRef, ReactNode } from 'react';
import { BoxProps, Flex } from 'rebass';
import join from '../utils/join';
import useProperty from '../utils/useProperty';
import { ButtonBase } from '../../View/Components/Buttons/ButtonBase';

import Arrows from './Arrows';

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
  emptyText?: ReactNode;
  placeholder?: ReactNode;
  clearButtonProps?: any;

  renderLabel?: (label?: string, option?: DropdownOption) => ReactNode;

  name?: string;
  options: (DropdownOption | string)[];
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
    showClearButton,
    disabled,
    allowSearch,
    clearButtonProps,
    value: _,
    onChange: __,
    style,
    ...boxProps
  } = props;

  if (showClearButton !== false) {
    showClearButton = true;
  }
  let [value, setValue] = useProperty<any>(props, 'value', undefined, {
    onChange: props.onChange,
  });

  let selectedOption: DropdownOption | null = null;
  const finalOptions: DropdownOption[] = options.map(
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
    selectedText = props.emptyText || props.placeholder || 'Please select an option';
  }

  const renderClearButton = () => (
    <ButtonBase
      glyph="remove"
      {...clearButtonProps}
      style={{ zIndex: 10, ...(clearButtonProps ? clearButtonProps.style : null) }}
      onClick={e => {
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
