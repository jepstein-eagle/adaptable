import * as React from "react";
import { AdaptableWizardStepProps, AdaptableWizardStep } from "../../../Wizard/Interface/IAdaptableWizard";
import { ICategoryChartDefinition } from "../../../../Utilities/Interface/BlotterObjects/Charting/IChartDefinition";
import { Expression } from "../../../../Utilities/Expression";
export interface CategoryChartXAxisWizardProps extends AdaptableWizardStepProps<ICategoryChartDefinition> {
}
export interface CategoryChartXAxisWizardState {
    XAxisColumnId: string;
    UseAllXAsisColumnValues: boolean;
    XAxisExpression?: Expression;
}
export declare class CategoryChartXAxisWizard extends React.Component<CategoryChartXAxisWizardProps, CategoryChartXAxisWizardState> implements AdaptableWizardStep {
    constructor(props: CategoryChartXAxisWizardProps);
    render(): any;
    private onUseAllColumnValuesChanged;
    private onXAxisColumnChanged;
    canNext(): boolean;
    canBack(): boolean;
    Next(): void;
    Back(): void;
    GetIndexStepIncrement(): 1 | 2;
    GetIndexStepDecrement(): number;
}
