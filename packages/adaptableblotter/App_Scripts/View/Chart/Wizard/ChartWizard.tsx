import * as React from "react";
import { AdaptableWizard } from '../../Wizard/AdaptableWizard'
import { ChartYAxisWizard } from './ChartYAxisWizard'
import { ChartSummaryWizard } from './ChartSummaryWizard'
import * as StrategyConstants from '../../../Utilities/Constants/StrategyConstants'
import { IAdaptableBlotterObjectExpressionAdaptableWizardProps } from '../../Wizard/Interface/IAdaptableWizard';
import { IChartDefinition } from "../../../Utilities/Interface/BlotterObjects/IChartDefinition";
import { ChartXAxisWizard } from "./ChartXAxisWizard";
import { ChartSettingsWizard } from "./ChartSettingsWizard";
import { ChartXAxisExpressionWizard } from "./ChartXAxisExpressionWizard";
import { ExpressionMode } from "../../../Utilities/Enums";

export interface ChartWizardProps extends IAdaptableBlotterObjectExpressionAdaptableWizardProps<ChartWizard> {
}

export class ChartWizard extends React.Component<ChartWizardProps, {}> {

    render() {
        let chartDefinitions: IChartDefinition[] = this.props.ConfigEntities as IChartDefinition[]
        let chartTitles: string[] = chartDefinitions.map(s => s.Title);
        return <div className={this.props.cssClassName}>
            <AdaptableWizard
                FriendlyName={StrategyConstants.ChartStrategyName}
                ModalContainer={this.props.ModalContainer}
                cssClassName={this.props.cssClassName}
                Blotter={this.props.Blotter}
                Columns={this.props.Columns}
                Steps={[
                    {
                        StepName: "Y Axis",
                        Index: 0,
                        Element: <ChartYAxisWizard />
                    },
                    {
                        StepName: "X Axis",
                        Index: 1,
                        Element: <ChartXAxisWizard />
                    },
                    {
                        StepName: "X Axis",
                        Index: 2,
                        Element: <ChartXAxisExpressionWizard Columns={this.props.Columns} UserFilters={this.props.UserFilters} SystemFilters={this.props.SystemFilters} ExpressionMode={ExpressionMode.SingleColumn} />
                    },
                         {
                        StepName: "Settings",
                        Index: 5,
                        Element: <ChartSettingsWizard ChartTitles={chartTitles} />,
                    },
                    {
                        StepName: "Summary",
                        Index: 6,
                        Element: <ChartSummaryWizard />
                    },
                ]}
                Data={this.props.EditedAdaptableBlotterObject}
                StepStartIndex={this.props.WizardStartIndex}
                onHide={() => this.props.onCloseWizard()}
                onFinish={() => this.props.onFinishWizard()}
                canFinishWizard={() => this.props.canFinishWizard()}
            />
        </div>
    }

}