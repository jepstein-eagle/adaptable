import * as React from 'react';
import SimpleButton, { SimpleButtonProps } from '../../../components/SimpleButton';

export interface ApplyButtonProps extends SimpleButtonProps {}

export class ButtonApply extends React.Component<ApplyButtonProps, {}> {
  render() {
    return (
      <SimpleButton
        px={2}
        py={1}
        tooltip="Apply"
        iconSize={20}
        icon="check"
        {...this.props}
        variant="text"
      />
    );
  }
}
