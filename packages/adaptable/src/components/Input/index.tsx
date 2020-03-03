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
  inputRef?: React.RefObject<HTMLInputElement>;
} & BoxProps;

const Input = (props: InputProps) => {
  const { disabled, className, inputRef, ...inputProps } = props;

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
      ref={inputRef}
      type={type}
      disabled={disabled}
      className={join(
        className,
        baseClassName,
        type ? `${baseClassName}--type-${type}` : '',
        disabled ? `${baseClassName}--disabled` : ''
      )}
    />
  );
};

export default Input;
