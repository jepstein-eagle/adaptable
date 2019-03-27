import * as React from "react";
import { AdaptableWizardStepProps, AdaptableWizardStep } from "../../../Wizard/Interface/IAdaptableWizard";
import { IPieChartDefinition } from "../../../../Utilities/Interface/BlotterObjects/IChartDefinition";
export interface PieChartSummaryWizardProps extends AdaptableWizardStepProps<IPieChartDefinition> {
}
export declare class PieChartSummaryWizard extends React.Component<PieChartSummaryWizardProps, {}> implements AdaptableWizardStep {
    constructor(props: PieChartSummaryWizardProps);
    render(): any;
    canNext(): boolean;
    canBack(): boolean;
    Next(): void;
    Back(): void;
    GetIndexStepIncrement(): number;
    GetIndexStepDecrement(): number;
}
