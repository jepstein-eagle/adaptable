import * as React from 'react';
import SimpleButton, { SimpleButtonProps } from '../../../components/SimpleButton';

export interface PauseButtonProps extends SimpleButtonProps {}

export class ButtonPause extends React.Component<PauseButtonProps, {}> {
  render() {
    return (
      <SimpleButton tooltip="Pause" iconSize={20} icon="pause" variant="text" {...this.props} />
    );
  }
}
