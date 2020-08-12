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
          ModalContainer={this.props.ModalContainer}
          Api={this.props.Api}
          Steps={[
            {
              StepName: 'Settings',
              Index: 0,
              Element: <ScheduleSettingsWizard Api={this.props.Api} />,
            },
            {
              StepName: 'Schedule',
              Index: 1,
              Element: <ScheduleScheduleWizard Api={this.props.Api} />,
            },
            {
              StepName: 'Summary',
              Index: 2,
              Element: <ScheduleSummaryWizard Api={this.props.Api} />,
            },
          ]}
          Data={this.props.EditedAdaptableObject}
          StepStartIndex={this.props.WizardStartIndex}
          onHide={() => this.props.onCloseWizard()}
          onFinish={() => this.props.onFinishWizard()}
          canFinishWizard={() => this.props.canFinishWizard()}
        />
      </div>
    );
  }
}
