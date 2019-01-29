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
        let stepNames: string[] = ["Y Axis", "X Axis", "X Axis Values", "Segemented", "Settings", "Summary"]
        let Charts: IChartDefinition[] = this.props.ConfigEntities as IChartDefinition[]
        return <div className={this.props.cssClassName}>
            <AdaptableWizard
                FriendlyName={StrategyConstants.ChartStrategyName}
                StepNames={stepNames}
                ModalContainer={this.props.ModalContainer}
                cssClassName={this.props.cssClassName}
                Steps={[
                    <ChartYAxisWizard cssClassName={this.props.cssClassName} StepName={stepNames[0]} ChartDefinitions={Charts} Columns={this.props.Columns} />,
                    <ChartXAxisWizard cssClassName={this.props.cssClassName} StepName={stepNames[1]} ChartDefinitions={Charts} Columns={this.props.Columns} Blotter={this.props.Blotter} />,
                    <ChartExpressionWizard
                        cssClassName={this.props.cssClassName} StepName={stepNames[2]}
                        Columns={this.props.Columns}
                        UserFilters={this.props.UserFilters}
                        SystemFilters={this.props.SystemFilters}
                        Blotter={this.props.Blotter}
                        ExpressionMode={ExpressionMode.SingleColumn}
                    />,
                    <ChartAdditionalColumnWizard cssClassName={this.props.cssClassName} StepName={stepNames[3]} ChartDefinitions={Charts} Columns={this.props.Columns} Blotter={this.props.Blotter} />,
                    <ChartSettingsWizard cssClassName={this.props.cssClassName} StepName={stepNames[4]} ChartDefinitions={Charts} />,
                    <ChartSummaryWizard cssClassName={this.props.cssClassName} StepName={stepNames[5]} Columns={this.props.Columns} />
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

