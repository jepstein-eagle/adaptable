import * as React from 'react';
import SimpleButton, { SimpleButtonProps } from '../../../components/SimpleButton';

export const ButtonClone = (props: SimpleButtonProps) => {
  return (
    <SimpleButton
      data-name="clone"
      tooltip="Clone"
      tone="accent"
      icon="clone"
      variant="raised"
      {...props}
    >
      {props.children === undefined ? 'Clone' : props.children}
    </SimpleButton>
  );
};
