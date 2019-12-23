import * as React from 'react';
import { AdaptableWizard } from '../../Wizard/AdaptableWizard';
import { AlertSelectColumnWizard } from './AlertSelectColumnWizard';
import { AlertExpressionWizard } from './AlertExpressionWizard';
import { AlertRulesWizard } from './AlertRulesWizard';
import { AlertSummaryWizard } from './AlertSummaryWizard';
import { AlertSelectQueryWizard } from './AlertSelectQueryWizard';
import * as StrategyConstants from '../../../Utilities/Constants/StrategyConstants';
import { AdaptableObjectExpressionAdaptableWizardProps } from '../../Wizard/Interface/IAdaptableWizard';
import { AlertTypeWizard } from './AlertTypeWizard';
import { AlertScopeWizard } from './AlertScopeWizard';

export interface AlertWizardProps
  extends AdaptableObjectExpressionAdaptableWizardProps<AlertWizard> {}

export class AlertWizard extends React.Component<AlertWizardProps, {}> {
  render() {
    return (
      <div>
        <AdaptableWizard
          FriendlyName={StrategyConstants.AlertStrategyFriendlyName}
          ModalContainer={this.props.ModalContainer}
          Blotter={this.props.Blotter}
          Columns={this.props.Columns}
          Steps={[
            {
              StepName: 'Select Column',
              Index: 0,
              Element: <AlertSelectColumnWizard />,
            },
            {
              StepName: 'Alert Rules',
              Index: 1,
              Element: <AlertRulesWizard />,
            },
            {
              StepName: 'Message Type',
              Index: 2,
              Element: <AlertTypeWizard />,
            },
            {
              StepName: 'Scope',
              Index: 3,
              Element: <AlertScopeWizard />,
            },
            {
              StepName: 'Query Builder',
              Index: 4,
              Element: <AlertSelectQueryWizard />,
            },
            {
              StepName: 'Query Builder',
              Index: 5,
              Element: (
                <AlertExpressionWizard
                  Columns={this.props.Columns}
                  UserFilters={this.props.UserFilters}
                  SystemFilters={this.props.SystemFilters}
                  NamedFilters={this.props.NamedFilters}
                  ColumnCategories={this.props.ColumnCategories}
                  Blotter={this.props.Blotter}
                />
              ),
            },
            {
              StepName: 'Summary',
              Index: 5,
              Element: <AlertSummaryWizard UserFilters={this.props.UserFilters} />,
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
