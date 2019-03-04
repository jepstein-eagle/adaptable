import * as React from "react";
import { AdaptableWizardStep, AdaptableWizardStepProps } from '../../Wizard/Interface/IAdaptableWizard';
import { ICategoryChartDefinition } from "../../../Utilities/Interface/BlotterObjects/IChartDefinition";
export interface ChartSettingsWizardProps extends AdaptableWizardStepProps<ICategoryChartDefinition> {
    ChartNames: string[];
}
export interface ChartSettingsWizardState {
    Name: string;
    Description: string;
    ErrorMessage: string;
}
export declare class ChartSettingsWizard extends React.Component<ChartSettingsWizardProps, ChartSettingsWizardState> implements AdaptableWizardStep {
    constructor(props: ChartSettingsWizardProps);
    render(): any;
    onChartNameChange(event: React.FormEvent<any>): void;
    onChartDescriptionChange(event: React.FormEvent<any>): void;
    canNext(): boolean;
    canBack(): boolean;
    Next(): void;
    Back(): void;
    GetIndexStepIncrement(): number;
    GetIndexStepDecrement(): 1 | 2;
}
