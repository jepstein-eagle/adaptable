import * as React from 'react';
import SimpleButton, { SimpleButtonProps } from '../../../components/SimpleButton';

export class ButtonSave extends React.Component<SimpleButtonProps, {}> {
  render() {
    return (
      <SimpleButton
        px={2}
        py={1}
        iconSize={20}
        icon="save"
        tooltip="Save"
        variant="text"
        {...this.props}
      />
    );
  }
}
