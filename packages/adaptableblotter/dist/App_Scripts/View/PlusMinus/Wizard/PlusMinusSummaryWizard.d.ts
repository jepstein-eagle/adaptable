import * as React from "react";
import { AdaptableWizardStep, AdaptableWizardStepProps } from '../../Wizard/Interface/IAdaptableWizard';
import { IColumn } from "../../../Core/Interface/IColumn";
import { IUserFilter, IPlusMinusRule } from "../../../Core/Api/Interface/AdaptableBlotterObjects";
export interface PlusMinusSummaryWizardProps extends AdaptableWizardStepProps<IPlusMinusRule> {
    Columns: IColumn[];
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
