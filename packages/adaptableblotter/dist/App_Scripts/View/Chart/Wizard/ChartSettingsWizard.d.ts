import * as React from "react";
import { AdaptableWizardStep, AdaptableWizardStepProps } from '../../Wizard/Interface/IAdaptableWizard';
import { IChartDefinition } from "../../../Core/Api/Interface/IAdaptableBlotterObjects";
export interface ChartSettingsWizardProps extends AdaptableWizardStepProps<IChartDefinition> {
    ChartDefinitions: IChartDefinition[];
}
export interface ChartSettingsWizardState {
    ChartName: string;
    ChartType: 'Bar Chart' | 'Line Chart';
    ErrorMessage: string;
}
export declare class ChartSettingsWizard extends React.Component<ChartSettingsWizardProps, ChartSettingsWizardState> implements AdaptableWizardStep {
    constructor(props: ChartSettingsWizardProps);
    render(): any;
    onChartNameChange(event: React.FormEvent<any>): void;
    onChartTypeChange(event: React.FormEvent<any>): void;
    canNext(): boolean;
    canBack(): boolean;
    Next(): void;
    Back(): void;
    GetIndexStepIncrement(): number;
    GetIndexStepDecrement(): number;
    StepName: string;
}
