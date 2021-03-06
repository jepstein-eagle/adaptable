import * as React from 'react';
import { AdaptableWizard } from '../../Wizard/AdaptableWizard';
import { AlertScopeWizard } from './AlertScopeWizard';
import { AlertRulesWizard } from './AlertRulesWizard';
import { AlertSummaryWizard } from './AlertSummaryWizard';
import { AlertSelectQueryWizard } from './AlertSelectQueryWizard';
import * as StrategyConstants from '../../../Utilities/Constants/StrategyConstants';
import { AdaptableObjectExpressionAdaptableWizardProps } from '../../Wizard/Interface/IAdaptableWizard';
import { AlertTypeWizard } from './AlertTypeWizard';
import { AlertSettingsWizard } from './AlertSettingsWizard';
import { ExpressionWizard } from '../../Components/ExpressionWizard';

export interface AlertWizardProps
  extends AdaptableObjectExpressionAdaptableWizardProps<AlertWizard> {}

export class AlertWizard extends React.Component<AlertWizardProps, {}> {
  render() {
    return (
      <div>
        <AdaptableWizard
          friendlyName={StrategyConstants.AlertStrategyFriendlyName}
          modalContainer={this.props.modalContainer}
          api={this.props.api}
          steps={[
            {
              StepName: 'Scope',
              Index: 0,
              Element: <AlertScopeWizard api={this.props.api} />,
            },
            {
              StepName: 'Alert Rules',
              Index: 1,
              Element: <AlertRulesWizard api={this.props.api} />,
            },
            {
              StepName: 'Message Type',
              Index: 2,
              Element: <AlertTypeWizard api={this.props.api} />,
            },
            {
              StepName: 'Behaviour',
              Index: 3,
              Element: <AlertSettingsWizard api={this.props.api} />,
            },
            {
              StepName: 'Query Builder',
              Index: 4,
              Element: <AlertSelectQueryWizard api={this.props.api} />,
            },
            {
              StepName: 'Query Builder',
              Index: 5,
              Element: (
                <ExpressionWizard
                  api={this.props.api}
                  onSetNewSharedQueryName={this.props.onSetNewSharedQueryName}
                  onSetUseSharedQuery={this.props.onSetUseSharedQuery}
                />
              ),
            },
            {
              StepName: 'Summary',
              Index: 5,
              Element: <AlertSummaryWizard api={this.props.api} />,
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
