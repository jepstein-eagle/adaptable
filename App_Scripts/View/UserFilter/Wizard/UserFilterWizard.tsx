import { IUserFilter } from '../../../Core/Interface/IExpression';
import * as React from "react";
import { IColumn } from '../../../Core/Interface/IAdaptableBlotter';
import { ExpressionMode } from '../../../Core/Enums'
import { AdaptableWizard } from './../../Wizard/AdaptableWizard'
import { UserFilterSettingsWizard } from './UserFilterSettingsWizard'
import { UserFilterExpressionWizard } from './UserFilterExpressionWizard'
import { UserFilterSelectColumnWizard } from './UserFilterSelectColumnWizard'
import { DistinctCriteriaPairValue } from '../../../Core/Enums'
import { IRawValueDisplayValuePair } from '../../../Core/Interface/IAdaptableBlotter';
import * as StrategyNames from '../../../Core/StrategyNames'


export interface UserFilterWizardProps extends React.ClassAttributes<UserFilterWizard> {
    EditedUserFilter: IUserFilter
    Columns: IColumn[],
    UserFilters: IUserFilter[],
    WizardStartIndex: number,
    SelectedColumnId: string
    getColumnValueDisplayValuePairDistinctList: (columnId: string, distinctCriteria: DistinctCriteriaPairValue) => Array<IRawValueDisplayValuePair>
    closeWizard: () => void
    onFinishWizard: () => void
}

export class UserFilterWizard extends React.Component<UserFilterWizardProps, {}> {

    render() {
    let    stepNames: string[]=["Select Column", "Build Query", "Settings"]
           
        return <AdaptableWizard
        FriendlyName={StrategyNames.UserFilterStrategyName}
        StepNames={stepNames}
            Steps={
                [
                    <UserFilterSelectColumnWizard Columns={this.props.Columns} StepName={stepNames[0]} />,
                    <UserFilterExpressionWizard
                    StepName={stepNames[1]}
                        ColumnList={this.props.Columns}
                        UserFilters={this.props.UserFilters}
                        ExpressionMode={ExpressionMode.SingleColumn}
                        SelectedColumnId={this.props.SelectedColumnId}
                        getColumnValueDisplayValuePairDistinctList={this.props.getColumnValueDisplayValuePairDistinctList} />,
                    <UserFilterSettingsWizard
                    StepName={stepNames[2]}
                    UserFilters={this.props.UserFilters}
                        Columns={this.props.Columns} />,
                ]}
            Data={this.props.EditedUserFilter}
            StepStartIndex={this.props.WizardStartIndex}
            onHide={() => this.props.closeWizard()}
            onFinish={() => this.props.onFinishWizard()} ></AdaptableWizard>
    }
}

