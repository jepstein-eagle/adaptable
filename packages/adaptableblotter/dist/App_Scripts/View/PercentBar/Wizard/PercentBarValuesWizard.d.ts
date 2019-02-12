import * as React from "react";
import { AdaptableWizardStep, AdaptableWizardStepProps } from '../../Wizard/Interface/IAdaptableWizard';
import { IPercentBar } from "../../../Utilities/Interface/BlotterObjects/IPercentBar";
export interface PercentBarValuesWizardProps extends AdaptableWizardStepProps<IPercentBar> {
}
export interface PercentBarValuesWizardState {
    MinValue: number;
    MaxValue: number;
    MinValueColumnId: string;
    MaxValueColumnId: string;
    UseMinColumn: boolean;
    UseMaxColumn: boolean;
}
export declare class PercentBarValuesWizard extends React.Component<PercentBarValuesWizardProps, PercentBarValuesWizardState> implements AdaptableWizardStep {
    constructor(props: PercentBarValuesWizardProps);
    render(): any;
    private onUseMinColumnSelectChanged;
    private onMinValueChanged;
    private onColumnMinValueSelectedChanged;
    private onUseMaxColumnSelectChanged;
    private onMaxValueChanged;
    private onColumnMaxValueSelectedChanged;
    canNext(): boolean;
    canBack(): boolean;
    Next(): void;
    Back(): void;
    GetIndexStepIncrement(): number;
    GetIndexStepDecrement(): number;
}
