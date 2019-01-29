import * as React from "react";
import { AdaptableWizardStep, AdaptableWizardStepProps } from '../../Wizard/Interface/IAdaptableWizard';
import { IColumn } from "../../../Utilities/Interface/IColumn";
import { IUserFilter } from "../../../Utilities/Interface/BlotterObjects/IUserFilter";
import { IAdvancedSearch } from "../../../Utilities/Interface/BlotterObjects/IAdvancedSearch";
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
