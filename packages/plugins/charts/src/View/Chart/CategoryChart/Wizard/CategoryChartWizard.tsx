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
import { CategoryChartXAxisExpressionWizard } from './CategoryChartXAxisExpressionWizard';
import { ExpressionMode } from '@adaptabletools/adaptable/src/PredefinedConfig/Common/Enums';
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
          Adaptable={this.props.Adaptable}
          Columns={this.props.Columns}
          Steps={[
            {
              StepName: 'Y Axis',
              Index: 0,
              Element: <CategoryChartYAxisWizard />,
            },
            {
              StepName: 'X Axis',
              Index: 1,
              Element: <CategoryChartXAxisWizard />,
            },
            {
              StepName: 'X Axis',
              Index: 2,
              Element: (
                <CategoryChartXAxisExpressionWizard
                  Columns={this.props.Columns}
                  UserFilters={this.props.UserFilters}
                  SystemFilters={this.props.SystemFilters}
                  NamedFilters={this.props.NamedFilters}
                  ColumnCategories={this.props.ColumnCategories}
                  ExpressionMode={ExpressionMode.SingleColumn}
                />
              ),
            },
            {
              StepName: 'Settings',
              Index: 5,
              Element: <CategoryChartSettingsWizard ChartNames={chartNames} />,
            },
            {
              StepName: 'Summary',
              Index: 6,
              Element: <CategoryChartSummaryWizard />,
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
