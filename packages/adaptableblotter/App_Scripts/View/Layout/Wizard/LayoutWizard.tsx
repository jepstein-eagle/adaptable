import * as React from "react";
import { IColumn } from '../../../Core/Interface/IColumn';
import { AdaptableWizard } from '../../Wizard/AdaptableWizard'
import { LayoutSelectionWizard } from './LayoutSelectionWizard'
import { LayoutColumnWizard } from './LayoutColumnWizard'
import { LayoutSettingsWizard } from './LayoutSettingsWizard'
import { LayoutGridSortWizard } from './LayoutGridSortWizard'
import { LayoutSummaryWizard } from './LayoutSummaryWizard'
import * as StrategyConstants from '../../../Utilities/Constants/StrategyConstants'
import { IAdaptableBlotterObjectExpressionAdaptableWizardProps } from "../../Wizard/Interface/IAdaptableWizard";
import { IGridSort, ILayout } from "../../../Api/Interface/IAdaptableBlotterObjects";


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
                Steps={[
                    <LayoutSelectionWizard   cssClassName={this.props.cssClassName} StepName={stepNames[0]} Layouts={layouts} Columns={this.props.Columns} GridSorts={this.props.GridSorts}  />,
                    <LayoutColumnWizard  cssClassName={this.props.cssClassName} StepName={stepNames[1]} Columns={this.props.Columns} />,
                    <LayoutGridSortWizard  cssClassName={this.props.cssClassName} StepName={stepNames[2]} Columns={this.props.Columns}  />,
                    <LayoutSettingsWizard  cssClassName={this.props.cssClassName} StepName={stepNames[3]} Layouts={layouts} />,
                    < LayoutSummaryWizard cssClassName={this.props.cssClassName} StepName={stepNames[4]} Columns={this.props.Columns} />
           
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

