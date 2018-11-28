import * as React from "react";
import { AdaptableWizardStep, AdaptableWizardStepProps } from '../../Wizard/Interface/IAdaptableWizard';
import { IColumn } from "../../../Core/Interface/IColumn";
import { ICalculatedColumn } from "../../../Api/Interface/IAdaptableBlotterObjects";
export interface CalculatedColumnSettingsWizardProps extends AdaptableWizardStepProps<ICalculatedColumn> {
    Columns: IColumn[];
}
export interface CalculatedColumnSettingsWizardState {
    ColumnId: string;
    ErrorMessage: string;
}
export declare class CalculatedColumnSettingsWizard extends React.Component<CalculatedColumnSettingsWizardProps, CalculatedColumnSettingsWizardState> implements AdaptableWizardStep {
    constructor(props: CalculatedColumnSettingsWizardProps);
    render(): any;
    handleColumnNameChange(event: React.FormEvent<any>): void;
    canNext(): boolean;
    canBack(): boolean;
    Next(): void;
    Back(): void;
    GetIndexStepIncrement(): number;
    GetIndexStepDecrement(): number;
    StepName: string;
}
