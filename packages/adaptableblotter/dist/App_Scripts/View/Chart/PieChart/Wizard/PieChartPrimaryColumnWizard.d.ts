import * as React from "react";
import { AdaptableWizardStepProps, AdaptableWizardStep } from "../../../Wizard/Interface/IAdaptableWizard";
import { IPieChartDefinition } from "../../../../Utilities/Interface/BlotterObjects/IChartDefinition";
export interface PieChartPrimaryColumnWizardProps extends AdaptableWizardStepProps<IPieChartDefinition> {
}
export interface PieChartPrimaryColumnWizardState {
    PrimaryColumnId: string;
}
export declare class PieChartPrimaryColumnWizard extends React.Component<PieChartPrimaryColumnWizardProps, PieChartPrimaryColumnWizardState> implements AdaptableWizardStep {
    constructor(props: PieChartPrimaryColumnWizardProps);
    render(): any;
    private onPrimaryColumnChanged;
    canNext(): boolean;
    canBack(): boolean;
    Next(): void;
    Back(): void;
    GetIndexStepIncrement(): number;
    GetIndexStepDecrement(): number;
}
