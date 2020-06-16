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
          Adaptable={this.props.Adaptable}
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
              StepName: 'Behaviour',
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
              Element: <AlertExpressionWizard Adaptable={this.props.Adaptable} />,
            },
            {
              StepName: 'Summary',
              Index: 5,
              Element: <AlertSummaryWizard />,
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
