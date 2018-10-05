import * as React from "react";
import { AdaptableWizardStep, AdaptableWizardStepProps } from '../../Wizard/Interface/IAdaptableWizard';
import { IColumn } from '../../../Core/Interface/IColumn';
import { IPlusMinusRule } from "../../../Core/Api/Interface/IAdaptableBlotterObjects";
export interface PlusMinusColumnWizardProps extends AdaptableWizardStepProps<IPlusMinusRule> {
    Columns: Array<IColumn>;
}
export interface PlusMinusColumnWizardState {
    SelectedColumnId: string;
}
export declare class PlusMinusColumnWizard extends React.Component<PlusMinusColumnWizardProps, PlusMinusColumnWizardState> implements AdaptableWizardStep {
    constructor(props: PlusMinusColumnWizardProps);
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
