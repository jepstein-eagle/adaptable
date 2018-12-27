import * as React from "react";
import { AdaptableWizardStep, AdaptableWizardStepProps } from '../../Wizard/Interface/IAdaptableWizard';
import { IChartDefinition } from "../../../Api/Interface/IAdaptableBlotterObjects";
import { IColumn } from "../../../Api/Interface/IColumn";
import { IAdaptableBlotter } from "../../../Api/Interface/IAdaptableBlotter";
import { Expression } from "../../../Api/Expression";
export interface ChartXAxisWizardProps extends AdaptableWizardStepProps<IChartDefinition> {
    ChartDefinitions: IChartDefinition[];
    Columns: IColumn[];
    Blotter: IAdaptableBlotter;
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
    StepName: string;
}
