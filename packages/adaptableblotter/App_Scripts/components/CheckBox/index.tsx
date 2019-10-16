import * as React from 'react';
import { ReactNode, useState, SyntheticEvent, useRef } from 'react';
import styled, { keyframes } from 'styled-components';
import { Box, BoxProps } from 'rebass';
import join from '../utils/join';
import { getSize } from '../icons/DefaultIcon';

const checked = keyframes`
  100% {
    stroke-dashoffset: 0;
  }
`;

const CheckSvg = styled.svg`
  position: relative;
  z-index: 1;

  pointer-events: none;

  color: var(--ab-color-inputcolor);
  background: var(--ab-color-defaultbackground);

  rect,
  polyline {
    fill: none;
    stroke-width: 4;
  }
  rect {
    stroke: currentColor;
  }
`;

const CheckboxInput = styled.input`
  width: 0;
  &:focus + svg rect {
    stroke: var(--ab-color-inputcolor);
    stroke-width: 2;
  }
  &:focus + svg {
    outline: 2px solid var(--ab-color-focus);
  }
  &:indeterminate + svg rect,
  &:checked + svg rect,
  &:checked + svg polyline {
    stroke: currentColor;
  }
  &:checked + svg polyline {
    animation: ${checked} 0.5s ease forwards;
    stroke-dasharray: 50;
    stroke-dashoffset: 50;
  }
`;

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
      <CheckboxInput
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
        <CheckSvg viewBox="0 0 40 40" height={getSize(19)}>
          <rect x="2" y="2" width="36" height="36" />

          {indeterminate ? (
            <rect x="10" y="10" width="20" height="20" style={{ fill: 'currentColor' }}></rect>
          ) : (
            <polyline points="9,22 18,30 33,14" />
          )}
        </CheckSvg>
      ) : (
        <span className={`ag-icon ag-icon-checkbox-${computedChecked ? 'checked' : 'unchecked'}`} />
      )}

      {afterGap}
      {after}
    </Box>
  );
};

export default CheckBox;
