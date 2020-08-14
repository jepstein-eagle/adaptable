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
          ModalContainer={this.props.ModalContainer}
          Api={this.props.Api}
          Steps={[
            {
              StepName: 'Select Column',
              Index: 0,
              Element: <AlertSelectColumnWizard Api={this.props.Api} />,
            },
            {
              StepName: 'Alert Rules',
              Index: 1,
              Element: <AlertRulesWizard Api={this.props.Api} />,
            },
            {
              StepName: 'Message Type',
              Index: 2,
              Element: <AlertTypeWizard Api={this.props.Api} />,
            },
            {
              StepName: 'Behaviour',
              Index: 3,
              Element: <AlertScopeWizard Api={this.props.Api} />,
            },
            {
              StepName: 'Query Builder',
              Index: 4,
              Element: <AlertSelectQueryWizard Api={this.props.Api} />,
            },
            {
              StepName: 'Query Builder',
              Index: 5,
              Element: (
                <ExpressionWizard
                  Api={this.props.Api}
                  onSetNewSharedQueryName={this.props.onSetNewSharedQueryName}
                  onSetUseSharedQuery={this.props.onSetUseSharedQuery}
                />
              ),
            },
            {
              StepName: 'Summary',
              Index: 5,
              Element: <AlertSummaryWizard Api={this.props.Api} />,
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
