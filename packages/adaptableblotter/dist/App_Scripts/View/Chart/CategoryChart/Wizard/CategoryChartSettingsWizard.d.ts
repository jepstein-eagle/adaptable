import * as React from "react";
import { AdaptableWizardStepProps, AdaptableWizardStep } from "../../../Wizard/Interface/IAdaptableWizard";
import { ICategoryChartDefinition } from "../../../../Utilities/Interface/BlotterObjects/IChartDefinition";
export interface CategoryChartSettingsWizardProps extends AdaptableWizardStepProps<ICategoryChartDefinition> {
    ChartNames: string[];
}
export interface CategoryChartSettingsWizardState {
    Name: string;
    Description: string;
    ErrorMessage: string;
    VisibleRowsOnly: boolean;
}
export declare class CategoryChartSettingsWizard extends React.Component<CategoryChartSettingsWizardProps, CategoryChartSettingsWizardState> implements AdaptableWizardStep {
    constructor(props: CategoryChartSettingsWizardProps);
    render(): any;
    onChartNameChange(event: React.FormEvent<any>): void;
    onChartDescriptionChange(event: React.FormEvent<any>): void;
    private onVisibleRowsChanged;
    canNext(): boolean;
    canBack(): boolean;
    Next(): void;
    Back(): void;
    GetIndexStepIncrement(): number;
    GetIndexStepDecrement(): 1 | 2;
}
