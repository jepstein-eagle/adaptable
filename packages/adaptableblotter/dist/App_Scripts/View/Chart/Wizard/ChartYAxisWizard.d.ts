import * as React from "react";
import { AdaptableWizardStep, AdaptableWizardStepProps } from '../../Wizard/Interface/IAdaptableWizard';
import { IChartDefinition } from "../../../Core/Api/Interface/AdaptableBlotterObjects";
import { IColumn } from "../../../Core/Interface/IColumn";
export interface ChartYAxisWizardProps extends AdaptableWizardStepProps<IChartDefinition> {
    ChartDefinitions: IChartDefinition[];
    Columns: IColumn[];
}
export interface ChartYAxisWizardState {
    YAxisColumn: string;
}
export declare class ChartYAxisWizard extends React.Component<ChartYAxisWizardProps, ChartYAxisWizardState> implements AdaptableWizardStep {
    constructor(props: ChartYAxisWizardProps);
    render(): any;
    onYAxisColumnChanged(columns: IColumn[]): void;
    canNext(): boolean;
    canBack(): boolean;
    Next(): void;
    Back(): void;
    GetIndexStepIncrement(): number;
    GetIndexStepDecrement(): number;
    StepName: string;
}
