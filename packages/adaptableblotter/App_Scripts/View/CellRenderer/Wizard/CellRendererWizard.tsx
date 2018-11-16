import { ICellRenderer } from "../../../Core/Api/Interface/IAdaptableBlotterObjects";
import * as React from "react";
import { IColumn } from '../../../Core/Interface/IColumn';
import { AdaptableWizard } from '../../Wizard/AdaptableWizard'
import { CellRendererSelectColumnWizard } from './CellRendererSelectColumnWizard'
import { CellRendererSummaryWizard } from './CellRendererSummaryWizard'
import * as StrategyConstants from '../../../Core/Constants/StrategyConstants'
import { IAdaptableBlotterObjectExpressionAdaptableWizardProps } from '../../Wizard/Interface/IAdaptableWizard';
import { CellRendererSettingsWizard } from "./CellRendererSettingsWizard";

export interface CellRendererWizardProps extends IAdaptableBlotterObjectExpressionAdaptableWizardProps<CellRendererWizard> {
}

export class CellRendererWizard extends React.Component<CellRendererWizardProps, {}> {

    render() {
        let stepNames: string[] = ["Select Column", "Settings", "Summary"]
        return <div className={this.props.cssClassName}>
            <AdaptableWizard
                FriendlyName={StrategyConstants.CellRendererStrategyName}
                StepNames={stepNames}
                ModalContainer={this.props.ModalContainer}
                cssClassName={this.props.cssClassName}
                Steps={[
                    <CellRendererSelectColumnWizard cssClassName={this.props.cssClassName} StepName={stepNames[0]} Columns={this.props.Columns} />,
                    <CellRendererSettingsWizard cssClassName={this.props.cssClassName} StepName={stepNames[1]} Columns={this.props.Columns} />,
                    <CellRendererSummaryWizard cssClassName={this.props.cssClassName} StepName={stepNames[2]} Columns={this.props.Columns} />
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

