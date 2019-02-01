import * as React from "react";
import { AdaptableWizardStep, AdaptableWizardStepProps } from '../../Wizard/Interface/IAdaptableWizard';
import { ICustomSort } from "../../../Utilities/Interface/BlotterObjects/ICustomSort";
export interface CustomSortValuesWizardProps extends AdaptableWizardStepProps<ICustomSort> {
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
