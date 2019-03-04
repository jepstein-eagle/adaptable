import * as React from "react";
import { AdaptableWizardStep, AdaptableWizardStepProps } from '../../Wizard/Interface/IAdaptableWizard';
import { ICategoryChartDefinition } from "../../../Utilities/Interface/BlotterObjects/IChartDefinition";
import { Expression } from "../../../Utilities/Expression";
export interface ChartXAxisWizardProps extends AdaptableWizardStepProps<ICategoryChartDefinition> {
}
export interface ChartXAxisWizardState {
    XAxisColumnId: string;
    UseAllXAsisColumnValues: boolean;
    XAxisExpression: Expression;
}
export declare class ChartXAxisWizard extends React.Component<ChartXAxisWizardProps, ChartXAxisWizardState> implements AdaptableWizardStep {
    constructor(props: ChartXAxisWizardProps);
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
