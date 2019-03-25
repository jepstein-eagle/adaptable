import * as React from "react";
import * as StrategyConstants from '../../../../Utilities/Constants/StrategyConstants'
import { IAdaptableBlotterObjectExpressionAdaptableWizardProps } from "../../../Wizard/Interface/IAdaptableWizard";
import { ICategoryChartDefinition, IChartDefinition } from "../../../../Utilities/Interface/BlotterObjects/IChartDefinition";
import { AdaptableWizard } from "../../../Wizard/AdaptableWizard";
import { CategoryChartYAxisWizard } from "./CategoryChartYAxisWizard";
import { CategoryChartXAxisWizard } from "./CategoryChartXAxisWizard";
import { CategoryChartXAxisExpressionWizard } from "./CategoryChartXAxisExpressionWizard";
import { ExpressionMode } from "../../../../Utilities/Enums";
import { CategoryChartSummaryWizard } from "./CategoryChartSummaryWizard";
import { CategoryChartSettingsWizard } from "./CategoryChartSettingsWizard";

export interface CategoryChartWizardProps extends IAdaptableBlotterObjectExpressionAdaptableWizardProps<CategoryChartWizard> {
}

export class CategoryChartWizard extends React.Component<CategoryChartWizardProps, {}> {

    render() {
        let chartDefinitions: IChartDefinition[] = this.props.ConfigEntities as IChartDefinition[]
        let chartNames: string[] = chartDefinitions.map(s => s.Name);
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
                        Element: <CategoryChartYAxisWizard />
                    },
                    {
                        StepName: "X Axis",
                        Index: 1,
                        Element: <CategoryChartXAxisWizard />
                    },
                    {
                        StepName: "X Axis",
                        Index: 2,
                        Element: <CategoryChartXAxisExpressionWizard Columns={this.props.Columns} UserFilters={this.props.UserFilters} SystemFilters={this.props.SystemFilters} ExpressionMode={ExpressionMode.SingleColumn} />
                    },
                         {
                        StepName: "Settings",
                        Index: 5,
                        Element: <CategoryChartSettingsWizard ChartNames={chartNames} />,
                    },
                    {
                        StepName: "Summary",
                        Index: 6,
                        Element: <CategoryChartSummaryWizard />
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