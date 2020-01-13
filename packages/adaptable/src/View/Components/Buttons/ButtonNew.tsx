import * as React from 'react';
import SimpleButton, { SimpleButtonProps } from '../../../components/SimpleButton';

export const ButtonNew = (props: SimpleButtonProps) => {
  return (
    <SimpleButton tooltip="New" tone="accent" icon="plus" variant="raised" {...props}>
      {props.children === undefined ? 'New' : props.children}
    </SimpleButton>
  );
};
