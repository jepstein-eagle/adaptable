import * as React from "react";
import { AdaptableWizardStepProps, AdaptableWizardStep } from "../../../Wizard/Interface/IAdaptableWizard";
import { ICategoryChartDefinition } from "../../../../Utilities/Interface/BlotterObjects/IChartDefinition";
export interface CategoryChartSummaryWizardProps extends AdaptableWizardStepProps<ICategoryChartDefinition> {
}
export declare class CategoryChartSummaryWizard extends React.Component<CategoryChartSummaryWizardProps, {}> implements AdaptableWizardStep {
    constructor(props: CategoryChartSummaryWizardProps);
    render(): any;
    private getExpressionString;
    canNext(): boolean;
    canBack(): boolean;
    Next(): void;
    Back(): void;
    GetIndexStepIncrement(): number;
    GetIndexStepDecrement(): number;
}
