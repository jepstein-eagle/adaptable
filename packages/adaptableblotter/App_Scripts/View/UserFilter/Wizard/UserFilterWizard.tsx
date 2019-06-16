import * as React from 'react';
import { ExpressionMode } from '../../../PredefinedConfig/Common Objects/Enums';
import { AdaptableWizard } from '../../Wizard/AdaptableWizard';
import { UserFilterSettingsWizard } from './UserFilterSettingsWizard';
import { UserFilterExpressionWizard } from './UserFilterExpressionWizard';
import { UserFilterSelectColumnWizard } from './UserFilterSelectColumnWizard';
import { UserFilterSummaryWizard } from './UserFilterSummaryWizard';
import * as StrategyConstants from '../../../Utilities/Constants/StrategyConstants';
import { IAdaptableBlotterObjectExpressionAdaptableWizardProps } from '../../Wizard/Interface/IAdaptableWizard';

export interface UserFilterWizardProps
  extends IAdaptableBlotterObjectExpressionAdaptableWizardProps<UserFilterWizard> {
  SelectedColumnId: string;
}

export class UserFilterWizard extends React.Component<UserFilterWizardProps, {}> {
  render() {
    return (
      <div className={this.props.cssClassName}>
        <AdaptableWizard
          FriendlyName={StrategyConstants.UserFilterStrategyName}
          ModalContainer={this.props.ModalContainer}
          cssClassName={this.props.cssClassName}
          Blotter={this.props.Blotter}
          Columns={this.props.Columns}
          Steps={[
            {
              StepName: 'Column',
              Index: 0,
              Element: <UserFilterSelectColumnWizard />,
            },
            {
              StepName: 'Query',
              Index: 1,
              Element: (
                <UserFilterExpressionWizard
                  UserFilters={this.props.UserFilters}
                  SystemFilters={this.props.SystemFilters}
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
          Data={this.props.EditedAdaptableBlotterObject}
          StepStartIndex={this.props.WizardStartIndex}
          onHide={() => this.props.onCloseWizard()}
          onFinish={() => this.props.onFinishWizard()}
          canFinishWizard={() => this.props.canFinishWizard()}
        />
      </div>
    );
  }
}
