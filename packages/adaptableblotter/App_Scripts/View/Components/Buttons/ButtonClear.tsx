import * as React from 'react';
import SimpleButton, { SimpleButtonProps } from '../../../components/SimpleButton';

export class ButtonClear extends React.Component<SimpleButtonProps, {}> {
  render() {
    return (
      <SimpleButton
        px={2}
        py={1}
        tooltip="Clear"
        iconSize={20}
        icon="clear"
        {...this.props}
        variant="text"
      />
    );
  }
}
