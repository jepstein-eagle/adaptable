import * as React from 'react';

import { Box, BoxProps } from 'rebass';
import { ReactNode, HTMLProps } from 'react';
import join from '../utils/join';

export const baseClassName = 'ab-Textarea';

export type TextareaProps = HTMLProps<HTMLTextAreaElement> & {
  placehoder?: string;
  type?: string;
  disabled?: boolean;
} & BoxProps;

const Textarea = (props: TextareaProps) => {
  let {
    disabled,

    className,
    ...textareaProps
  } = props;

  let type = 'text';

  if (textareaProps && textareaProps.type) {
    type = textareaProps.type;
  }

  if (type === 'string') {
    type = 'text';
  }
  return (
    <Box
      as="textarea"
      {...textareaProps}
      type={type}
      disabled={disabled}
      className={join(className, baseClassName, disabled ? `${baseClassName}--disabled` : '')}
    />
  );
};

export default Textarea;
