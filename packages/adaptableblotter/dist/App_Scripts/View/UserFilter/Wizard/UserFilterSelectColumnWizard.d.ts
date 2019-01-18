import * as React from "react";
import { IColumn } from '../../../Utilities/Interface/IColumn';
import { AdaptableWizardStep, AdaptableWizardStepProps } from '../../Wizard/Interface/IAdaptableWizard';
import { IUserFilter } from '../../../Utilities/Interface/IAdaptableBlotterObjects';
export interface UserFilterSelectColumnWizardProps extends AdaptableWizardStepProps<IUserFilter> {
    Columns: Array<IColumn>;
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
    StepName: string;
}
