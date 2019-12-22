import * as React from 'react';
import * as StrategyConstants from '../../../../Utilities/Constants/StrategyConstants';
import { AdaptableObjectExpressionAdaptableWizardProps } from '../../../Wizard/Interface/IAdaptableWizard';
import { ChartDefinition } from '../../../../PredefinedConfig/ChartState';
import { AdaptableWizard } from '../../../Wizard/AdaptableWizard';
import { SparklinesChartColumnWizard } from './SparklinesChartColumnWizard';
import { SparklinesChartExpressionColumnWizard } from './SparklinesChartExpressionColumnWizard';
import { SparklinesChartSummaryWizard } from './SparklinesChartSummaryWizard';
import { SparklinesChartSettingsWizard } from './SparklinesChartSettingsWizard';
import { ExpressionMode } from '../../../../PredefinedConfig/Common/Enums';
import { ColumnHelper } from '../../../../Utilities/Helpers/ColumnHelper';
// import { PieChartSummaryWizard } from './PieChartSummaryWizard';
// import { PieChartPrimaryColumnWizard } from './PieChartPrimaryColumnWizard';
// import { PieChartSecondaryColumnWizard } from './PieChartSecondaryColumnWizard';

export interface SparklinesChartWizardProps
  extends AdaptableObjectExpressionAdaptableWizardProps<SparklinesChartWizard> {}

export class SparklinesChartWizard extends React.Component<SparklinesChartWizardProps, {}> {
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
              StepName: 'Select Column',
              Index: 0,
              Element: <SparklinesChartColumnWizard />,
            },
            {
              StepName: 'Build Query',
              Index: 1,
              Element: (
                <SparklinesChartExpressionColumnWizard
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
