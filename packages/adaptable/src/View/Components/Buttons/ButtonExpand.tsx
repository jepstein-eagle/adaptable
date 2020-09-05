import * as React from 'react';
import SimpleButton, { SimpleButtonProps } from '../../../components/SimpleButton';

export class ButtonExpand extends React.Component<SimpleButtonProps, {}> {
  render() {
    return (
      <SimpleButton
        data-name="expand"
        tooltip="Expand"
        iconSize={20}
        icon="arrowexpand"
        variant="text"
        {...this.props}
      />
    );
  }
}
