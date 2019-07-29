import * as React from 'react';
import * as StyleConstants from '../../../Utilities/Constants/StyleConstants';
import SimpleButton, { SimpleButtonProps } from '../../../components/SimpleButton';

export const ButtonNew = (props: SimpleButtonProps) => {
  return (
    <SimpleButton
      tooltip="New"
      tone="accent"
      icon="plus"
      variant="raised"
      {...props}
      className={props.className + StyleConstants.NEW_BUTTON}
    >
      {props.children === undefined ? 'New' : props.children}
    </SimpleButton>
  );
};
