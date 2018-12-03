import * as React from "react";
import { AdaptableWizardStep, AdaptableWizardStepProps } from '../../Wizard/Interface/IAdaptableWizard';
import { IColumn } from "../../../api/Interface/IColumn";
import { IAdvancedSearch, IUserFilter } from "../../../api/Interface/IAdaptableBlotterObjects";
export interface AdvancedSearchSummaryWizardProps extends AdaptableWizardStepProps<IAdvancedSearch> {
    Columns: IColumn[];
    UserFilters: IUserFilter[];
}
export declare class AdvancedSearchSummaryWizard extends React.Component<AdvancedSearchSummaryWizardProps, {}> implements AdaptableWizardStep {
    constructor(props: AdvancedSearchSummaryWizardProps);
    render(): any;
    canNext(): boolean;
    canBack(): boolean;
    Next(): void;
    Back(): void;
    GetIndexStepIncrement(): number;
    GetIndexStepDecrement(): number;
    StepName: string;
}
