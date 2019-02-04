import * as React from "react";
import { AdaptableWizardStep, AdaptableWizardStepProps } from '../../Wizard/Interface/IAdaptableWizard';
import { IUserFilter } from "../../../Utilities/Interface/BlotterObjects/IUserFilter";
import { IConditionalStyle } from "../../../Utilities/Interface/BlotterObjects/IConditionalStyle";
export interface ConditionalStyleSummaryWizardProps extends AdaptableWizardStepProps<IConditionalStyle> {
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
