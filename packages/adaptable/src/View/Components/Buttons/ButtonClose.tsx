import * as React from 'react';
import SimpleButton, { SimpleButtonProps } from '../../../components/SimpleButton';

export class ButtonClose extends React.Component<SimpleButtonProps, {}> {
  render() {
    return (
      <SimpleButton
        data-name="close"
        tooltip="Close"
        iconSize={20}
        icon="clear"
        {...this.props}
        variant="text"
      />
    );
  }
}
