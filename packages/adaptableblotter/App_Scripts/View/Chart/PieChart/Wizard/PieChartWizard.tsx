import * as React from "react";
import * as StrategyConstants from '../../../../Utilities/Constants/StrategyConstants'
import { IAdaptableBlotterObjectExpressionAdaptableWizardProps } from "../../../Wizard/Interface/IAdaptableWizard";
import { IPieChartDefinition, IChartDefinition } from "../../../../Utilities/Interface/BlotterObjects/IChartDefinition";
import { AdaptableWizard } from "../../../Wizard/AdaptableWizard";
import { PieChartSettingsWizard } from "./PieChartSettingsWizard";
import { PieChartSummaryWizard } from "./PieChartSummaryWizard";

export interface PieChartWizardProps extends IAdaptableBlotterObjectExpressionAdaptableWizardProps<PieChartWizard> {
}

export class PieChartWizard extends React.Component<PieChartWizardProps, {}> {

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
                        StepName: "Settings",
                        Index: 0,
                        Element: <PieChartSettingsWizard ChartNames={chartNames} />,
                    },
                    {
                        StepName: "Summary",
                        Index: 1,
                        Element: <PieChartSummaryWizard />
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