import * as React from "react";
import { AdaptableWizardStepProps, AdaptableWizardStep } from "../../../Wizard/Interface/IAdaptableWizard";
import { IPieChartDefinition } from "../../../../Utilities/Interface/BlotterObjects/IChartDefinition";
export interface PieChartSettingsWizardProps extends AdaptableWizardStepProps<IPieChartDefinition> {
    ChartNames: string[];
}
export interface PieChartSettingsWizardState {
    Name: string;
    Description: string;
    VisibleRowsOnly: boolean;
    ErrorMessage: string;
}
export declare class PieChartSettingsWizard extends React.Component<PieChartSettingsWizardProps, PieChartSettingsWizardState> implements AdaptableWizardStep {
    constructor(props: PieChartSettingsWizardProps);
    render(): any;
    onChartNameChange(event: React.FormEvent<any>): void;
    onChartDescriptionChange(event: React.FormEvent<any>): void;
    private onSecondaryColumnOperationChanged;
    canNext(): boolean;
    canBack(): boolean;
    Next(): void;
    Back(): void;
    GetIndexStepIncrement(): number;
    GetIndexStepDecrement(): number;
}
