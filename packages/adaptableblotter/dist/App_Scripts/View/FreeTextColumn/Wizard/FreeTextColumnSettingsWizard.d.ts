import * as React from "react";
import { AdaptableWizardStep, AdaptableWizardStepProps } from '../../Wizard/Interface/IAdaptableWizard';
import { IColumn } from "../../../Utilities/Interface/IColumn";
import { IFreeTextColumn } from "../../../Utilities/Interface/BlotterObjects/IFreeTextColumn";
export interface FreeTextColumnSettingsWizardProps extends AdaptableWizardStepProps<IFreeTextColumn> {
    Columns: IColumn[];
}
export interface FreeTextColumnSettingsWizardState {
    ColumnId: string;
    ErrorMessage: string;
    DefaultValue: string;
}
export declare class FreeTextColumnSettingsWizard extends React.Component<FreeTextColumnSettingsWizardProps, FreeTextColumnSettingsWizardState> implements AdaptableWizardStep {
    constructor(props: FreeTextColumnSettingsWizardProps);
    render(): any;
    handleColumnNameChange(event: React.FormEvent<any>): void;
    handleDefaultValueChange(event: React.FormEvent<any>): void;
    canNext(): boolean;
    canBack(): boolean;
    Next(): void;
    Back(): void;
    GetIndexStepIncrement(): number;
    GetIndexStepDecrement(): number;
    StepName: string;
}
