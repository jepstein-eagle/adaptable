import * as React from "react";
import { AdaptableWizardStep, AdaptableWizardStepProps } from '../../Wizard/Interface/IAdaptableWizard';
import { IChartDefinition } from "../../../Utilities/Interface/BlotterObjects/IChartDefinition";
import { IColumn } from "../../../Utilities/Interface/IColumn";
import { Expression } from "../../../Utilities/Expression";
export interface ChartXSegmentColumnWizardProps extends AdaptableWizardStepProps<IChartDefinition> {
}
export interface ChartXSegmentColumnWizardState {
    XSegmentColumnId: string;
    UseAllXSegmentColumnValues: boolean;
    XSegmentExpression: Expression;
}
export declare class ChartXSegmentColumnWizard extends React.Component<ChartXSegmentColumnWizardProps, ChartXSegmentColumnWizardState> implements AdaptableWizardStep {
    constructor(props: ChartXSegmentColumnWizardProps);
    render(): any;
    private onUseAllColumnValuesChanged;
    onSegmentColumnChanged(columns: IColumn[]): void;
    canNext(): boolean;
    canBack(): boolean;
    Next(): void;
    Back(): void;
    GetIndexStepIncrement(): 1 | 2;
    GetIndexStepDecrement(): 1 | 2;
}
