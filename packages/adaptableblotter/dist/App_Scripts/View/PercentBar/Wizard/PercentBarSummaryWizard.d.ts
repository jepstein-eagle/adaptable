import * as React from "react";
import { AdaptableWizardStep, AdaptableWizardStepProps } from '../../Wizard/Interface/IAdaptableWizard';
import { IPercentBar } from "../../../Utilities/Interface/BlotterObjects/IPercentBar";
export interface PercentBarSummaryWizardProps extends AdaptableWizardStepProps<IPercentBar> {
}
export declare class PercentBarSummaryWizard extends React.Component<PercentBarSummaryWizardProps, {}> implements AdaptableWizardStep {
    constructor(props: PercentBarSummaryWizardProps);
    render(): any;
    canNext(): boolean;
    canBack(): boolean;
    Next(): void;
    Back(): void;
    GetIndexStepIncrement(): number;
    GetIndexStepDecrement(): number;
}
