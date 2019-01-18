import * as React from "react";
import { AdaptableWizardStep, AdaptableWizardStepProps } from '../../Wizard/Interface/IAdaptableWizard';
import { IColumn } from "../../../Utilities/Interface/IColumn";
import { IFreeTextColumn } from "../../../Utilities/Interface/IAdaptableBlotterObjects";
export interface FreeTextColumnSummaryWizardProps extends AdaptableWizardStepProps<IFreeTextColumn> {
    Columns: IColumn[];
}
export declare class FreeTextColumnSummaryWizard extends React.Component<FreeTextColumnSummaryWizardProps, {}> implements AdaptableWizardStep {
    constructor(props: FreeTextColumnSummaryWizardProps);
    render(): JSX.Element;
    canNext(): boolean;
    canBack(): boolean;
    Next(): void;
    Back(): void;
    GetIndexStepIncrement(): number;
    GetIndexStepDecrement(): number;
    StepName: string;
}
