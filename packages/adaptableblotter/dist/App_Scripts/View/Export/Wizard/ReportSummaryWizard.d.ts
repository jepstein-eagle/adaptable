import { IUserFilter } from "../../../Utilities/Interface/BlotterObjects/IUserFilter";
import { IReport } from "../../../Utilities/Interface/BlotterObjects/IReport";
import * as React from "react";
import { AdaptableWizardStep, AdaptableWizardStepProps } from '../../Wizard/Interface/IAdaptableWizard';
export interface ReportSummaryWizardProps extends AdaptableWizardStepProps<IReport> {
    UserFilters: IUserFilter[];
}
export declare class ReportSummaryWizard extends React.Component<ReportSummaryWizardProps, {}> implements AdaptableWizardStep {
    constructor(props: ReportSummaryWizardProps);
    render(): any;
    canNext(): boolean;
    canBack(): boolean;
    Next(): void;
    Back(): void;
    GetIndexStepIncrement(): number;
    GetIndexStepDecrement(): number;
    StepName: string;
}
