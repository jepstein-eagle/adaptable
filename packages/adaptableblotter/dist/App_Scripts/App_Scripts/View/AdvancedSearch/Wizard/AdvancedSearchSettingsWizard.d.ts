import * as React from "react";
import { AdaptableWizardStep, AdaptableWizardStepProps } from '../../Wizard/Interface/IAdaptableWizard';
import { IAdvancedSearch } from "../../../Core/Api/Interface/IAdaptableBlotterObjects";
export interface AdvancedSearchSettingsWizardProps extends AdaptableWizardStepProps<IAdvancedSearch> {
    AdvancedSearches: IAdvancedSearch[];
}
export interface AdvancedSearchSettingsWizardState {
    AdvancedSearchName: string;
    ErrorMessage: string;
}
export declare class AdvancedSearchSettingsWizard extends React.Component<AdvancedSearchSettingsWizardProps, AdvancedSearchSettingsWizardState> implements AdaptableWizardStep {
    constructor(props: AdvancedSearchSettingsWizardProps);
    render(): any;
    onAdvancedSearchNameChange(event: React.FormEvent<any>): void;
    canNext(): boolean;
    canBack(): boolean;
    Next(): void;
    Back(): void;
    GetIndexStepIncrement(): number;
    GetIndexStepDecrement(): number;
    StepName: string;
}
