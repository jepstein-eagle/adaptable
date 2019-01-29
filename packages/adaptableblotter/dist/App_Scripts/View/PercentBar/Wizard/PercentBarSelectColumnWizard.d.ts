import * as React from "react";
import { IColumn } from '../../../Utilities/Interface/IColumn';
import { AdaptableWizardStep, AdaptableWizardStepProps } from '../../Wizard/Interface/IAdaptableWizard';
import { IPercentBar } from "../../../Utilities/Interface/BlotterObjects/IPercentBar";
export interface PercentBarSelectColumnWizardProps extends AdaptableWizardStepProps<IPercentBar> {
    Columns: Array<IColumn>;
}
export interface PercentBarSelectColumnWizardState {
    ColumnId: string;
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
    StepName: string;
}
