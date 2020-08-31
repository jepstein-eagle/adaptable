import * as React from 'react';
import * as StrategyConstants from '@adaptabletools/adaptable/src/Utilities/Constants/StrategyConstants';
import { AdaptableObjectExpressionAdaptableWizardProps } from '@adaptabletools/adaptable/src/View/Wizard/Interface/IAdaptableWizard';
import {
  CategoryChartDefinition,
  ChartDefinition,
} from '@adaptabletools/adaptable/src/PredefinedConfig/ChartState';
import { AdaptableWizard } from '@adaptabletools/adaptable/src/View/Wizard/AdaptableWizard';
import { CategoryChartYAxisWizard } from './CategoryChartYAxisWizard';
import { CategoryChartXAxisWizard } from './CategoryChartXAxisWizard';
import { CategoryChartSummaryWizard } from './CategoryChartSummaryWizard';
import { CategoryChartSettingsWizard } from './CategoryChartSettingsWizard';

export interface CategoryChartWizardProps
  extends AdaptableObjectExpressionAdaptableWizardProps<CategoryChartWizard> {}

export class CategoryChartWizard extends React.Component<CategoryChartWizardProps, {}> {
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
              StepName: 'Y Axis',
              Index: 0,
              Element: <CategoryChartYAxisWizard api={this.props.api} />,
            },
            {
              StepName: 'X Axis',
              Index: 1,
              Element: <CategoryChartXAxisWizard api={this.props.api} />,
            },
            /*
            {
              StepName: 'X Axis',
              Index: 2,
              Element: (
                <CategoryChartXAxisExpressionWizard
                  api={this.props.api}
                  ExpressionMode={ExpressionMode.SingleColumn}
                />
              ),
            },
            */
            {
              StepName: 'Settings',
              Index: 5,
              Element: <CategoryChartSettingsWizard api={this.props.api} ChartNames={chartNames} />,
            },
            {
              StepName: 'Summary',
              Index: 6,
              Element: <CategoryChartSummaryWizard api={this.props.api} />,
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
