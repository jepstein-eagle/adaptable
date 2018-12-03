import * as React from "react";
import { IColumn } from '../../../api/Interface/IColumn';
import { AdaptableWizardStep, AdaptableWizardStepProps } from '../../Wizard/Interface/IAdaptableWizard';
import { IUserFilter } from '../../../api/Interface/IAdaptableBlotterObjects';
export interface UserFilterSummaryWizardProps extends AdaptableWizardStepProps<IUserFilter> {
    Columns: IColumn[];
    UserFilters: IUserFilter[];
}
export declare class UserFilterSummaryWizard extends React.Component<UserFilterSummaryWizardProps, {}> implements AdaptableWizardStep {
    constructor(props: UserFilterSummaryWizardProps);
    render(): JSX.Element;
    canNext(): boolean;
    canBack(): boolean;
    Next(): void;
    Back(): void;
    GetIndexStepIncrement(): number;
    GetIndexStepDecrement(): number;
    StepName: string;
}
