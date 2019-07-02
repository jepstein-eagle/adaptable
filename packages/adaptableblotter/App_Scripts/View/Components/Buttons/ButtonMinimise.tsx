import * as React from 'react';

import * as StyleConstants from '../../../Utilities/Constants/StyleConstants';
import SimpleButton, { SimpleButtonProps } from '../../../components/SimpleButton';

export class ButtonMinimise extends React.Component<SimpleButtonProps, {}> {
  render() {
    return (
      <SimpleButton
        px={2}
        py={0}
        tooltip="Minimise"
        {...this.props}
        style={{
          ...this.props.style,
          color: 'currentColor',
        }}
        variant="text"
        icon="arrow-up"
      />
    );
  }
}
