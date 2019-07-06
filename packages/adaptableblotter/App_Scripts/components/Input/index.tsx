import * as React from 'react';

import { Box, BoxProps } from 'rebass';
import { ReactNode, HTMLProps } from 'react';
import join from '../utils/join';

export const baseClassName = 'ab-Input';

export type InputProps = HTMLProps<HTMLElement> & {
  placehoder?: string;
  type?: string;
  disabled?: boolean;
} & BoxProps;

const Input = (props: InputProps) => {
  let {
    disabled,

    className,
    ...inputProps
  } = props;

  return (
    <Box
      as="input"
      type="text"
      {...inputProps}
      disabled={disabled}
      className={join(className, baseClassName, disabled ? `${baseClassName}--disabled` : '')}
    />
  );
};

export default Input;
