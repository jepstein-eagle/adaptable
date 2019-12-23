import * as React from 'react';
import { ExpressionMode } from '../../../PredefinedConfig/Common/Enums';
import { AdaptableWizard } from '../../Wizard/AdaptableWizard';
import { UserFilterSettingsWizard } from './UserFilterSettingsWizard';
import { UserFilterExpressionWizard } from './UserFilterExpressionWizard';
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
          FriendlyName={StrategyConstants.UserFilterStrategyFriendlyName}
          ModalContainer={this.props.ModalContainer}
          Blotter={this.props.Blotter}
          Columns={this.props.Columns}
          Steps={[
            {
              StepName: 'Select Column',
              Index: 0,
              Element: <UserFilterSelectColumnWizard />,
            },
            {
              StepName: 'Query Builder',
              Index: 1,
              Element: (
                <UserFilterExpressionWizard
                  UserFilters={this.props.UserFilters}
                  SystemFilters={this.props.SystemFilters}
                  NamedFilters={this.props.NamedFilters}
                  ColumnCategories={this.props.ColumnCategories}
                  ExpressionMode={ExpressionMode.SingleColumn}
                />
              ),
            },
            {
              StepName: 'Settings',
              Index: 2,
              Element: <UserFilterSettingsWizard UserFilters={this.props.UserFilters} />,
            },
            {
              StepName: 'Summary',
              Index: 3,
              Element: <UserFilterSummaryWizard UserFilters={this.props.UserFilters} />,
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
