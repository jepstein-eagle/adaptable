import * as React from "react";
import { AdaptableWizard } from '../../Wizard/AdaptableWizard'
import { ColumnCategorySettingsWizard } from './ColumnCategorySettingsWizard'
import { ColumnCategoryColumnsWizard } from './ColumnCategoryColumnsWizard'
import { ColumnCategorySummaryWizard } from './ColumnCategorySummaryWizard'
import * as StrategyConstants from '../../../Utilities/Constants/StrategyConstants'
import { IAdaptableBlotterObjectExpressionAdaptableWizardProps } from "../../Wizard/Interface/IAdaptableWizard";
import { IColumnCategory } from "../../../Core/Interface/Interfaces";

export interface ColumnCategoryWizardProps extends IAdaptableBlotterObjectExpressionAdaptableWizardProps<ColumnCategoryWizard> {
    ColumnCategorys: IColumnCategory[]
}

export class ColumnCategoryWizard extends React.Component<ColumnCategoryWizardProps, {}> {

    render() {
        let stepNames: string[] = ["Name", "Columns", "Summary"]
        return <div className={this.props.cssClassName}>
            <AdaptableWizard
                FriendlyName={StrategyConstants.ColumnCategoryStrategyName}
                StepNames={stepNames}
                ModalContainer={this.props.ModalContainer}
                cssClassName={this.props.cssClassName}
                Steps={[
                    <ColumnCategorySettingsWizard cssClassName={this.props.cssClassName} StepName={stepNames[0]} ColumnCategorys={this.props.ColumnCategorys} />,
                    <ColumnCategoryColumnsWizard cssClassName={this.props.cssClassName} StepName={stepNames[1]} ColumnCategorys={this.props.ColumnCategorys} Columns={this.props.Columns} />,
                    <ColumnCategorySummaryWizard cssClassName={this.props.cssClassName} StepName={stepNames[2]} Columns={this.props.Columns} />

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