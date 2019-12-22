import * as React from 'react';
import * as StrategyConstants from '../../../../Utilities/Constants/StrategyConstants';
import { AdaptableObjectExpressionAdaptableWizardProps } from '../../../Wizard/Interface/IAdaptableWizard';
import { ChartDefinition } from '../../../../PredefinedConfig/ChartState';
import { AdaptableWizard } from '../../../Wizard/AdaptableWizard';
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
          FriendlyName={StrategyConstants.ChartStrategyName}
          ModalContainer={this.props.ModalContainer}
          Blotter={this.props.Blotter}
          Columns={this.props.Columns}
          Steps={[
            {
              StepName: 'Primary Column',
              Index: 0,
              Element: <PieChartPrimaryColumnWizard />,
            },
            {
              StepName: 'Secondary Column',
              Index: 1,
              Element: <PieChartSecondaryColumnWizard />,
            },
            {
              StepName: 'Settings',
              Index: 2,
              Element: <PieChartSettingsWizard ChartNames={chartNames} />,
            },
            {
              StepName: 'Summary',
              Index: 3,
              Element: <PieChartSummaryWizard />,
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
