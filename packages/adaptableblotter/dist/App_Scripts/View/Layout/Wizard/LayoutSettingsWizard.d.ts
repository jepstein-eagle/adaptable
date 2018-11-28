import * as React from "react";
import { AdaptableWizardStep, AdaptableWizardStepProps } from '../../Wizard/Interface/IAdaptableWizard';
import { ILayout } from "../../../Api/Interface/IAdaptableBlotterObjects";
export interface LayoutSettingsWizardProps extends AdaptableWizardStepProps<ILayout> {
    Layouts: ILayout[];
}
export interface LayoutSettingsWizardState {
    LayoutName: string;
    ErrorMessage: string;
}
export declare class LayoutSettingsWizard extends React.Component<LayoutSettingsWizardProps, LayoutSettingsWizardState> implements AdaptableWizardStep {
    constructor(props: LayoutSettingsWizardProps);
    render(): any;
    onLayoutNameChange(event: React.FormEvent<any>): void;
    canNext(): boolean;
    canBack(): boolean;
    Next(): void;
    Back(): void;
    GetIndexStepIncrement(): number;
    GetIndexStepDecrement(): number;
    StepName: string;
}
