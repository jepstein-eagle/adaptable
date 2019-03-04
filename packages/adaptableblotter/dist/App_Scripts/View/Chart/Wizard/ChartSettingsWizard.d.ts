import * as React from "react";
import { AdaptableWizardStep, AdaptableWizardStepProps } from '../../Wizard/Interface/IAdaptableWizard';
import { ICategoryChartDefinition } from "../../../Utilities/Interface/BlotterObjects/IChartDefinition";
export interface ChartSettingsWizardProps extends AdaptableWizardStepProps<ICategoryChartDefinition> {
    ChartTitles: string[];
}
export interface ChartSettingsWizardState {
    Title: string;
    SubTitle: string;
    ErrorMessage: string;
}
export declare class ChartSettingsWizard extends React.Component<ChartSettingsWizardProps, ChartSettingsWizardState> implements AdaptableWizardStep {
    constructor(props: ChartSettingsWizardProps);
    render(): any;
    onChartTitleChange(event: React.FormEvent<any>): void;
    onChartSubTitleChange(event: React.FormEvent<any>): void;
    canNext(): boolean;
    canBack(): boolean;
    Next(): void;
    Back(): void;
    GetIndexStepIncrement(): number;
    GetIndexStepDecrement(): 1 | 2;
}
