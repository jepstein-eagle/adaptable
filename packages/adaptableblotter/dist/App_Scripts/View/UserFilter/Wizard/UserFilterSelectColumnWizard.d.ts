import * as React from "react";
import { AdaptableWizardStep, AdaptableWizardStepProps } from '../../Wizard/Interface/IAdaptableWizard';
import { IUserFilter } from "../../../Utilities/Interface/BlotterObjects/IUserFilter";
export interface UserFilterSelectColumnWizardProps extends AdaptableWizardStepProps<IUserFilter> {
}
export interface UserFilterSelectColumnWizardState {
    ColumnId: string;
}
export declare class UserFilterSelectColumnWizard extends React.Component<UserFilterSelectColumnWizardProps, UserFilterSelectColumnWizardState> implements AdaptableWizardStep {
    constructor(props: UserFilterSelectColumnWizardProps);
    render(): any;
    private onColumnSelectedChanged;
    canNext(): boolean;
    canBack(): boolean;
    Next(): void;
    Back(): void;
    GetIndexStepIncrement(): number;
    GetIndexStepDecrement(): number;
}
