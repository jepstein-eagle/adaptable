import { IFormatColumn } from '../../../Strategy/Interface/IFormatColumnStrategy';
import * as React from "react";
import { IColumn } from '../../../Core/Interface/IColumn';
import { AdaptableWizard } from './../../Wizard/AdaptableWizard'
import { FormatColumnColumnWizard } from './FormatColumnColumnWizard'
import { FormatColumnStyleWizard } from './FormatColumnStyleWizard'
import * as StrategyNames from '../../../Core/Constants/StrategyNames'

export interface FormatColumnWizardProps extends React.ClassAttributes<FormatColumnWizard> {
    EditedFormatColumn: IFormatColumn
    Columns: IColumn[],
    FormatColumns: IFormatColumn[],
    PredefinedColorChoices: string[],
    WizardStartIndex: number,
    closeWizard: () => void
    onFinishWizard: () => void
}

export class FormatColumnWizard extends React.Component<FormatColumnWizardProps, {}> {

    render() {
        let stepNames: string[] = ["Select Column", "Create Style"]
        return <AdaptableWizard 
        FriendlyName={StrategyNames.FormatColumnStrategyName}
        StepNames={stepNames}
        Steps={
            [
                <FormatColumnColumnWizard StepName={stepNames[0]} Columns={this.props.Columns} />,
                <FormatColumnStyleWizard StepName={stepNames[1]} PredefinedColorChoices={this.props.PredefinedColorChoices} />
            ]}
            Data={this.props.EditedFormatColumn}
            StepStartIndex={this.props.WizardStartIndex}
            onHide={() => this.props.closeWizard()}
            onFinish={() => this.props.onFinishWizard()} ></AdaptableWizard>
    }
}

