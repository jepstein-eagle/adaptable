import * as React from "react";
import { AdaptableWizardStep, AdaptableWizardStepProps } from '../../Wizard/Interface/IAdaptableWizard';
import { IReport } from "../../../Utilities/Interface/BlotterObjects/IReport";
export interface ReportColumnChooserWizardProps extends AdaptableWizardStepProps<IReport> {
}
export interface ReportColumnsWizardState {
    AllColumnValues: string[];
    SelectedColumnValues: string[];
}
export declare class ReportColumnChooserWizard extends React.Component<ReportColumnChooserWizardProps, ReportColumnsWizardState> implements AdaptableWizardStep {
    constructor(props: ReportColumnChooserWizardProps);
    render(): JSX.Element;
    OnSelectedValuesChange(newValues: Array<string>): void;
    canNext(): boolean;
    canBack(): boolean;
    Next(): void;
    Back(): void;
    GetIndexStepIncrement(): number;
    GetIndexStepDecrement(): number;
}
