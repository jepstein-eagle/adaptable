import * as React from 'react';
import SimpleButton, { SimpleButtonProps } from '../../../components/SimpleButton';

export interface PlayButtonProps extends SimpleButtonProps {}

export class ButtonPlay extends React.Component<PlayButtonProps, {}> {
  render() {
    return (
      <SimpleButton
        data-name="play"
        tooltip="Play"
        iconSize={20}
        icon="play"
        variant="text"
        {...this.props}
      />
    );
  }
}
