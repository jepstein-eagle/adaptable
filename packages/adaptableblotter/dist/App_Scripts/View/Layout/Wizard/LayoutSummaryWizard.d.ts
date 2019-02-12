import * as React from "react";
import { AdaptableWizardStep, AdaptableWizardStepProps } from '../../Wizard/Interface/IAdaptableWizard';
import { ILayout } from "../../../Utilities/Interface/BlotterObjects/ILayout";
export interface LayoutSummaryWizardProps extends AdaptableWizardStepProps<ILayout> {
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
}
