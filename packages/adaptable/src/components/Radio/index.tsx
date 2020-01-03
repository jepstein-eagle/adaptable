import * as React from 'react';
import { ReactNode, useState, SyntheticEvent } from 'react';
import { Box, BoxProps } from 'rebass';

type TypeProps = {
  checked?: boolean;
  as?: any;
  name?: string;
  value?: any;
  onChange?: (checked: boolean, event?: SyntheticEvent | any) => void;
  children?: ReactNode | JSX.Element;
  gapDistance?: number;
  childrenPosition?: 'start' | 'end';
};

export interface RadioProps extends TypeProps, Omit<BoxProps, keyof TypeProps> {}

const Radio = ({
  children,
  checked,
  onChange,
  value,
  name,
  gapDistance = 10,
  childrenPosition = 'end',
  as = 'label',
  id,
  ...props
}: RadioProps) => {
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
      className="ab-Radio"
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
      <input
        className="ab-Radio-input"
        id={id}
        checked={computedChecked}
        type="radio"
        name={name}
        value={value}
        style={{
          verticalAlign: 'middle',

          borderRadius: '50%',
          cursor: 'pointer',
          position: 'relative',
        }}
        onChange={onInputChange}
      />

      {afterGap}
      {after}
    </Box>
  );
};

export default Radio;
