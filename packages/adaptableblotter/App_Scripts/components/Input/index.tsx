import * as React from 'react';

import { Box, BoxProps } from 'rebass';
import { ReactNode, HTMLProps } from 'react';
import join from '../utils/join';

export const baseClassName = 'ab-Input';

export type InputProps = HTMLProps<HTMLInputElement> & {
  placehoder?: string;
  type?: string;
  disabled?: boolean;
  list?: any;
} & BoxProps;

const Input = (props: InputProps) => {
  const {
    disabled,

    className,
    ...inputProps
  } = props;

  let type = 'text';

  if (inputProps && inputProps.type) {
    type = inputProps.type;
  }

  if (type === 'string') {
    type = 'text';
  }
  return (
    <Box
      as="input"
      {...inputProps}
      type={type}
      disabled={disabled}
      className={join(className, baseClassName, disabled ? `${baseClassName}--disabled` : '')}
    />
  );
};

export default Input;
