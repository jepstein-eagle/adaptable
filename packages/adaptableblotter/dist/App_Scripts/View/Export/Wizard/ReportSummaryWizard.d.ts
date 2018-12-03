import { IReport, IUserFilter } from "../../../api/Interface/IAdaptableBlotterObjects";
import * as React from "react";
import { AdaptableWizardStep, AdaptableWizardStepProps } from '../../Wizard/Interface/IAdaptableWizard';
import { IColumn } from '../../../api/Interface/IColumn';
export interface ReportSummaryWizardProps extends AdaptableWizardStepProps<IReport> {
    Columns: IColumn[];
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
