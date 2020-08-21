import * as React from 'react';

import SimpleButton, { SimpleButtonProps } from '../../../components/SimpleButton';

export class ButtonEdit extends React.Component<SimpleButtonProps, {}> {
  render() {
    return (
      <SimpleButton
        data-name="edit"
        tooltip="Edit"
        variant="text"
        icon="edit"
        iconSize={20}
        {...this.props}
      />
    );
  }
}
