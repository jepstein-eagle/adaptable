import * as React from 'react';
import SimpleButton, { SimpleButtonProps } from '../../../components/SimpleButton';

export class ButtonShowChart extends React.Component<SimpleButtonProps, {}> {
  render() {
    return (
      <SimpleButton
        data-name="show-chart"
        tooltip="Show Chart"
        iconSize={20}
        icon="chart"
        variant="text"
        {...this.props}
      />
    );
  }
}
