import * as React from "react";
import { AdaptableWizardStep, AdaptableWizardStepProps } from '../../Wizard/Interface/IAdaptableWizard';
import { IColumnCategory } from "../../../Utilities/Interface/BlotterObjects/IColumnCategory";
export interface ColumnCategorySettingsWizardProps extends AdaptableWizardStepProps<IColumnCategory> {
    ColumnCategorys: IColumnCategory[];
}
export interface ColumnCategorySettingsWizardState {
    ColumnCategoryId: string;
    ErrorMessage: string;
}
export declare class ColumnCategorySettingsWizard extends React.Component<ColumnCategorySettingsWizardProps, ColumnCategorySettingsWizardState> implements AdaptableWizardStep {
    constructor(props: ColumnCategorySettingsWizardProps);
    render(): any;
    onColumnCategoryNameChange(event: React.FormEvent<any>): void;
    canNext(): boolean;
    canBack(): boolean;
    Next(): void;
    Back(): void;
    GetIndexStepIncrement(): number;
    GetIndexStepDecrement(): number;
    StepName: string;
}
