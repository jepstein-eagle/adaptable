import * as React from 'react';
import SimpleButton, { SimpleButtonProps } from '../../../components/SimpleButton';

export interface StopButtonProps extends SimpleButtonProps {}

export class ButtonStop extends React.Component<StopButtonProps, {}> {
  render() {
    return <SimpleButton tooltip="Stop" iconSize={20} icon="stop" variant="text" {...this.props} />;
  }
}
