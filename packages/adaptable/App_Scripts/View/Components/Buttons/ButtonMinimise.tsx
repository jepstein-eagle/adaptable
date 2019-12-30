import * as React from 'react';

import SimpleButton, { SimpleButtonProps } from '../../../components/SimpleButton';

export class ButtonMinimise extends React.Component<SimpleButtonProps, {}> {
  render() {
    return (
      <SimpleButton
        iconSize={20}
        tooltip="Minimise"
        {...this.props}
        variant="text"
        icon="arrow-up"
      />
    );
  }
}
