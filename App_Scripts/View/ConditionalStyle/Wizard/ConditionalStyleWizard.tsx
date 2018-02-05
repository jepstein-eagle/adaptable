import { IConditionalStyleCondition } from '../../../Strategy/Interface/IConditionalStyleStrategy';
import * as React from "react";
import { IColumn } from '../../../Core/Interface/IAdaptableBlotter';
import { AdaptableWizard } from '../../Wizard/AdaptableWizard'
import { ConditionalStyleSettingsWizard } from './ConditionalStyleSettingsWizard'
import { ConditionalStyleColumnWizard } from './ConditionalStyleColumnWizard'
import { ConditionalStyleExpressionWizard } from './ConditionalStyleExpressionWizard'
import { IUserFilter } from '../../../Core/Interface/IExpression'
import { DistinctCriteriaPairValue } from '../../../Core/Enums'
import { IRawValueDisplayValuePair } from '../../../Core/Interface/IAdaptableBlotter';
import * as StrategyNames from '../../../Core/Constants/StrategyNames'


export interface ConditionalStyleWizardProps extends React.ClassAttributes<ConditionalStyleWizard> {
    EditedConditionalStyleCondition: IConditionalStyleCondition
    Columns: IColumn[],
    UserFilters: IUserFilter[],
    WizardStartIndex: number
    PredefinedColorChoices: string[],
    getColumnValueDisplayValuePairDistinctList: (columnId: string, distinctCriteria: DistinctCriteriaPairValue) => Array<IRawValueDisplayValuePair>
    closeWizard: () => void
    onFinishWizard: () => void
}

export class ConditionalStyleWizard extends React.Component<ConditionalStyleWizardProps, {}> {

    render() {
        let stepNames: string[] = ["Select Target", "Create Style", "Build Query"]
        return <AdaptableWizard
            FriendlyName={StrategyNames.ConditionalStyleStrategyName}
            StepNames={stepNames}
            Steps={[
                <ConditionalStyleColumnWizard StepName={stepNames[0]} Columns={this.props.Columns} />,
                <ConditionalStyleSettingsWizard StepName={stepNames[1]} PredefinedColorChoices={this.props.PredefinedColorChoices} />,
                <ConditionalStyleExpressionWizard
                    StepName={stepNames[2]}
                    ColumnList={this.props.Columns}
                    UserFilters={this.props.UserFilters}
                    SelectedColumnId={null}
                    getColumnValueDisplayValuePairDistinctList={this.props.getColumnValueDisplayValuePairDistinctList}
                />
            ]}
            Data={this.props.EditedConditionalStyleCondition}
            StepStartIndex={this.props.WizardStartIndex}
            onHide={() => this.props.closeWizard()}
            onFinish={() => this.props.onFinishWizard()} ></AdaptableWizard>
    }
}

