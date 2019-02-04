import { IReport } from "../../../Utilities/Interface/BlotterObjects/IReport";
import * as React from "react";
import { AdaptableWizardStep, AdaptableWizardStepProps } from '../../Wizard/Interface/IAdaptableWizard';
export interface ReportSettingsWizardProps extends AdaptableWizardStepProps<IReport> {
    Reports: IReport[];
}
export interface ReportSettingsWizardState {
    ReportName: string;
    ErrorMessage: string;
}
export declare class ReportSettingsWizard extends React.Component<ReportSettingsWizardProps, ReportSettingsWizardState> implements AdaptableWizardStep {
    constructor(props: ReportSettingsWizardProps);
    render(): any;
    private onReportNameChanged;
    canNext(): boolean;
    canBack(): boolean;
    Next(): void;
    Back(): void;
    GetIndexStepIncrement(): number;
    GetIndexStepDecrement(): number;
    StepName: string;
}
