import { IFormatColumn } from '../../../Strategy/Interface/IFormatColumnStrategy';
import * as React from "react";
import { IColumn } from '../../../Core/Interface/IAdaptableBlotter';
import { AdaptableWizard } from './../../Wizard/AdaptableWizard'
import { FormatColumnColumnWizard } from './FormatColumnColumnWizard'
import { FormatColumnStyleWizard } from './FormatColumnStyleWizard'

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
        return <AdaptableWizard Steps={
            [
                <FormatColumnColumnWizard Columns={this.props.Columns} />,
                <FormatColumnStyleWizard PredefinedColorChoices={this.props.PredefinedColorChoices} />
            ]}
            Data={this.props.EditedFormatColumn}
            StepStartIndex={this.props.WizardStartIndex}
            onHide={() => this.props.closeWizard()}
            onFinish={() => this.props.onFinishWizard()} ></AdaptableWizard>
    }
}

