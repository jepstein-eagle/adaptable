import React, { ReactNode, useState, SyntheticEvent } from 'react';
import styled, { keyframes } from 'styled-components';
import { Box, BoxProps } from 'rebass';

const checked = keyframes`
  100% {
    stroke-dashoffset: 0;
  }
`;

const CheckSvg = styled.svg`
  position: absolute;
  z-index: 1;
  top: 0px;
  left: -3px;
  pointer-events: none;
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
  &:focus + svg rect {
    stroke: var(--ab-color-accent);
    stroke-width: 2;
  }
  &:focus + svg {
    outline: 2px solid var(--ab-color-accent);
  }
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
  checked?: boolean;
  as?: any;
  name?: string;
  value?: any;
  onChange?: (checked: boolean, event: SyntheticEvent) => void;
  children?: ReactNode;
  gapDistance?: number;
  childrenPosition?: 'start' | 'end';
};

export interface CheckBoxProps extends TypeProps, Omit<BoxProps, keyof TypeProps> {}

const CheckBox = ({
  children,
  checked,
  onChange,
  value,
  name,
  gapDistance = 10,
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

  const before = childrenPosition === 'start' ? children : null;
  const beforeGap = childrenPosition === 'start' ? gap : null;

  const after = childrenPosition === 'end' ? children : null;
  const afterGap = childrenPosition === 'end' ? gap : null;

  return (
    <Box
      my={2}
      {...props}
      style={{
        display: 'inline-flex',
        flexFlow: 'row',
        cursor: 'pointer',
        position: 'relative',
        ...props.style,
      }}
      as={as}
    >
      {before}
      {beforeGap}
      <CheckboxInput
        checked={computedChecked}
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

      <CheckSvg viewBox="0 0 40 40" height={20}>
        <rect x="2" y="2" width="36" height="36" />
        <polyline points="9,22 18,30 33,14" />
      </CheckSvg>

      {afterGap}
      {after}
    </Box>
  );
};

export default CheckBox;
