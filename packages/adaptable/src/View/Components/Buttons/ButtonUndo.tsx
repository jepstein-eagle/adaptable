import * as React from 'react';
import SimpleButton, { SimpleButtonProps } from '../../../components/SimpleButton';

export class ButtonUndo extends React.Component<SimpleButtonProps, {}> {
  render() {
    return (
      <SimpleButton
        data-name="undo"
        iconSize={20}
        tooltip="Undo"
        icon={'undo'}
        variant="text"
        {...this.props}
      />
    );
  }
}
