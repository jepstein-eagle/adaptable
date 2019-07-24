import * as React from 'react';
import SimpleButton, { SimpleButtonProps } from '../../../components/SimpleButton';

export class ButtonShowChart extends React.Component<SimpleButtonProps, {}> {
  render() {
    return (
      <SimpleButton
        px={2}
        py={1}
        tooltip="Show Chart"
        iconSize={20}
        icon="bar-chart"
        variant="text"
        {...this.props}
      />
    );
  }
}
