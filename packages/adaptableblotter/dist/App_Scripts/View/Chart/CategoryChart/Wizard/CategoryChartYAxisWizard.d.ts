import * as React from "react";
import { AdaptableWizardStepProps, AdaptableWizardStep } from "../../../Wizard/Interface/IAdaptableWizard";
import { ICategoryChartDefinition } from "../../../../Utilities/Interface/BlotterObjects/Charting/IChartDefinition";
import { AxisTotal } from "../../../../Utilities/ChartEnums";
export interface CategoryChartYAxisWizardProps extends AdaptableWizardStepProps<ICategoryChartDefinition> {
}
export interface CategoryChartYAxisWizardState {
    YAxisColumnIds: string[];
    YAxisTotal: AxisTotal;
}
export declare class CategoryChartYAxisWizard extends React.Component<CategoryChartYAxisWizardProps, CategoryChartYAxisWizardState> implements AdaptableWizardStep {
    constructor(props: CategoryChartYAxisWizardProps);
    render(): any;
    OnSelectedValuesChange(newValues: Array<string>): void;
    private onYAisTotalChanged;
    canNext(): boolean;
    canBack(): boolean;
    Next(): void;
    Back(): void;
    GetIndexStepIncrement(): number;
    GetIndexStepDecrement(): number;
}
