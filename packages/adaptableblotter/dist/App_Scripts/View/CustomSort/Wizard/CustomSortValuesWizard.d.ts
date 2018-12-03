import * as React from "react";
import { IColumn } from '../../../api/Interface/IColumn';
import { AdaptableWizardStep, AdaptableWizardStepProps } from '../../Wizard/Interface/IAdaptableWizard';
import { ICustomSort } from "../../../api/Interface/IAdaptableBlotterObjects";
import { IAdaptableBlotter } from "../../../api/Interface/IAdaptableBlotter";
export interface CustomSortValuesWizardProps extends AdaptableWizardStepProps<ICustomSort> {
    Columns: Array<IColumn>;
    Blotter: IAdaptableBlotter;
}
export interface CustomSortValuesWizardState {
    ColumnValues: any[];
    SelectedValues: Array<string>;
    IsEdit: boolean;
}
export declare class CustomSortValuesWizard extends React.Component<CustomSortValuesWizardProps, CustomSortValuesWizardState> implements AdaptableWizardStep {
    constructor(props: CustomSortValuesWizardProps);
    render(): any;
    OnSelectedValuesChange(newValues: Array<string>): void;
    canNext(): boolean;
    canBack(): boolean;
    Next(): void;
    Back(): void;
    GetIndexStepIncrement(): number;
    GetIndexStepDecrement(): number;
    StepName: string;
}
