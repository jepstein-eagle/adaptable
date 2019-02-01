import * as React from "react";
import { AdaptableWizardStep, AdaptableWizardStepProps } from '../../Wizard/Interface/IAdaptableWizard';
import { IFormatColumn } from "../../../Utilities/Interface/BlotterObjects/IFormatColumn";
export interface FormatColumnSummaryWizardProps extends AdaptableWizardStepProps<IFormatColumn> {
}
export declare class FormatColumnSummaryWizard extends React.Component<FormatColumnSummaryWizardProps, {}> implements AdaptableWizardStep {
    constructor(props: FormatColumnSummaryWizardProps);
    render(): JSX.Element;
    canNext(): boolean;
    canBack(): boolean;
    Next(): void;
    Back(): void;
    GetIndexStepIncrement(): number;
    GetIndexStepDecrement(): number;
    StepName: string;
}
