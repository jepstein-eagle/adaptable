import * as React from "react";
import { AdaptableWizardStep, AdaptableWizardStepProps } from '../../Wizard/Interface/IAdaptableWizard';
import { IColumn } from "../../../api/Interface/IColumn";
import { ILayout } from "../../../api/Interface/IAdaptableBlotterObjects";
export interface LayoutSummaryWizardProps extends AdaptableWizardStepProps<ILayout> {
    Columns: IColumn[];
}
export declare class LayoutSummaryWizard extends React.Component<LayoutSummaryWizardProps, {}> implements AdaptableWizardStep {
    constructor(props: LayoutSummaryWizardProps);
    render(): any;
    canNext(): boolean;
    private getColumnNames;
    canBack(): boolean;
    Next(): void;
    Back(): void;
    GetIndexStepIncrement(): number;
    GetIndexStepDecrement(): number;
    StepName: string;
}
