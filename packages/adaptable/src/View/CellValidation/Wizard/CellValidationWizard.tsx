import * as React from 'react';
import { AdaptableWizard } from '../../Wizard/AdaptableWizard';
import { CellValidationActionWizard } from './CellValidationActionWizard';
import { CellValidationSelectColumnWizard } from './CellValidationSelectColumnWizard';
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
          FriendlyName={StrategyConstants.CellValidationStrategyFriendlyName}
          ModalContainer={this.props.ModalContainer}
          Api={this.props.Api}
          Steps={[
            {
              StepName: 'Select Column',
              Index: 0,
              Element: <CellValidationSelectColumnWizard Api={this.props.Api} />,
            },
            {
              StepName: 'Action',
              Index: 1,
              Element: <CellValidationActionWizard Api={this.props.Api} />,
            },
            {
              StepName: 'Validation',
              Index: 2,
              Element: <CellValidationRulesWizard Api={this.props.Api} />,
            },
            {
              StepName: 'Query Builder',
              Index: 3,
              Element: <CellValidationSelectQueryWizard Api={this.props.Api} />,
            },
            {
              StepName: 'Query Builder',
              Index: 4,
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
              Element: <CellValidationSummaryWizard Api={this.props.Api} />,
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
