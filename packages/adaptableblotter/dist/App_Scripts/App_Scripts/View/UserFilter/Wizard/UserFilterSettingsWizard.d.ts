import * as React from "react";
import { IColumn } from '../../../Core/Interface/IColumn';
import { AdaptableWizardStep, AdaptableWizardStepProps } from '../../Wizard/Interface/IAdaptableWizard';
import { IUserFilter } from '../../../Api/Interface/IAdaptableBlotterObjects';
export interface UserFilterSettingsWizardProps extends AdaptableWizardStepProps<IUserFilter> {
    UserFilters: IUserFilter[];
    Columns: Array<IColumn>;
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
    StepName: string;
}
