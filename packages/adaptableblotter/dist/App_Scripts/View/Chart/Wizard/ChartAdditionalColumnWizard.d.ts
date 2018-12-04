import * as React from "react";
import { AdaptableWizardStep, AdaptableWizardStepProps } from '../../Wizard/Interface/IAdaptableWizard';
import { IChartDefinition } from "../../../Api/Interface/IAdaptableBlotterObjects";
import { IColumn } from "../../../Api/Interface/IColumn";
import { IRawValueDisplayValuePair } from "../../UIInterfaces";
import { IAdaptableBlotter } from "../../../Api/Interface/IAdaptableBlotter";
export interface ChartAdditionalColumnWizardProps extends AdaptableWizardStepProps<IChartDefinition> {
    ChartDefinitions: IChartDefinition[];
    Columns: IColumn[];
    Blotter: IAdaptableBlotter;
}
export interface ChartAdditionalColumnWizardState {
    AdditionalColumn: string;
    AdditionalColumnValues: string[];
    UseAllAdditionalColumnValues: boolean;
    AvailableAdditionalColumnValues: IRawValueDisplayValuePair[];
}
export declare class ChartAdditionalColumnWizard extends React.Component<ChartAdditionalColumnWizardProps, ChartAdditionalColumnWizardState> implements AdaptableWizardStep {
    constructor(props: ChartAdditionalColumnWizardProps);
    render(): any;
    private onUseAllColumnValuesChanged;
    onColumnValuesChange(list: any[]): any;
    onAdditionalColumnChanged(columns: IColumn[]): void;
    canNext(): boolean;
    canBack(): boolean;
    Next(): void;
    Back(): void;
    GetIndexStepIncrement(): number;
    GetIndexStepDecrement(): number;
    StepName: string;
}
