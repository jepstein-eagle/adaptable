import * as React from "react";
import { AdaptableWizard } from '../../Wizard/AdaptableWizard'
import { ChartYAxisWizard } from './ChartYAxisWizard'
import { ChartSummaryWizard } from './ChartSummaryWizard'
import * as StrategyConstants from '../../../Utilities/Constants/StrategyConstants'
import { IAdaptableBlotterObjectExpressionAdaptableWizardProps } from '../../Wizard/Interface/IAdaptableWizard';
import { IChartDefinition } from "../../../Utilities/Interface/BlotterObjects/IChartDefinition";
import { ChartXAxisWizard } from "./ChartXAxisWizard";
import { ChartSettingsWizard } from "./ChartSettingsWizard";
import { ChartAdditionalColumnWizard } from "./ChartAdditionalColumnWizard";
import { ChartExpressionWizard } from "./ChartExpressionWizard";
import { ExpressionMode } from "../../../Utilities/Enums";

export interface ChartWizardProps extends IAdaptableBlotterObjectExpressionAdaptableWizardProps<ChartWizard> {
}

export class ChartWizard extends React.Component<ChartWizardProps, {}> {

    render() {
        let stepNames: string[] = ["Y Axis", "X Axis", "Segemented", "Settings", "Summary"]
        let Charts: IChartDefinition[] = this.props.ConfigEntities as IChartDefinition[]
        return <div className={this.props.cssClassName}>
            <AdaptableWizard
                FriendlyName={StrategyConstants.ChartStrategyName}
                StepNames={stepNames}
                ModalContainer={this.props.ModalContainer}
                cssClassName={this.props.cssClassName}
                Blotter={this.props.Blotter}
                Columns={this.props.Columns}
                Steps={[
                    <ChartYAxisWizard StepName={stepNames[0]} ChartDefinitions={Charts} />,
                    <ChartXAxisWizard StepName={stepNames[1]} ChartDefinitions={Charts} />,
                    <ChartExpressionWizard
                        StepName={stepNames[1]}
                        Columns={this.props.Columns}
                        UserFilters={this.props.UserFilters}
                        SystemFilters={this.props.SystemFilters}
                        ExpressionMode={ExpressionMode.SingleColumn}
                    />,
                    <ChartAdditionalColumnWizard StepName={stepNames[2]} ChartDefinitions={Charts} />,
                    <ChartSettingsWizard StepName={stepNames[3]} ChartDefinitions={Charts} />,
                    <ChartSummaryWizard StepName={stepNames[4]} />
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

