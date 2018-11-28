import * as React from "react";
import { IColumn } from '../../../Core/Interface/IColumn';
import { AdaptableWizardStep, AdaptableWizardStepProps } from '../../Wizard/Interface/IAdaptableWizard';
import { IPercentBar } from "../../../Api/Interface/IAdaptableBlotterObjects";
export interface PercentBarSummaryWizardProps extends AdaptableWizardStepProps<IPercentBar> {
    Columns: IColumn[];
}
export declare class PercentBarSummaryWizard extends React.Component<PercentBarSummaryWizardProps, {}> implements AdaptableWizardStep {
    constructor(props: PercentBarSummaryWizardProps);
    render(): any;
    canNext(): boolean;
    canBack(): boolean;
    Next(): void;
    Back(): void;
    GetIndexStepIncrement(): number;
    GetIndexStepDecrement(): number;
    StepName: string;
}
