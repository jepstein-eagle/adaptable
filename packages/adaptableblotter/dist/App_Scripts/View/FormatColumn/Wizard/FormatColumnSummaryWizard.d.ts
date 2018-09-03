import * as React from "react";
import { AdaptableWizardStep, AdaptableWizardStepProps } from '../../Wizard/Interface/IAdaptableWizard';
import { IColumn } from "../../../Core/Interface/IColumn";
import { IFormatColumn } from "../../../Core/Api/Interface/AdaptableBlotterObjects";
export interface FormatColumnSummaryWizardProps extends AdaptableWizardStepProps<IFormatColumn> {
    Columns: IColumn[];
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
