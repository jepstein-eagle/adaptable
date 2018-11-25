import * as React from "react";
import { AdaptableWizard } from '../../Wizard/AdaptableWizard'
import { LinkedColumnSettingsWizard } from './LinkedColumnSettingsWizard'
import { LinkedColumnColumnsWizard } from './LinkedColumnColumnsWizard'
import { LinkedColumnSummaryWizard } from './LinkedColumnSummaryWizard'
import * as StrategyConstants from '../../../Core/Constants/StrategyConstants'
import { IAdaptableBlotterObjectExpressionAdaptableWizardProps } from "../../Wizard/Interface/IAdaptableWizard";
import { ILinkedColumn } from "../../../Core/Interface/Interfaces";

export interface LinkedColumnWizardProps extends IAdaptableBlotterObjectExpressionAdaptableWizardProps<LinkedColumnWizard> {
    LinkedColumns: ILinkedColumn[]
}

export class LinkedColumnWizard extends React.Component<LinkedColumnWizardProps, {}> {

    render() {
        let stepNames: string[] = ["Name", "Columns", "Summary"]
        return <div className={this.props.cssClassName}>
            <AdaptableWizard
                FriendlyName={StrategyConstants.LinkedColumnStrategyName}
                StepNames={stepNames}
                ModalContainer={this.props.ModalContainer}
                cssClassName={this.props.cssClassName}
                Steps={[
                    <LinkedColumnSettingsWizard cssClassName={this.props.cssClassName} StepName={stepNames[3]} LinkedColumns={this.props.LinkedColumns} />,
                    <LinkedColumnColumnsWizard cssClassName={this.props.cssClassName} StepName={stepNames[3]} LinkedColumns={this.props.LinkedColumns} Columns={this.props.Columns} />,
                    <LinkedColumnSummaryWizard cssClassName={this.props.cssClassName} StepName={stepNames[4]} Columns={this.props.Columns} />

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