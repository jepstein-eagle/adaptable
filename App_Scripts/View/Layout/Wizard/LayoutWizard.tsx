import { ILayout } from '../../../Strategy/Interface/ILayoutStrategy';
import * as React from "react";
import { IColumn } from '../../../Core/Interface/IColumn';
import { AdaptableWizard } from '../../Wizard/AdaptableWizard'
import { LayoutSelectionWizard } from './LayoutSelectionWizard'
import { LayoutColumnWizard } from './LayoutColumnWizard'
import { LayoutSettingsWizard } from './LayoutSettingsWizard'
import { LayoutGridSortWizard } from './LayoutGridSortWizard'
import { DistinctCriteriaPairValue } from '../../../Core/Enums'
import * as StrategyNames from '../../../Core/Constants/StrategyNames'
import { IRawValueDisplayValuePair } from '../../UIInterfaces';
import { IAdaptableBlotterObjectExpressionAdaptableWizardProps } from '../../Wizard/Interface/IAdaptableWizard';
import { IGridSort } from '../../../Core/Interface/Interfaces';

export interface LayoutWizardProps extends IAdaptableBlotterObjectExpressionAdaptableWizardProps<LayoutWizard> {
  GridSort:IGridSort 
}

export class LayoutWizard extends React.Component<LayoutWizardProps, {}> {

    render() {
        let stepNames: string[] = ["Choose Layoyut Type", "Select Columns", "Select Sort", "Choose Name"]
        let layouts: ILayout[] = this.props.ConfigEntities as ILayout[]
        return <div className="adaptable_blotter_style_wizard_Layout">
            <AdaptableWizard
                FriendlyName={StrategyNames.LayoutStrategyName}
                StepNames={stepNames}
                ModalContainer={this.props.ModalContainer}
                Steps={[
                    <LayoutSelectionWizard StepName={stepNames[0]} Layouts={layouts} Columns={this.props.Columns} GridSort={this.props.GridSort} />,
                    <LayoutColumnWizard StepName={stepNames[1]} Columns={this.props.Columns} />,
                    <LayoutGridSortWizard StepName={stepNames[2]} Columns={this.props.Columns}  />,
                    <LayoutSettingsWizard StepName={stepNames[3]} Layouts={layouts} />]}
                Data={this.props.EditedAdaptableBlotterObject}
                StepStartIndex={this.props.WizardStartIndex}
                onHide={() => this.props.onCloseWizard()}
                onFinish={() => this.props.onFinishWizard()} />
        </div>
    }

}

