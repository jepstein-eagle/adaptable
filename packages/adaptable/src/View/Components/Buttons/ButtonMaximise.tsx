import * as React from 'react';

import SimpleButton, { SimpleButtonProps } from '../../../components/SimpleButton';

export interface MaximiseButtonProps extends SimpleButtonProps {
  useHoirzontalChevron?: boolean;
}

export class ButtonMaximise extends React.Component<MaximiseButtonProps, {}> {
  render() {
    return (
      <SimpleButton
        data-name="maximise"
        iconSize={20}
        tooltip="Maximize"
        icon={this.props.useHoirzontalChevron ? 'arrow-right' : 'arrow-down'}
        variant="text"
        {...this.props}
      />
    );
  }
}
