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
              StepName: 'Y Axis',
              Index: 0,
              Element: <CategoryChartYAxisWizard Api={this.props.Api} />,
            },
            {
              StepName: 'X Axis',
              Index: 1,
              Element: <CategoryChartXAxisWizard Api={this.props.Api} />,
            },
            /*
            {
              StepName: 'X Axis',
              Index: 2,
              Element: (
                <CategoryChartXAxisExpressionWizard
                  Api={this.props.Api}
                  ExpressionMode={ExpressionMode.SingleColumn}
                />
              ),
            },
            */
            {
              StepName: 'Settings',
              Index: 5,
              Element: <CategoryChartSettingsWizard Api={this.props.Api} ChartNames={chartNames} />,
            },
            {
              StepName: 'Summary',
              Index: 6,
              Element: <CategoryChartSummaryWizard Api={this.props.Api} />,
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
