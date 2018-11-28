import * as React from "react";
import { AdaptableWizardStep, AdaptableWizardStepProps } from '../../Wizard/Interface/IAdaptableWizard';
import { ICalculatedColumn } from "../../../Core/Api/Interface/IAdaptableBlotterObjects";
export interface CalculatedColumnSummaryWizardProps extends AdaptableWizardStepProps<ICalculatedColumn> {
}
export declare class CalculatedColumnSummaryWizard extends React.Component<CalculatedColumnSummaryWizardProps, {}> implements AdaptableWizardStep {
    constructor(props: CalculatedColumnSummaryWizardProps);
    render(): any;
    canNext(): boolean;
    canBack(): boolean;
    Next(): void;
    Back(): void;
    GetIndexStepIncrement(): number;
    GetIndexStepDecrement(): number;
    StepName: string;
}
