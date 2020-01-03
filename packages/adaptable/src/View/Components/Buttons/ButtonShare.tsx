import * as React from 'react';
import SimpleButton, { SimpleButtonProps } from '../../../components/SimpleButton';

export class ButtonShare extends React.Component<SimpleButtonProps, {}> {
  render() {
    return (
      <SimpleButton tooltip="Share" variant="text" icon="share" iconSize={20} {...this.props} />
    );
  }
}
