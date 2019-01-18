import * as React from "react";
import { IColumn } from '../../../Utilities/Interface/IColumn';
import { AdaptableWizardStep, AdaptableWizardStepProps } from '../../Wizard/Interface/IAdaptableWizard';
import { IConditionalStyle, IUserFilter } from "../../../Utilities/Interface/IAdaptableBlotterObjects";
export interface ConditionalStyleSummaryWizardProps extends AdaptableWizardStepProps<IConditionalStyle> {
    Columns: IColumn[];
    UserFilters: IUserFilter[];
}
export declare class ConditionalStyleSummaryWizard extends React.Component<ConditionalStyleSummaryWizardProps, {}> implements AdaptableWizardStep {
    constructor(props: ConditionalStyleSummaryWizardProps);
    render(): any;
    private getScope;
    canNext(): boolean;
    canBack(): boolean;
    Next(): void;
    Back(): void;
    GetIndexStepIncrement(): number;
    GetIndexStepDecrement(): number;
    StepName: string;
}
