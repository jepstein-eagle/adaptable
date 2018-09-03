import * as React from "react";
import { AdaptableWizardStep, AdaptableWizardStepProps } from '../../Wizard/Interface/IAdaptableWizard';
import { IChartDefinition } from "../../../Core/Api/Interface/AdaptableBlotterObjects";
import { DistinctCriteriaPairValue } from "../../../Core/Enums";
import { IColumn } from "../../../Core/Interface/IColumn";
import { IRawValueDisplayValuePair } from "../../UIInterfaces";
export interface ChartXAxisWizardProps extends AdaptableWizardStepProps<IChartDefinition> {
    ChartDefinitions: IChartDefinition[];
    Columns: IColumn[];
    getColumnValueDisplayValuePairDistinctList: (columnId: string, distinctCriteria: DistinctCriteriaPairValue) => Array<IRawValueDisplayValuePair>;
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
