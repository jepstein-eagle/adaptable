import * as React from 'react';
import SimpleButton, { SimpleButtonProps } from '../../../components/SimpleButton';

export class ButtonConfigure extends React.Component<SimpleButtonProps, {}> {
  render() {
    return (
      <SimpleButton
        tooltip="Configure"
        px={2}
        py={1}
        iconSize={18}
        icon="build"
        {...this.props}
        variant="text"
      />
    );
  }
}
