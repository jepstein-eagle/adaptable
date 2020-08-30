import * as React from 'react';
import { AdaptableWizard } from '../../Wizard/AdaptableWizard';
import * as StrategyConstants from '../../../Utilities/Constants/StrategyConstants';
import { AdaptableObjectAdaptableWizardProps } from '../../Wizard/Interface/IAdaptableWizard';
import { ScheduleSummaryWizard } from './ScheduleSummaryWizard';
import { ScheduleSettingsWizard } from './ScheduleSettingsWizard';
import { ScheduleScheduleWizard } from './ScheduleScheduleWizard';

export interface ScheduleWizardProps extends AdaptableObjectAdaptableWizardProps<ScheduleWizard> {}

export class ScheduleWizard extends React.Component<ScheduleWizardProps, {}> {
  render() {
    return (
      <div>
        <AdaptableWizard
          FriendlyName={StrategyConstants.ScheduleStrategyFriendlyName}
          ModalContainer={this.props.modalContainer}
          Api={this.props.api}
          Steps={[
            {
              StepName: 'Settings',
              Index: 0,
              Element: <ScheduleSettingsWizard api={this.props.api} />,
            },
            {
              StepName: 'Schedule',
              Index: 1,
              Element: <ScheduleScheduleWizard api={this.props.api} />,
            },
            {
              StepName: 'Summary',
              Index: 2,
              Element: <ScheduleSummaryWizard api={this.props.api} />,
            },
          ]}
          Data={this.props.editedAdaptableObject}
          StepStartIndex={this.props.wizardStartIndex}
          onHide={() => this.props.onCloseWizard()}
          onFinish={() => this.props.onFinishWizard()}
          canFinishWizard={() => this.props.canFinishWizard()}
        />
      </div>
    );
  }
}
