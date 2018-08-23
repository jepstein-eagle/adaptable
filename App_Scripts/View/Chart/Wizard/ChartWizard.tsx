import * as React from "react";
import { AdaptableWizard } from '../../Wizard/AdaptableWizard'
import { ChartYAxisWizard } from './ChartYAxisWizard'
import { ChartSummaryWizard } from './ChartSummaryWizard'
import * as StrategyNames from '../../../Core/Constants/StrategyNames'
import { IAdaptableBlotterObjectExpressionAdaptableWizardProps } from '../../Wizard/Interface/IAdaptableWizard';
import { IChartDefinition } from "../../../Core/Api/Interface/AdaptableBlotterObjects";
import { ChartAdditionalDetailsWizard } from "./ChartAdditionalDetailsWizard";
import { ChartXAxisWizard } from "./ChartXAxisWizard";
import { ChartSettingsWizard } from "./ChartSettingsWizard";
import { ChartAdditionalColumnWizard } from "./ChartAdditionalColumnWizard";

export interface ChartWizardProps extends IAdaptableBlotterObjectExpressionAdaptableWizardProps<ChartWizard> {
}

export class ChartWizard extends React.Component<ChartWizardProps, {}> {

    render() {
        let stepNames: string[] = ["Settings", "X Axis", "Y Axis", "More" , "Summary"]
        let Charts: IChartDefinition[] = this.props.ConfigEntities as IChartDefinition[]
        return <div className={this.props.cssClassName}>
            <AdaptableWizard
                FriendlyName={StrategyNames.ChartStrategyName}
                StepNames={stepNames}
                ModalContainer={this.props.ModalContainer}
                cssClassName={this.props.cssClassName}
                Steps={[
                    <ChartSettingsWizard cssClassName={this.props.cssClassName} StepName={stepNames[0]} ChartDefinitions={Charts} />,
                    <ChartYAxisWizard cssClassName={this.props.cssClassName} StepName={stepNames[1]} ChartDefinitions={Charts} Columns={this.props.Columns} />,
                    <ChartXAxisWizard cssClassName={this.props.cssClassName} StepName={stepNames[2]} ChartDefinitions={Charts} Columns={this.props.Columns} getColumnValueDisplayValuePairDistinctList={this.props.getColumnValueDisplayValuePairDistinctList} />,
                    <ChartAdditionalColumnWizard cssClassName={this.props.cssClassName} StepName={stepNames[3]} ChartDefinitions={Charts} Columns={this.props.Columns} />,
                    <ChartAdditionalDetailsWizard cssClassName={this.props.cssClassName} StepName={stepNames[3]} getColumnValueDisplayValuePairDistinctList={this.props.getColumnValueDisplayValuePairDistinctList} />,
                    <ChartSummaryWizard cssClassName={this.props.cssClassName} StepName={stepNames[4]} Columns={this.props.Columns} />
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

