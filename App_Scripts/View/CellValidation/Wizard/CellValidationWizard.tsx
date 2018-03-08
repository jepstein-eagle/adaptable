import { ICellValidationRule } from '../../../Strategy/Interface/ICellValidationStrategy';
import * as React from "react";
import { IColumn } from '../../../Core/Interface/IColumn';
import { AdaptableWizard } from './../../Wizard/AdaptableWizard'
import { CellValidationActionWizard } from './CellValidationActionWizard'
import { CellValidationSelectColumnWizard } from './CellValidationSelectColumnWizard'
import { CellValidationExpressionWizard } from './CellValidationExpressionWizard'
import { CellValidationRulesWizard } from './CellValidationRulesWizard'
import { CellValidationSelectQueryWizard } from './CellValidationSelectQueryWizard'
import { DistinctCriteriaPairValue } from '../../../Core/Enums'
import { IUserFilter } from '../../../Strategy/Interface/IUserFilterStrategy';
import * as StrategyNames from '../../../Core/Constants/StrategyNames'
import { IRawValueDisplayValuePair } from '../../UIInterfaces';

export interface CellValidationWizardProps extends React.ClassAttributes<CellValidationWizard> {
    EditedCellValidation: ICellValidationRule
    Columns: Array<IColumn>
    UserFilters: IUserFilter[],
    WizardStartIndex: number
    getColumnValueDisplayValuePairDistinctList: (columnId: string, distinctCriteria: DistinctCriteriaPairValue) => Array<IRawValueDisplayValuePair>
    closeWizard: () => void
    onFinishWizard: () => void
}

export class CellValidationWizard extends React.Component<CellValidationWizardProps, {}> {

    render() {
        let stepNames: string[] = ["Select Column", "Choose Action", "Create Rules", "Add Query", "Build Query"]
        return <AdaptableWizard
            FriendlyName={StrategyNames.CellValidationStrategyName}
            StepNames={stepNames}
            Steps={[
                <CellValidationSelectColumnWizard StepName={stepNames[0]} Columns={this.props.Columns} />,
                <CellValidationActionWizard StepName={stepNames[1]} Columns={this.props.Columns} />,
                <CellValidationRulesWizard StepName={stepNames[2]} Columns={this.props.Columns} />,
                <CellValidationSelectQueryWizard StepName={stepNames[3]} Columns={this.props.Columns} />,
                <CellValidationExpressionWizard StepName={stepNames[4]} Columns={this.props.Columns}
                    UserFilters={this.props.UserFilters}
                    SelectedColumnId={null}
                    getColumnValueDisplayValuePairDistinctList={this.props.getColumnValueDisplayValuePairDistinctList} />,
            ]}
            Data={this.props.EditedCellValidation}
            StepStartIndex={this.props.WizardStartIndex}
            onHide={() => this.props.closeWizard()}
            onFinish={() => this.props.onFinishWizard()} ></AdaptableWizard>
    }

}

