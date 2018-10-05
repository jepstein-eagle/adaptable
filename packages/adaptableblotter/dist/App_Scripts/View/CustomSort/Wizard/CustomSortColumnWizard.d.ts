import * as React from "react";
import { AdaptableWizardStep, AdaptableWizardStepProps } from '../../Wizard/Interface/IAdaptableWizard';
import { IColumn } from '../../../Core/Interface/IColumn';
import { ICustomSort } from "../../../Core/Api/Interface/IAdaptableBlotterObjects";
export interface CustomSortColumnWizardProps extends AdaptableWizardStepProps<ICustomSort> {
    Columns: IColumn[];
}
export interface CustomSortColumnWizardState {
    SelectedColumnId: string;
}
export declare class CustomSortColumnWizard extends React.Component<CustomSortColumnWizardProps, CustomSortColumnWizardState> implements AdaptableWizardStep {
    constructor(props: CustomSortColumnWizardProps);
    render(): any;
    private onColumnSelectedChanged;
    canNext(): boolean;
    canBack(): boolean;
    Next(): void;
    Back(): void;
    GetIndexStepIncrement(): number;
    GetIndexStepDecrement(): number;
    StepName: string;
}
