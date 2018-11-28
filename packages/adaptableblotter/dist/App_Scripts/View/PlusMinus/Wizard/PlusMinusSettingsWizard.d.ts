import * as React from "react";
import { AdaptableWizardStep, AdaptableWizardStepProps } from '../../Wizard/Interface/IAdaptableWizard';
import { IPlusMinusRule } from "../../../Core/Api/Interface/IAdaptableBlotterObjects";
export interface PlusMinusSettingsWizardProps extends AdaptableWizardStepProps<IPlusMinusRule> {
}
export interface PlusMinusSettingsWizardState {
    NudgeValue: number;
    IsDefaultNudge: boolean;
}
export declare class PlusMinusSettingsWizard extends React.Component<PlusMinusSettingsWizardProps, PlusMinusSettingsWizardState> implements AdaptableWizardStep {
    constructor(props: PlusMinusSettingsWizardProps);
    render(): any;
    private onExpressionOptionChange;
    onColumnDefaultNudgeValueChange(event: React.FormEvent<any>): void;
    canNext(): boolean;
    canBack(): boolean;
    Next(): void;
    Back(): void;
    GetIndexStepIncrement(): 2 | 1;
    GetIndexStepDecrement(): number;
    StepName: string;
}
