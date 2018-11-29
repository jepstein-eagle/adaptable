import * as React from "react";
import { AdaptableWizardStep, AdaptableWizardStepProps } from '../../Wizard/Interface/IAdaptableWizard';
import { IChartDefinition } from "../../../Api/Interface/IAdaptableBlotterObjects";
import { IColumn } from "../../../api/Interface/IColumn";
import { IRawValueDisplayValuePair } from "../../UIInterfaces";
import { IAdaptableBlotter } from "../../../api/Interface/IAdaptableBlotter";
export interface ChartXAxisWizardProps extends AdaptableWizardStepProps<IChartDefinition> {
    ChartDefinitions: IChartDefinition[];
    Columns: IColumn[];
    Blotter: IAdaptableBlotter;
}
export interface ChartXAxisWizardState {
    XAxisColumn: string;
    XAxisColumnValues: string[];
    UseAllXAsisColumnValues: boolean;
    AvailableXAxisColumnValues: IRawValueDisplayValuePair[];
}
export declare class ChartXAxisWizard extends React.Component<ChartXAxisWizardProps, ChartXAxisWizardState> implements AdaptableWizardStep {
    constructor(props: ChartXAxisWizardProps);
    render(): any;
    private onUseAllColumnValuesChanged;
    private onXAxisColumnChanged;
    private onColumnValuesChange;
    canNext(): boolean;
    canBack(): boolean;
    Next(): void;
    Back(): void;
    GetIndexStepIncrement(): number;
    GetIndexStepDecrement(): number;
    StepName: string;
}
