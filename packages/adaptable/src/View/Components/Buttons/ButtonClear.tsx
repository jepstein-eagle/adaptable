import * as React from 'react';
import SimpleButton, { SimpleButtonProps } from '../../../components/SimpleButton';

export interface ClearButtonProps extends SimpleButtonProps {
  showText?: boolean;
  showIcon?: boolean;
}

export class ButtonClear extends React.Component<ClearButtonProps, {}> {
  render() {
    return (
      <SimpleButton
        data-name="clear"
        tooltip="Clear"
        iconSize={20}
        icon={this.props.showIcon == false ? '' : 'clear'}
        {...this.props}
        variant="text"
      >
        {this.props.showText ? 'Clear' : ''}
      </SimpleButton>
    );
  }
}
