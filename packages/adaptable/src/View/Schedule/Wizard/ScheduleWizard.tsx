import * as React from 'react';
import { AdaptableWizard } from '../../Wizard/AdaptableWizard';
import * as StrategyConstants from '../../../Utilities/Constants/StrategyConstants';
import { AdaptableObjectExpressionAdaptableWizardProps } from '../../Wizard/Interface/IAdaptableWizard';
import { ScheduleSummaryWizard } from './ScheduleSummaryWizard';
import { ScheduleSettingsWizard } from './ScheduleSettingsWizard';
import { ScheduleScheduleWizard } from './ScheduleScheduleWizard';

export interface ScheduleWizardProps
  extends AdaptableObjectExpressionAdaptableWizardProps<ScheduleWizard> {}

export class ScheduleWizard extends React.Component<ScheduleWizardProps, {}> {
  render() {
    return (
      <div>
        <AdaptableWizard
          FriendlyName={StrategyConstants.ScheduleStrategyFriendlyName}
          ModalContainer={this.props.ModalContainer}
          Adaptable={this.props.Adaptable}
          Columns={this.props.Columns}
          Steps={[
            {
              StepName: 'Settings',
              Index: 0,
              Element: <ScheduleSettingsWizard />,
            },
            {
              StepName: 'Schedule',
              Index: 1,
              Element: <ScheduleScheduleWizard />,
            },
            {
              StepName: 'Summary',
              Index: 2,
              Element: <ScheduleSummaryWizard />,
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
