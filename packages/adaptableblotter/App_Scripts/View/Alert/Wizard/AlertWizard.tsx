import * as React from 'react';
import { AdaptableWizard } from '../../Wizard/AdaptableWizard';
import { AlertSelectColumnWizard } from './AlertSelectColumnWizard';
import { AlertExpressionWizard } from './AlertExpressionWizard';
import { AlertRulesWizard } from './AlertRulesWizard';
import { AlertSummaryWizard } from './AlertSummaryWizard';
import { AlertSelectQueryWizard } from './AlertSelectQueryWizard';
import * as StrategyConstants from '../../../Utilities/Constants/StrategyConstants';
import { AdaptableBlotterObjectExpressionAdaptableWizardProps } from '../../Wizard/Interface/IAdaptableWizard';
import { AlertTypeWizard } from './AlertTypeWizard';

export interface AlertWizardProps
  extends AdaptableBlotterObjectExpressionAdaptableWizardProps<AlertWizard> {}

export class AlertWizard extends React.Component<AlertWizardProps, {}> {
  render() {
    return (
      <div>
        <AdaptableWizard
          FriendlyName={StrategyConstants.AlertStrategyName}
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
              StepName: 'Query Builder',
              Index: 3,
              Element: <AlertSelectQueryWizard />,
            },
            {
              StepName: 'Query Builder',
              Index: 4,
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
