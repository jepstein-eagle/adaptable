import * as React from "react";
import { IColumn } from '../../../Utilities/Interface/IColumn';
import { AdaptableWizard } from '../../Wizard/AdaptableWizard'
import { LayoutSelectionWizard } from './LayoutSelectionWizard'
import { LayoutColumnWizard } from './LayoutColumnWizard'
import { LayoutSettingsWizard } from './LayoutSettingsWizard'
import { LayoutGridSortWizard } from './LayoutGridSortWizard'
import { LayoutSummaryWizard } from './LayoutSummaryWizard'
import * as StrategyConstants from '../../../Utilities/Constants/StrategyConstants'
import { IAdaptableBlotterObjectExpressionAdaptableWizardProps } from "../../Wizard/Interface/IAdaptableWizard";
import { IGridSort } from "../../../Utilities/Interface/IGridSort";
import { ILayout } from "../../../Utilities/Interface/BlotterObjects/ILayout";


export interface LayoutWizardProps extends IAdaptableBlotterObjectExpressionAdaptableWizardProps<LayoutWizard> {
  GridSorts:IGridSort[]
 }

export class LayoutWizard extends React.Component<LayoutWizardProps, {}> {

    render() {
        let stepNames: string[] = ["Source", "Columns", "Sort", "Settings", "Summary"]
        let layouts: ILayout[] = this.props.ConfigEntities as ILayout[]
        return <div className={this.props.cssClassName}>
            <AdaptableWizard
                FriendlyName={StrategyConstants.LayoutStrategyName}
                StepNames={stepNames}
                ModalContainer={this.props.ModalContainer}
                cssClassName={this.props.cssClassName}
                Blotter={this.props.Blotter}
                Columns={this.props.Columns}
                    Steps={[
                    <LayoutSelectionWizard   StepName={stepNames[0]} Layouts={layouts} GridSorts={this.props.GridSorts}  />,
                    <LayoutColumnWizard  StepName={stepNames[1]} />,
                    <LayoutGridSortWizard  StepName={stepNames[2]}  />,
                    <LayoutSettingsWizard  StepName={stepNames[3]} Layouts={layouts} />,
                    < LayoutSummaryWizard StepName={stepNames[4]} />
           
                ]}
                Data={this.props.EditedAdaptableBlotterObject}
                StepStartIndex={this.props.WizardStartIndex}
                onHide={() => this.props.onCloseWizard()}
                onFinish={() => this.props.onFinishWizard()} 
                canFinishWizard={() => this.props.canFinishWizard()}
                />
         >
        </div>
    }

}

