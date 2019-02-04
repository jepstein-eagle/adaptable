import { ICellValidationRule } from "../../../Utilities/Interface/BlotterObjects/ICellValidationRule";
import * as React from "react";
import { IColumn } from '../../../Utilities/Interface/IColumn';
import { AdaptableWizard } from '../../Wizard/AdaptableWizard'
import { CellValidationActionWizard } from './CellValidationActionWizard'
import { CellValidationSelectColumnWizard } from './CellValidationSelectColumnWizard'
import { CellValidationExpressionWizard } from './CellValidationExpressionWizard'
import { CellValidationRulesWizard } from './CellValidationRulesWizard'
import { CellValidationSummaryWizard } from './CellValidationSummaryWizard'
import { CellValidationSelectQueryWizard } from './CellValidationSelectQueryWizard'
import { IUserFilter } from "../../../Utilities/Interface/BlotterObjects/IUserFilter";
import * as StrategyConstants from '../../../Utilities/Constants/StrategyConstants'
import { IAdaptableBlotterObjectExpressionAdaptableWizardProps } from '../../Wizard/Interface/IAdaptableWizard';

export interface CellValidationWizardProps extends IAdaptableBlotterObjectExpressionAdaptableWizardProps<CellValidationWizard> {
}

export class CellValidationWizard extends React.Component<CellValidationWizardProps, {}> {

    render() {
        let stepNames: string[] = ["Column", "Action", "Validation", "Query", "Summary"]
        return <div className={this.props.cssClassName}>
            <AdaptableWizard
                FriendlyName={StrategyConstants.CellValidationStrategyName}
                StepNames={stepNames}
                ModalContainer={this.props.ModalContainer}
                cssClassName={this.props.cssClassName}
                Blotter={this.props.Blotter}
                Columns={this.props.Columns}
                Steps={[
                    <CellValidationSelectColumnWizard StepName={stepNames[0]} />,
                    <CellValidationActionWizard StepName={stepNames[1]} />,
                    <CellValidationRulesWizard StepName={stepNames[2]} />,
                    <CellValidationSelectQueryWizard StepName={stepNames[3]} />,
                    <CellValidationExpressionWizard StepName={stepNames[3]}
                        UserFilters={this.props.UserFilters}
                        SystemFilters={this.props.SystemFilters}
                    />,
                    < CellValidationSummaryWizard StepName={stepNames[4]} UserFilters={this.props.UserFilters} />

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

