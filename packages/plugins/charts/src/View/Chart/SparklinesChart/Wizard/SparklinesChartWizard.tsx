import * as React from 'react';
import * as StrategyConstants from '@adaptabletools/adaptable/src/Utilities/Constants/StrategyConstants';
import {
  AdaptableObjectExpressionAdaptableWizardProps,
  AdaptableObjectAdaptableWizardProps,
} from '@adaptabletools/adaptable/src/View/Wizard/Interface/IAdaptableWizard';
import { ChartDefinition } from '@adaptabletools/adaptable/src/PredefinedConfig/ChartState';
import { AdaptableWizard } from '@adaptabletools/adaptable/src/View/Wizard/AdaptableWizard';
import { SparklinesChartColumnWizard } from './SparklinesChartColumnWizard';
import { SparklinesChartSummaryWizard } from './SparklinesChartSummaryWizard';
import { SparklinesChartSettingsWizard } from './SparklinesChartSettingsWizard';
import { ExpressionWizard } from '@adaptabletools/adaptable/src/View/Components/ExpressionWizard';

export interface SparklinesChartWizardProps
  extends AdaptableObjectExpressionAdaptableWizardProps<SparklinesChartWizard> {}

export class SparklinesChartWizard extends React.Component<SparklinesChartWizardProps, {}> {
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
              StepName: 'Select Column',
              Index: 0,
              Element: <SparklinesChartColumnWizard api={this.props.api} />,
            },
            {
              StepName: 'Query Builder',
              Index: 1,
              Element: (
                <ExpressionWizard
                  api={this.props.api}
                  onSetNewSharedQueryName={this.props.onSetNewSharedQueryName}
                  onSetUseSharedQuery={this.props.onSetUseSharedQuery}
                />
              ),
            },
            {
              StepName: 'Chart Settings',
              Index: 2,
              Element: (
                <SparklinesChartSettingsWizard ChartNames={chartNames} api={this.props.api} />
              ),
            },
            {
              StepName: 'Summary',
              Index: 3,
              Element: <SparklinesChartSummaryWizard api={this.props.api} />,
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
