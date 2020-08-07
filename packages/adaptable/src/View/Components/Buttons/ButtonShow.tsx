import * as React from 'react';
import SimpleButton, { SimpleButtonProps } from '../../../components/SimpleButton';

export class ButtonShow extends React.Component<SimpleButtonProps, {}> {
  render() {
    return (
      <SimpleButton
        data-name="show"
        tooltip="Show"
        iconSize={18}
        icon="check"
        variant="text"
        {...this.props}
      />
    );
  }
}
