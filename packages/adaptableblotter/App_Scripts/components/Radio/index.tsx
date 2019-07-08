import React, { ReactNode, useState, SyntheticEvent } from 'react';
import styled, { keyframes } from 'styled-components';
import { Box } from 'rebass';

const checked = keyframes`
  100% {
    stroke-dashoffset: 0;
  }
`;

const RadioInput = styled.input`
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
  onChange?: (checked: boolean, event?: SyntheticEvent) => void;
  children?: ReactNode | JSX.Element;
  gapDistance?: number;
  childrenPosition?: 'start' | 'end';
};
const Radio = ({
  children,
  checked,
  onChange,
  value,
  name,
  gapDistance = 10,
  childrenPosition = 'end',
  as = 'label',
  ...props
}: Omit<HTMLInputElement, 'children'> & TypeProps) => {
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
      <RadioInput
        checked={computedChecked}
        type="radio"
        name={name}
        value={value}
        style={{
          verticalAlign: 'middle',
          // opacity: 0,
          cursor: 'pointer',
          position: 'relative',
          // top: -2,
        }}
        onChange={onInputChange}
      />

      {afterGap}
      {after}
    </Box>
  );
};

export default Radio;
