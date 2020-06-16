import * as React from 'react';
import * as StrategyConstants from '@adaptabletools/adaptable/src/Utilities/Constants/StrategyConstants';
import { AdaptableObjectExpressionAdaptableWizardProps } from '@adaptabletools/adaptable/src/View/Wizard/Interface/IAdaptableWizard';
import { ChartDefinition } from '@adaptabletools/adaptable/src/PredefinedConfig/ChartState';
import { AdaptableWizard } from '@adaptabletools/adaptable/src/View/Wizard/AdaptableWizard';
import { SparklinesChartColumnWizard } from './SparklinesChartColumnWizard';
import { SparklinesChartExpressionColumnWizard } from './SparklinesChartExpressionColumnWizard';
import { SparklinesChartSummaryWizard } from './SparklinesChartSummaryWizard';
import { SparklinesChartSettingsWizard } from './SparklinesChartSettingsWizard';
import { ExpressionMode } from '@adaptabletools/adaptable/src/PredefinedConfig/Common/Enums';

export interface SparklinesChartWizardProps
  extends AdaptableObjectExpressionAdaptableWizardProps<SparklinesChartWizard> {}

export class SparklinesChartWizard extends React.Component<SparklinesChartWizardProps, {}> {
  render() {
    let chartDefinitions: ChartDefinition[] = this.props.ConfigEntities as ChartDefinition[];
    let chartNames: string[] = chartDefinitions.map(s => s.Name);
    return (
      <div>
        <AdaptableWizard
          FriendlyName={StrategyConstants.ChartStrategyFriendlyName}
          ModalContainer={this.props.ModalContainer}
          Api={this.props.Api}
          Steps={[
            {
              StepName: 'Select Column',
              Index: 0,
              Element: <SparklinesChartColumnWizard />,
            },
            {
              StepName: 'Build Query',
              Index: 1,
              Element: (
                <SparklinesChartExpressionColumnWizard
                  ExpressionMode={ExpressionMode.SingleColumn}
                />
              ),
            },
            {
              StepName: 'Chart Settings',
              Index: 2,
              Element: <SparklinesChartSettingsWizard ChartNames={chartNames} />,
            },
            {
              StepName: 'Summary',
              Index: 3,
              Element: <SparklinesChartSummaryWizard />,
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
