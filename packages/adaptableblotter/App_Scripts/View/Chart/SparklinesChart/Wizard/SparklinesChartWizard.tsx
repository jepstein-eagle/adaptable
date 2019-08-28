import * as React from 'react';
import * as StrategyConstants from '../../../../Utilities/Constants/StrategyConstants';
import { AdaptableBlotterObjectExpressionAdaptableWizardProps } from '../../../Wizard/Interface/IAdaptableWizard';
import { ChartDefinition } from '../../../../PredefinedConfig/RunTimeState/ChartState';
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
  extends AdaptableBlotterObjectExpressionAdaptableWizardProps<SparklinesChartWizard> {}

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
              StepName: 'Sparklines Column',
              Index: 0,
              Element: <SparklinesChartColumnWizard />,
            },
            {
              StepName: 'Sparklines Column',
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
              Index: 3,
              Element: <SparklinesChartSettingsWizard ChartNames={chartNames} />,
            },
            {
              StepName: 'Summary',
              Index: 4,
              Element: <SparklinesChartSummaryWizard />,
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
