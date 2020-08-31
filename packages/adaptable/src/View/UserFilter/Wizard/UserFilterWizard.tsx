import * as React from 'react';
import { AdaptableWizard } from '../../Wizard/AdaptableWizard';
import { UserFilterSettingsWizard } from './UserFilterSettingsWizard';
import { UserFilterSelectColumnWizard } from './UserFilterSelectColumnWizard';
import { UserFilterSummaryWizard } from './UserFilterSummaryWizard';
import * as StrategyConstants from '../../../Utilities/Constants/StrategyConstants';
import { AdaptableObjectExpressionAdaptableWizardProps } from '../../Wizard/Interface/IAdaptableWizard';

export interface UserFilterWizardProps
  extends AdaptableObjectExpressionAdaptableWizardProps<UserFilterWizard> {
  SelectedColumnId: string;
}

export class UserFilterWizard extends React.Component<UserFilterWizardProps, {}> {
  render() {
    return (
      <div>
        <AdaptableWizard
          friendlyName={StrategyConstants.UserFilterStrategyFriendlyName}
          modalContainer={this.props.modalContainer}
          api={this.props.api}
          steps={[
            {
              StepName: 'Select Column',
              Index: 0,
              Element: <UserFilterSelectColumnWizard api={this.props.api} />,
            },

            {
              StepName: 'Settings',
              Index: 2,
              Element: <UserFilterSettingsWizard api={this.props.api} />,
            },
            {
              StepName: 'Summary',
              Index: 3,
              Element: <UserFilterSummaryWizard api={this.props.api} />,
            },
          ]}
          data={this.props.editedAdaptableObject}
          stepStartIndex={this.props.wizardStartIndex}
          onHide={() => this.props.onCloseWizard()}
          onFinish={() => this.props.onFinishWizard()}
          canFinishWizard={() => this.props.canFinishWizard()}
        />
      </div>
    );
  }
}
