import * as React from "react";
import { AdaptableWizardStep, AdaptableWizardStepProps } from '../../Wizard/Interface/IAdaptableWizard';
import { ICalculatedColumn } from "../../../Utilities/Interface/BlotterObjects/ICalculatedColumn";
export interface CalculatedColumnSettingsWizardProps extends AdaptableWizardStepProps<ICalculatedColumn> {
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
}
