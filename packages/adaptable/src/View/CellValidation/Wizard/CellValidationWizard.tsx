import * as React from 'react';
import { AdaptableWizard } from '../../Wizard/AdaptableWizard';
import { CellValidationActionWizard } from './CellValidationActionWizard';
import { CellValidationScopeWizard } from './CellValidationScopeWizard';
import { CellValidationRulesWizard } from './CellValidationRulesWizard';
import { CellValidationSummaryWizard } from './CellValidationSummaryWizard';
import { CellValidationSelectQueryWizard } from './CellValidationSelectQueryWizard';
import * as StrategyConstants from '../../../Utilities/Constants/StrategyConstants';
import { AdaptableObjectExpressionAdaptableWizardProps } from '../../Wizard/Interface/IAdaptableWizard';
import { ExpressionWizard } from '../../Components/ExpressionWizard';

export interface CellValidationWizardProps
  extends AdaptableObjectExpressionAdaptableWizardProps<CellValidationWizard> {}

export class CellValidationWizard extends React.Component<CellValidationWizardProps, {}> {
  render() {
    return (
      <div>
        <AdaptableWizard
          friendlyName={StrategyConstants.CellValidationStrategyFriendlyName}
          modalContainer={this.props.modalContainer}
          api={this.props.api}
          steps={[
            {
              StepName: 'Scope',
              Index: 0,
              Element: <CellValidationScopeWizard api={this.props.api} />,
            },
            {
              StepName: 'Action',
              Index: 1,
              Element: <CellValidationActionWizard api={this.props.api} />,
            },
            {
              StepName: 'Validation',
              Index: 2,
              Element: <CellValidationRulesWizard api={this.props.api} />,
            },
            {
              StepName: 'Query Builder',
              Index: 3,
              Element: <CellValidationSelectQueryWizard api={this.props.api} />,
            },
            {
              StepName: 'Query Builder',
              Index: 4,
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
              Element: <CellValidationSummaryWizard api={this.props.api} />,
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
