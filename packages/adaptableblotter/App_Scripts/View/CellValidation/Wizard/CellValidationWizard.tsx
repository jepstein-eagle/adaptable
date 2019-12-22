import * as React from 'react';
import { AdaptableWizard } from '../../Wizard/AdaptableWizard';
import { CellValidationActionWizard } from './CellValidationActionWizard';
import { CellValidationSelectColumnWizard } from './CellValidationSelectColumnWizard';
import { CellValidationExpressionWizard } from './CellValidationExpressionWizard';
import { CellValidationRulesWizard } from './CellValidationRulesWizard';
import { CellValidationSummaryWizard } from './CellValidationSummaryWizard';
import { CellValidationSelectQueryWizard } from './CellValidationSelectQueryWizard';
import * as StrategyConstants from '../../../Utilities/Constants/StrategyConstants';
import { AdaptableObjectExpressionAdaptableWizardProps } from '../../Wizard/Interface/IAdaptableWizard';

export interface CellValidationWizardProps
  extends AdaptableObjectExpressionAdaptableWizardProps<CellValidationWizard> {}

export class CellValidationWizard extends React.Component<CellValidationWizardProps, {}> {
  render() {
    return (
      <div>
        <AdaptableWizard
          FriendlyName={StrategyConstants.CellValidationStrategyName}
          ModalContainer={this.props.ModalContainer}
          Blotter={this.props.Blotter}
          Columns={this.props.Columns}
          Steps={[
            {
              StepName: 'Select Column',
              Index: 0,
              Element: <CellValidationSelectColumnWizard />,
            },
            {
              StepName: 'Action',
              Index: 1,
              Element: <CellValidationActionWizard />,
            },
            {
              StepName: 'Validation',
              Index: 2,
              Element: <CellValidationRulesWizard />,
            },
            {
              StepName: 'Query Builder',
              Index: 3,
              Element: <CellValidationSelectQueryWizard />,
            },
            {
              StepName: 'Query Builder',
              Index: 4,
              Element: (
                <CellValidationExpressionWizard
                  UserFilters={this.props.UserFilters}
                  SystemFilters={this.props.SystemFilters}
                  NamedFilters={this.props.NamedFilters}
                  ColumnCategories={this.props.ColumnCategories}
                />
              ),
            },
            {
              StepName: 'Summary',
              Index: 5,
              Element: <CellValidationSummaryWizard UserFilters={this.props.UserFilters} />,
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
