import * as React from 'react';
import SimpleButton, { SimpleButtonProps } from '../../../components/SimpleButton';

export class ButtonShow extends React.Component<SimpleButtonProps, {}> {
  render() {
    return (
      <SimpleButton
        tooltip="Show"
        px={2}
        py={1}
        iconSize={18}
        icon="check"
        variant="text"
        {...this.props}
      />
    );
  }
}
