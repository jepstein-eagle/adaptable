import { IConditionalStyle } from '../../../Strategy/Interface/IConditionalStyleStrategy';
import * as React from "react";
import { IColumn } from '../../../Core/Interface/IColumn';
import { AdaptableWizard } from '../../Wizard/AdaptableWizard'
import { ConditionalStyleSettingsWizard } from './ConditionalStyleSettingsWizard'
import { ConditionalStyleColumnWizard } from './ConditionalStyleColumnWizard'
import { ConditionalStyleExpressionWizard } from './ConditionalStyleExpressionWizard'
import { IUserFilter, ISystemFilter } from '../../../Strategy/Interface/IUserFilterStrategy'
import { DistinctCriteriaPairValue } from '../../../Core/Enums'
import * as StrategyNames from '../../../Core/Constants/StrategyNames'
import { IRawValueDisplayValuePair } from '../../UIInterfaces';


export interface ConditionalStyleWizardProps extends React.ClassAttributes<ConditionalStyleWizard> {
    EditedConditionalStyle: IConditionalStyle
    Columns: IColumn[],
    UserFilters: IUserFilter[],
    SystemFilters: ISystemFilter[],
    WizardStartIndex: number
    PredefinedColorChoices: string[],
    getColumnValueDisplayValuePairDistinctList: (columnId: string, distinctCriteria: DistinctCriteriaPairValue) => Array<IRawValueDisplayValuePair>
    closeWizard: () => void
    onFinishWizard: () => void
}

export class ConditionalStyleWizard extends React.Component<ConditionalStyleWizardProps, {}> {

    render() {
        let stepNames: string[] = ["Select Target", "Create Style", "Build Query"]
        return <div className="adaptable_blotter_style_wizard_conditionalstyle">
            <AdaptableWizard
                FriendlyName={StrategyNames.ConditionalStyleStrategyName}
                StepNames={stepNames}
                Steps={[
                    <ConditionalStyleColumnWizard StepName={stepNames[0]} Columns={this.props.Columns} />,
                    <ConditionalStyleSettingsWizard StepName={stepNames[1]} PredefinedColorChoices={this.props.PredefinedColorChoices} />,
                    <ConditionalStyleExpressionWizard
                        StepName={stepNames[2]}
                        Columns={this.props.Columns}
                        UserFilters={this.props.UserFilters}
                        SystemFilters={this.props.SystemFilters}
                        SelectedColumnId={null}
                        getColumnValueDisplayValuePairDistinctList={this.props.getColumnValueDisplayValuePairDistinctList}
                    />
                ]}
                Data={this.props.EditedConditionalStyle}
                StepStartIndex={this.props.WizardStartIndex}
                onHide={() => this.props.closeWizard()}
                onFinish={() => this.props.onFinishWizard()} />
        </div>
    }
}

