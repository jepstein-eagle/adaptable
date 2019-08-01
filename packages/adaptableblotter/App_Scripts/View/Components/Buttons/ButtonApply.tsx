import * as React from 'react';
import SimpleButton, { SimpleButtonProps } from '../../../components/SimpleButton';

export interface ApplyButtonProps extends SimpleButtonProps {}

export class ButtonApply extends React.Component<ApplyButtonProps, {}> {
  render() {
    return (
      <SimpleButton tooltip="Apply" iconSize={20} icon="check" variant="text" {...this.props} />
    );
  }
}
