import * as React from "react";
import { AdaptableWizardStep, AdaptableWizardStepProps } from '../../Wizard/Interface/IAdaptableWizard';
import { ICategoryChartDefinition } from "../../../Utilities/Interface/BlotterObjects/IChartDefinition";
export interface ChartSummaryWizardProps extends AdaptableWizardStepProps<ICategoryChartDefinition> {
}
export declare class ChartSummaryWizard extends React.Component<ChartSummaryWizardProps, {}> implements AdaptableWizardStep {
    constructor(props: ChartSummaryWizardProps);
    render(): any;
    private getExpressionString;
    canNext(): boolean;
    canBack(): boolean;
    Next(): void;
    Back(): void;
    GetIndexStepIncrement(): number;
    GetIndexStepDecrement(): number;
}
