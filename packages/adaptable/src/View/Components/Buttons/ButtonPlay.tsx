import * as React from 'react';
import SimpleButton, { SimpleButtonProps } from '../../../components/SimpleButton';
import StringExtensions from '../../../Utilities/Extensions/StringExtensions';

export interface PlayButtonProps extends SimpleButtonProps {
  //  tooltipText?: string;
}

export class ButtonPlay extends React.Component<PlayButtonProps, {}> {
  render() {
    return (
      <SimpleButton
        data-name="play"
        tooltip={StringExtensions.IsNullOrEmpty(this.props.tooltip) ? 'Play' : this.props.tooltip}
        iconSize={20}
        icon="play"
        variant="text"
        {...this.props}
      />
    );
  }
}
