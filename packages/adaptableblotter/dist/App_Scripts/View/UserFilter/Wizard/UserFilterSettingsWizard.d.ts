import * as React from "react";
import { AdaptableWizardStep, AdaptableWizardStepProps } from '../../Wizard/Interface/IAdaptableWizard';
import { IUserFilter } from "../../../Utilities/Interface/BlotterObjects/IUserFilter";
export interface UserFilterSettingsWizardProps extends AdaptableWizardStepProps<IUserFilter> {
    UserFilters: IUserFilter[];
}
export interface UserFilterSettingsWizardState {
    FilterName: string;
    ErrorMessage: string;
}
export declare class UserFilterSettingsWizard extends React.Component<UserFilterSettingsWizardProps, UserFilterSettingsWizardState> implements AdaptableWizardStep {
    constructor(props: UserFilterSettingsWizardProps);
    render(): JSX.Element;
    onFilterNameChange(event: React.FormEvent<any>): void;
    canNext(): boolean;
    canBack(): boolean;
    Next(): void;
    Back(): void;
    GetIndexStepIncrement(): number;
    GetIndexStepDecrement(): number;
}
