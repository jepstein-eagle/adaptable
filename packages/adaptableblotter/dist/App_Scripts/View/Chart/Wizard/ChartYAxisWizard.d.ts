import * as React from "react";
import { AdaptableWizardStep, AdaptableWizardStepProps } from '../../Wizard/Interface/IAdaptableWizard';
import { IChartDefinition } from "../../../Utilities/Interface/BlotterObjects/IChartDefinition";
import { AxisTotal } from "../../../Utilities/ChartEnums";
export interface ChartYAxisWizardProps extends AdaptableWizardStepProps<IChartDefinition> {
}
export interface ChartYAxisWizardState {
    YAxisColumnIds: string[];
    YAxisTotal: AxisTotal;
}
export declare class ChartYAxisWizard extends React.Component<ChartYAxisWizardProps, ChartYAxisWizardState> implements AdaptableWizardStep {
    constructor(props: ChartYAxisWizardProps);
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
