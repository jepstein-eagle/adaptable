import * as React from 'react';
import * as StrategyConstants from '@adaptabletools/adaptable/src/Utilities/Constants/StrategyConstants';
import { AdaptableObjectExpressionAdaptableWizardProps } from '@adaptabletools/adaptable/src/View/Wizard/Interface/IAdaptableWizard';
import { ChartDefinition } from '@adaptabletools/adaptable/src/PredefinedConfig/ChartState';
import { AdaptableWizard } from '@adaptabletools/adaptable/src/View/Wizard/AdaptableWizard';
import { PieChartSettingsWizard } from './PieChartSettingsWizard';
import { PieChartSummaryWizard } from './PieChartSummaryWizard';
import { PieChartPrimaryColumnWizard } from './PieChartPrimaryColumnWizard';
import { PieChartSecondaryColumnWizard } from './PieChartSecondaryColumnWizard';

export interface PieChartWizardProps
  extends AdaptableObjectExpressionAdaptableWizardProps<PieChartWizard> {}

export class PieChartWizard extends React.Component<PieChartWizardProps, {}> {
  render() {
    let chartDefinitions: ChartDefinition[] = this.props.configEntities as ChartDefinition[];
    let chartNames: string[] = chartDefinitions.map(s => s.Name);
    return (
      <div>
        <AdaptableWizard
          friendlyName={StrategyConstants.ChartStrategyFriendlyName}
          modalContainer={this.props.modalContainer}
          api={this.props.api}
          steps={[
            {
              StepName: 'Primary Column',
              Index: 0,
              Element: <PieChartPrimaryColumnWizard api={this.props.api} />,
            },
            {
              StepName: 'Secondary Column',
              Index: 1,
              Element: <PieChartSecondaryColumnWizard api={this.props.api} />,
            },
            {
              StepName: 'Settings',
              Index: 2,
              Element: <PieChartSettingsWizard ChartNames={chartNames} api={this.props.api} />,
            },
            {
              StepName: 'Summary',
              Index: 3,
              Element: <PieChartSummaryWizard api={this.props.api} />,
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
