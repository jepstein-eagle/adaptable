import * as React from 'react';
import SimpleButton, { SimpleButtonProps } from '../../../components/SimpleButton';

export class ButtonInvalid extends React.Component<SimpleButtonProps, {}> {
  render() {
    return (
      <SimpleButton
        data-name="invalid"
        tooltip="Invalid"
        iconSize={20}
        icon="invalid"
        {...this.props}
      />
    );
  }
}
