import * as React from "react";
import { AdaptableWizardStep, AdaptableWizardStepProps } from '../../Wizard/Interface/IAdaptableWizard';
import { IPercentBar } from "../../../Utilities/Interface/BlotterObjects/IPercentBar";
export interface PercentBarSelectColumnWizardProps extends AdaptableWizardStepProps<IPercentBar> {
}
export interface PercentBarSelectColumnWizardState {
    ColumnId: string;
    MinValue: number;
    MaxValue: number;
}
export declare class PercentBarSelectColumnWizard extends React.Component<PercentBarSelectColumnWizardProps, PercentBarSelectColumnWizardState> implements AdaptableWizardStep {
    constructor(props: PercentBarSelectColumnWizardProps);
    render(): any;
    private onColumnSelectedChanged;
    canNext(): boolean;
    canBack(): boolean;
    Next(): void;
    Back(): void;
    GetIndexStepIncrement(): number;
    GetIndexStepDecrement(): number;
}
