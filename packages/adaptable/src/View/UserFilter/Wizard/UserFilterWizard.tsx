import * as React from 'react';
import { ExpressionMode } from '../../../PredefinedConfig/Common/Enums';
import { AdaptableWizard } from '../../Wizard/AdaptableWizard';
import { UserFilterSettingsWizard } from './UserFilterSettingsWizard';
import { UserFilterExpressionWizard } from './UserFilterExpressionWizard';
import { UserFilterSelectColumnWizard } from './UserFilterSelectColumnWizard';
import { UserFilterSummaryWizard } from './UserFilterSummaryWizard';
import * as StrategyConstants from '../../../Utilities/Constants/StrategyConstants';
import { AdaptableObjectAdaptableWizardProps } from '../../Wizard/Interface/IAdaptableWizard';

export interface UserFilterWizardProps
  extends AdaptableObjectAdaptableWizardProps<UserFilterWizard> {
  SelectedColumnId: string;
}

export class UserFilterWizard extends React.Component<UserFilterWizardProps, {}> {
  render() {
    return (
      <div>
        <AdaptableWizard
          FriendlyName={StrategyConstants.UserFilterStrategyFriendlyName}
          ModalContainer={this.props.ModalContainer}
          Api={this.props.Api}
          Steps={[
            {
              StepName: 'Select Column',
              Index: 0,
              Element: <UserFilterSelectColumnWizard Api={this.props.Api} />,
            },
            {
              StepName: 'Query Builder',
              Index: 1,
              Element: (
                <UserFilterExpressionWizard
                  ExpressionMode={ExpressionMode.SingleColumn}
                  Api={this.props.Api}
                />
              ),
            },
            {
              StepName: 'Settings',
              Index: 2,
              Element: <UserFilterSettingsWizard Api={this.props.Api} />,
            },
            {
              StepName: 'Summary',
              Index: 3,
              Element: <UserFilterSummaryWizard Api={this.props.Api} />,
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
