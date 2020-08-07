import * as React from 'react';
import SimpleButton, { SimpleButtonProps } from '../../../components/SimpleButton';

export class ButtonConfigure extends React.Component<SimpleButtonProps, {}> {
  render() {
    return (
      <SimpleButton
        data-name="configure"
        tooltip="Configure"
        iconSize={18}
        icon="build"
        {...this.props}
        variant="text"
      />
    );
  }
}
