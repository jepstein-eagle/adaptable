import * as React from 'react';
import SimpleButton, { SimpleButtonProps } from '../../../components/SimpleButton';

export interface FunctionButtonProps extends SimpleButtonProps {}

export class ButtonFunction extends React.Component<FunctionButtonProps, {}> {
  render() {
    return (
      <SimpleButton
        data-name="function"
        tooltip="Function"
        iconSize={20}
        icon="function"
        mr={1}
        {...this.props}
      />
    );
  }
}
