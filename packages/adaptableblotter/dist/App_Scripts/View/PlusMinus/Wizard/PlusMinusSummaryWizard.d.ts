import * as React from "react";
import { AdaptableWizardStep, AdaptableWizardStepProps } from '../../Wizard/Interface/IAdaptableWizard';
import { IPlusMinusRule } from "../../../Utilities/Interface/BlotterObjects/IPlusMinusRule";
import { IUserFilter } from "../../../Utilities/Interface/BlotterObjects/IUserFilter";
export interface PlusMinusSummaryWizardProps extends AdaptableWizardStepProps<IPlusMinusRule> {
    UserFilters: IUserFilter[];
}
export declare class PlusMinusSummaryWizard extends React.Component<PlusMinusSummaryWizardProps, {}> implements AdaptableWizardStep {
    constructor(props: PlusMinusSummaryWizardProps);
    render(): any;
    canNext(): boolean;
    canBack(): boolean;
    Next(): void;
    Back(): void;
    GetIndexStepIncrement(): number;
    GetIndexStepDecrement(): 1 | 2;
    StepName: string;
}
