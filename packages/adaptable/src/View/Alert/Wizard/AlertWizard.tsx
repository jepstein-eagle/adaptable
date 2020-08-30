import * as React from 'react';
import { AdaptableWizard } from '../../Wizard/AdaptableWizard';
import { AlertSelectColumnWizard } from './AlertSelectColumnWizard';
import { AlertRulesWizard } from './AlertRulesWizard';
import { AlertSummaryWizard } from './AlertSummaryWizard';
import { AlertSelectQueryWizard } from './AlertSelectQueryWizard';
import * as StrategyConstants from '../../../Utilities/Constants/StrategyConstants';
import { AdaptableObjectExpressionAdaptableWizardProps } from '../../Wizard/Interface/IAdaptableWizard';
import { AlertTypeWizard } from './AlertTypeWizard';
import { AlertScopeWizard } from './AlertScopeWizard';
import { ExpressionWizard } from '../../Components/ExpressionWizard';

export interface AlertWizardProps
  extends AdaptableObjectExpressionAdaptableWizardProps<AlertWizard> {}

export class AlertWizard extends React.Component<AlertWizardProps, {}> {
  render() {
    return (
      <div>
        <AdaptableWizard
          FriendlyName={StrategyConstants.AlertStrategyFriendlyName}
          ModalContainer={this.props.modalContainer}
          Api={this.props.api}
          Steps={[
            {
              StepName: 'Select Column',
              Index: 0,
              Element: <AlertSelectColumnWizard api={this.props.api} />,
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
              Element: <AlertScopeWizard api={this.props.api} />,
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
