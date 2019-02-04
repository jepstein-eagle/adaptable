import * as React from "react";
import { AdaptableWizard } from '../../Wizard/AdaptableWizard'
import { ColumnCategorySettingsWizard } from './ColumnCategorySettingsWizard'
import { ColumnCategoryColumnsWizard } from './ColumnCategoryColumnsWizard'
import { ColumnCategorySummaryWizard } from './ColumnCategorySummaryWizard'
import * as StrategyConstants from '../../../Utilities/Constants/StrategyConstants'
import { IAdaptableBlotterObjectExpressionAdaptableWizardProps } from "../../Wizard/Interface/IAdaptableWizard";
import { IColumnCategory } from "../../../Utilities/Interface/BlotterObjects/IColumnCategory";

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
                Blotter={this.props.Blotter}
                Columns={this.props.Columns}
                Steps={[
                    <ColumnCategorySettingsWizard StepName={stepNames[0]} ColumnCategorys={this.props.ColumnCategorys} />,
                    <ColumnCategoryColumnsWizard StepName={stepNames[1]} ColumnCategorys={this.props.ColumnCategorys} />,
                    <ColumnCategorySummaryWizard StepName={stepNames[2]} />

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