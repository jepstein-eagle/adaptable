import * as React from 'react';
import { ReactNode, useState, SyntheticEvent, useRef } from 'react';
import { Box, BoxProps } from 'rebass';
import join from '../utils/join';
import { getSize } from '../icons/DefaultIcon';

type TypeProps = {
  checked?: boolean | null;
  disabled?: boolean;
  as?: any;
  name?: string;
  value?: any;
  variant?: 'default' | 'agGrid';
  onChange?: (checked: boolean, event: SyntheticEvent) => void;
  children?: ReactNode;
  gapDistance?: number | string;
  childrenPosition?: 'start' | 'end';
};

export interface CheckBoxProps extends TypeProps, Omit<BoxProps, keyof TypeProps> {}

const CheckBox = ({
  children,
  checked,
  onChange,
  value,
  name,
  disabled,
  variant = 'default',
  gapDistance = 'var(--ab-space-1)',
  childrenPosition = 'end',
  as = 'label',
  ...props
}: CheckBoxProps) => {
  const [stateChecked, setStateChecked] = useState<boolean>(false);

  const computedChecked = checked !== undefined ? checked : stateChecked;

  const onInputChange = (event: React.SyntheticEvent) => {
    const newChecked = (event.target as any).checked;

    if (checked === undefined) {
      setStateChecked(newChecked);
    }

    if (onChange) {
      onChange(newChecked, event);
    }
  };

  const gap = <div style={{ marginLeft: gapDistance, display: 'inline-block' }} />;

  children = <div style={{ display: 'inline-block' }}>{children}</div>;

  const before = childrenPosition === 'start' ? children : null;
  const beforeGap = childrenPosition === 'start' ? gap : null;

  const after = childrenPosition === 'end' ? children : null;
  const afterGap = childrenPosition === 'end' ? gap : null;

  let indeterminate = computedChecked === null;

  const checkboxRef = useRef<HTMLInputElement>();
  React.useEffect(() => {
    checkboxRef.current!.indeterminate = indeterminate;
  }, [indeterminate]);

  return (
    <Box
      my={2}
      {...props}
      className={join('ab-CheckBox', disabled ? 'ab-CheckBox--disabled' : '', props.className)}
      style={{
        display: 'inline-flex',
        flexFlow: 'row',
        alignItems: 'center',
        cursor: 'pointer',
        position: 'relative',
        ...props.style,
      }}
      as={as}
    >
      {before}
      {beforeGap}
      <input
        className="ab-CheckBox-input"
        ref={checkboxRef}
        disabled={disabled}
        checked={!!computedChecked}
        type="checkbox"
        name={name}
        value={value}
        style={{
          verticalAlign: 'middle',
          opacity: 0,
          cursor: 'pointer',
          position: 'relative',
          top: -2,
        }}
        onChange={onInputChange}
      />

      {variant !== 'agGrid' ? (
        <svg viewBox="0 0 40 40" height={getSize(19)} className="ab-CheckBox-svg">
          <rect x="2" y="2" width="36" height="36" />

          {indeterminate ? (
            <rect x="10" y="10" width="20" height="20" style={{ fill: 'currentColor' }}></rect>
          ) : (
            <polyline points="9,22 18,30 33,14" />
          )}
        </svg>
      ) : (
        <span className={`ag-icon ag-icon-checkbox-${computedChecked ? 'checked' : 'unchecked'}`} />
      )}

      {afterGap}
      {after}
    </Box>
  );
};

export default CheckBox;
