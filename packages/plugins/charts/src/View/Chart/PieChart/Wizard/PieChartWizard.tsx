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
              StepName: 'Primary Column',
              Index: 0,
              Element: <PieChartPrimaryColumnWizard Api={this.props.Api} />,
            },
            {
              StepName: 'Secondary Column',
              Index: 1,
              Element: <PieChartSecondaryColumnWizard Api={this.props.Api} />,
            },
            {
              StepName: 'Settings',
              Index: 2,
              Element: <PieChartSettingsWizard ChartNames={chartNames} Api={this.props.Api} />,
            },
            {
              StepName: 'Summary',
              Index: 3,
              Element: <PieChartSummaryWizard Api={this.props.Api} />,
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
