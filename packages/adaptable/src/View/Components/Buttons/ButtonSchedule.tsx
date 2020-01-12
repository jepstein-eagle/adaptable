import * as React from 'react';
import SimpleButton, { SimpleButtonProps } from '../../../components/SimpleButton';

export interface ScheduleButtonProps extends SimpleButtonProps {}

export class ButtonSchedule extends React.Component<ScheduleButtonProps, {}> {
  render() {
    return (
      <SimpleButton
        tooltip="Schedule"
        iconSize={20}
        icon="schedule"
        variant="text"
        {...this.props}
      />
    );
  }
}
