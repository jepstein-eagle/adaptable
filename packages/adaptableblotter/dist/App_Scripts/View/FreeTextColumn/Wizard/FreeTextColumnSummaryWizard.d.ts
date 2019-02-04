import * as React from "react";
import { AdaptableWizardStep, AdaptableWizardStepProps } from '../../Wizard/Interface/IAdaptableWizard';
import { IFreeTextColumn } from "../../../Utilities/Interface/BlotterObjects/IFreeTextColumn";
export interface FreeTextColumnSummaryWizardProps extends AdaptableWizardStepProps<IFreeTextColumn> {
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
